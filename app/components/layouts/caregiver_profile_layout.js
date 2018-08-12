import React, { Component } from 'react';
import { AppRegistry, SectionList, StyleSheet, Image, Text, ScrollView, View, Button, TouchableHighlight, TextInput } from 'react-native';
import Cell from "../partials/profile/Cell";
const config = require('../../configs/app')
const User = require('../../models/User')
const Address = require ('../../models/Address')


const styles = require('./../styles/common')
const screenStyle= require('./../styles/profile_style')



export default class LoginContainer extends Component {

    render() {
        const { navigate } = this.props.navigation;
        return <ScrollView style={screenStyle.scrollView} >

            <View style={ screenStyle.container } >

                <View style={ screenStyle.top }>
                    <View style={ { flex: 1, flexDirection:"column"} }>
                        <Image style={ { margin: 8, width: 200, height: 200}} source={require('../../assets/img/avatar.jpeg')} />
                    </View>
                    <View style={ screenStyle.topSubsection }>
                        <Text style={ screenStyle.name }>
                            Jane Caregiver
                        </Text>
                        <Text>
                            Female
                        </Text>
                        <Text >
                            34 years
                        </Text>
                        <Text style={ screenStyle.name }>
                           Relationship with patient
                        </Text>
                        <Text>
                           Daughter
                        </Text>
                        <Text style={ screenStyle.name }>
                            Residence
                        </Text>
                        <Text>
                            1 Hospital Dr
                        </Text>
                        <Text>
                            Columbia MO 6302
                        </Text>
                    </View>
                </View>
                <View style={ screenStyle.middle }>
                    <View style={ screenStyle.middleTitle }>
                        <Text style={ screenStyle.middleText }>
                            ESAS- Psychosocial Items
                        </Text>
                        <Text  style={ screenStyle.middleText }>
                           Score for Ms Jane Caregiver ( Date: 02/05/2018 )
                        </Text>
                    </View>
                </View>
                <View style={ screenStyle.bottom }>
                    <View style={ screenStyle.bottomRow }>

                        <Cell score= { 5 } label="Wellbeing" />
                    </View>
                    <View style={ screenStyle.bottomRow }>

                        <Cell score= { 7 } label="Depression" />
                    </View>

                    <View style={ screenStyle.bottomRow }>
                        <Cell score={ 4 } label="Anxiety" />

                    </View>
                </View>





            </View>

        </ScrollView>

    }
}




