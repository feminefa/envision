import React, { Component } from 'react';
import { AppRegistry, SectionList, StyleSheet, Text, ScrollView, View, Button, TouchableHighlight, TextInput } from 'react-native';
const config = require('../../configs/app')
const User = require('../../models/User')
const Address = require ('../../models/Address')


const styles = require('./../styles/common')
const screenStyle= require('./../styles/add_style')



export default class LoginContainer extends Component {

    render() {
        const { navigate } = this.props.navigation;
        return <ScrollView style={screenStyle.container} >

            <View style={ { padding: 20 }} >

                <View style={ styles.largeHSeparator }/>
                <Text style={ screenStyle.label }>
                    Caregiver Name:
                </Text>
                <TextInput
                    style={screenStyle.input}
                    placeholder="First and Last Name"
                    onChangeText={(text) => this.setState({text})}
                />
                <View style={ styles.mediumHSeparator }/>
                <Text style={ screenStyle.label }>
                    Age:
                </Text>
                <TextInput
                    style={screenStyle.input}
                    placeholder="Years"
                    onChangeText={(text) => this.setState({text})}
                />
                <View style={ styles.mediumHSeparator }/>
                <Text style={ screenStyle.label }>
                    Relationship with patient:
                </Text>
                <TextInput
                    style={screenStyle.input}
                    placeholder="List Diagnosis"
                    onChangeText={(text) => this.setState({text})}
                />
                <View style={ styles.mediumHSeparator }/>
                <Text style={ screenStyle.label }>
                    Caregiver ID:
                </Text>
                <TextInput
                    style={screenStyle.input}
                    placeholder=""
                    onChangeText={(text) => this.setState({text})}
                />
                <View style={ styles.mediumHSeparator }/>
                <Text style={ screenStyle.label }>
                    Password:
                </Text>
                <TextInput
                    style={screenStyle.input}
                    placeholder="No spaces"
                    secureTextEntry={ true }
                    onChangeText={(text) => this.setState({text})}
                />
                <View style={ styles.mediumHSeparator }/>

                <TouchableHighlight onPress={ this.props.decrement } title={"Login"} style={screenStyle.button}>
                    <Text style={ screenStyle.buttonText }>ADD PATIENT</Text>
                </TouchableHighlight>





            </View>

        </ScrollView>

    }
}




