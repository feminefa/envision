import React, { Component } from 'react';
import {
    AppRegistry, SectionList, StyleSheet, Text, ScrollView, View, Button, TouchableHighlight,
    TextInput,
    FlatList,
    TouchableOpacity,
    Image, AlertIOS
} from 'react-native';
import {ROLE} from "../../models/Role";
import NavigationService from "../../services/navigation";
import {NavigationActions} from "react-navigation";
import {AUTH_STATES} from "../../stores/auth";
import {PATIENT_STATES} from "../../stores/patient";
const config = require('../../configs/app')
const User = require('../../models/User')
const Address = require ('../../models/Address')


const styles = require('../../components/styles/common')
const browseStyles= require('../../components/styles/browse_style')



export default class BrowseComponent extends Component {

    constructor() {
        super();
        this.data = null;
        // this.type = 'patients'
        this.state = {
            loaded: false,
            data: null,
            type: 'patients'
        };
        this.delete = this.delete.bind(this);
    }

    componentDidMount() {
        // this.props.getCounts();
        //this.data =  this.props.data.patients;
        switch (this.props.navigation.state.params.type) {
            case ROLE.ADMIN:
                this.data = this.props.admins;
                this.type = 'admins'
                break;
            case ROLE.PROVIDER:
                this.data = this.props.providers;
                this.type = 'providers'
                break;
            default:
                this.data = this.props.patients;
                this.type = 'patients'

        }
        this.setState({type: this.type})

    }




    delete(user) {
        AlertIOS.alert(
            'Alert',
            'Are you sure you want to delete '+user.full_name,
            [
                {
                    text: 'Cancel',
                },

                {
                    text: 'Delete',
                    onPress: () =>  this.props.delete(user),
                },
            ]
        );
    }
    render() {
        const data = this.props[this.state.type];
        const { navigate } = this.props.navigation;
        if(!this.props[this.type]) {
            return <View style={browseStyles.container}>
                <Text style={browseStyles.actionButtonText}>Loading...</Text>
            </View>
        }
        console.log('feminefa', 'data', this.state.type)

        return <View style={ browseStyles.container}>
            <View style={ browseStyles.searchSection}>
                <TextInput
                    style={ browseStyles.input}
                    placeholder="Enter username, first name or last Name"
                    onChangeText={(text) => this.setState({text})}
                />
                <TouchableHighlight onPress={ this.props.decrement } title={"Search"} style={browseStyles.searchButton}>
                    <Text style={browseStyles.actionButtonText}>Search</Text>
                </TouchableHighlight>
            </View>
            <Text style={{height: this.props[this.type].length==0?150:0, padding:this.props[this.type].length==0?30:0, textAlignVertical:'center'}}>No Results Found</Text>
            <FlatList
                style={browseStyles.list}
                data={this.props[this.state.type]}
                renderItem={({item}) => (
                    <View style={browseStyles.listItem}>
                        <View style={browseStyles.itemLeft }>
                            <TouchableOpacity
                                onPress={() =>
                                    navigate('Profile', { title: "Profile", username: item.username })
                                }
                                style={{
                                    borderWidth:0,
                                    borderColor:'rgba(0,0,0,0.2)',
                                    alignItems:'center',
                                    justifyContent:'center',
                                    width:50,
                                    height:50,
                                    backgroundColor:'#fff',
                                    borderRadius:0,
                                    margin: 3
                                }}
                            >
                                <Image style={ {width: 50, height: 50}} source={require('../../assets/img/avatar.png')} />
                            </TouchableOpacity>
                            <TouchableOpacity
                                onPress={() =>
                                    navigate('Profile', { title: "Profile", username: item.username })
                                }
                                style={{
                                    flex: 1,
                                    flexDirection: 'column'
                                }}

                            >
                            <Text style={browseStyles.listItemName} >{item.full_name}{item.age?', '+item.age+' yo':''} </Text>
                                <Text style={{...browseStyles.listItemName, fontSize: 12, color: '#555555'}} >{item.caregiver?'Caregiver: '+item.caregiver.full_name:''}</Text>
                            </TouchableOpacity>
                        </View>
                        <View style={browseStyles.itemRight }>
                            <TouchableHighlight onPress={() =>
                                navigate('AddPatient', { title: "Edit Patient", user: item })
                            } title={"Search"} style={browseStyles.itemButton}>
                                <Text style={browseStyles.actionButtonText}>Edit</Text>
                            </TouchableHighlight>
                            <TouchableHighlight onPress={ () => this.delete(item) } title={"Search"} style={browseStyles.itemButton}>
                                <Text style={browseStyles.actionButtonText}>Delete</Text>
                            </TouchableHighlight>
                        </View>

                    </View>
                )
                }
            />

        </View>

    }
}




