import React, {useEffect} from 'react';
import { makeStyles } from '@material-ui/core/styles';
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';
import {useQuery} from '@apollo/react-hooks';
import {MAKE_MODELS, MODEL_TRIMS} from '../../graphql/queries';

// THIS IS MATERIAL UI CSS
const useStyles = makeStyles((theme) => ({
  formControl: {
    margin: theme.spacing(1),
    minWidth: 120,
  },
  selectEmpty: {
    marginTop: theme.spacing(2),
  },
}));

export default function DropDown({Data, setModels, setTrims, setActiveTrim, title, setActiveMake}) {          
  const classes = useStyles();
  const [value, setValue] = React.useState('');


  // 1. SET VALUE AND TO USE IT TO TRIGGER QUERY ACTION
  const handleChange = (event) => {
    if(title === ' Make') {setModels(null); setTrims(null); setActiveTrim(null);}
    if(title === 'Model') {setActiveTrim(null)}
    setValue(event.target.value);
  };

  // 2. CHECK WHICH QUERY TO TRIGGER
  const fetchModel = () => {
    if(value && value.length>0 && title==='Make' ) return false;
    return true
  }
  const fetchTrim = () => {
    if(value && value.length>0 && title==='Model' ) return false;
    return true
  }
  
  // 3. FETCH QUERY ON BASIS OF RECEIVED VALUE FROM ABOVE FUNCTION
  const makeModels = useQuery(MAKE_MODELS, {
    variables: {model_make_id:value},
    skip: fetchModel()
  });
  const modelTrims = useQuery(MODEL_TRIMS, {
    variables: {model_name:value},
    skip: fetchTrim()
  });

  // 4. SET PARENT PROP VALUE AFTER SUCCESSFUL QUERY CALL
  useEffect(() => {
    if(makeModels.data){
      setTrims(null)
      setModels(makeModels.data)
      setActiveMake(value)
    }
    if(modelTrims.data){
      setTrims(modelTrims.data)
    }
  }, [makeModels.data, setModels, setTrims, modelTrims.data, setActiveTrim,setActiveMake, value]);

  // 5. FINAL TRIM SELECTION VALUE SET HERE
  const set = (val) => {
    if(title === 'Trim' && val){
      setActiveTrim(val)
    }
  }
  // + ALL DROPDOWN AUTMATION HANDLED HERE
  return (
    <div>
      <FormControl variant="outlined" className={classes.formControl}>
      <InputLabel id="demo-simple-select-outlined-label">{title}</InputLabel>
        <Select
          labelId="demo-simple-select-outlined-label"
          id="demo-simple-select-outlined"
          value={value}
          onChange={handleChange}
          label="Makes"
          className="web_dropdown"
          disabled={Data? false: true}
        >
          <MenuItem value="">
            <em>None</em>
          </MenuItem>
          {
              // THIS WILL AUTO GENERATE DROPDOWNS
              Data && Data.map((item, i) => {
                let val = item.make_id || item.model_trim || item.model_name;
                const display = item.make_display || item.model_trim || item.model_name;
                  return(
                  <MenuItem key={i} 
                  value={val} 
                  onClick={() => set(item.model_trim)}>
                      {display}
                  </MenuItem>
                  )
              })
          }
        </Select>
      </FormControl>
    </div>
  );
}
