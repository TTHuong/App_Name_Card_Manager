import React, {Component} from 'react';
import PropTypes from 'prop-types';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
  TextInput,
  Platform,
  Image,
  Animated,
  Modal,
} from 'react-native';
import {connect} from 'react-redux';
import {width, height} from '../common/CommonComponent';
import Feather from 'react-native-vector-icons/Feather';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import LinearGradient from 'react-native-linear-gradient';
import Ionicons from 'react-native-vector-icons/Ionicons';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import * as Animatable from 'react-native-animatable';

class ChooseTemplate extends Component {
  constructor(props) {
    super(props);
    this.state = {
      show: false,
    };
  }

  componentDidMount = async () => {
    let that = this;
    setTimeout(function () {
      that.setState({show: true});
    }, 2000);
  };

  close() {
    this.props.dispatch({
      type: 'setShowTemplate',
      value: false,
    });
  }

  chooseTemplate(val) {
    this.props.dispatch({
      type: 'setTemplate',
      value: val,
    });
    this.close();
  }

  render() {
    return (
      <Modal
        animationType="slide"
        transparent={true}
        visible={this.props.ShowTemplate}>
        <View
          // onPress={() => this.close()}
          style={{
            justifyContent: 'center',
            alignItems: 'center',
            width: '100%',
            height: '100%',
          }}>
          {(() => {
            if (this.state.show) {
              return (
                <Animatable.View
                  animation="rubberBand"
                  style={styles.container}>
                  <View style={styles.close}>
                    <TouchableOpacity
                      activeOpacity={0.7}
                      onPress={() => this.close()}
                      style={styles.btnClose}>
                      <Ionicons
                        name="md-close-outline"
                        size={28}
                        color="black"
                      />
                    </TouchableOpacity>
                  </View>
                  <ScrollView
                    contentContainerStyle={{
                      justifyContent: 'center',
                      alignItems: 'center',
                    }}
                    showsHorizontalScrollIndicator={false}
                    horizontal={true}
                    pagingEnabled={true}
                    style={styles.scrollview}>
                    <TouchableOpacity
                      activeOpacity={0.8}
                      onPress={() => this.chooseTemplate(1)}
                      style={styles.item}>
                      <Image
                        resizeMode="contain"
                        style={styles.image}
                        source={require('../assets/images/template1.png')}
                      />
                    </TouchableOpacity>
                    <TouchableOpacity
                      activeOpacity={0.8}
                      onPress={() => this.chooseTemplate(2)}
                      style={styles.item}>
                      <Image
                        resizeMode="contain"
                        style={styles.image}
                        source={require('../assets/images/template2.png')}
                      />
                    </TouchableOpacity>
                  </ScrollView>
                </Animatable.View>
              );
            }
          })()}
        </View>
      </Modal>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    width: '98%',
    height: 210,
    // backgroundColor: 'red',
    borderRadius: 10,
    flexDirection: 'column',
  },
  close: {
    width: '100%',
    height: 30,
    marginBottom: 10,
    // backgroundColor: 'green',
    alignItems: 'flex-end',
  },
  btnClose: {
    width: 30,
    height: 30,
    borderRadius: 30,
    borderWidth: 1,
    borderColor: 'black',
    backgroundColor:'white'
  },
  scrollview: {
    width: '100%',
    height: 170,
    // backgroundColor: 'blue',
  },
  item: {
    height: 150,
    width: width - 50,
    // backgroundColor: 'red',
    borderRadius: 10,
    marginLeft: 18,
  },
  image: {
    width: '100%',
    height: '100%',
    // borderRadius: 10,
    // borderColor: 'black',
    // borderWidth: 1,
  },
});

function mapStateToProps(state) {
  return {
    ShowTemplate: state.ShowTemplate,
  };
}
export default connect(mapStateToProps)(ChooseTemplate);
