import React, { Component } from 'react'
import PropTypes from 'prop-types';
import {
    StyleSheet,
    KeyboardAvoidingView,
    TouchableOpacity,
    Image, View,
} from 'react-native';
import { width, height, standarWidth, standardHeight } from "../common/CommonComponent";
import QRCode from 'react-native-qrcode-svg';


export default class Qrcode extends Component {
    render() {
        return (
            <QRCode
                value={this.props.value}
                size={this.props.size}
                color={this.props.color}
                backgroundColor={this.props.backgroundColor}
                enableLinearGradient={this.props.enableLinearGradient}
                linearGradient={this.props.linearGradient}
                Logo={{ uri: this.props.Logo }}
                logoSize={this.props.logoSize}
                logoBackgroundColor={this.props.logoBackgroundColor}
                logoMargin={this.props.logoMargin}
                logoBorderRadius={this.props.logoBorderRadius}
                quietZone={this.props.quietZone}
            />
        )
    }
}

Qrcode.PropTypes = {
    value: PropTypes.string,
    size: PropTypes.number,
    color: PropTypes.string,
    backgroundColor: PropTypes.string,
    enableLinearGradient: PropTypes.bool,
    linearGradient: PropTypes.array,
    Logo: PropTypes.string,
    logoSize: PropTypes.number,
    logoBackgroundColor: PropTypes.string,
    logoMargin: PropTypes.number,
    logoBorderRadius: PropTypes.number,
    quietZone: PropTypes.number,
}

Qrcode.defaultProps = {
    value: "không có dữ liệu",
    size: 200,
    color: "black",
    backgroundColor: "white",
    enableLinearGradient: false,
    linearGradient: ['rgb(0, 0, 0)', 'rgb(0, 0, 0)'],
    // linearGradient: [],
    Logo: "https://itplus-academy.edu.vn/upload/b7ad33828b0773d8f301805541d453df/files/java/%E1%BA%A2nh/33b869f90619e81763dbf1fccc896d8d--lion-logo-modern-logo.jpg",
    logoSize: 0,
    logoBackgroundColor: "white",
    logoMargin: 0,
    logoBorderRadius: 0,
    quietZone: 0,
}