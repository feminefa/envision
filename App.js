
import {StackNavigator, navigate, addNavigationHelpers, NavigationActions} from 'react-navigation';
import  LoginContainer  from './app/modules/login/login.container';
import  DashboardContainer  from './app/modules/dashboard/dashboard.container';
import  BrowseContainer  from './app/modules/browse/browse.container';
import  AddPatientContainer  from './app/modules/patient/add/add.patient.container';
import  AddCaregiverContainer from './app/modules/AddCaregiverContainer';
import  ProfileContainer from './app/modules/patient/profile/profile.patient.container';
import { Provider } from 'react-redux';
import { bindActionCreators } from 'redux';

import React, {Component} from 'react'
import {StatusBar, TouchableHighlight, Text, AsyncStorage} from 'react-native'

import { connect } from 'react-redux'
import {isAuthenticated} from "./app/services/auth";
import {patientActions} from "./app/modules/patient/patient.actions";
import store from "./app/stores/store";
import Layout from "./app/modules/patient/add/add.patient.component";
import {PATIENT_STATES} from "./app/stores/patient";
import {mapDispatchToProps} from './app/modules/login/login.actions';
import {authReducer} from "./app/stores/auth";
// import Tabs from './auth/Tabs'
// import Nav from './nav/Nav'
import NavigationService from './app/services/navigation'
class App extends React.Component {
    state = {
        user: {},
        isLoading: true
    }
    constructor(props){
        super(props);
        this.state = {
            isLoading: true,
            username: '',
            password: ''
        }
        this.logout = this.logout.bind(this)
        // this.hideError = this.hideError.bind(this);

    }
    async componentDidMount() {
        this.props.hideError;
        StatusBar.setHidden(true)
        try {
            const user = await isAuthenticated(this.props.navigation, (userObj, err) => {
                // console.debug('feminefa', 'authenticated guy', JSON.stringify(user))
                //dispatch(actions.nodeClicked(data))
                this.user= userObj;
                // this.props.user = user;
                console.log('feminefa', 'user', userObj)
                this.setState({ user: userObj })
            });
            this.setState({ user, isLoading: false })
        } catch (err) {
            this.setState({ isLoading: false })
        }
    }

    async componentWillReceiveProps(nextProps) {
        try {
            const user = await isAuthenticated(this.props.navigation, (userObj, err) => {
                // console.debug('feminefa', 'authenticated guy', JSON.stringify(user))
                //dispatch(actions.nodeClicked(data))
                this.user= userObj;
                // this.props.user = user;
                console.log('feminefa', 'user', userObj)
                this.setState({ user: userObj })
            });
           // const user = await Auth.currentAuthenticatedUser()

        } catch (err) {
            console.log('feminefa', 'err', err.message)
            this.setState({ user: {} })
        }
    }

    logout() {
        //this.props.navigation.navigate('Login')
       // NavigationService.navigate.dispatch('Login', { param1: 'a', param2: 'b'  });
        AsyncStorage.removeItem('token', (err) => {
            ((screen) => {
                const resetAction = NavigationActions.reset({
                    index: 0,
                    actions: [
                        NavigationActions.navigate({routeName: screen})
                    ]
                });
                NavigationService.dispatch(resetAction);
            })('Login')
        })

    }

    render() {
        const _self = this;
        if (this.state.isLoading) return null
        let loggedIn = false
        if (this.state.user && this.state.user.username) {
            loggedIn = true
        }
        const NotLoggedIn = ( StackNavigator({
            Login: {screen: LoginContainer},
            Dashboard: {screen: DashboardContainer},
            Browse: {screen: BrowseContainer},
            AddPatient: {screen: AddPatientContainer},
            AddCaregiver: {screen: AddCaregiverContainer},
            Profile: {screen: ProfileContainer},

        }, {
            initialRouteName: loggedIn?'Dashboard':'Login',

            /* The header config from HomeScreen is now here */
            navigationOptions: {
                headerStyle: {
                    backgroundColor: '#f4511e',
                },
                headerRight: (
                    <TouchableHighlight onPress={ this.logout } title={"Log Out"}
                                        underlayColor={ 'transparent'} style={{
                        flexDirection: 'column',
                        justifyContent: 'center',
                        alignItems: 'center',
                        padding: 10,
                        height: 50,
                        minWidth: 100,
                        margin: 0

                    }} >
                        <Text  style={{ marginEnd: 10, color: '#ffffff' }}>
                            Log Out
                        </Text>
                    </TouchableHighlight>
                ),
                headerTintColor: '#fff',
                headerTitleStyle: {
                    fontWeight: 'bold',
                },
            }
        }));
        if (loggedIn) {

            return (
                <NotLoggedIn  ref={navigatorRef => {
                    NavigationService.setTopLevelNavigator(navigatorRef);
                }}  />
            )
        } else {
            console.log('feminefa', 'logged in', 'FALSE')
            return (
               <NotLoggedIn  ref={navigatorRef => {
                   NavigationService.setTopLevelNavigator(navigatorRef);
               }}  />
            )
        }
    }
}

const mapStateToProps = state => (
    {
        auth: state.auth,
        //store: store,
        navigation: state.navigation,
    }
)
const bindAction = dispatch => {
    return Object.assign({dispatch: dispatch}, bindActionCreators(mapDispatchToProps, dispatch));
    // add dispatch itself to props, so available for addNavigationHelpers
};
 const Content =  connect(mapStateToProps, bindAction)(App);

export default  class Container extends Component {
    static navigationOptions = ({navigation}) => {
        return {
            title: (navigation.state.params.title?navigation.state.params.title:"Add Patient")
        }
    }

    render() {
       // const { navigate } = this.props.navigation;

        return (
            <Provider   store={store}>
                <Content  navigation={addNavigationHelpers({
                    dispatch: this.props.dispatch,
                    state: this.props.navigation,
                })}     />
            </Provider>
        );
    }
}


