import React, { Component } from 'react';
import { Modal, AppRegistry, DatePickerIOS, SectionList, StyleSheet, Image, Text, ScrollView, View, Button, TouchableHighlight, TextInput } from 'react-native';
import { Slider } from 'react-native-elements'
import Cell from "../../../components/partials/profile/Cell";
import { Icon } from 'react-native-elements'
const config = require('../../../configs/app')
const User = require('../../../models/User')
const Address = require ('../../../models/Address')
import SCORE_TYPES from '../../../models/ScoreTypes'
import {ROLE} from "../../../models/Role";
import { LineChart, Grid, YAxis, XAxis } from 'react-native-svg-charts';
import * as shape from 'd3-shape';
import {isAuthenticated} from "../../../services/auth";
import {navigate} from "react-navigation";


const styles = require('../../../components/styles/common')
const screenStyle= require('../../../components/styles/profile_style')



export default class LoginContainer extends Component {
    constructor(props) {
        super(props);
        const { navigate } = this.props.navigation;

        this.state = {
            fromDate: this.props.navigation.state.params && this.props.navigation.state.params.fromDate?this.props.navigation.state.params.fromDate:new Date().toLocaleDateString(),
            toDate: this.props.navigation.state.params && this.props.navigation.state.params.fromDate?this.props.navigation.state.params.fromDate:new Date().toLocaleDateString(),
            user: this.props.navigation.state.params?this.props.navigation.state.params.user:{},
            showModal: false,
            activeScore: {},
            showDateModal: false,
            showChartModal: false,
            selectedDate: new Date().toLocaleDateString(),
            biodata: [[], [] ],
            chartScores: {},
            scoreCells: [[], [], []],
            chartLabel: '',
            _user: null,
        }
        this.clicked = this.clicked.bind(this)
        this.setSelectedDate = this.setSelectedDate.bind(this)
        this.resetDate = this.resetDate.bind(this)
        this.setDateAndClose = this.setDateAndClose.bind(this);
        this.headerItem = this.headerItem.bind(this)
        this.headerItems = this.headerItems.bind(this)
        this.scoreCells = this.scoreCells.bind(this)
        this.showChart = this.showChart.bind(this)
        this.renderCaregiverLegend = this.renderCaregiverLegend.bind(this)
    }



    componentWillUnmount() {
        this.props.clearStore(this.state.user)
    }
    async componentDidMount(){

        const { navigate } = this.props.navigation;

        await  isAuthenticated(navigate, (user)=>{
            this.setState({user: this.state.user.username?this.state.user:user, _user: user}, (state) => {
                this.props.getScores(this.state.user, this.state.fromDate, this.state.toDate);
                this.props.getChartScores(this.state.user, 'pain', this.state.fromDate);
            }, true)
        });

        this.setState({chartScores: this.props.chartScores[this.state.user.username]})
        let biodata = [];
        let scoreCells = [];


        switch (this.state.user.role) {
            case ROLE.PATIENT:
                biodata.push([
                    [this.state.user.full_name, this.state.user.sex=='M'?'Male':'Female', this.state.user.age + ' years old' ],
                    ['Diagnosis', this.state.user.diagnosis],
                    ['Primary Care Provider', this.state.user.provider]
                ]);
                biodata.push([
                    ['Hospice', this.state.user.hospice ],
                    ['Residence', this.state.user.address1, this.state.user.address2],
                    ['Caregiver', this.state.user.caregiver, `${this.state.user.caregiver.full_name} (${this.state.user.caregiver.username})`]
                ]);
                scoreCells.push(['pain', 'depression', 'wellbeing'])
                scoreCells.push(['nausea', 'anxiety', 'drowsiness'])
                scoreCells.push(['shortness_of_breath', 'tiredness', 'poor_appetite'])
                scoreCells.push(['', 'other', ''])

                break;
            case ROLE.CAREGIVER:
                biodata.push([   [this.state.user.full_name, this.state.user.sex=='M'?'Male':'Female', this.state.user.age + ' years old' ],]);
                biodata.push([

                    ['Relationship To Patient', this.state.user.relationship],
                    ['Residence', this.state.user.address1, this.state.user.address2],
                ]);

                scoreCells.push(['pain', 'depression', 'wellbeing'])
                scoreCells.push([])
                scoreCells.push([])
                scoreCells.push([])
                break;
            default:
                biodata= [[], [] ];
                    scoreCells= [[], [], []];
        }
        this.setState({biodata: biodata, scoreCells});

    }

