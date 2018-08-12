import {Dimensions, StyleSheet} from "react-native";
//const StyleSheet = require('react-native.StyleSheet')
const width = Dimensions.get('window').width; //full width
const height = Dimensions.get('window').height; //full height
module.exports= StyleSheet.create({
    container: {
        flex: 1,
        paddingTop: 22,
        flexDirection: 'column',
        backgroundColor: '#ffffff',
        justifyContent: 'center',
        alignItems: 'center',
    },
    sectionHeader: {
        paddingTop: 2,
        paddingLeft: 10,
        paddingRight: 10,
        paddingBottom: 2,
        fontSize: 14,
        fontWeight: 'bold',
        backgroundColor: 'rgba(247,247,247,1.0)',
    },
    item: {
        padding: 10,
        fontSize: 18,
        height: 44
    },

    landingButtonsSection: {

        justifyContent: 'center',
        alignItems: 'center',
        padding: 0,
        height: 50,

    },

    landingButton: {
        flex: 1,
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        width:"50%",
        padding: 5,
        backgroundColor: '#289ef4',
        height: 50,

    },
    landingButtonText: {
        color: "#FFFFFF"
    },
    largeHSeparator: {
        width: 1, height: 40, backgroundColor: "#ffffff00"
    },
    mediumHSeparator: {
        width: 1, height: 10, backgroundColor: "#ffffff00"
    },
    smallHSeparator: {
        width: 1, height: 5, backgroundColor: "#ffffff00"
    },
    error: {
        padding: 10,
        fontSize: 18,
        color: '#ffffff',
        backgroundColor: '#ff0000',
        justifyContent: 'center',
        alignItems: 'center',
        top: 0,
        width:width,
        height: 40
    },
    picker: {
        fontSize: 12,
        paddingTop: 23,
        paddingHorizontal: 10,
        paddingBottom: 12,
        borderWidth: 1,
        borderColor: 'gray',
        borderRadius: 4,
        backgroundColor: 'white',
        color: 'black'}
})
