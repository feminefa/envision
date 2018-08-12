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
import  Layout from './add.patient.component';
import { AsyncStorage } from 'react-native';
import store from "../../../stores/store";
import {
    navigate,
} from 'react-navigation';

import { addNavigationHelpers } from 'react-navigation';
import {patientActions} from './../patient.actions';
// const mapStateToProps = (state) => ({ ...state.dashboardReducer, count: 0})
const mapStateToProps = (state, props) => {
    return {
        loading: state.patientReducer.loading,
        data: state.patientReducer.data,
        count: state.patientReducer.patientCount,
        error: state.patientReducer.error,
        saved: state.patientReducer.saved,
        action:  state.patientReducer.action,
        providers: state.patientReducer.providers,
       // navigation: state.patientReducer.navigation,
    }
}

//export default
const Content= connect(mapStateToProps, patientActions)(Layout)

export default  class Container extends Component {
    static navigationOptions = ({navigation}) => {
        return {
            title: (navigation.state.params.title?navigation.state.params.title:"Add Patient")
        }
    }

    render() {
        const { navigate } = this.props.navigation;

        return (
            <Provider navigation={this.props.navigation}  store={store}>
                <Content  navigation = {this.props.navigation}   />
            </Provider>
        );
    }
}