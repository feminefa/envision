import {PATIENT_STATES} from './../../stores/patient'
import {bindActionCreators} from 'redux';
//const Realm = require('realm');
const User = require('../../models/User')
const Address = require ('../../models/Address')
const Data = require ('../../models/Data')
import {ROLE} from '../../models/Role';
const sha256= require('sha256');
import { AsyncStorage } from 'react-native';
const seed = false;
const _  =  require('underscore');
import {realm} from '../../models/realm'
import {NavigationActions} from "react-navigation";
import NavigationService from "../../services/navigation";
import {AlertIOS} from "react-native"
import SCORE_TYPES from "../../models/ScoreTypes";
const uuid = require('react-native-uuid');
import {dashboardActions} from "../dashboard/dashboard.actions";
import {patientReducer} from "../../stores/patient";

export const patientActions = (dispatch) => ({

    hideError: (timeOut =  6000) => {
       dispatch({  type: PATIENT_STATES.RESET,  error: null });
    },
    showError: (error) => {
        dispatch({  type: PATIENT_STATES.ERROR,  error: error });
    },
    getCounts: () => {
                if(seed) {
                    const users = [
                        {
                            username: 'john',
                            first_name: 'John',
                            last_name: 'Junior', // could also be omitted entirely
                            verified: true,
                            role: ROLE.PATIENT,
                            caregiver: {
                                username: 'daniel',
                                first_name: 'Daniel',
                                last_name: 'Yani', // could also be omitted entirely
                                verified: true,
                                role: ROLE.CAREGIVER,
                                caregiver_of: 'john',
                                password: sha256('password')
                            },
                            password: sha256('password')
                        },
                        {
                            username: 'peter',
                            first_name: 'Peter',
                            last_name: 'Mark', // could also be omitted entirely
                            verified: true,
                            role: ROLE.PATIENT,
                            caregiver: {
                                username: 'matthew',
                                first_name: 'Matthew',
                                last_name: 'Anderson', // could also be omitted entirely
                                verified: true,
                                role: ROLE.CAREGIVER,
                                caregiver_of: 'peter',
                                password: sha256('password')
                            },
                            password: sha256('password')
                        },

                        {
                            username: 'hakeem',
                            first_name: 'Peter',
                            last_name: 'Mark', // could also be omitted entirely
                            verified: true,
                            role: ROLE.PATIENT,
                            caregiver: {
                                username: 'hannah',
                                first_name: 'Hannah',
                                last_name: 'Ryan', // could also be omitted entirely
                                verified: true,
                                role: ROLE.CAREGIVER,
                                caregiver_of: 'hakeem',
                                password: sha256('password')
                            },
                            password: sha256('password')
                        }


                    ];
                    realm.write(() => {
                        users.map((user) => {
                            realm.create('User', user);
                        })

                        // console.log('feminefa', 'error', 'sddddds')
                    });
                }
        const patients = realm.objects('User').filtered('role = "'+ROLE.PATIENT+'"');
       // console.log('feminefa', 'counting.............', patients.map(obj => {return obj}))
        dispatch({  type: PATIENT_STATES.COUNT,  data: patients.map(obj => {return obj}),  patientCount: patients.length  });
      //  dispatch({  type: DASHBOARD_STATES.COUNT,  data: {},  count: patients.length  });

    },
    save: (patientData, caregiverData, oldUser = null, navigation = null) => {

        let patientPassword = patientData.password;
        let caregiverPassword = caregiverData.password;
        if (!oldUser || oldUser.password !== patientData.password) {
            patientPassword = sha256(patientData.password);
        }
        if (!oldUser || oldUser.caregiver.password !== caregiverData.password) {
            caregiverPassword = sha256(caregiverData.password);
        }
        const caregiver = Object.assign( {...caregiverData }, {
            password: caregiverPassword,
            username: caregiverData.username.toLowerCase(),
            age: parseInt(caregiverData.age),
            role: ROLE.CAREGIVER,
            caregiver_of: patientData.username.toLowerCase()
        });

        const user = Object.assign( {...patientData}, {
            password: patientPassword,
            username: patientData.username.toLowerCase(),
            role: ROLE.PATIENT,
            age: parseInt(patientData.age),
            caregiver: caregiver
        });
        // console.log('feminefa', 'user to add finally', JSON.stringify(user));
        try{
            realm.write(() => {
                realm.create('User', user, oldUser!=null);
                //if (oldUser) {
                    //realm.create('User', caregiver, true);
                //}
            });
            AlertIOS.alert(
                'Alert',
                'You have successfully ' + (oldUser?'update':'added') + ' a user',
                [

                    {
                        text: 'Okay',
                        onPress: () => NavigationService.goBack(!oldUser?'Dashboard':'Browse'),// NavigationService.navigate(!oldUser?'Dashboard':'Browse', {type: oldUser?oldUser.role:'',  title: 'Browse Patients'}, true, 0),
                    },
                ]
            );

            dispatch({  type: PATIENT_STATES.ADDED,  data: user, saved: true  });
            dashboardActions(dispatch).getCounts();
        }catch (e) {
            if (e.message.toLowerCase().includes('existing')) {
                let username = e.message.toLowerCase().includes(patientData.username)?patientData.username:caregiverData.username;
                dispatch({  type: PATIENT_STATES.ERROR,  data: {}, saved: false, error: 'The username "'+username+'" has already been used' });
                return;
            }
            dispatch({  type: PATIENT_STATES.ERROR,  data: {}, saved: false, error: e.message });
        }

    },

    getProviders: () => {
        const providers = realm.objects('User').filtered('role = '+ROLE.PROVIDER+' and username <> "admin"');
       // console.log('feminefa', 'providers', JSON.stringify(providers.map(obj => {return obj})))
        dispatch({  type: PATIENT_STATES.PROVIDERS_LOADED,  providers: providers.map(obj => {return obj}),  providerCount: providers.length  });
    },

    getScores: (user, start, end = null) => {
        const scores = {[user.username]: {...SCORE_TYPES, fromDate: start, toDate: end}}
        if (user.role == ROLE.CAREGIVER) {
            scores[user.caregiver_of] = {};
        }
        if(end == null) end = start;

        const startDate = new Date(start);
        const endDate = new Date(end);
        Object.keys(SCORE_TYPES).forEach((key) => {
            scores[user.username][key] = '?';
            const avg = realm.objects('Score').filtered('user.username = "'+user.username+'" AND type = "'+key+'" AND date <= $0 AND date >= $1' ,
                startDate, endDate).avg('value');
            if(avg != null) {
                scores[user.username][key] = avg;
            }


            if (user.role == ROLE.CAREGIVER) {


                const avg2 = realm.objects('Score').filtered('user.username = "' + user.caregiver_of + '" AND type = "' + key + '" AND date <= $0 AND date >= $1',
                    startDate, endDate).avg('value');

                if (avg2 !== null) {
                    //console.log('feminefa', 'caregiver', key, avg2);
                    scores[user.caregiver_of][key] = avg2;
                }
            }
        })
         console.log('feminefa', 'scores', JSON.stringify(scores))
        dispatch({  type: PATIENT_STATES.SCORES,  scores: scores  });
        //const providers =
    },
    clearStore: (user) => {
        const chartScores = {[user.username]: {dates: [], values:[]}}
        dispatch({  type: PATIENT_STATES.CHART_DATA,  chartScores: chartScores  });
        const scores = {[user.username]: {}}
        dispatch({  type: PATIENT_STATES.SCORES,  scores: scores  });
    },
    getChartScores: (user, key, start, end = null) => {
        const scores = {[user.username]: {dates: [], values:[]}}
        var date1 = new Date(start);
        var daysPrior = 14;
        end = new Date(date1.setDate(date1.getDate() - daysPrior)).toLocaleDateString();

        if(end == null) end = start;
            const getScores = realm.objects('Score').filtered('user.username = "'+user.username+'" AND type = "'+key+'" AND date <= $0 AND date >= $1' ,
                new Date(start), new Date(end)).sorted('date', false);
          getScores.map((score) => {
              scores[user.username]['dates'].push((score.date.toLocaleDateString()).replace('/'+score.date.getFullYear(), ''));
              scores[user.username]['values'].push(score.value);
          })
        if (scores[user.username]['dates'].length == 1) {
            scores[user.username]['dates'].splice(0, 0, '')
            scores[user.username]['values'].splice(0, 0, 0);
        }
        // console.log('feminefa', 'chart scores for '+key, JSON.stringify(scores))
        // console.log('feminefa', 'scores', JSON.stringify(scores))
        dispatch({  type: PATIENT_STATES.CHART_DATA,  chartScores: scores  });
        //const providers =
    },

    saveScore: (user, key, value, date, endDate ) => {

        realm.write(() => {
            const score = realm.objects('Score').filtered('user.username = "'+user.username+'" AND type = "'+key+'" AND date = $0' ,
                new Date(date));
            if(score.length > 0) {
                // console.log('feminefa', 'score eixst', key)
                score[0].value = value;
            } else {
                realm.create('Score', {
                    id: uuid.v4(),
                    user: user,
                    date: new Date(date),
                    type: key,
                    value: value
                }, true);
            }
        });

            const scores = {[user.username]:{...SCORE_TYPES, fromDate: start, toDate: end}}
            const start = date;
            let end = endDate;
            if(end == null) end = start;
            Object.keys(SCORE_TYPES).forEach((key) => {
                scores[key] = '?';
                const avg = realm.objects('Score').filtered('user.username = "'+user.username+'" AND type = "'+key+'" AND date <= $0 AND date >= $1' ,
                    new Date(start), new Date(end)).avg('value');
                if(avg != null) {
                    scores[user.username][key] = avg;
                }
            })
            // console.log('feminefa', 'scores', JSON.stringify(scores))
            dispatch({  type: PATIENT_STATES.SCORES,  scores: scores  });

    },
    delete: (user) => {

        const _self = this;
        // dispatch({ type: AUTH_STATES.NAVIGATION,  navigation: navigation })
        realm.write(() => {

            if (user.caregiver) {
                const realmUser2 = realm.objects('User').filtered('username = "'+user.caregiver.username+'"');
                realm.delete(realmUser2);
            }
            const realmUser = realm.objects('User').filtered('username = "'+user.username+'"');
            realm.delete(realmUser);

        });
        const patients = realm.objects('User').filtered('role = "'+ROLE.PATIENT+'"');
        const providers = realm.objects('User').filtered('role = "'+ROLE.PROVIDER+'"');
        const admins = realm.objects('User').filtered('role = "'+ROLE.ADMIN+'"');
        // console.log('feminefa', 'providers.............', patients.map((obj2)=>{return obj2}))
        dashboardActions(dispatch).getCounts();
    },




})
