import {StyleSheet} from "react-native";
//const StyleSheet = require('react-native.StyleSheet')
import {
    Dimensions
} from "react-native"
var width = Dimensions.get('window').width; //full width
var height = Dimensions.get('window').height; //full height

module.exports= StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        flexDirection: 'column',
        backgroundColor: '#ffffff',
        minHeight: height



    },

    searchSection: {

        flexDirection: "row",
        backgroundColor: "#cccc",
        fontSize: 20,
        padding: 3,
        height: 50,
        width: width
    },
    input: {
        flex: 8,
        borderWidth: 1,
        minWidth:150,
        margin:3,
        height: 35,
        padding: 2,
        borderColor: "#cccccc",
        backgroundColor: "#ffffff"
    },
    content: {
        flex: 1,
        flexDirection: "column",
        height: 40
    },
    welcome: {
        color: "#000000",
        fontSize: 30,
        fontWeight: 'bold',
        margin: 10,

    },
    section: {

        flexDirection: 'column',
        justifyContent: 'flex-start',
        alignItems: 'center',

        marginTop: 30,
        height: 90,
        borderWidth: 1,
        borderColor: "#cccccc",
        width: width-30

    },
    sectionTitle: {
        color: "#000000",
        backgroundColor: "#cccc",
        fontSize: 20,
        padding: 3,
        fontWeight: 'bold',
        width: width-30

    },
    sectionTitleText: {
        color: "#000000",
        fontSize: 20,
        fontWeight: 'bold',
        margin: 5,

    },

    sectionContent: {

        flexDirection: "row",
        flex: 1,
        height: 40
    },
    sectionContentText: {
        fontSize: 15,
        fontWeight: 'bold',
        margin: 5,
        flex: 3,
        color: "#666666"

    },

    searchButton: {
        flex: 1,
        backgroundColor: "#f4f4f4",
        height: 35,
        padding:10,
        margin: 3,
        justifyContent: 'center',
        alignItems: 'center',
    },
    actionButtonText: {

        color: 'blue',
    },
    listItem: {
        flexDirection: "row",
        justifyContent: 'flex-start',
        alignItems: 'center',
        padding:8,
        borderWidth: 1,
        borderColor: "#f4f4f4"

    },
    itemLeft: {
        flex: 2,
        flexDirection: "row"
    },
    itemRight: {
        flex: 1,
        flexDirection: "row"
    },
    list: {
        width: width-10,

    },
    listItemName: {
        fontSize: 15,
        justifyContent: 'flex-start',
        padding: 4,
    },
    itemButton: {
        flex: 1,
        backgroundColor: "#f4f4f4",
        height: 35,
        padding:10,
        margin: 3,
        justifyContent: 'center',
        alignItems: 'center',
    }

})
