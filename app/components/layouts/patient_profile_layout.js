import React, { Component } from 'react';
import { AppRegistry, SectionList, StyleSheet, Image, Text, ScrollView, View, Button, TouchableHighlight, TextInput } from 'react-native';
import Cell from "../partials/profile/Cell";
import { Icon } from 'react-native-elements'
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
                            Joe Patient1
                        </Text>
                        <Text>
                            Male
                        </Text>
                        <Text >
                            81 years
                        </Text>
                        <Text style={ screenStyle.name }>
                           Diagnosis
                        </Text>
                        <Text>
                           Non-Hodgkins Lymphoma
                        </Text>
                        <Text style={ screenStyle.name }>
                            Primary care provider
                        </Text>
                        <Text>
                           Emdee DR, MD MPH
                        </Text>
                    </View>
                    <View style={ screenStyle.topSubsection }>
                        <Text style={ screenStyle.name }>
                            Hospice
                        </Text>
                        <Text>
                            05/12/1292
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
                            Edmonton Symptom Assessment Scale - Revised (ESAS-r)
                        </Text>
                        <Text  style={ screenStyle.middleText }>
                            Date: 02/05/2018
                        </Text>
                    </View>
                </View>
                <View style={ screenStyle.bottom }>
                    <View style={ screenStyle.bottomRow }>
                        <Cell score= { 7 } label="Pain" />
                        <Cell score={ 4 } label="Depression" />
                        <Cell score= { 5 } label="Wellbeing" />
                    </View>
                    <View style={ screenStyle.bottomRow }>
                        <Cell score= { 3 } label="Nausea" />
                        <Cell score={ 4 } label="Anxiety" />
                        <Cell score= { 7 } label="Drowsiness" />
                    </View>
                    <View style={ screenStyle.bottomRow }>
                        <Cell score= { 1 } label="Shortness of breath" />
                        <Cell score={ 2 } label="Tiredness" />
                        <Cell score= { 5 } label="Lack of appetite" />
                    </View>
                    <View style={ screenStyle.bottomRow }>
                        <Cell score= { 7 } label="Other: Constipation" />

                    </View>
                </View>
                <View style={ screenStyle.footer }>
                    <Text style={ screenStyle.footerText }>
Symptom severity is scored from 0 (symptom absent) to 10 (symptom severity is the worst possible).
                    </Text>
                    <Text style={ screenStyle.footerText }>
                        Click the   symbol next to symptoms to display a graph to the patient or caregiver's symptom severity over time.
                    </Text>

                    <Text style={ screenStyle.copyright }>
                        &copy; 2016 Hospice Caregiving Research Network
                    </Text>
                </View>





            </View>

        </ScrollView>

    }
}
//{ <Icon name="error" iconSize={ 20 }  /> }



