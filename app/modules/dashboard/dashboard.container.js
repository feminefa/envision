import React, { Component } from 'react';
import {
    AppRegistry,
    StyleSheet,
    View,
    StatusBar,
    TouchableOpacity,
    Text
} from 'react-native';
import { Provider } from 'react-redux';
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux';
import {DashboardComponent} from './dashboard.component';
// import { AsyncStorage } from 'react-native';
import store from "../../stores/store";
import {isAuthenticated, isGuest as guest} from "../../services/auth";

// AsyncStorage.setItem('name', 'deji')
/*, () => {
dispatch({type: ADD_QUOTE, quote:quote});
}); */
import {dashboardActions} from './dashboard.actions';
// const mapStateToProps = (state) => ({ ...state.dashboardReducer, count: 0})
const mapStateToProps = (state, props) => {
    // console.log('feminefa', 'state', JSON.stringify(state))
    return {
        loading: state.patientReducer.loading,
        data: state.patientReducer.data,
        patients: state.patientReducer.patients,
        providers: state.patientReducer.providers,
        admins: state.patientReducer.admins,
        patientCount: state.patientReducer.patientCount,
        providerCount: state.patientReducer.providerCount,
        scoreCount:  state.patientReducer.scoreCount,
        adminCount: state.patientReducer.adminCount,
        _user: state.authReducer.user,
        showModal: state.patientReducer.showPasswordModal,
    }
}

//export default
const Content= connect(mapStateToProps, dashboardActions)(DashboardComponent)
export default  class Container extends Component {
    constructor(props){
        super(props);
        const { navigate } = this.props.navigation;
        // console.debug('feminefa', 'jsdkhsdkskjdhksdsds')
        //guest(navigate)

    }
    static navigationOptions = ({navigation}) => {
        return {
            headerLeft: (
                <View/>
            ),
            title: 'Dashboard',

            headerTintColor: "#fff",
            headerStyle: {
                backgroundColor: '#daa520',
                height: 56,
                elevation: null
            }
        };
    };

    render() {
        const { navigate} = this.props.navigation;
        //console.debug('feminefa', 'navigation container', JSON.stringify(this.props.navigation))
        // console.debug('feminefa', 'my storesssssssssss', store)
         const user = isAuthenticated(navigate)
        // navigation.navigate('Login')
        return (
            <Provider store={store} navigation={this.props.navigation}>
                <Content  navigation={this.props.navigation} />
            </Provider>
        );
    }
}