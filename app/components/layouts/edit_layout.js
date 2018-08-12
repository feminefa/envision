import React, { Component } from 'react';
import { AppRegistry, SectionList, StyleSheet, Text, ScrollView, View, Button, TouchableHighlight, TextInput } from 'react-native';
const config = require('../../configs/app')
const User = require('../../models/User')
const Address = require ('../../models/Address')


const styles = require('./../styles/common')
const dashboardStyles= require('./../styles/dashboard_style')



export default class LoginContainer extends Component {

    render() {
        const { navigate } = this.props.navigation;
        return <ScrollView style={{backgroundColor:"#ffffff"}}>

            <View style={dashboardStyles.container}>

                <View style={ styles.largeHSeparator }/>
                <View style={ dashboardStyles.content }>
                    <View style={ dashboardStyles.section }>
                        <View style={ dashboardStyles.sectionTitle }>
                            <Text style={ dashboardStyles.sectionTitleText }>
                                Patients
                            </Text>

                        </View>
                        <View style={ dashboardStyles.sectionContent }>
                            <Text style={ dashboardStyles.sectionContentText }>
                                238 Records
                            </Text>
                            <TouchableHighlight  onPress={ () =>
                                navigate('Browse', { type: 'Patients' })
                            } title={"Login"} style={dashboardStyles.actionButton}>
                                <Text style={dashboardStyles.actionButtonText}>BROWSE</Text>
                            </TouchableHighlight>
                            <TouchableHighlight onPress={ this.props.decrement } title={"Login"} style={dashboardStyles.actionButton}>
                                <Text style={dashboardStyles.actionButtonText}>ADD</Text>
                            </TouchableHighlight>
                            <TouchableHighlight onPress={ this.props.decrement } title={"Login"} style={dashboardStyles.actionButton}>
                                <Text style={dashboardStyles.actionButtonText}>DOWNLOAD</Text>
                            </TouchableHighlight>
                        </View>
                    </View>

                </View>





            </View>

        </ScrollView>

    }
}




