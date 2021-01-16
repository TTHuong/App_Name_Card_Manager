import React, { Component } from 'react';
import PropTypes from 'prop-types';
import {
  StyleSheet, ImageBackground, ScrollView,StatusBar,
} from 'react-native';
import bgSrc from '../assets/images/bgLogin.jpg';
import {width,height,standarWidth,standardHeight} from "../common/CommonComponent";


export default class Wallpaper extends Component {
  render() {
    return (
      <ScrollView style={styles.container} >
        <StatusBar hidden />
        <ImageBackground style={styles.picture} source={bgSrc}>
          {this.props.children}
        </ImageBackground>
      </ScrollView>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    // backgroundColor:'red',
  },
  picture: {
    width:width,
    height:height,
  },
});
