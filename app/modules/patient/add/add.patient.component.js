import React, { Component } from 'react';
import { AppRegistry, Picker, SectionList, StyleSheet, Text, ScrollView, View, Button, TouchableHighlight, TextInput } from 'react-native';
import {PATIENT_STATES} from "../../../stores/patient";
import {NavigationActions} from "react-navigation";
const config = require('../../../configs/app')
const User = require('../../../models/User')
const Address = require ('../../../models/Address')

import RNPickerSelect from 'react-native-picker-select';
import {AUTH_STATES} from "../../../stores/auth";
const styles = require('../../../components/styles/common')
const screenStyle= require('../../../components/styles/add_style')

const pickerSelectStyles = StyleSheet.create({
    inputIOS: {
        fontSize: 16,
        paddingTop: 5,
        paddingHorizontal: 10,
        paddingBottom: 5,
        borderRadius: 4,
        backgroundColor: 'white',
        color: 'black',
        borderWidth: 1,
        minWidth:300,
        margin:3,
        height: 35,
        padding: 2,
        borderColor: "#757575",
    },
});

export default class AddPatientComponent extends Component {
    validator = {};

    constructor(props){
        super(props);
        this.required = {
            patient: {
                provider: 'femi',
                first_name: 'Mark',
                last_name: 'Anthony',
                address1: 'Tammy Road, Apt 2000',
                address2: 'Columbia MO 60523',
                age: 88,
                diagnosis: 'Hypertension',
                hospice: 'Unknow',
                username: 'mark',
                password: 'asdfgh',

            },
            caregiver: {
                first_name: 'Samantha',
                last_name: 'Edward',
                address1: 'Tammy Road, Apt 2000',
                address2: 'Columbia MO 60523',
                age: 32,
                relationship: 'brother',
                username: 'sammy',
                password: 'asdfgh',

            }
        }
        this.inputRefs = {};
        this.user = this.props.navigation.state.params.user;
        if (this.user && this.user.username) {
            const user = {...this.user};
           // delete user.password, delete user.caregiver, delete  user.email, delete user.phone;

            const caregiver = {...this.user.caregiver}
            // delete caregiver.password, delete caregiver.email, delete caregiver.phone

            this.state = {
                patient: user,
                caregiver: caregiver,
                providers: []
            };
        } else {
            this.state = {
                patient: {
                    provider: 'femi',
                    first_name: 'Mark',
                    last_name: 'Anthony',
                    address1: 'Tammy Road, Apt 2000',
                    address2: 'Columbia MO 60523',
                    age: 88,
                    diagnosis: 'Hypertension',
                    hospice: 'Unknow',
                    username: 'mark',
                    password: 'asdfgh',

                },
                caregiver: {
                    first_name: 'Samantha',
                    last_name: 'Edward',
                    address1: 'Tammy Road, Apt 2000',
                    address2: 'Columbia MO 60523',
                    age: 32,
                    relationship: 'brother',
                    username: 'sammy',
                    password: 'asdfgh',

                },
                providers: []
            };
            /* this.state = {
                patient: {
                    provider_id: '',
                    first_name: '',
                    last_name: '',
                    address1: '',
                    address2: '',
                    age: '',
                    diagnosis: '',
                    hospice: '',
                    username: '',
                    password: '',

                },
                caregiver: {
                    first_name: '',
                    last_name: '',
                    address1: '',
                    address2: '',
                    age: '',
                    relationship: '',
                    username: '',
                    password: '',

                },
                providers: []
            }; */
        }

       /* */
        this.validator.error = '';
        //this.count = this.count.bind(this);
        this.onTextChange = this.onTextChange.bind(this);
        this.submitForm = this.submitForm.bind(this);
        this.validator.error = this.props.error
        this.showError = this.showError.bind(this);
    }

    componentDidMount(){
        // console.debug('feminefa', JSON.stringify(this.props))
       // this.count();
        this.props.getProviders();
        this.setState({
            providers: this.props.providers.map((item) => {
                return { label: `${item.full_name}, ${item.title}`, value: item.username }
            }
        )})
    }
    componentDidUpdate(){
        // console.debug('feminefa', JSON.stringify(this.props))
        // this.count();
        if (this.props.action) {
            console.log('feminefa', 'updated show error ', this.props.action)
            if (this.props.action.type === PATIENT_STATES.ERROR) {
                this.refs._scrollView.scrollTo(0, 0, true);
            }
        }
    }

