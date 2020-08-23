import React,{useState} from 'react';
import SideDrawer from './sideDrawer/siideDrawer.component';
import Make from './forms/make.component';
import Model from './forms/model.component';
import Trim from './forms/trim.component';
import './dashboard.styles.css';

const Dashboard = () => {
    const [activeTab, setActiveTab] = useState('make')
    return (
        <div className='dashboard'>
            <SideDrawer toggle={setActiveTab} setActiveTab={setActiveTab} />
            <div className="dashboard_main">
                <h1>Create {activeTab}</h1>
                <div className="dashboard_tab">
                {
                    activeTab === 'make'? <Make/> :
                    activeTab === 'model'? <Model/> :
                    <Trim />
                }
                </div>
            </div>
        </div>
    )
}

export default Dashboard;
