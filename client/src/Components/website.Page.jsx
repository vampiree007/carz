import React from 'react';
import axios from 'axios';
import AppsIcon from '@material-ui/icons/Apps';
import {useQuery, useSubscription, useLazyQuery} from '@apollo/react-hooks';
import DropDown from './dropdown/dropdown.component';
import {TOTAL_MAKES, LATEST_TRIMS} from '../graphql/queries';
import {POST_ADDED} from '../graphql/subscriptions';
import './websitepage.styles.css';
import CarCard from './carCard/carCard.component';

const Website = () => {
    const [models, setModels] = React.useState(null);
    const [trims, setTrims] = React.useState(null);
    const [activeTrim, setActiveTrim] = React.useState(null);
    const [searchResult, setSearchResult] = React.useState(null);
    const Makes = useQuery(TOTAL_MAKES);
    const latestTrims= useQuery(LATEST_TRIMS)
    const { data: post } = useSubscription(POST_ADDED, {
        onSubscriptionData: async ({ client: { cache }, subscriptionData: {data} }) => {
          // readQuery from cache
          const {eightTrims} = cache.readQuery({
            query: LATEST_TRIMS
          });
          // write back to cache
            cache.writeQuery({
                query: LATEST_TRIMS,
                data: {
                eightTrims: [data.postAdded, ...eightTrims]
                }
            });
            // refetch all posts to update ui
            fetchPosts({
                refetchQueries: [{ query: LATEST_TRIMS }]
            });
        }
      });
      const [fetchPosts, { data: posts }] = useLazyQuery(LATEST_TRIMS);
      
      const search = () => {
          if(!models) return alert('please select input first')
            const model_make_id = Makes.data.totalMakes[0].make_id;
            const model_name = models.makeModels[0].model_name;
            const model_trim = activeTrim ? `&model_trim=${activeTrim}` : ''
            
          axios.get(`/api/v1/car/details?cmd=getTrims&model_name=${model_name}${model_trim}`)
          .then(res=> res.data.data.data)
          .then(array => {
            if(array.length > 0){
                setSearchResult(array)
            }else{
                alert('no result found')
            }
          })
      }
      const toggleView =() => {
          const element = document.getElementById('latest_container')
          element.classList.toggle('display_column')
      }
        return (
            <div>
                {
                    // ALL DROPDOWS WILL BE SET IN HERE
                    Makes.data ? 
                    <div className="header_dropdowns">
                    <DropDown Data={Makes.data.totalMakes} setModels={setModels} title={'Make'} setTrims={setTrims} setActiveTrim={setActiveTrim} />
                    <DropDown Data={models && models.makeModels} setTrims={setTrims} setActiveTrim={setActiveTrim}  title={'Model'} />
                    <DropDown Data={trims && trims.modelTrims} title={'Trim'} setActiveTrim={setActiveTrim} />
                    <button className="search_button" onClick={()=> search()}>Search</button>
                    </div> : null
                }
                <div className="latest_container">
                {
                    // SEARCH RESULTS WILL GENERATE HERE
                    searchResult && searchResult.map((result,i)=>{
                        return(<CarCard trim={result} key={i} />)
                    })
                }
                </div>
                <div>
                    <div className="heading_main">LATEST CARS 
                        <div className="toggle_view" id="toggle_view">
                            <AppsIcon 
                                fontSize="large" 
                                color="disabled" 
                                onClick={()=> toggleView()}
                            />
                        </div>
                    </div>
                    <div className="latest_container" id="latest_container">
                    {
                        // LATEST RESULTS WILL GENERATE HERE
                        latestTrims.data && latestTrims.data.eightTrims.map((trim,i)=>{
                            return(<CarCard trim={trim} key={i} />)
                        })
                    }
                    </div>
                </div>
            </div>
        )
}

export default Website;
