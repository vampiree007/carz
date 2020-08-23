import React, { useState } from 'react';
import {TRIM_CREATE} from '../../graphql/mutation';
import { toast, ToastContainer } from 'react-toastify';
import { useMutation } from '@apollo/react-hooks';
import Input from './formComponents/input.component';
import Button from './formComponents/button.component';

const Trim = (props) => {
    const [values, setValues] = useState({
        model_id: '',
        model_make_id: '',
        model_name: '',
        model_trim: '',
        model_year: '',
        model_body: '',
        model_engine_position: '',
        model_engine_cc: '',
        model_engine_cyl: '',
        model_engine_type: '',
        model_engine_valver_per_cycle: '',
        model_engine_power_ps: '',
        model_engine_power_rpm: '',
        model_engine_torque_nm: '',
        model_engine_torque_rpm: '',
        model_engine_bore_mm: '',
        model_engine_stroke_mm: '',
        model_engine_compression: '',
        model_engine_fuel: '',
        model_top_speed_kph: '',
        model_0_to_100_kph: '',
        model_drive: '',
        model_transmission_type: '',
        model_gear: ''
    });

    // extracting keys from object to array to map the input
    const Array = Object.keys(values)

    // mutation
    const [createTrim] = useMutation(TRIM_CREATE, {
        update: ({ data }) => {
            console.log('TRIM CREATE MUTATION IN PROFILE', data);
            toast.success('TRIM_CREATED');
        }
    });

    const handleSubmit = (e) => {
        e.preventDefault();
        if(!values.model_id || !values.model_make_id || values.model_name || values.model_trim || values.model_year){
            return alert('First Five Fields Are Mandatory')
        }
        createTrim({ variables: { input: values } });
    };

    const handleChange = (e) => {
        setValues({ ...values, [e.target.name]: e.target.value });
    };
    return (
        <div className="form_grid">
            <ToastContainer />
            <form onSubmit={handleSubmit} >
                <div className="equal_three">
                    {
                        Array.map((item, i)=>{
                            const placeholder = item.split('_').join(' ').toUpperCase()
                            return(
                                <Input 
                                    key={i}
                                    placeholder={placeholder} 
                                    handleChange={handleChange}
                                    name={item}
                                    value={Object.values(values)[i]}
                                />
                            )
                        })
                    }
                </div>
                <Button text={'Create Trim'} click={handleSubmit}/>
            </form>
        </div>
    );
};

export default Trim;
