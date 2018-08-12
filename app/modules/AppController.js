import React, { Component } from 'react';
import { AppRegistry, SectionList, StyleSheet, Text, View } from 'react-native';
const User = require('../models/User')
const Address = require ('../models/Address')
//const Landing= require('./app/views/layouts/landing_layout');
import Landing from '../components/layouts/landing_layout'

var Fabric = require('react-native-fabric');

var { Crashlytics } = Fabric;


export default class Start extends Component {
    static navigationOptions = {
        title: 'Welcome',
    };
    register(e) {

        throw new Error("adfaf");
        /*Crashlytics.setUserName('feminefa');

        Crashlytics.setUserEmail('feminefa@gmail.com');

        Crashlytics.setUserIdentifier('1234yuyubnb');

        Crashlytics.setString('organization', 'Acme. Corp');
*/
// Forces a native crash for testing
        Crashlytics.crash();

    }
    render() {
        const { navigate } = this.props.navigation;
        client = new User();
        client.first_name='Femi';
        client.id='1';
        let address=new Address();
        address.street='lakd alkdasd';
        client.address=address;
        return (
            Landing( { client: client, register: this.register })
        );
    }
}



// skip this line if using Create React Native App
AppRegistry.registerComponent('AwesomeProject', () => Start);
