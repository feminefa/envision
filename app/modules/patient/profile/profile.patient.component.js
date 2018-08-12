import React, { Component } from 'react';
import { AppRegistry, SectionList, StyleSheet, Image, Text, ScrollView, View, Button, TouchableHighlight, TextInput } from 'react-native';
import Cell from "../../../components/partials/profile/Cell";
import { Icon } from 'react-native-elements'
const config = require('../../../configs/app')
const User = require('../../../models/User')
const Address = require ('../../../models/Address')
import SCORE_TYPES from '../../../models/ScoreTypes'


const styles = require('../../../components/styles/common')
const screenStyle= require('../../../components/styles/profile_style')



export default class LoginContainer extends Component {
    constructor(props) {
        super(props);
        this.state = {
            fromDate: new Date().toLocaleDateString(),
            toDate: new Date().toLocaleDateString(),
            user:  this.props.navigation.state.params.user
        }
        this.clicked = this.clicked.bind(this)
    }

    componentDidMount(){
        this.props.getScores(this.state.fromDate, this.state.toDate);
    }
    clicked(type, score) {
        alert(`${type}: ${score}`)
    }
    render() {
        const { navigate } = this.props.navigation;
        return <ScrollView style={screenStyle.scrollView} >

            <View style={ screenStyle.container } >

                <View style={ screenStyle.top }>
                    <View style={ { flex: 1, flexDirection:"column"} }>
                        <Image style={ { margin: 8, width: 200, height: 200}} source={require('../../../assets/img/avatar.png')} />
                    </View>
                    <View style={ screenStyle.topSubsection }>
                        <Text style={ screenStyle.name }>
                            {this.state.user.full_name}
                        </Text>
                        <Text>
                            {this.state.user.sex}
                        </Text>
                        <Text >
                            { this.state.user.age } years
                        </Text>
                        <Text style={ screenStyle.name }>
                           Diagnosis
                        </Text>
                        <Text>
                            {this.state.user.diagnosis}
                        </Text>
                        <Text style={ screenStyle.name }>
                            Primary care provider
                        </Text>
                        <Text>
                            {this.state.user.provider}
                        </Text>
                    </View>
                    <View style={ screenStyle.topSubsection }>
                        <Text style={ screenStyle.name }>
                            Hospice
                        </Text>
                        <Text>
                            {this.state.user.hospice}
                        </Text>
                        <Text style={ screenStyle.name }>
                            Residence
                        </Text>
                        <Text>
                            {this.state.user.address1}
                        </Text>
                        <Text>
                            {this.state.user.address2}
                        </Text>
                        <Text style={ screenStyle.name }>
                            Caregiver
                        </Text>
                        <Text>
                            {this.state.user.caregiver.full_name} ({this.state.user.caregiver.username})
                        </Text>

                    </View>
                </View>
                <View style={ screenStyle.middle }>
                    <View style={ screenStyle.middleTitle }>
                        <Text style={ screenStyle.middleText }>
                            Edmonton Symptom Assessment Scale - Revised (ESAS-r)
                        </Text>
                        <View style={{flex:1, flexDirection: 'row', marginTop:10}}>
                            <Text  style={ {...screenStyle.middleText,  height: 30, borderWidth:1,flexDirection: 'column',
                                justifyContent: 'center',
                                alignItems: 'center', borderColor: '#cccccc', backgroundColor: '#ffffff', padding: 5 } }>
                                Date: {this.state.fromDate==this.state.toDate?this.state.fromDate:`${this.state.fromDate - this.state.toDate}`}
                            </Text>
                            <TouchableHighlight onPress={ ()=>{}} title={"Change"} style={{...screenStyle.button, height: 30}}>
                                <Text style={ screenStyle.buttonText }>CHANGE</Text>
                            </TouchableHighlight>
                        </View>
                    </View>
                </View>
                <View style={ screenStyle.bottom }>
                    <View style={ screenStyle.bottomRow }>
                        <Cell clicked={(type, score)=>this.clicked(type, score)} scoreType={'pain'} scores={ this.props.scores }  />
                        <Cell clicked={(type, score)=>this.clicked(type, score)} scoreType={'depression'} scores={ this.props.scores } />
                        <Cell clicked={(type, score)=>this.clicked(type, score)} scoreType='wellbeing' scores={ this.props.scores }  />
                    </View>
                    <View style={ screenStyle.bottomRow }>
                        <Cell clicked={(type, score)=>this.clicked(type, score)} scoreType='nausea' scores={ this.props.scores } />
                        <Cell clicked={(type, score)=>this.clicked(type, score)} scoreType='anxiety' scores={ this.props.scores } />
                        <Cell clicked={(type, score)=>this.clicked(type, score)} scoreType='drowsiness' scores={ this.props.scores }  />
                    </View>
                    <View style={ screenStyle.bottomRow }>
                        <Cell clicked={(type, score)=>this.clicked(type, score)}  scoreType = 'shortness_of_breath' scores={ this.props.scores }  />
                        <Cell clicked={(type, score)=>this.clicked(type, score)} scoreType = 'tiredness' scores={ this.props.scores }  />
                        <Cell clicked={(type, score)=>this.clicked(type, score)} scoreType = 'poor_appetite' scores={ this.props.scores }  />
                    </View>
                    <View style={ screenStyle.bottomRow }>
                        <Cell clicked={(type, score)=>this.clicked(type, score)}  scoreType={'poor_appetite'} scores={ this.props.scores }  />

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



