import {Dimensions, StyleSheet} from "react-native";
//const StyleSheet = require('react-native.StyleSheet')
var width = Dimensions.get('window').width; //full width
var height = Dimensions.get('window').height; //full height

module.exports= StyleSheet.create({
    container: {

        backgroundColor: '#ffffff',
        height: height

    },
    formSection: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        padding: 0,
        marginTop: 30,
        height: 400
    },

    button: {
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        padding: 5,
        backgroundColor: '#289ef4',
        height: 50,
        minWidth: 100,
        margin: 0

    },
    buttonText: {
        color: "#ffffff"
    },
    inputSection: {
        flex: 1,
        flexDirection: "column",
        marginTop:30,
        justifyContent: 'center',

        backgroundColor: "#f9f9f9"
    },
    buttonSection: {
        flex: 1,
        flexDirection: "column",
        alignItems: 'center',
        height: 100,
    },
    input: {
        borderWidth: 1,
        minWidth:300,
        margin:3,
        height: 35,
        padding: 2,
        borderColor: "#757575",
       /* placeholderTextColor: "#757575" */
    },
    select: {
        borderWidth: 1,
        minWidth:300,
        margin:3,
        height: 35,
        justifyContent: 'center',
        padding: 2,
        alignItems: 'center',
        borderColor: "#757575"
    },
    label: {

        minWidth:300,
        margin:3,

        padding: 2,
        color: "#757575"
    },

})
