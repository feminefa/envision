import React, { Component } from 'react';
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux';
import Counter from '../components/layouts/landing_layout.js';
import { AsyncStorage } from 'react-native';

AsyncStorage.setItem('name', 'deji')
    /*, () => {
    dispatch({type: ADD_QUOTE, quote:quote});
}); */

const mapStateToProps = state => ({
    count: state
})

const mapDispatchToProps = (dispatch) => ({
    increment: () => {
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
    decrement: () => { dispatch({ type: 'DECREMENT' }) },
    reset: () => { dispatch({ type: 'RESET' }) },
})

export default connect(mapStateToProps, mapDispatchToProps)(Counter)