import React, { useState } from 'react';
import {MODEL_CREATE} from '../../graphql/mutation';
import { useMutation } from '@apollo/react-hooks';
import Input from './formComponents/input.component';
import Button from './formComponents/button.component';

const Model = () => {
    const [values, setValues] = useState({
        model_make_id: '',
        model_name: ''
    });

    // extracting keys from object to array to map the input
    const Array = Object.keys(values)

    // mutation
    const [createModel] = useMutation(MODEL_CREATE, {
        update: ({ data }) => {
            console.log('MODEL CREATE MUTATION IN PROFILE', data);
            alert('MODEL_CREATED');
        }
    });

    const handleSubmit = (e) => {
        e.preventDefault();
        if( !values.model_make_id || !values.model_name){
            return alert('All Fields Are Mandatory')
        }
        createModel({ variables: { input: values } });
    };

    const handleChange = (e) => {
        setValues({ ...values, [e.target.name]: e.target.value });
    };
    return (
        <div className="form_grid">
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
                <Button text={'Create Model'} click={handleSubmit}/>
            </form>
        </div>
    );
};

export default Model;
