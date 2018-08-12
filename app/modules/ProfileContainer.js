import React, { Component } from 'react';
import {
    AppRegistry,
    StyleSheet,
    View,
    StatusBar,
    TouchableOpacity,
    Text
} from 'react-native';
import { Provider } from 'react-redux';
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux';
import Layout from '../components/layouts/patient_profile_layout';
import { AsyncStorage } from 'react-native';
import store from "../stores/store";

AsyncStorage.setItem('name', 'deji')
/*, () => {
dispatch({type: ADD_QUOTE, quote:quote});
}); */

const mapStateToProps = state => ({
    count: state
})

const mapDispatchToProps = (dispatch) => ({
    login: () => {
        return fetch('https://facebook.github.io/react-native/movies.json')
            .then((response) => response.json())
            .then((responseJson) => {

                /* this.setState({
                     isLoading: false,
                     dataSource: responseJson.movies,
                 }, function(){

                 }); */
                AsyncStorage.getItem('name', (err, t) => {
                    dispatch({ type: 'INCREMENT', name: JSON.stringify(responseJson.movies) })
                })

            })
            .catch((error) =>{
                console.error(error);
            });

    },
    //decrement: () => { dispatch({ type: 'DECREMENT' }) },
    //reset: () => { dispatch({ type: 'RESET' }) },
})

//export default
const Content= connect(mapStateToProps, mapDispatchToProps)(Layout)
export default  class Container extends Component {


    static navigationOptions = ({navigation}) => {
        const self=this;
        return {

            title: navigation.state.params.title,
            headerRight: (
                <Text  style={{ marginEnd: 10 }}>

                </Text>
            ),
            headerTintColor: "#fff",
            headerStyle: {
                backgroundColor: '#daa520',
                height: 56,
                elevation: null
            }
        };
    };
    render() {
        return (
            <Provider store={store}>
                <Content  navigation={this.props.navigation} />
            </Provider>
        );
    }
}