import React, { Component } from 'react';
import {  View,  TouchableHighlight, Text, } from 'react-native';
import { Icon } from 'react-native-elements'
import ScoreTypes from "../../../models/ScoreTypes";
const styles = require('./../../styles/common')
const screenStyle= require('./../../styles/profile_style')
import {patientActions} from './../../../modules/patient/patient.actions';
import { connect } from 'react-redux';
import {ROLE} from "../../../models/Role";
 class Layout extends Component {
    render() {
        // console.log('feminefa', 'child props', JSON.stringify(this.props))
        const user =this.props.user;
        let score = this.props.scores[user.username][this.props.scoreType];
        const _self = this;
        const  scoreCell = function ( ) {
            let color = "#daa520"
            let textColor = '#000000'
            if(user.role == ROLE.CAREGIVER) {
                var patientScore = _self.props.scores[user.caregiver_of][_self.props.scoreType];
                console.log('feminefa', 'caregiver scores', _self.props.scores[user.caregiver_of])
                color = "#ffffff";
                if (!isNaN(parseInt(patientScore)) && !isNaN(parseInt(score))) {
                    if (score > patientScore) {
                        color = "#72491c";
                        textColor = "#ffffff"
                    }
                    else if (score == patientScore) {
                        color = "#dfa921";
                        textColor = "#ffffff"
                    }
                    else  {
                        color = "#ffffff";
                        textColor = "#000000"
                    }
                }
            } else {
                textColor = '#ffffff';
                switch (score) {
                    case 10:
                        color = "#72491c";
                        break;
                    case 9:
                        color = "#97582b";
                        break;
                    case 8:
                        color = "#b3732b";
                        break;
                    case 7:
                        color = "#dc8639";
                        break;
                    case 6:
                        color = "#f29c39";
                        break;
                    case 5:
                        color = "#dfa921";
                        textColor = '#000000';
                        break;
                    case 4:
                        color = "#EEB722";
                        textColor = '#000000';
                        break;
                    case 3:
                        color = "#ffca20";
                        textColor = '#000000';
                        break;
                    case 2:
                        color = "#f0dca3";
                        textColor = '#000000';
                        break;
                    case 1:
                        color = "#fee9ad";
                        textColor = '#000000';
                        break;
                    case 0:
                        color = "#ffffff";
                        textColor = '#000000';
                        break;
                    default:
                        color = "#ffffff"
                        textColor = '#000000';
                }
            }
            return {text: {color: textColor }, cell: {
                backgroundColor: color,
                    width: 80,
                height: 80,
                justifyContent: 'center',
                alignItems: 'center',
            }
        }
        };
        const cellStyle = scoreCell();
        return (<View style={screenStyle.bottomCell}>
            <View style={{flex:1, flexDirection: 'row'}} >
                <Text style={screenStyle.bottomCellLabel}>
                    {ScoreTypes[this.props.scoreType]}
                </Text>
                <Icon  onPress={()=>this.props.showChart()}   size={15}name="error" style={ {  padding: 3 } } iconSize={ 6 } />
            </View>
            <TouchableHighlight onPress={ ()=>this.props.clicked(this.props.scoreType, score) } style={ { ...cellStyle.cell,  borderWidth:1, borderColor: '#fee9ad' } }>
                <Text style={{...screenStyle.scoreText,  ...cellStyle.text} }>
                    {(!isNaN(parseFloat(score)))?score:'?'}
                </Text>
            </TouchableHighlight>
        </View>)
    }
}

// const mapStateToProps = (state) => ({ ...state.dashboardReducer, count: 0})
const mapStateToProps = (state, props) => {
    return {
        loading: state.patientReducer.loading,
        scores: state.patientReducer.scores,
        // navigation: state.patientReducer.navigation,
    }
}

//export default
export default Cell= connect(mapStateToProps, patientActions)(Layout)
//{ <Icon  name="error" style={ { fontSize: 10, padding: 5 } } iconSize={ 10 } /> }