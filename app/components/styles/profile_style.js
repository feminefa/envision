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

        padding:5


    },
    scrollView: {

        height: height,
        //backgroundColor: '#ffffff',

    },
    formSection: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        padding: 0,
        marginTop: 30,
        height: 400
    },
    welcome: {
        color: "#000000",
        fontSize: 30,
        fontWeight: 'bold',
        margin: 10
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
        flex: 1,
        flexDirection: "column",
        alignItems: 'center',
        height: 100,
    },
    input: {
        borderWidth: 1,
        minWidth:150,
        margin:3,
        height: 35,
        padding: 2,
        borderColor: "#cccccc"
    },
    top: {
        flex: 1,
        flexDirection: "row",
        marginTop:5,
        marginBottom: 10,
        backgroundColor: "#ffffff"
    },
    topSubsection: { flex: 1, flexDirection:"column", padding: 5},
    name: {
        fontSize: 13,
        fontWeight: 'bold',
        marginTop: 12
    },
    middle: {
        flex: 1,
        flexDirection: "column",
        width: width-20,
        padding: 0,
        justifyContent: 'center',
        alignItems: 'center',
        marginTop: 20,
        backgroundColor: "#eeeeee",
        borderWidth: 1,
        borderColor: "#e2e2e2"

    },
    middleTitle: {
        flex: 1,
        flexDirection: "column",
        backgroundColor: "#eeeeee",
        justifyContent: 'flex-start',
        alignItems: 'center',
        width: width-20,
        padding: 20
    },
    middleText: {
        fontWeight: 'bold',
    },
    bottom: {
        flex: 1,
        flexDirection: "column",
        width: width-20,
        padding: 0,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: "#ffffff"

    },
    bottomRow: {
        flex: 1,
        flexDirection: "row",

        padding: 5,
        justifyContent: 'center',
        alignItems: 'center',

    },bottomCell: {
        flex: 1,
        flexDirection: "column",
        margin:5,
        padding: 5,
        justifyContent: 'center',
        alignItems: 'center',


    },
    bottomCellLabel: {
        marginBottom: 4
    },

    scoreText: {
        fontSize: 16,
        fontWeight: "bold",
    }
    ,
    footer: {
        margin: 20,
        justifyContent: 'center',
        alignItems: 'center',
    },
    copyright: {
        fontSize: 11,
        color: "#acacac",
        marginTop: 8
    },
    footerText: {
        justifyContent: 'center',
        alignItems: 'center',
        fontSize: 10,
        fontWeight: "bold"
    }


})
