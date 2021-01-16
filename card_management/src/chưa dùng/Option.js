import React, { Component } from 'react'
import {
    width, height, standarWidth, standardHeight,
} from "../common/CommonComponent";

import {
    StyleSheet, Text, ScrollView, View, TouchableOpacity,
    Image,
} from "react-native";
import Ionicons from "react-native-vector-icons/Ionicons"
import Feather from "react-native-vector-icons/Feather"
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons"
import FontAwesome5 from "react-native-vector-icons/FontAwesome5"
import PropTypes from 'prop-types';

export default class Option extends Component {

    renderItem() {
        return (
            <View style={styles.frameItem}>

            </View>
        )
    }

    render() {
        return (
            <View style={styles.container}>
                <ScrollView
                    horizontal
                    // contentContainerStyle={{ justifyContent: 'center', alignItems: 'center' }}
                    style={styles.frame}>

                    <TouchableOpacity onPress={()=>this.props.onPressUser()}  style={styles.frameItem}>
                        <FontAwesome5 name="user" size={30} color="#000000" />
                    </TouchableOpacity>

                    <TouchableOpacity onPress={()=>this.props.onPressAddCard()} style={styles.frameItem}>
                        <Ionicons name="add-circle" size={30} color="#000000" />
                    </TouchableOpacity>

                    <TouchableOpacity onPress={()=>this.props.onPressSelectListTick()} style={styles.frameItem}>
                        <Feather name="list" size={30} color="#000000" />
                    </TouchableOpacity>

                    <TouchableOpacity onPress={()=>this.props.onPressScanQrCode()} style={styles.frameItem}>
                        <MaterialCommunityIcons name="qrcode-scan" size={30} color="#000000" />
                    </TouchableOpacity>

                    <TouchableOpacity onPress={()=>this.props.onPressLogout()} style={styles.frameItem}>
                        <MaterialCommunityIcons name="logout" size={30} color="#000000" />
                    </TouchableOpacity>

                </ScrollView>
            </View>
        )
    }
}

Option.PropTypes={
    onPressUser:PropTypes.func,
    onPressAddCard:PropTypes.func,
    onPressSelectListTick:PropTypes.func,
    onPressScanQrCode:PropTypes.func,
    onPressLogout:PropTypes.func,
};

const styles = StyleSheet.create({
    container: {
        width: width,
        height: '100%',
        // backgroundColor: 'red',
        // textAlign:'center',
        marginTop:5/standardHeight*height,
        justifyContent:'center',

    },
    frame: {
        width: width,
        height: 50 / standardHeight * height,
        // paddingBottom: 10 / standardHeight * height,
        // paddingTop: 10 / standardHeight * height,
        // flexDirection: 'row',
        // backgroundColor: 'green',
    },
    frameItem: {
        justifyContent: 'center',
        alignItems: 'center',
        width: 40 / standarWidth * width,
        height: 40 / standardHeight * height,
        marginLeft: 20 / standardHeight * height,
        marginRight: 20 / standardHeight * height,
        marginBottom: 10 / standardHeight * height,
        // backgroundColor: 'green',
        borderWidth: 1,
        borderRadius: 8 / standarWidth * width,
        borderColor:'#000000',
        // flex: 1,

    },
    images: {
        width: '100%',
        height: '100%',
    }
})