    clicked(key, value) {
        if(isNaN(parseInt(value))) value = 0;
        this.setState({activeScore: {key, value, newValue: value}}, (state) => {
            this.setState({showModal: true})
        })
    }
    setModalVisibility(showModal) {
        this.setState({showModal})
    }
    saveScore() {
        this.props.saveScore(
            this.state.user,
            this.state.activeScore.key,
            this.state.activeScore.newValue,
            this.state.fromDate,
            this.state.toDate);
        this.setState({showModal: false})
    }
    setSelectedDate(fromDate: Date) {
        const selectedDate =fromDate.toLocaleDateString();
        this.setState({selectedDate})
    }
    setDateAndClose() {
        this.setState({fromDate: this.state.selectedDate, toDate: this.state.selectedDate}, (state)=> {
            this.setState({showDateModal: false});
            this.props.getScores(this.state.user, this.state.fromDate, this.state.toDate);
        });

    }
    resetDate() {
        this.setState({selectedDate: new Date().toLocaleDateString()}, (state) => {
            this.setDateAndClose();
        })
    }

    headerItem(array) {
        const { navigate } = this.props.navigation;
        const _self = this;
        if (array[0].toLowerCase() == 'caregiver') {
            const caregiver=array[1];

            return array.map((obj, index) => {
                if (obj instanceof Object) return <View/>;
                const viewCaregiver =  this.state._user.role != ROLE.ADMIN?()=>{}:()=>{
                    // console.log('feminefa', 'fromDate', this.state.selectedDate)
                    return navigate('Profile',{ title: "Profile", user: caregiver, fromDate: this.state.selectedDate });
                };
                return (
                    <TouchableHighlight onPress={index<2?()=>{false}:()=>viewCaregiver()}>
                        <Text style={ {...(index==0?screenStyle.name:{}), color:this.state._user.role != ROLE.ADMIN || index<2?'default':'blue'} }>
                        {obj}
                    </Text>
                </TouchableHighlight>)
            });
        }
            return array.map((obj, index) => {
                return (<Text style={ index==0?screenStyle.name:{} }>
                    {obj}
                </Text>)
            });
    }
    headerItems (array) {
       return array.map((obj) => {
           return this.headerItem(obj)
       })
    }
    scoreCells (array) {
        if(!array) return <View/>;
        return array.map((obj, index) => {
            if (!obj || obj == '') return <View/>;
            return (<Cell  user={this.state.user} showChart={()=>this.showChart(obj)}  clicked={(key, score)=>this.clicked(key, score)} scoreType={obj} />)
        });
    }
    showChart(key) {
        this.props.getChartScores(this.state.user, key, this.state.fromDate);

        this.setState({showChartModal: true, chartLabel: SCORE_TYPES[key]})
    }
    renderCaregiverLegend() {
        const user = this.state.user?this.state.user:{}
        if (user.role === ROLE.CAREGIVER) {
            return (
                <View>
                    <Text style={screenStyle.footerText}>
                        Score relative to patient/caregiver defined threshold.
                    </Text>
                    <View style={{flexDirection: 'row', height: 100,}}>
                        <View style={{
                            ...screenStyle.scoreCellsLegend,
                            borderWidth: 1,
                            backgroundColor: '#72491c',
                            borderColor: '#72491c'
                        }}>
                            <Text style={{...screenStyle.scoreCellsLegendText, color: '#ffffff'}}>
                                Above threshold
                            </Text>
                        </View>
                        <View style={{
                            ...screenStyle.scoreCellsLegend,
                            borderWidth: 1,
                            backgroundColor: '#dfa921',
                            borderColor: '#dfa921'
                        }}>
                            <Text style={screenStyle.scoreCellsLegendText}>
                                At threshold
                            </Text>
                        </View>
                        <View style={{
                            ...screenStyle.scoreCellsLegend,
                            borderWidth: 1,
                            backgroundColor: '#ffffff',
                            borderColor: '#ffeaae'
                        }}>
                            <Text style={screenStyle.scoreCellsLegendText}>
                                Below threshold
                            </Text>
                        </View>
                    </View>
                </View>

            )
        }
    }
  render() {
        const user = this.state.user?this.state.user:{};
        const chartScores = this.props.chartScores[user.username] || {values:[], dates:[]};
        // console.log('feminefa', 'chart scores', JSON.stringify(chartScores))

        return <View><ScrollView style={screenStyle.scrollView} >

            <View style={ screenStyle.container } >

                <View style={ screenStyle.top }>

                    <View style={ { flex: 1, flexDirection:"column"} }>
                        <Image style={ { margin: 8, width: '90%',}} source={require('../../../assets/img/avatar.png')} />
                    </View>
                    <View style={ screenStyle.topSubsection }>

                        {this.headerItems(this.state.biodata[0])}

                    </View>
                    <View style={ screenStyle.topSubsection }>
                        {this.headerItems(this.state.biodata[1])}
                    </View>
                </View>
                <View style={ screenStyle.middle }>
                    <View style={ screenStyle.middleTitle }>
                        <Text style={ screenStyle.middleText }>
                            Edmonton Symptom Assessment Scale - Revised (ESAS-r)
                        </Text>
                        <View style={{flex:1, flexDirection: 'row', marginTop:10}}>
                            <Text  style={ {...screenStyle.middleText, fontWeight: 'normal', paddingRight:30, paddingLeft:30, height: 30, borderWidth:1,flexDirection: 'column',
                                justifyContent: 'center',
                                alignItems: 'center', borderColor: '#cccccc', backgroundColor: '#ffffff', padding: 5 } }>
                                Date: {this.state.fromDate==this.state.toDate?this.state.fromDate:`${this.state.fromDate - this.state.toDate}`}
                            </Text>
                            <TouchableHighlight onPress={ ()=>{ this.setState({showDateModal: true})}} title={"Change"} style={{...screenStyle.button, height: 30}}>
                                <Text style={ screenStyle.buttonText }>CHANGE</Text>
                            </TouchableHighlight>
                        </View>
                    </View>
                </View>
                <View style={ screenStyle.bottom }>
                    <View style={ screenStyle.bottomRow }>
                        {this.scoreCells(this.state.scoreCells[0])}
                    </View>
                    <View style={ screenStyle.bottomRow }>
                        {this.scoreCells(this.state.scoreCells[1])}
                    </View>
                    <View style={ screenStyle.bottomRow }>
                        {this.scoreCells(this.state.scoreCells[2])}
                    </View>
                    <View style={ screenStyle.bottomRow }>
                        {this.scoreCells(this.state.scoreCells[3])}

                    </View>
                </View>
                <View style={ screenStyle.footer }>

                    {this.renderCaregiverLegend()}
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
            <Modal animationType="slide"
                   transparent={true}
                   visible={this.state.showModal}
                   style={screenStyle.bottomModal}>
                <View style={screenStyle.dialogBackground}  onPress={() => {
                    this.setModalVisibility(false);
                }} >
                    <View style={screenStyle.scoreDialog}>
                        <View style={screenStyle.datePickerControls} >
                            <TouchableHighlight
                                style={{...screenStyle.todayButton,paddingRight:40, paddingLeft: 40}}
                                onPress={() => {
                                    this.setModalVisibility(false);
                                }}>
                                <Text style={{ fontSize: 14}}>CANCEL</Text>
                            </TouchableHighlight>
                            <View/>
                            <TouchableHighlight
                                style={{...screenStyle.todayButton,paddingRight:40, paddingLeft: 40}}
                                onPress={() => {
                                    this.saveScore();
                                }}>
                                <Text style={{ fontSize: 14, fontWeight: 'bold'}}>DONE</Text>
                            </TouchableHighlight>
                        </View>
                        <Text style={{marginBottom:10, marginTop: 10, fontSize: 15, textAlign: 'center'}}>How will you score the symptom </Text>

                        <Text style={{marginBottom:20, marginTop: 10, fontSize: 20, textAlign: 'center'}}>{SCORE_TYPES[this.state.activeScore.key]}</Text>


                        <View style={{ flex: 1, height:40,  flexDirection: 'row', justifyContent: 'center',  alignItems: 'center' }}>
                            <Text style={{textAlign: 'right',  marginTop:0,  width: 100}}>Absent</Text>
                            <Slider
                                style={{width: 300, margin: 10}}
                                value={this.state.activeScore.value}
                                maximumValue = {10}
                                minimumValue = {0}
                                step = {1}
                                trackStyle={{backgroundColor: '#cccccc'}}
                                onValueChange={(value) => this.setState({activeScore: {...this.state.activeScore, newValue: value}})}
                            />

                            <Text style={{textAlign: 'left',  marginTop:0,   width: 100}}>Worst Possible</Text>
                        </View>
                        <Text style={{marginBottom: 0, marginTop: 10, fontSize: 16, fontWeight: 'bold', textAlign: 'center'}}>Score: {this.state.activeScore.newValue}</Text>

                        <View style={{height:100}}>
                        </View>
                    </View>
                </View>
            </Modal>
            <Modal animationType="slide"
                   transparent={true}
                   visible={this.state.showDateModal}
                   style={screenStyle.dateModal}>
                <View style={screenStyle.dialogBackground}  onPress={() => {
                    this.setState({showDateModal: false, selectedDate: this.state.fromDate})
                }} >
            <View style={screenStyle.datePickerContainer}>
                <View style={screenStyle.datePickerControls} >
                <TouchableHighlight
                    style={{...screenStyle.todayButton,paddingRight:40, paddingLeft: 40}}
                    onPress={() => {
                        this.setState({showDateModal: false, selectedDate: this.state.fromDate})
                    }}>
                    <Text style={{ fontSize: 14}}>CANCEL</Text>
                </TouchableHighlight>
                    <View/>
                <TouchableHighlight
                    style={{...screenStyle.todayButton,paddingRight:40, paddingLeft: 40}}
                    onPress={() => {
                        this.setDateAndClose();
                    }}>
                    <Text style={{ fontSize: 14, fontWeight: 'bold'}}>DONE</Text>
                </TouchableHighlight>
            </View>
                <DatePickerIOS
                    mode={'date'}
                    maximumDate={new Date()}
                    date={new Date(this.state.selectedDate)}
                    onDateChange={this.setSelectedDate}
                />
                <TouchableHighlight
                    style={screenStyle.todayButton}
                    onPress={() => {
                        this.resetDate();
                    }}>
                    <Text style={{ fontSize: 13}}>Reset to Today</Text>
                </TouchableHighlight>
            </View>
                </View>
            </Modal>
            <Modal animationType="slide"
                   transparent={true}
                   visible={this.state.showChartModal}
                   style={screenStyle.dateModal}>
                <View style={screenStyle.dialogBackground} onPress={() => {
                    this.setState({showChartModal: false})
                }} >
                    <View style={screenStyle.chartContainer}>
                        <View style={screenStyle.datePickerControls} >
                            <TouchableHighlight
                                style={{...screenStyle.todayButton, flex:1}}
                            >
                                <Text style={{ fontSize: 13,  fontWeight: 'bold'}}></Text>
                            </TouchableHighlight>
                            <TouchableHighlight
                                style={{...screenStyle.todayButton, flex:5}}
                            >
                                <Text style={{ fontSize: 13,  fontWeight: 'bold', textAlign:'left'}}>{chartScores.values.length} Days {this.state.chartLabel} Symptom Scores</Text>
                            </TouchableHighlight>
                            <TouchableHighlight
                                style={{...screenStyle.todayButton,flex: 1, paddingRight:40, paddingLeft: 40}}
                                onPress={() => {
                                    this.setState({showChartModal: false})
                                }}>
                                <Text style={{ fontSize: 14}}>DONE</Text>
                            </TouchableHighlight>
                            <View/>

                        </View>
                        <View
                            style={{height:400, justifyContent: 'center'}}

                        >
                            <View style={{ marginTop:50,  paddingLeft:20, paddingRight:20, justifyContent:'center', flex:1, flexDirection: 'row' }}>
                                <YAxis
                                    data={ chartScores.values }
                                    contentInset={ { top: 10, bottom: 10 } }
                                    svg={{
                                        fill: 'grey',
                                        fontSize: 10,
                                    }}
                                    numberOfTicks={ chartScores.values.length-1 }
                                    formatLabel={ value => `${value}` }
                                    style={{width:30,  height:350,}}
                                />
                                <LineChart
                                    style={{ height:350, width:600,  marginRight:10, marginLeft: 10 }}
                                    data={ chartScores.values }
                                    svg={{ stroke: 'rgb(134, 65, 244)' }}
                                    contentInset={{ top: 10, bottom: 10 }}
                                >
                                    <Grid/>
                                </LineChart>
                            </View>



                        </View>
                        <View
                            style={{height:50, justifyContent:'center'}}

                        >
                            <XAxis
                                data={ chartScores.dates }
                                contentInset={{ left: 95, right: 70 }}
                                xScale={'scaleLinear'}
                                numberOfTicks={ chartScores.dates.length-1 }
                                svg={{ fontSize: 10, fill: 'black' }}
                                formatLabel={ value => `${chartScores.dates[value]}` }
                            />


                        </View>
                        <TouchableHighlight
                            style={screenStyle.todayButton}
                            >
                            <Text style={{ fontSize: 13,  fontWeight: 'bold'}}></Text>
                        </TouchableHighlight>
                    </View>
                </View>
            </Modal>

        </View>

    }
}
//{ <Icon name="error" iconSize={ 20 }  /> }



