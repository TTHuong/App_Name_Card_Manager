import React, {Component} from 'react';
import {StyleSheet, Text, View, Image} from 'react-native';
import {connect} from 'react-redux';

class ListButton extends Component {
  render() {
    return (
      <View>
        <View style={styles.top}>
          <Image source={this.props.icon} />
          <Text style={styles.txt}>{this.props.num}</Text>
        </View>
        <Text>{this.props.title}</Text>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  top: {
    flexDirection: 'row',
  },
  txt: {
    fontSize: 18,
    marginLeft: 10,
  },
});

export default connect()(ListButton);
