import React, { Component } from 'react';
import {  View,  TouchableHighlight, Text, } from 'react-native';
import { Icon } from 'react-native-elements'
import SCORE_TYPES from "../../../models/ScoreTypes";
const styles = require('./../../styles/common')
const screenStyle= require('./../../styles/profile_style')

export default class Cell extends Component {

    render() {
        // console.log('feminefa', 'hahahahha', this.props.scoreType )
        const  scoreCell = function (score) {
            var color = "#daa520"
            switch (score) {
                case 10: color =  "#715611"; break;
                case 9: color =  "#a27c17"; break;
                case 8: color =  "#ba8d1c"; break;
                case 7: color =  "#c6961d"; break;
                case 6: color =  "#daa71f"; break;
                case 5: color =  "#dfa921"; break;
                case 4: color =  "#e6b021"; break;
                case 3: color =  "#edb622"; break;
                case 2: color =  "#f0dca3"; break;
                case 1: color =  "#fee9ad"; break;
                case 0: color =  "#ffffff"; break;
                default: color = "#ffffff"
            }
            return {
                backgroundColor: color,
                width: 80,
                height: 80,
                justifyContent: 'center',
                alignItems: 'center',
            }
        };
        return (<View style={screenStyle.bottomCell}>
            <Text style={screenStyle.bottomCellLabel}>
                {SCORE_TYPES.patient[this.props.scoreType]}
            </Text>
            <TouchableHighlight onPress={ ()=>this.props.clicked(this.props.scoreType, this.props.scores[this.props.scoreType]) } style={ { ...scoreCell(this.props.score),  borderWidth:1, borderColor: '#fee9ad' } }>
                <Text style={screenStyle.scoreText}>
                    {this.props.scores[this.props.scoreType]}
                </Text>
            </TouchableHighlight>
        </View>)
    }
}
//{ <Icon  name="error" style={ { fontSize: 10, padding: 5 } } iconSize={ 10 } /> }