import React, { Component } from 'react';
import PropTypes from 'prop-types';
import {
  StyleSheet, TouchableOpacity, Text, Animated, Easing, Image, View,
} from 'react-native';
import { width, height, standarWidth, standardHeight } from "../common/CommonComponent";
import spinner from '../assets/images/logo.png';
// import spinner from '../images/loading.gif';

const MARGIN = 40;

export default class ButtonSubmit extends Component {
  constructor(props) {
    super(props);

    this.state = {
      isLoading: false,
    };

    this.buttonAnimated = new Animated.Value(0);
    this.growAnimated = new Animated.Value(0);
    this._onPress = this._onPress.bind(this);
  }

  _onPress() {
    if (this.state.isLoading) return;

    this.setState({ isLoading: true });
    Animated.timing(this.buttonAnimated, {
      toValue: 1,
      duration: 200,
      easing: Easing.linear,
    }).start();

    setTimeout(() => {
      this._onGrow();
    }, 2000);

    setTimeout(() => {
      this.props.onPress();
      this.setState({ isLoading: false });
      this.buttonAnimated.setValue(0);
      this.growAnimated.setValue(0);
    }, 2300);
  }

  _onGrow() {
    Animated.timing(this.growAnimated, {
      toValue: 1,
      duration: 200,
      easing: Easing.linear,
    }).start();
  }

  render() {
    const changeWidth = this.buttonAnimated.interpolate({
      inputRange: [0, 1],
      outputRange: [width - MARGIN, MARGIN],
    });
    const changeScale = this.growAnimated.interpolate({
      inputRange: [0, 1],
      outputRange: [1, MARGIN],
    });

    return (
      <View style={styles.container}>
        <Animated.View style={{ width: changeWidth }}>
          <TouchableOpacity
            style={styles.button}
            onPress={this._onPress}
            activeOpacity={1}>
            {this.state.isLoading ? (
              <Image source={spinner} style={styles.image} />
            ) : (
                <Text style={styles.text}>{this.props.title}</Text>
              )}
          </TouchableOpacity>
          <Animated.View
            style={[styles.circle, { transform: [{ scale: changeScale }] }]}
          />
        </Animated.View>
      </View>
    );
  }
}

ButtonSubmit.PropTypes={
  onPress:PropTypes.func,
  title:PropTypes.string,
}


const styles = StyleSheet.create({
  container: {
    flex: 1,
    // top: -95 / standardHeight * height,
    top: 45 / standardHeight * height,
    alignItems: 'center',
    justifyContent: 'center',
    // backgroundColor:'blue',
  },
  button: {
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#000000',
    height: MARGIN,
    borderRadius: 7/standarWidth*width,
    zIndex: 100,
    // width:width/2,
    // left:width/5,
    // width:width/3,
  },
  circle: {
    height: MARGIN,
    width: MARGIN,
    marginTop: -MARGIN,
    borderWidth: 1,
    borderColor: 'transparent',
    borderRadius: 100,
    alignSelf: 'center',
    zIndex: 99,
    backgroundColor: 'transparent',
  },
  text: {
    color: 'white',
    backgroundColor: 'transparent',
    fontWeight:'bold',
    fontSize:18/standarWidth*width,
  },
  image: {
    width: 29 / standarWidth * width,
    height: 29 / standardHeight * height,
  },
});
