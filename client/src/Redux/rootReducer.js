import { combineReducers } from 'redux';

import userReducer from './Users/users.reducer';

export default combineReducers({
    user: userReducer
})