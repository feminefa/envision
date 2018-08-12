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
import  Layout from '../components/layouts/add_caregiver_layout';
import { AsyncStorage } from 'react-native';
import store from "../stores/store";
import {
    navigate,
} from 'react-navigation';

AsyncStorage.setItem('name', 'deji')
/*, () => {
dispatch({type: ADD_QUOTE, quote:quote});
}); */

const mapStateToProps = state => ({
    count: state,

})

const mapDispatchToProps = (dispatch) => ({
    login: () => {
        /*return fetch('https://facebook.github.io/react-native/movies.json')
            .then((response) => response.json())
            .then((responseJson) => {

                /* this.setState({
                     isLoading: false,
                     dataSource: responseJson.movies,
                 }, function(){

                 }); */
               /* AsyncStorage.getItem('name', (err, t) => {
                    dispatch({ type: 'INCREMENT', name: JSON.stringify(responseJson.movies) })
                })

            })
            .catch((error) =>{
                console.error(error);
            });*/
    },
    //decrement: () => { dispatch({ type: 'DECREMENT' }) },
    //reset: () => { dispatch({ type: 'RESET' }) },
})

//export default
const Content= connect(mapStateToProps, mapDispatchToProps)(Layout)

export default  class Container extends Component {
    static navigationOptions = ({navigation}) => {
        return {
            title: "Add Caregiver"
        }
    }

    render() {
        const { navigate } = this.props.navigation;
        return (
            <Provider navigation={this.props.navigation}  store={store}>
                <Content  navigation={this.props.navigation}  />
            </Provider>
        );
    }
}