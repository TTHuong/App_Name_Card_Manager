import React, {Component} from 'react';
import PropTypes from 'prop-types';
import {StyleSheet, View, Text, Image } from 'react-native';
import {width,height,standarWidth,standardHeight} from "../common/CommonComponent";

export default class Logo extends Component {
  render() {
    return (
      <View style={styles.container}>
        {/* <Image source={'../assets/images/Logo.png'} style={styles.image} /> */}
        <Text style={styles.text}>CARD MANAGEMENT</Text>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 3,
    alignItems: 'center',
    justifyContent: 'center',
  },
  image: {
    width: 80/standarWidth*width,
    height: 80/standardHeight*height,
  },
  text: {
    color: 'white',
    fontWeight: 'bold',
    backgroundColor: 'transparent',
    marginTop: 20/standardHeight*height,
    fontSize:19/standarWidth*width,
  },
});
