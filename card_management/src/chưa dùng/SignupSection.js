import React, { Component } from 'react';
import PropTypes from 'prop-types';
import {
  StyleSheet, View, Text, TouchableOpacity,
} from 'react-native';
import { width, height, standarWidth, standardHeight } from "../common/CommonComponent";

export default class SignupSection extends Component {
  render() {
    return (
      <View style={styles.container}>
        <TouchableOpacity
          onPress={()=>this.props.Props.navigation.navigate("RegistrationScreen")}
          activeOpacity={0.7}
          style={styles.buttonAction}>
          <Text style={styles.text}>Create Account</Text>
        </TouchableOpacity>
        <TouchableOpacity
          activeOpacity={0.7}
          style={styles.buttonAction}>
          <Text style={styles.text}>Forgot Password?</Text>
        </TouchableOpacity>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    top: 65 / standarWidth * width,
    width: width,
    flexDirection: 'row',
    justifyContent: 'space-around',
    // backgroundColor:'red'
  },
  text: {
    color: 'white',
    backgroundColor: 'transparent',
  },
  buttonAction: {
    width: width / 2,
    height: 50 / standardHeight * height,
    // backgroundColor:'red',
    justifyContent: 'center',
    alignItems: 'center',
  }
});

SignupSection.PropTypes={
  Props:PropTypes.object,
}