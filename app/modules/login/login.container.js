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
import { connect } from 'react-redux';
import  LoginComponent from './login.component';
import store from "../../stores/store";
import {mapDispatchToProps} from './login.actions';
//import {isAuthenticated} from './../../middlewares/auth'
import {isGuest as guest} from '../../services/auth';
import {
    navigate,
} from 'react-navigation';
import {authReducer} from "../../stores/auth";

const mapStateToProps = (state, props) => ({

    data: state.authReducer.data,
    _user: state.authReducer.user,
    error: state.authReducer.error
})
const Content= connect(mapStateToProps, mapDispatchToProps)(LoginComponent)

export default  class Container extends Component {
    static navigationOptions = ({navigation}) => {
        return {
            title: "Log In",
            headerStyle: {display:"none"},
            headerLeft: null
        }
    }
    constructor(props){
        super(props);
        const { navigate } = this.props.navigation;
        // console.debug('feminefa', 'jsdkhsdkskjdhksdsds')
        guest(navigate)

    }
    render() {
        let data = Object.assign({}, store)
       // delete data.navigation;
        //console.debug('feminefa', 'the store', JSON.stringify(store))
        return (
            <Provider navigation={this.props.navigation}  store={store}>
                <Content  navigation={this.props.navigation}  />
            </Provider>
        );
    }
}