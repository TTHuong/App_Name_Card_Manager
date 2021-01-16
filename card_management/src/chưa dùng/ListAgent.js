import React, {Component} from 'react';
import {StyleSheet, Text, View, Image} from 'react-native';
import {connect} from 'react-redux';

class ListAgent extends Component {
  render() {
    return (
      <View style={styles.container}>
        <View style={styles.con}>
          <Text style={styles.textAgent}>Agent</Text>
        </View>
        <View style={styles.middle}>
          <Text style={styles.title}>PH Housing</Text>
          <Text>Agent</Text>
        </View>
        <View style={styles.right}>
          <View style={styles.iconBtn}>
            <Image
              style={styles.icon}
              source={require('../assets/images/comment.png')}
            />
          </View>
          <View style={styles.iconBtn}>
            <Image
              style={styles.icon}
              source={require('../assets/images/call.png')}
            />
          </View>
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  icon: {
    width: 20,
    height: 20,
  },
  right: {
    flexDirection: 'row',
  },

  iconBtn: {
    padding: 10,
    borderRadius: 20,
    backgroundColor: '#FFF',
    shadowColor: '#2e5162',
    shadowOffset: {
      width: 0,
      height: 0,
    },
    shadowOpacity: 0.2,
    shadowRadius: 6,
    marginLeft: 10,
  },

  con: {
    width: 45,
    height: 45,
    backgroundColor: '#2e5162',
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 40,
  },
  textAgent: {
    color: '#FFF',
  },
  title: {
    fontSize: 18,
  },
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingTop: 10,
  },
  middle: {
    paddingHorizontal: 20,
    flex: 1,
  },
});

export default connect()(ListAgent); 
