import React, { Component } from 'react';
import { AppRegistry, SectionList, StyleSheet, Text, View, Button, TouchableHighlight } from 'react-native';
const User = require('../../models/User')
const Address = require ('../../models/Address')


const styles = require('./../styles/common')



export default class Counter extends Component {

    render() {
        const { navigate } = this.props.navigation;
        return <View style={styles.container}>
            <View style={{flex: 1}}>
                <Text

                    onPress={this.props.reset}>
                    {this.props.count}
                </Text>
            </View>
            <View style={styles.landingButtonsSection}>

                <View style={{flex: 1, flexDirection: "row"}}>
                    <TouchableHighlight onPress={() =>
                        navigate('Dashboard', { username: 'Admin' })
                    } title={"Register"} style={styles.landingButton}>
                        <Text style={styles.landingButtonText}>Register</Text>
                    </TouchableHighlight>
                    <View style={{width: 1, backgroundColor: "#ffffff00"}}/>
                    <TouchableHighlight onPress={ this.props.decrement } title={"Login"} style={styles.landingButton}>
                        <Text style={styles.landingButtonText}>Login</Text>
                    </TouchableHighlight>
                </View>
            </View>

        </View>

    }
}




