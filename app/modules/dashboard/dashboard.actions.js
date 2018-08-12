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
import {AUTH_STATES} from "../../stores/auth";

export const dashboardActions = (dispatch) => ({

    hideError: (timeOut =  6000) => {
        setTimeout(()=> dispatch({  type: PATIENT_STATES.RESET,  error: null }), timeOut);
    },
    getCounts: () => {
        // dispatch({  type: DASHBOARD_STATES.COUNT,  data: {},  count: 232  });
        // return;
// console.log('feminefa', 'counting.............')


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
                            password: sha256('password'),
                            provider_id: 'femi'
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
                            password: sha256('password'),
                            provider_id: 'femi'
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
                            password: sha256('password'),
                            provider_id: 'femi'
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
        const providers = realm.objects('User').filtered('role = "'+ROLE.PROVIDER+'"');
        const admins = realm.objects('User').filtered('role = "'+ROLE.ADMIN+'"');
         // console.log('feminefa', 'providers.............',  providers.map((obj2)=>{return obj2}))
        dispatch({  type: PATIENT_STATES.COUNT,  data: {

            },
            patients: patients.map((obj)=>{return obj}),
            providers: providers.map((obj2)=>{return obj2}),
            admins: admins.map((obj3)=>{return obj3}),
            providerCount: providers.length,
            adminCount: admins.length,
            patientCount: patients.length
        });
      //  dispatch({  type: DASHBOARD_STATES.COUNT,  data: {},  count: patients.length  });

    },
    getNavigation: (navigation) => {
        dispatch({ type: AUTH_STATES.NAVIGATION,  navigation: navigation })
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
        console.log('feminefa', 'providers.............', patients.map((obj2)=>{return obj2}))
        dispatch({  type: PATIENT_STATES.COUNT,  data: {

            },
            patients: patients.map((obj)=>{return obj}),
            providers: providers.map((obj2)=>{return obj2}),
            admins: admins.map((obj3)=>{return obj3}),
            providerCount: providers.length,
            adminCount: admins.length,
            patientCount: patients.length
        });
    }
    //decrement: () => { dispatch({ type: 'DECREMENT' }) },
    //reset: () => { dispatch({ type: 'RESET' }) },
})
