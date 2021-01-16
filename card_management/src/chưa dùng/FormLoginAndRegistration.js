import React, { Component } from 'react';
import PropTypes from 'prop-types';
import {
  StyleSheet,
  KeyboardAvoidingView,
  TouchableOpacity,
  Image,
} from 'react-native';

import UserInput from './UserInput';
import ButtonSubmit from './ButtonSubmit';
import SignupSection from './SignupSection';
import usernameImg from '../assets/images/username.png';
import passwordImg from '../assets/images/password.png';
import eyeImg from '../assets/images/eye_black.png';
import styles from "../theme/styles_FormLogin";
import Handle from '../untils/handle_FormLoginAndRegistration';

export default class FormLoginAndRegistration extends Component {
  constructor(props) {
    super(props);
    this.state = {
      showPass: true,
      press: false,
    };
    this.showPass = this.showPass.bind(this);
  }

  showPass() {
    this.state.press === false
      ? this.setState({ showPass: false, press: true })
      : this.setState({ showPass: true, press: false });
  }

  onPressSubmit(){
    // if(this.props.isFunction){
    //   Handle.Login();
    // }
  }

  render() {
    return (
      <KeyboardAvoidingView behavior="padding" style={styles.container}>
        <UserInput
          source={usernameImg}
          placeholder="Username"
          autoCapitalize={'none'}
          returnKeyType={'done'}
          autoCorrect={false}
        />
        <UserInput
          source={passwordImg}
          secureTextEntry={this.state.showPass}
          placeholder="Password"
          returnKeyType={'done'}
          autoCapitalize={'none'}
          autoCorrect={false}
        />
        <TouchableOpacity
          activeOpacity={0.7}
          style={styles.btnEye}
          onPress={this.showPass}>
          <Image source={eyeImg} style={styles.iconEye} />
        </TouchableOpacity>

        <ButtonSubmit title={this.props.title} onPress={() => this.onPressSubmit()} />
        {
          (() => {
            if (this.props.isFunction == true) {
              return (
                <SignupSection Props={this.props.Props} />
              )
            }
          })()
        }
      </KeyboardAvoidingView>
    );
  }
}

FormLoginAndRegistration.PropTypes = {
  Props: PropTypes.object,
  isFunction: PropTypes.bool,
  title: PropTypes.string,
}
FormLoginAndRegistration.defaultProps = {
  isFunction: true,
  title: "LOGIN",
}
