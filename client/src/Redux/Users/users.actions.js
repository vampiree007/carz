import axios from 'axios';

export const setCurrentUser = user => ({
    type: 'SET_CURRENT_USER',
    payload: user
});

export const loginUser = (dataToSubmit) => {
    const request = axios.post('/api/v1/users/login', dataToSubmit)
    .then(response => response.data.user).catch(err => console.log(err.message))

    return({
        type: 'LOGIN_USER',
        payload: request
    })
    
}
export const signupUser = (dataToSubmit) => {
    const request = axios.post('/api/v1/users/signup', dataToSubmit)
    .then(response => response.data.user).catch(err => console.log(err.message))

    return({
        type: 'SIGNUP_USER',
        payload: request
    })
    
}
export const auth = () => {
        const request = axios.get('/api/v1/users/verify')
        .then(response => {
            if(response.data.status === 'success'){
                return response.data.user
            }
        }).catch(err => console.log(err.message))

        return {
            type: 'AUTH_USER',
            payload: request
        }
}

export function logoutUser(){
    const request = axios.get(`/api/v1/users/logout`)
    .then(response => response.data).catch(err => console.log(err.message));

    return {
        type: 'LOGOUT_USER',
        payload: request
    }
}
//function is called and payload is passed into function parameter
//type is already set matching with user.reducer switch.case.value...