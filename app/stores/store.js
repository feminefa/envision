import { createStore, applyMiddleware } from 'redux'
import {authReducer} from './auth';
import {patientReducer} from './patient'
import {patientMiddleware} from "../middlewares/patient";
import { combineReducers } from 'redux'
import { combineEpics } from 'redux-observable';
import { createEpicMiddleware } from 'redux-observable';
import { map, mapTo, filter, switchMap, delay } from 'rxjs/operators';
const rootReducer = combineReducers({
    authReducer,
    patientReducer
})
//const epicMiddleware = createEpicMiddleware();
const newStore = createStore (
    rootReducer,
    applyMiddleware(patientMiddleware)
);
export default newStore;
