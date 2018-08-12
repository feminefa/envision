import React, { Component } from 'react';
import { AppRegistry, SectionList, StyleSheet, Text, ScrollView, View, Button, TouchableHighlight, TextInput } from 'react-native';
import {isAuthenticated} from "../../services/auth";
import {PATIENT_STATES} from "../../stores/patient";
import {NavigationActions} from "react-navigation";
import {AUTH_STATES} from "../../stores/auth";
import {ROLE} from "../../models/Role";
const config = require('../../configs/app')
const User = require('../../models/User')
const Address = require ('../../models/Address')


const styles = require('../../components/styles/common')
const dashboardStyles= require('../../components/styles/dashboard_style')



export class DashboardComponent extends Component {
    state = {
        _user: {},
        isLoading: true
    }
    constructor(props){
        super(props);
        this.state = {_user: {}};
        this.count = this.count.bind(this);


    }
    componentDidUpdate() {
        // this.count();
        //console.debug('feminefa', 'updated component', JSON.stringify(this.props.action))
        if (this.props.action) {


            if (this.props.action.type === AUTH_STATES.LOGOUT) {
                console.log('feminefa', 'logout', JSON.stringify(obj));
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
    count() {
        const _self=this;
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

    render() {
        const { navigate } = this.props.navigation;
        //const { navigation } = this.props;
       // const user = this.props.user; //navigation.getParam('user', {}) ;
       console.log('feminefa', 'the user', JSON.stringify(this.props._user))
        const hide = false;
        return <ScrollView style={{backgroundColor:"#ffffff"}}>

            <View style={dashboardStyles.container}>
                <View style={{ margin:30}}>
                    <Text style={dashboardStyles.welcome}>
                        Welcome {this.state._user.first_name}!
                    </Text>
                </View>
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
                                { this.props.patientCount } Records
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
                            <TouchableHighlight onPress={ this.props.decrement } title={"Login"} style={dashboardStyles.actionButton}>
                                <Text style={dashboardStyles.actionButtonText}>DOWNLOAD</Text>
                            </TouchableHighlight>
                        </View>

                    </View>


                    <View style={ dashboardStyles.section }>
                        <View style={ dashboardStyles.sectionTitle }>
                            <Text style={ dashboardStyles.sectionTitleText }>
                                Admins
                            </Text>

                        </View>
                        <View style={ dashboardStyles.sectionContent }>
                            <Text style={ dashboardStyles.sectionContentText }>
                                { this.props.adminCount } Records
                            </Text>
                            <TouchableHighlight disabled={!this.props.adminCount || this.props.adminCount  == 0}  onPress={ () =>
                                navigate('Browse', { type: ROLE.ADMIN,   title: 'Browse Admins' })
                            } title={"Login"} style={dashboardStyles.actionButton}>
                                <Text style={dashboardStyles.actionButtonText}>BROWSE</Text>
                            </TouchableHighlight>
                            <TouchableHighlight onPress={ () =>
                                navigate('AddAdmin', { type: 'provider' })
                            } title={"Add Patient"} style={dashboardStyles.actionButton}>
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




