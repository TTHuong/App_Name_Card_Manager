import React, {Component} from 'react';
import {connect} from 'react-redux';
import {View, ActivityIndicator} from 'react-native';
import {width, height} from '../common/CommonComponent';

class Indicator extends Component {
  render() {
    return (
      <View
        style={{
          position: 'absolute',
          zIndex: 30,
          width: width,
          height: height,
          justifyContent: 'center',
          alignItems: 'center',
        }}>
        <View
          style={{
            backgroundColor: '#dddddd',
            width: width,
            height: height,
            opacity: 0.2,
          }}></View>
        <ActivityIndicator
          style={{position: 'absolute', zIndex: 20}}
          size={40}
          color="#386de8"
        />
      </View>
    );
  }
}

export default connect()(Indicator);
