import React, { Component } from 'react';
import { Modal, AppRegistry, SectionList, StyleSheet, Text, ScrollView, View, Button, TouchableHighlight, TextInput } from 'react-native';
import {isAuthenticated} from "../../services/auth";
import {PATIENT_STATES} from "../../stores/patient";
import {NavigationActions} from "react-navigation";
import {AUTH_STATES} from "../../stores/auth";
import {ROLE} from "../../models/Role";
import SCORE_TYPES from "../../models/ScoreTypes";
const config = require('../../configs/app')
const User = require('../../models/User')
const Address = require ('../../models/Address')


const styles = require('../../components/styles/common')
const dashboardStyles= require('../../components/styles/dashboard_style')
const screenStyle = require('../../components/styles/profile_style')



export class DashboardComponent extends Component {
    state = {
        _user: {},
        isLoading: true
    }
    constructor(props){
        super(props);
        this.state = {
            _user: {},
            showModal: false,
            currentPassword: '',
            newPassword: '',
            newPassword2: ''
        };
        this.count = this.count.bind(this);
        this.setModalVisibility = this.setModalVisibility.bind(this)
        this.savePassword = this.savePassword.bind(this);
        this.onTextChange = this.onTextChange.bind(this)

    }
    componentDidUpdate() {
        // this.count();
        //console.debug('feminefa', 'updated component', JSON.stringify(this.props.action))
        if (this.props.action) {


            if (this.props.action.type === AUTH_STATES.LOGOUT) {
                // console.log('feminefa', 'logout', JSON.stringify(obj));
                ((screen) => {
                    const resetAction = NavigationActions.reset({
                        index: 0,
                        actions: [
                            NavigationActions.navigate({routeName: screen})
                        ]
                    });
                    this.props.navigation.dispatch(resetAction);
                })('Login')
                // this.props.navigation.navigate('Dashboard')
            }
        }



    }
    async componentDidMount(){

        this.count();
        const { navigate } = this.props.navigation;
        this.props.getNavigation(this.props.navigation);
        const user = await isAuthenticated(navigate, (user, err) => {
            // console.debug('feminefa', 'authenticated guy', JSON.stringify(user))
            //dispatch(actions.nodeClicked(data))
            //his.user= user;
            this.setState({_user: user})
            // this.props.user = user;
        });
    }
    setModalVisibility(showModal=true) {

        this.props.changePassword(showModal)

    }
    count() {
         this.props.getCounts();
    }
    MyView (props)  {
        const { children, hide, style } = props;
        if (hide) {
            return null;
        }
        return (
            <View {...this.props} style={style}>
                { children }
            </View>
        );
    };

