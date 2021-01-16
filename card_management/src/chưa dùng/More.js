import React, { Component } from 'react'
import { width, height, standarWidth, standardHeight } from "../common/CommonComponent";
import {
    View, StyleSheet, TouchableOpacity
} from 'react-native';
import Feather from 'react-native-vector-icons/Feather';
import BottomDrawSheet from '../components/BottomDrawSheet';
import PropTypes from 'prop-types';

export default class More extends Component {

    onPressUser(){
        this.props.onPressUser();
        this.More.close();
    }
    onPressAddCard(){
        this.props.onPressAddCard();
        this.More.close();
    }
    render() {
        return (
            <View style={styles.container}>
                <TouchableOpacity onPress={() => this.More.open()}
                    activeOpacity={0.5} style={styles.buttonMore}>
                    <Feather name="more-vertical" size={30} color="#ffffff" />
                </TouchableOpacity>
                <BottomDrawSheet
                    ref={ref => {
                        this.More = ref;
                    }}
                    onPressUser={()=>this.onPressUser()}
                    onPressAddCard={() => this.onPressAddCard()}
                    onPressSelectListTick={() => this.props.onPressSelectListTick()}
                    onPressScanQrCode={() => this.props.onPressScanQrCode()}
                    onPressLogout={() => this.props.onPressLogout()}
                />
            </View>
        )
    }
}

More.PropTypes={
    onPressUser:PropTypes.func,
    onPressAddCard:PropTypes.func,
    onPressSelectListTick:PropTypes.func,
    onPressScanQrCode:PropTypes.func,
    onPressLogout:PropTypes.func,
};

const styles = StyleSheet.create({
    container: {
        width: '10%',
        // backgroundColor: 'red',
        height: 40 / standardHeight * height,
    },
    buttonMore: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',

    }
})
