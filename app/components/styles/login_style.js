import {Dimensions, StyleSheet} from "react-native";
//const StyleSheet = require('react-native.StyleSheet')
var width = Dimensions.get('window').width; //full width
var height = Dimensions.get('window').height; //full height

module.exports= StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        flexDirection: 'column',
        backgroundColor: '#ffffff',
        height: 400

    },
    formSection: {

        justifyContent: 'center',
        alignItems: 'center',
        padding: 0,

        height: height
    },
    welcome: {
        color: "#000000",
        fontSize: 30,
        fontWeight: 'bold',
        margin: 10,
        marginBottom:30
    },
    appName: {
        color: "#daa520",
        fontSize: 35,
        fontWeight: 'bold',
        marginBottom: 20
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

        flexDirection: "column",
        alignItems: 'center',
        height: 100,
    },
    input: {
        borderWidth: 1,
        minWidth:250,
        margin:3,
        height: 35,
        padding: 2,
        borderColor: "#757575",
    },
    forgotText: {
        color: "blue"
    }
})
