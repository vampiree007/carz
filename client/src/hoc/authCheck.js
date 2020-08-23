import React,{useEffect} from 'react';
import {useHistory} from 'react-router-dom';
import { useSelector} from "react-redux";

export default function (ComposedClass, load, userAccess, authority = 'user') {
    const history = useHistory()
    const path = history.location.pathname
    const user = useSelector(state => state.user.currentUser);
    function AuthenticationCheck(props) {
        useEffect(() => {
            if(!user){
                props.history.push('/login')
            }
            if(user && load === false) {
                if(path === '/login' || path ==='/register') props.history.push('/cars')
            }
            
        }, [props.history]);
   
    return (
        <ComposedClass {...props} />
    )
}
    return AuthenticationCheck
}


