import React, { Component } from 'react'
import PropTypes from 'prop-types';
import { width, height, standarWidth, standardHeight } from "../common/CommonComponent";
import {
    Text,
    ImageBackground, TouchableOpacity
} from 'react-native';
import styles from "../theme/styles_Card";
import FormAdd from '../components/FormAdd';
import UploadImages from '../components/UploadImages';

export default class Card extends Component {
    render() {
        return (
            <ImageBackground
                resizeMode="stretch"
                source={require("../assets/images/background.jpg")}
                style={{
                    alignItems: 'center',
                    justifyContent: 'center',
                    flex: 1,
                    backgroundColor: 'white'
                }}>
                <FormAdd>
                    <UploadImages />
                    <TouchableOpacity style={styles.buttonSave}>
                        <Text style={styles.textButtonSave}>
                            ADD
                        </Text>
                    </TouchableOpacity>
                </FormAdd>
            </ImageBackground>
        )
    }
}
