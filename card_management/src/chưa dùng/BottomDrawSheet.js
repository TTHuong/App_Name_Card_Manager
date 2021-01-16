import React, { Component } from "react";
import { StyleSheet, Text } from "react-native";
import RBSheet from "./RBSheet";
import { width, height, standarWidth, standardHeight } from "../common/CommonComponent";
import Option from "./Option";
import PropTypes from 'prop-types';

export default class BottomDrawSheet extends Component {
    open() {
        this.RBSheet.open()
    }
    close() {
        this.RBSheet.close()
    }
    onPressUser(){
        this.props.onPressUser();

    }

    render() {
        return (
            <RBSheet
                ref={ref => {
                    this.RBSheet = ref;
                }}
                height={50}
                openDuration={100}
                // closeOnDragDown={true}
                customStyles={{
                    container: {
                        backgroundColor: '#ffffff',
                        borderTopLeftRadius: 7 / standarWidth * width,
                        borderTopRightRadius: 7 / standarWidth * width,
                    }
                }}
            >
                <Option
                    onPressUser={() => this.props.onPressUser()}
                    onPressAddCard={() => this.props.onPressAddCard()}
                    onPressSelectListTick={() => this.props.onPressSelectListTick()}
                    onPressScanQrCode={() => this.props.onPressScanQrCode()}
                    onPressLogout={() => this.props.onPressLogout()}
                />
            </RBSheet>
        );
    }
}

BottomDrawSheet.PropTypes = {
    onPressUser: PropTypes.func,
    onPressAddCard: PropTypes.func,
    onPressSelectListTick: PropTypes.func,
    onPressScanQrCode: PropTypes.func,
    onPressLogout: PropTypes.func,
};