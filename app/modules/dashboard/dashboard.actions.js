import {PATIENT_STATES} from './../../stores/patient'
import {bindActionCreators} from 'redux';
//const Realm = require('realm');
const User = require('../../models/User')
const Address = require ('../../models/Address')
const Data = require ('../../models/Data')
import {ROLE} from '../../models/Role';
const sha256= require('sha256');
import {AlertIOS, AsyncStorage} from 'react-native';
const seed = false;
const _  =  require('underscore');
import {realm} from '../../models/realm'
import {AUTH_STATES} from "../../stores/auth";
import RNFetchBlob from 'react-native-fetch-blob';
import Share from 'react-native-share'
import NavigationService from "../../services/navigation";
import {patientActions} from "../patient/patient.actions";

export const dashboardActions = (dispatch) => ({

    hideError: (timeOut =  6000) => {
        setTimeout(()=> dispatch({  type: PATIENT_STATES.RESET,  error: null }), timeOut);
    },
    getCounts: (key = null) => {
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
                let query = '';
                if (key) query += ' and (username CONTAINS[c] "'+key+'" OR first_name CONTAINS[c]  "'+key+'" OR last_name CONTAINS[c]  "'+key+'"  OR caregiver.username CONTAINS[c] "'+key+'" OR caregiver.first_name CONTAINS[c]  "'+key+'" OR caregiver.last_name CONTAINS[c]  "'+key+'"  ) ';

        const patients = realm.objects('User').filtered('(role = "'+ROLE.PATIENT+'")' + query);
        const providers = realm.objects('User').filtered('role = "'+ROLE.PROVIDER+'"'  + query);
        const admins = realm.objects('User').filtered('role = "'+ROLE.ADMIN+'"'  + query);
        const scores = realm.objects('Score');
         // console.log('feminefa', 'providers.............',  providers.map((obj2)=>{return obj2}))
        if(key) {
            dispatch({  type: PATIENT_STATES.SEARCH,  data: {

                },
                patientsSearch: {
                    patients: patients.map((obj) => {
                        return obj
                    }),
                    providers: providers.map((obj2) => {
                        return obj2
                    }),
                    admins: admins.map((obj3) => {
                        return obj3
                    }),
                    providerCount: providers.length,
                    adminCount: admins.length,
                    patientCount: patients.length
                },

            });
        } else {
            queryResult = {
                patients: patients.map((obj) => {
                    return obj
                }),
                    providers: providers.map((obj2) => {
                    return obj2
                }),
                    admins: admins.map((obj3) => {
                    return obj3
                }),
                    providerCount: providers.length,
                    adminCount: admins.length,
                    patientCount: patients.length,
                    scoreCount: scores.length
            },
            dispatch({  type: PATIENT_STATES.COUNT,  data: {

                },
                ...queryResult,
                patientsSearch: queryResult

            });
        }
      //  dispatch({  type: DASHBOARD_STATES.COUNT,  data: {},  count: patients.length  });

    },
    getNavigation: (navigation) => {
        dispatch({ type: AUTH_STATES.NAVIGATION,  navigation: navigation })
    },

    delete: (user) => {
        patientActions(dispatch).delete(user);
    },

    download: (type) => {
        let csv = '';
        let headerString = '';
        let patientHeader = {}, data={};
        switch (type) {
            case 'patient':
                 patientHeader = {
                    first_name:'',
                    last_name: '',
                    username: '',
                    address1: '',
                    address2: '',
                    age: '',
                    diagnosis: '',
                    hospice: '',
                    provider: '',
                    sex: ''
                };
                const caregiverHeader = {
                    first_name:'caregiver_first_name',
                    last_name: 'caregiver_last_name',
                    username: 'caregiver_username',
                    relationship: 'caregiver_relationship',
                    age: 'caregiver_age',
                    sex: 'caregiver_sex'
                }
                const patients = realm.objects('User').filtered('role = "'+ROLE.PATIENT+'"').sorted('username', true);
                console.log('feminefa', 'csv', JSON.stringify(patients.map(obj=>{return obj})));
                 data = patients.map((obj) => {
                     let line = '';
                    Object.keys(patientHeader).forEach((key) => {
                        const str = JSON.stringify(String(obj[key]));
                        line += str+','
                    })
                     Object.keys(caregiverHeader).forEach((key) => {
                         const str = JSON.stringify(String(obj.caregiver[key]));
                         line += str+','
                     })
                     line = line.substr(0, line.length-1);
                     csv += `${line}\n`;
                 })

                Object.keys(patientHeader).forEach(key => {
                    headerString +=  (patientHeader[key]!=''? patientHeader[key]:key)+',';
                })
                Object.keys(caregiverHeader).forEach(key => {
                    headerString +=   (caregiverHeader[key]!=''? caregiverHeader[key]:key)+',';
                })
                csv=`${headerString.substr(0, headerString.length-1)}\n${csv}`;

                break;
            case 'scores':
                patientHeader = {
                    first_name:'',
                    last_name: '',
                    username: '',
                };
                const scoreHeader = {
                    date:'',
                    type: 'symptom',
                    value: 'score',
                }
                const scores = realm.objects('Score').sorted('date', true);

                data = scores.map((obj) => {
                    let line = '';
                    Object.keys(patientHeader).forEach((key) => {
                        const str = JSON.stringify(String(obj.user[key]));
                        line += str+','
                    })
                    Object.keys(scoreHeader).forEach((key) => {
                        const str = JSON.stringify(String(obj[key]));
                        line += str+','
                    })
                    line = line.substr(0, line.length-1);
                    csv += `${line}\n`;
                });

                Object.keys(patientHeader).forEach(key => {
                    headerString += (patientHeader[key]!=''? patientHeader[key]:key)+',';
                })
               Object.keys(scoreHeader).forEach(key => {
                   headerString +=  (scoreHeader[key]!=''? scoreHeader[key]:key)+',';
                })
                csv=`${headerString.substr(0, headerString.length-1)}\n${csv}`;
                break;
            default:
                break;
        }

        const pathToWrite = `${RNFetchBlob.fs.dirs.DocumentDir}/envision-${type}-${new Date().getTime()}.csv`;
       // console.log('feminefa', 'pathToWrite', pathToWrite);
        RNFetchBlob.fs
            .writeFile(pathToWrite, csv, 'utf8')
            .then(() => {
              //  console.log('feminefa', `wrote file ${pathToWrite}`);

                // wrote file /storage/emulated/0/Download/data.csv
                const shareOptions = {
                    title: 'Share via',
                    url: pathToWrite,
                   //social: Share.Social.WHATSAPP
                };
               Share.open(shareOptions).then((res) => { console.log(res) })
                   .catch((err) => {  });
            })
            .catch(error => {
               alert( 'Error!!! \nCould not save file to  '+pathToWrite+'. Please make sure that the folder exists on this device')
                //console.error('feminefa', error)
            });
    },

    updatePassword: (userObj, currentPassword, newPassword) => {
        const user = realm.objectForPrimaryKey('User', userObj.username);
        if (user && user.password == sha256(currentPassword)) {
            realm.write(() => {
                user.password= sha256(newPassword)

               // alert('Password modified successfully!');
                AlertIOS.alert(
                    'Alert',
                    'Password modified successfully!',
                    [

                        {
                            text: 'Okay',
                            onPress: () =>  dispatch({ type: PATIENT_STATES.PASSWORD,  showPasswordModal: false }),
                        },
                    ]
                );

            });
        }else{
            alert('Error!!! Invalid current password provided')
        }
    },
    changePassword: (bool) => {
        dispatch({ type: PATIENT_STATES.PASSWORD,  showPasswordModal: bool })
    }

    //decrement: () => { dispatch({ type: 'DECREMENT' }) },
    //reset: () => { dispatch({ type: 'RESET' }) },
})
