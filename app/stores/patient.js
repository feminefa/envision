import { createStore } from 'redux'
import {
    navigate,
} from 'react-navigation';
export const PATIENT_STATES = {
    COUNT: 'patient.count',
    RESET: 'dashboard.reset',
    ADDED: 'patient.add',
    DELETED: 'patient.deleted',
    ERROR: 'patient.error',
    PROVIDERS_LOADED: 'providers.loaded',

}
export const patientReducer = (state = {providerCount: 0, adminCount: 0, patientCount: 0, providers: [], _user: null}, action) => {
    let obj = {};
    switch (action.type) {
        case PATIENT_STATES.COUNT:
        case PATIENT_STATES.ADDED:
        case PATIENT_STATES.PROVIDERS_LOADED:
        case PATIENT_STATES.DELETED:
            obj =  Object.assign({success: true}, state, action);
            // console.log('feminefa', 'state state state', JSON.stringify(state))
            break;
        case PATIENT_STATES.ERROR:
            obj =  Object.assign({success: false}, state, action );
            //console.log('feminefa', 'state state state', JSON.stringify(obj))
           break;
        case PATIENT_STATES.RESET:
            obj = Object.assign({}, state, action, {error: null} );;
            break;
        default:
            // state = Object.assign({}, state, { data: action.data, error: action.error, loading:false });
            obj= state;
            break;
    }
    return obj;
}


export const dashboardStore = createStore(patientReducer);

//export default dashboardReducer;