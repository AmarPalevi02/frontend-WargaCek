import {
   combineReducers,
   legacy_createStore as createStore,
   applyMiddleware,
   compose,
} from 'redux';

import { thunk } from "redux-thunk";

import authReducer from './auth/reducer'
import alertReducer from './alert/reducer'

const composerEnhancer = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;


// global state
const rootReducers = combineReducers({
   auth: authReducer,
   alert: alertReducer
})


const store = createStore(
   rootReducers,
   composerEnhancer(applyMiddleware(thunk))
);


export default store