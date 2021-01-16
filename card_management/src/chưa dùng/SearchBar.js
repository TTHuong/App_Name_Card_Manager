import React, { Component } from 'react'
import {
    View, TextInput, TouchableOpacity, StyleSheet,

} from 'react-native';
import PropTypes from 'prop-types';
// import Fading from "../effect/Fading"
import { width, height, standarWidth, standardHeight } from "../common/CommonComponent";
import FontAwesome from 'react-native-vector-icons/FontAwesome';

export default class SearchBar extends Component {
    render() {
        return (
            <View style={styles.container}>
                <TextInput style={styles.textInput}
                    placeholder="Mã card ..."
                    placeholderTextColor="black"
                    allowFontScaling={true} />
                <TouchableOpacity activeOpacity={0.5} style={styles.buttonSearch}>
                    <FontAwesome name="search" size={20} color="#000000" />
                </TouchableOpacity>
            </View>
        )
    }
}


const styles = StyleSheet.create({
    container: {
        backgroundColor: "white",
        width: '90%',
        height: 38 / standardHeight * height,
        borderRadius: 10 / standarWidth * width,
        borderWidth: 1,
        borderColor: "#ffffff",
        justifyContent: 'center',
        alignItems: 'center',
        flexDirection: 'row',
        paddingLeft: 5 / standarWidth * width,
        paddingRight: 5 / standarWidth * width,
    },
    textInput: {
        // marginLeft: 5 / standarWidth * width,
        marginRight: 5 / standarWidth * width,
        width: '80%',
        height: '99%',
        fontSize:12/ standarWidth * width,
        // backgroundColor: 'transparent',
        // backgroundColor: 'blue',
    },
    buttonSearch: {
        width: '20%',
        height: '98%',
        justifyContent: 'center',
        alignItems: 'center',
        // backgroundColor: 'green',
    }
})
