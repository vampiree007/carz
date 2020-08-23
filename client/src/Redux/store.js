import { createStore, applyMiddleware } from 'redux';
import logger from 'redux-logger';
import promiseMiddleware from 'redux-promise';
import ReduxThunk from 'redux-thunk';

import rootReducer from './rootReducer';

const store = createStore(rootReducer, applyMiddleware(ReduxThunk, logger, promiseMiddleware))

export default store;