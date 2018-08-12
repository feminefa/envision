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
    add: (patientData, caregiverData, oldUser = null, navigation = null) => {

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
            role: ROLE.CAREGIVER
        });

        const user = Object.assign( {...patientData}, {
            password: patientPassword,
            username: patientData.username.toLowerCase(),
            role: ROLE.PATIENT,
            age: parseInt(patientData.age),
            caregiver: caregiver
        });
        console.log('feminefa', 'user to add finally', JSON.stringify(user));
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
                        onPress: () =>  NavigationService.navigate(!oldUser?'Dashboard':'Browse', {type: oldUser?oldUser.role:'',  title: 'Browse Patients'}, true, 0),
                    },
                ]
            );

            dispatch({  type: PATIENT_STATES.ADDED,  data: user, saved: true  });
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




})
