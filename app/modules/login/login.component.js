import React, { Component } from 'react';
import { AppRegistry, SectionList, StyleSheet, Text, ScrollView, View, Button, TouchableHighlight, TextInput } from 'react-native';
const config = require('../../configs/app')
const User = require('../../models/User')
const Address = require ('../../models/Address')
const Data = require ('../../models/Data')
import {ROLE} from '../../models/Role';

const styles = require('../../components/styles/common')
const loginStyles= require('../../components/styles/login_style')
const sha256= require('sha256')
const uuidv4 = require('uuid/v4');
// import * as Actions from '../actions';

const Realm = require('realm');
// let passwordHash = require('password-hash');

let seed = false;

export default class LoginComponent extends Component {
    constructor(props){
        super(props);
        this.state = {
            isLoading: true,
            username: '',
            password: ''
        }
        this.login = this.login.bind(this)
       // this.hideError = this.hideError.bind(this);

    }

    componentDidMount(){
        this.props.hideError();
        // console.debug('feminefa', JSON.stringify(this.props))
            // this.props.login('feminefa', 'password');
    }

    login() {
       // console.debug('feminefa', this.state.username, this.state.password)
        const { navigate } = this.props.navigation;
        this.props.login(this.state.username.toLowerCase(), this.state.password, navigate);

        // console.debug('feminefa', 'data', JSON.stringify(this.props))
       // this.hideError('');
    }


    render() {

        const { navigate } = this.props.navigation;
       //  const _self = this;
        return             <View style={loginStyles.formSection}>
                <Text style={loginStyles.welcome}>
                    Welcome To
                </Text>
                <Text style={loginStyles.appName}>
                  { config.app_name }
                </Text>
            <View style={ styles.largeHSeparator }/>
            <View style={ styles.largeHSeparator }/>

            <Text style={Object.assign({}, styles.error, {opacity: this.props.error?100:0 , width:500, textAlign:'center'})} >
                {this.props.error}
            </Text>
                <TextInput
                    style={loginStyles.input}
                    placeholder="Username"
                    onChangeText={(text) => {
                        this.props.hideError()
                        this.setState({username: text})
                    }}
                    value = {this.state.username}
                />
                <View style={{width: 1, backgroundColor: "#ffffff00"}}/>
                <TextInput
                    style={loginStyles.input}
                    secureTextEntry={ true }
                    placeholder="Password"
                    onChangeText={(text) => {
                        this.props.hideError();
                        this.setState({password: text})
                    }}
                />
                <View style={ styles.mediumHSeparator }/>
            <View style={ styles.mediumHSeparator }/>
                <View style={ loginStyles.buttonSection }>
                    <TouchableHighlight disabled={this.state.username == '' && this.state.password == ''} onPress={ this.login  } title={"Register"} style={ loginStyles.button }>
                        <Text style={loginStyles.buttonText}>Login</Text>
                    </TouchableHighlight>
                    <View style={ styles.largeHSeparator }/>
                    <TouchableHighlight onPress={ this.props.register } title={"Forgot Password"} >
                        <Text style={loginStyles.forgotText}></Text>
                    </TouchableHighlight>
                    <View style={ styles.largeHSeparator }/>
                  <TouchableHighlight onPress={ this.props.register } title={"Register"} style={{display:"none"}} >
                        <Text style={loginStyles.forgotText}></Text>
                    </TouchableHighlight>
                </View>
            <View style={ styles.largeHSeparator }/>
            <View style={ styles.largeHSeparator }/>
            <Text>Copyright 2018. All rights reserved.</Text>

             </View>



    }
}




