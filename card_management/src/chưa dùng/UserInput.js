import React, {Component} from 'react';
import PropTypes from 'prop-types';
import {StyleSheet, View, TextInput, Image,} from 'react-native';
import {width,height,standarWidth,standardHeight} from "../common/CommonComponent";

export default class UserInput extends Component {
  constructor(props){
    super(props);
    this.state={
      value:this.props.value,
    };
  }

  render() {
    return (
      <View style={styles.inputWrapper}>
        <Image source={this.props.source} style={styles.inlineImg} />
        <TextInput
          value={this.state.value}
          style={styles.input}
          placeholder={this.props.placeholder}
          secureTextEntry={this.props.secureTextEntry}
          autoCorrect={this.props.autoCorrect}
          autoCapitalize={this.props.autoCapitalize}
          returnKeyType={this.props.returnKeyType}
          placeholderTextColor="black"
          underlineColorAndroid="transparent"
          onChangeText={(val)=>this.setState({
            value:val,
          })}
        />
      </View>
    );
  }
}

UserInput.propTypes = {
  source: PropTypes.number.isRequired,
  placeholder: PropTypes.string.isRequired,
  secureTextEntry: PropTypes.bool,
  autoCorrect: PropTypes.bool,
  autoCapitalize: PropTypes.string,
  returnKeyType: PropTypes.string,
  value:PropTypes.string,
};

UserInput.defaultProps={
  value:"",
}

const styles = StyleSheet.create({
  input: {
    backgroundColor: '#ffffff',
    width: width - 40,
    height: 37/standardHeight*height,
    paddingLeft: 45/standarWidth*width,
    paddingRight: 15/standarWidth*width,
    borderRadius: 7,
    color: '#000000',
    fontSize:12/standarWidth*width,

  },
  inputWrapper: {
    marginTop:10/standardHeight*height,
    marginBottom:10/standardHeight*height,
    width: width - 40,
  },
  inlineImg: {
    position: 'absolute',
    zIndex: 99,
    width: 22/standarWidth*width,
    height: 22/standardHeight*height,
    left: 15/standarWidth*width,
    top: 9/standardHeight*height,
  },
});
