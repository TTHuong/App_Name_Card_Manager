import React, { Component } from 'react'
import PropTypes from 'prop-types';
import { width, height, standarWidth, standardHeight } from "../common/CommonComponent";
import {
    View, Text, StyleSheet, Image,
    TouchableOpacity,
} from 'react-native';
import ListImages from "../components/ListImages";

export default class UploadImages extends Component {
    render() {
        return (
            <View style={styles.container}>
                <View style={styles.frameImage}>
                    <Image
                        resizeMode="stretch"
                        style={styles.image}
                        source={{ uri: "https://cdn.pixabay.com/photo/2015/04/23/22/00/tree-736885__340.jpg" }}
                    />
                </View>
                <ListImages 
                
                />
            </View>
        )
    }
}

ListImages.PropTypes={
    onPressUser:PropTypes.func,
    onPressAddCard:PropTypes.func,
    onPressSelectListTick:PropTypes.func,
    onPressScanQrCode:PropTypes.func,
    onPressLogout:PropTypes.func,
};


const styles = StyleSheet.create({
    container: {
        backgroundColor: 'white',
        width: width - 40,
        height: 150 / standardHeight * height,
        marginBottom: 20 / standardHeight * height,
        marginTop: 10 / standardHeight * height,
        borderRadius: 20 / standarWidth * width,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        padding: 10 / standarWidth * width,
    },
    frameImage: {
        height: 130 / standardHeight * height,
        borderRightWidth: 3,
        borderRightColor: "black",
        width: '80%',
    },
    image: {
        borderTopLeftRadius: 10 / standarWidth * width,
        borderBottomLeftRadius: 10 / standarWidth * width,
        width: '98%',
        height: '100%',
    }
})