    savePassword() {
        if(!(this.state.newPassword.length > 5 && this.state.currentPassword !='' && this.state.newPassword!='' && this.state.newPassword2 !='' && this.state.newPassword==this.state.newPassword2)) {
            return;
        }
        if(this.state.newPassword != this.state.newPassword2) {
            alert('Error!!!\nNew password entries do not match');
            return;
        }
        this.props.updatePassword(this.state._user, this.state.currentPassword, this.state.newPassword);
    }
    onTextChange(text) {
        this.setState(text)
    }
    render() {
        const { navigate } = this.props.navigation;
        //const { navigation } = this.props;
       // const user = this.props.user; //navigation.getParam('user', {}) ;
       // console.log('feminefa', 'the user', JSON.stringify(this.props._user))
        const hide = false;
        return <View>
            <ScrollView style={{backgroundColor:"#ffffff"}}>

            <View style={dashboardStyles.container}>
                <View style={{ margin:30}}>
                    <Text style={dashboardStyles.welcome}>
                        Welcome {this.state._user.first_name}!
                    </Text>

                </View>
                <TouchableHighlight    onPress={ () =>
                    this.setModalVisibility(true)
                }  style={{height: 30, padding: 4, paddingLeft:10, paddingRight:10, borderRadius: 15, borderWidth:1, borderColor: 'blue'}}>
                    <Text style={{color: 'blue'}}>Change Password</Text>
                </TouchableHighlight>
                <View style={ styles.largeHSeparator }/>
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
                                { this.props.patientCount + ' '+ (this.props.patientCount>1?'Records':'Record') }
                            </Text>
                            <TouchableHighlight disabled={!this.props.patientCount || this.props.patientCount == 0}  onPress={ () =>
                                navigate('Browse', { type: ROLE.PATIENT,  title: 'Browse Patients' })
                            } title={"Login"} style={dashboardStyles.actionButton}>
                                <Text style={dashboardStyles.actionButtonText}>BROWSE</Text>
                            </TouchableHighlight>
                            <TouchableHighlight onPress={ () =>
                                navigate('AddPatient', { type: 'patient' })
                            } title={"Add Patient"} style={dashboardStyles.actionButton}>
                                <Text style={dashboardStyles.actionButtonText}>ADD</Text>
                            </TouchableHighlight>
                            <TouchableHighlight onPress={ ()=>this.props.download('patient') } title={"Login"} style={dashboardStyles.actionButton}>
                                <Text style={dashboardStyles.actionButtonText}>DOWNLOAD</Text>
                            </TouchableHighlight>
                        </View>

                    </View>


                    <View style={ dashboardStyles.section }>
                        <View style={ dashboardStyles.sectionTitle }>
                            <Text style={ dashboardStyles.sectionTitleText }>
                                Scores
                            </Text>

                        </View>
                        <View style={ dashboardStyles.sectionContent }>
                            <Text style={ dashboardStyles.sectionContentText }>
                                { this.props.scoreCount  + ' '+ (this.props.scoreCount>1?'Records':'Record') },
                            </Text>
                            <TouchableHighlight disabled={!this.props.scoreCount || this.props.scoreCount  == 0}   title={"Login"} style={{...dashboardStyles.actionButton, backgroundColor:'#ffffff'}}>
                                <Text style={dashboardStyles.actionButtonText}></Text>
                            </TouchableHighlight>
                            <TouchableHighlight title={"Add Patient"} style={{...dashboardStyles.actionButton, backgroundColor:'#ffffff'}}>
                                <Text style={dashboardStyles.actionButtonText}></Text>
                            </TouchableHighlight>
                            <TouchableHighlight  onPress={ ()=>this.props.download('scores') } title={"Scores"} style={dashboardStyles.actionButton}>
                                <Text style={dashboardStyles.actionButtonText}>DOWNLOAD</Text>
                            </TouchableHighlight>
                        </View>

                    </View>
                </View>





             </View>

        </ScrollView>
            <Modal animationType="slide"
                transparent={true}
                visible={this.props.showModal == true}
                   onDismiss={() => {
                       this.setState({
                           currentPassword: '',
                           newPassword: '',
                           newPassword2: ''
                       })
                   }}
                style={screenStyle.bottomModal}>
            <View style={screenStyle.dialogBackground }  onPress={() => {
                this.setModalVisibility(false);
            }}>
            <View style={screenStyle.scoreDialog}>
            <View style={screenStyle.datePickerControls} >
                    <TouchableHighlight
                        style={{...screenStyle.todayButton,paddingRight:40, paddingLeft: 40}}
                        onPress={() => {
                            this.setModalVisibility(false);
                        }}>
                    <Text style={{ fontSize: 14}}>Cancel</Text>
                    </TouchableHighlight>

            </View>
                <View style={{height: 300, paddingRight:30, paddingLeft: 30}}>
                <Text style={{marginBottom:10, marginTop: 10, fontSize: 15, fontWeight:'bold', textAlign: 'center'}}>Complete Form to Update Your Password </Text>

                <TextInput value = {this.state.currentPassword}
                           onChangeText={(currentPassword) => this.onTextChange({currentPassword})}  secureTextEntry={ true }
                           placeholder="Current Password" style={screenStyle.input}/>
                <TextInput  value = {this.state.newPassword}
                            onChangeText={(newPassword) => this.onTextChange({newPassword})}   secureTextEntry={ true }
                            placeholder="New Password (6 characters or more)" style={screenStyle.input}/>
                <TextInput  value = {this.state.newPassword2}
                            onChangeText={(newPassword2) => this.onTextChange({newPassword2})}   secureTextEntry={ true }  placeholder="Enter New Password Again" style={screenStyle.input}/>

                <TouchableHighlight

                    style={{...screenStyle.todayButton,paddingRight:40, paddingLeft: 40}}
                    onPress={() => {
                        this.savePassword();
                    }}>
                    <Text style={{ fontSize: 14}}>SAVE</Text>
                </TouchableHighlight>
                </View>
            </View>
            </View>
            </Modal>
        </View>
    }
}
/*
<View style={ {...dashboardStyles.section, height: 0 }  }>
                        <View style={ dashboardStyles.sectionTitle }>
                            <Text style={ dashboardStyles.sectionTitleText }>
                                Caregiver
                            </Text>

                        </View>
                        <View style={ dashboardStyles.sectionContent }>
                            <Text style={ dashboardStyles.sectionContentText }>
                                28 Records
                            </Text>

                            <TouchableHighlight onPress={ () =>
                                navigate('Browse', { type: 'Caregivers' })
                            } title={"Login"} style={dashboardStyles.actionButton}>
                                <Text style={dashboardStyles.actionButtonText}>BROWSE</Text>
                            </TouchableHighlight>
                            <TouchableHighlight onPress={ () =>
                                navigate('AddCaregiver', { type: 'Caregivers' })
                            } title={"Add Caregiver"} style={dashboardStyles.actionButton}>
                                <Text style={dashboardStyles.actionButtonText}>ADD</Text>
                            </TouchableHighlight>
                            <TouchableHighlight onPress={ this.props.decrement } title={"Login"} style={dashboardStyles.actionButton}>
                                <Text style={dashboardStyles.actionButtonText}>DOWNLOAD</Text>
                            </TouchableHighlight>
                        </View>
                    </View>
 */




