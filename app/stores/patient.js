import { createStore } from 'redux'
import {
    navigate,
} from 'react-navigation';
export const PATIENT_STATES = {
    COUNT: 'patient.count',
    SEARCH: 'users.search',
    RESET: 'dashboard.reset',
    ADDED: 'patient.add',
    DELETED: 'patient.deleted',
    ERROR: 'patient.error',
    SCORES: 'patient.scores',
    SCORE_UPDATED:  'patient.scores.updated',
    PROVIDERS_LOADED: 'providers.loaded',
    CHART_DATA: 'chart.data',
    PASSWORD: 'user.password'

}
export const patientReducer = (state = {providerCount: 0, scoreCount: 0, chartScores: {}, patientsSearch: {}, scores: {}, adminCount: 0, patientCount: 0, providers: [], _user: null}, action) => {
    let obj = {};
    switch (action.type) {
        case PATIENT_STATES.COUNT:
        case PATIENT_STATES.SEARCH:
        case PATIENT_STATES.ADDED:
        case PATIENT_STATES.PROVIDERS_LOADED:
        case PATIENT_STATES.DELETED:

        case PATIENT_STATES.SCORE_UPDATED:

        case PATIENT_STATES.PASSWORD:
            obj =  Object.assign({success: true}, state, action);
            // console.log('feminefa', 'state state state', JSON.stringify(state))
            break;
        case PATIENT_STATES.SCORES:
            obj =  Object.assign({success: true}, state, action, {scores: {...state.scores, ...action.scores}});
           // console.log('feminefa', 'state state state', JSON.stringify(obj))
            break;
        case PATIENT_STATES.CHART_DATA:

            obj =  Object.assign({success: true}, state, action, {chartScores: {...state.chartScores, ...action.chartScores}});
           // console.log('feminefa', 'state state state', JSON.stringify(obj))
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