    onTextChange(object) {
        this.props.hideError();
        if (object.patient) {
            const patient = Object.assign( {}, this.state.patient, object.patient);
            this.setState({patient: patient}, (state) => {
                // console.debug('feminefa', 'new state', JSON.stringify(this.state));
            });
        }
        if (object.caregiver) {
            const caregiver = Object.assign( {}, this.state.caregiver, object.caregiver);
            this.setState({caregiver: caregiver}, (state) => {
                // console.debug('feminefa', 'new state', JSON.stringify(this.state));
            });
        }

        // console.debug('feminefa', 'new state', patient);


    }
    showError() {
        this.props.showError(this.validator.error);
        // this.refs._scrollView.scrollTo(0, 0, true);
    }
    submitForm() {
        //this.props.add(this.state.patient, this.state.caregiver); return;
        this.validator.error = '';
        Object.keys(this.required.patient).forEach((key) => {
            if ( (!this.state.patient[key] || this.state.patient[key] == '')) {
                if (this.validator.error == '') {
                    this.validator.error = 'Patient\'s ' + key.replace('_', ' ') +' is a required field';
                    this.showError()
                }
            }
        })
        Object.keys(this.required.caregiver).forEach((key) => {
            if ( (!this.state.caregiver[key] || this.state.caregiver[key] == '')) {
                if (this.validator.error == '') {
                    this.validator.error =  'Caregiver\'s ' + key.replace('_', ' ')+' is a required field';
                    this.showError()
                }
            }
        })
        if(!this.validator.error || this.validator.error == '') {
            if (isNaN(parseInt(this.state.patient.age))) {
                this.validator.error =  'Patient\'s age must be a number';
                this.showError();
                return;
            }
            if (isNaN(parseInt(this.state.caregiver.age))) {
                this.validator.error =  'Caregiver\'s age must be a number';
                this.showError();
                return;
            }
        }
        if((!this.validator.error || this.validator.error == '')  ) {
            if ((!this.user || (this.user && this.user.username && this.user.password !== this.state.patient.password)) && this.state.patient.password.length < 6) {
                this.validator.error =  'Patient\'s password must be at least 6 characters';
                this.showError();
                return;
            }
            if ((!this.user || (this.user && this.user.username && this.user.caregiver.password !== this.state.caregiver.password)) && this.state.caregiver.password.length < 6) {
                this.validator.error =  'Caregiver\'s password must be at least 6 characters';
                this.showError();
                return;
            }
        }
        if(!this.validator.error || this.validator.error == '') {
                this.props.add(this.state.patient, this.state.caregiver, this.user);
        }
    }
    render() {
        const { navigate } = this.props.navigation;
        const providers = this.props.providers.map((item) => {
            return { label: `${item.full_name}, ${item.title}`, value: item.username }
        });

        return <View style={{...screenStyle.container, flex: 1, flexDirection: 'column'}}>
            <Text style={Object.assign({}, styles.error, {opacity: this.props.error?100:0 })} >
                { this.props.error }
            </Text>
       <ScrollView ref={'_scrollView'} style={screenStyle.container} >

            <View style={ { padding: 0 }} >

                <View style={ { padding: 10 }} >
                    <Text style={ screenStyle.label }>
                        Provider:
                    </Text>

                    <RNPickerSelect
                        placeholder={{
                            label: 'Select a provider...',
                            value: null,
                        }}
                        items={providers}
                        onValueChange={(value) => {
                            this.setState({ patient: Object.assign({}, this.state.patient, {
                                provider: value,
                            })});
                        }}
                        onUpArrow={() => {
                            //this.inputRefs.picker.focus();
                        }}
                        onDownArrow={() => {
                            //this.inputRefs.picker.togglePicker();
                        }}
                        style={{...pickerSelectStyles}}
                        value={this.state.patient.provider}
                        ref={(el) => {
                            this.inputRefs.picker = el;
                        }}
                    />


                <Text style={ screenStyle.label }>
                    Patients Name:
                </Text>
                <View style={{flex: 1, flexDirection: 'row'}}>
                    <TextInput
                        style={screenStyle.input}
                        placeholder="First Name"
                        value = {this.state.patient.first_name}
                        onChangeText={(text) => this.onTextChange({patient: {first_name: text}})}
                    />
                    <TextInput
                        style={screenStyle.input}
                        value = {this.state.patient.last_name}
                        placeholder="Last Name"
                        onChangeText={(text) => this.onTextChange({patient: {last_name: text}})}
                    />
                </View>
                <View style={ styles.mediumHSeparator }/>
                <Text style={ screenStyle.label }>
                    Address:
                </Text>
                <TextInput
                    style={screenStyle.input}
                    placeholder="Street and House Number"
                    secureTextEntry={ false }
                    value = {this.state.patient.address1}
                    onChangeText={(text) => this.onTextChange({ patient: {address1: text}})}
                />
                <TextInput
                    style={screenStyle.input}
                    placeholder="City, State Zip"
                    secureTextEntry={ false }
                    value = {this.state.patient.address2}
                    onChangeText={(text) => this.onTextChange({patient: {address2: text}})}
                />
                <View style={ styles.mediumHSeparator }/>
                <Text style={ screenStyle.label }>
                    Age:
                </Text>
                <TextInput
                    style={screenStyle.input}
                    keyboardType="number-pad"
                    placeholder="Years"
                    value = {''+this.state.patient.age}
                    onChangeText={(text) => this.onTextChange({patient: {age: text}})}
                />
                <View style={ styles.mediumHSeparator }/>
                <Text style={ screenStyle.label }>
                    Diagnosis:
                </Text>
                <TextInput
                    style={screenStyle.input}
                    placeholder="List Diagnosis"
                    value = {this.state.patient.diagnosis}
                    onChangeText={(text) => this.onTextChange({patient: {diagnosis: text}})}
                />
                <View style={ styles.mediumHSeparator }/>
                <Text style={ screenStyle.label }>
                    Hospice Admission:
                </Text>
                <TextInput
                    style={screenStyle.input}
                    placeholder=""
                    value = {this.state.patient.hospice}
                    onChangeText={(text) => this.onTextChange({patient: {hospice: text}})}
                />
                <View style={ styles.mediumHSeparator }/>
                <Text style={ screenStyle.label }>
                    Patient ID (username):
                </Text>
                <TextInput
                    style={screenStyle.input}
                    placeholder="No spaces"
                    editable = {!this.user}
                    value = {this.state.patient.username}
                    onChangeText={(text) => this.onTextChange({patient: {username: text}})}
                />
                <View style={ styles.mediumHSeparator }/>
                <Text style={ screenStyle.label }>
                    Password:
                </Text>
                <TextInput
                    style={screenStyle.input}
                    placeholder="6 characters minimum"
                    secureTextEntry={ true }

                    onChangeText={(text) => this.onTextChange({patient: {password: text}})}
                />
                <View style={ styles.mediumHSeparator }/>
                <Text style={ screenStyle.label }>
                   Caregiver's Name:
                </Text>
                <View style={{flex: 1, flexDirection: 'row'}}>
                    <TextInput
                        style={screenStyle.input}
                        placeholder="First Name"
                        secureTextEntry={ false }
                        value = {this.state.caregiver.first_name}
                        onChangeText={(text) => this.onTextChange({caregiver: {first_name: text}})}
                    />
                    <TextInput
                        style={screenStyle.input}
                        placeholder="Last Name"
                        value = {this.state.caregiver.last_name}
                        onChangeText={(text) => this.onTextChange({caregiver: {last_name: text}})}
                    />
                </View>

                <View style={ styles.mediumHSeparator }/>
                <Text style={ screenStyle.label }>
                    Caregiver's Address:
                </Text>
                <TextInput
                    style={screenStyle.input}
                    placeholder="Street and House Number"
                    secureTextEntry={ false }
                    value = {this.state.caregiver.address1}
                    onChangeText={(text) => this.onTextChange({caregiver: {address1: text}})}
                />
                <TextInput
                    style={screenStyle.input}
                    placeholder="City, State Zip"
                    secureTextEntry={ false }
                    value = {this.state.caregiver.address2}
                    onChangeText={(text) => this.onTextChange({caregiver: {address2: text}})}
                />
                <View style={ styles.mediumHSeparator }/>
                <Text style={ screenStyle.label }>
                    Caregiver's Age:
                </Text>
                <TextInput
                    style={screenStyle.input}
                    placeholder="Number only"
                    value = { ''+this.state.caregiver.age}
                    onChangeText={(text) => this.onTextChange({caregiver: { age: text}})}
                />

                <View style={ styles.mediumHSeparator }/>
                <Text style={ screenStyle.label }>
                    Caregiver's Relationship to Patient:
                </Text>
                <TextInput
                    style={screenStyle.input}
                    placeholder="Mother, Sister, Brother etc"
                    value = {this.state.caregiver.relationship}
                    onChangeText={(text) => this.onTextChange({caregiver: {relationship: text}})}
                />
                <View style={ styles.mediumHSeparator }/>
                <Text style={ screenStyle.label }>
                    Caregiver's ID (username):
                </Text>
                <TextInput
                    style={screenStyle.input}
                    placeholder="Username"
                    value = {this.state.caregiver.username}
                    editable = {!this.user}
                    onChangeText={(text) => this.onTextChange({caregiver: {username: text}})}
                 />
                <View style={ styles.mediumHSeparator }/>
                <Text style={ screenStyle.label }>
                    Caregiver's Password:
                </Text>
                <TextInput
                    style={screenStyle.input}
                    placeholder="6 characters minimum"

                    secureTextEntry={ true }
                    onChangeText={(text) => this.onTextChange({caregiver: {password: text}})}
                />
                <View style={ styles.mediumHSeparator }/>
                <TouchableHighlight onPress={ this.submitForm } title={"Login"} style={screenStyle.button}>
                    <Text style={ screenStyle.buttonText }>{ this.user?'UPDATE PATIENT':'ADD PATIENT' }</Text>
                </TouchableHighlight>
                <View style={ styles.mediumHSeparator }/>
                <View style={ styles.mediumHSeparator }/>
                <View style={ styles.mediumHSeparator }/>



                </View>
            </View>

        </ScrollView>
        </View>

    }
}




