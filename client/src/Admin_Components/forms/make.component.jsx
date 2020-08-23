import React, { useState } from 'react';
import {MAKE_CREATE} from '../../graphql/mutation';
import { useMutation } from '@apollo/react-hooks';
import Input from './formComponents/input.component';
import Button from './formComponents/button.component';

const Make = () => {
    const [values, setValues] = useState({
        make_id: '',
        make_display: '',
        make_is_common: '',
        make_country: '',
        make_year: ''
    });

    // extracting keys from object to array to map the input
    const Array = Object.keys(values)

    // mutation
    const [createMake] = useMutation(MAKE_CREATE, {
        update: ({ data }) => {
            console.log('MAKE CREATE MUTATION IN PROFILE', data);
            alert('MAKE_CREATED');
        }
    });

    const handleSubmit = (e) => {
        e.preventDefault();
        createMake({ variables: { input: values } });
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
                <Button text={'Create Make'} click={handleSubmit}/>
            </form>
        </div>
    );
};

export default Make;
