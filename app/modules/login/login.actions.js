import {AUTH_STATES} from './../../stores/auth'
import {bindActionCreators} from 'redux';
const Realm = require('realm');
const User = require('../../models/User')
const Address = require ('../../models/Address')
const Data = require ('../../models/Data')
import {realm} from '../../models/realm'
import {ROLE} from '../../models/Role';
const sha256= require('sha256');
import { AsyncStorage } from 'react-native';
import {NavigationActions} from "react-navigation";
import NavigationService from "../../services/navigation";
const seed = true;
const _  =  require('underscore');


export const mapDispatchToProps = (dispatch) => ({
    hideError: () => {
       dispatch({  type: AUTH_STATES.RESET,  error: null })
    },
    login: (username, password, navigation) => {


                if(seed) {
                    try {
                        realm.write(() => {
                            realm.create('User', {
                                username: 'admin',
                                first_name: 'Super Admin',
                                last_name: 'Admin', // could also be omitted entirely
                                verified: true,
                                role: ROLE.ADMIN,
                                password: sha256('password')
                            });
                            realm.create('User', {
                                username: 'admin2',
                                first_name: 'Admin',
                                last_name: 'Admin', // could also be omitted entirely
                                verified: true,
                                role: ROLE.ADMIN,
                                title: 'Dr (MD)',
                                password: sha256('password')
                            });
                            // console.log('feminefa', 'error', 'sddddds')
                        });
                    }catch (error) {

                    }
                }
                const user = realm.objectForPrimaryKey('User', username);
                if (user && user.password == sha256(password)) {
                    const userObj = _.extend({}, user);
                    AsyncStorage.setItem('token', JSON.stringify(userObj) ).then((err, t) => {
                        // console.debug('feminefa', 'user logged in', JSON.stringify(userObj) );
                        dispatch({ type: AUTH_STATES.LOGIN_SUCCESS, data: userObj, user: userObj  });
                        //navigation('Dashboard', {title: 'Welcome ' + userObj.username});
                        //reload the login page
                        NavigationService.navigate('Login', {title: 'Profile', user: userObj}, true);
                        return;


                    })
                } else{
                   // console.debug('feminefa', 'user', 'Auth failed' );
                    dispatch({ type: AUTH_STATES.LOGIN_FAILURE,   error: 'Invalid username or password' })

                }
                 // realm.close()

    },
    logout: () => {

        //dispatch(NavigationActions.navigate({ routeName: 'Login' }));
        // navigation('Login');
        dispatch({ type: AUTH_STATES.LOGOUT, error: ''})
    },
    getNavigation: (navigation) => {
        dispatch({ type: AUTH_STATES.NAVIGATION,  navigation: navigation })
    },
    dispatch: (obj) => (
        dispatch(obj)
    )
    //decrement: () => { dispatch({ type: 'DECREMENT' }) },
    //reset: () => { dispatch({ type: 'RESET' }) },
})
