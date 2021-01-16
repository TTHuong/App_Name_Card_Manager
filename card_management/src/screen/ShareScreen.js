import React, {Component} from 'react';
import PropTypes from 'prop-types';
import {
  View,
  StyleSheet,
  TouchableOpacity,
  TextInput,
  Keyboard,
  ImageBackground,
  Text,
} from 'react-native';
import {connect} from 'react-redux';
import {width, height, isValidationEmail} from '../common/CommonComponent';
import Ionicons from 'react-native-vector-icons/Ionicons';
import Indicator from '../components/Indicator';
import ShareEmail from '../components/ShareEmail';
import LinearGradient from 'react-native-linear-gradient';
import ShareQr from '../components/ShareQr';
import {RNCamera} from 'react-native-camera';


class ShareScreen extends Component {
  constructor(props) {
    super(props);
    this.state = {
      activityIndicator: false,
      send: '',
      search: 3,
      animationSearch: null,
      animationCoating: null,
    };
  }

  componentDidMount = async () => {
    this.setState({
      animationSearch: 'bounceInDown',
    });
  };

  back() {
    this.props.dispatch({
      type: 'setStatus',
      value: true,
    });
    this.props.navigation.goBack();
  }

  status() {
    if (this.props.Status) {
      this.props.dispatch({
        type: 'setStatus',
        value: false,
      });
      this.props.dispatch({
        type: 'setRNCamera',
        value: RNCamera.Constants.FlashMode.auto,
      });
    } else {
      this.props.dispatch({
        type: 'setStatus',
        value: true,
      });
      this.props.dispatch({
        type: 'setRNCamera',
        value: RNCamera.Constants.FlashMode.off,
      });
    }
  }

  render() {
    return (
      <View style={styles.container}>
        {(() => {
          if (this.props.activityIndicator) {
            return <Indicator />;
          }
        })()}
        <View style={styles.header}>
          <TouchableOpacity
            style={styles.back}
            activeOpacity={0.7}
            onPress={() => this.back()}>
            <Ionicons name="chevron-back-sharp" size={29} color="#386de8" />
          </TouchableOpacity>
          <Text style={styles.title}>CHIA SẺ ĐỂ NHẬN ĐƯỢC NHIỀU HƠN</Text>
        </View>

        <ShareEmail card={this.props.route.params.card} />

        <View style={styles.mid}>
          <View
            style={{
              height: 2,
              width: '80%',
              backgroundColor: 'black',
            }}></View>
          <LinearGradient
            colors={['#0537ad', '#84e0ff']}
            start={{x: 0, y: 1}}
            end={{x: 1, y: 0}}
            style={styles.convert}>
            <TouchableOpacity
              style={{
                width: '100%',
                height: '100%',
                justifyContent: 'center',
                alignItems: 'center',
              }}
              onPress={() => this.status()}>
              {(() => {
                if (this.props.Status == false) {
                  return (
                    <Ionicons name="md-mail-outline" color="white" size={25} />
                  );
                } else {
                  return (
                    <Ionicons name="qr-code-outline" color="white" size={25} />
                  );
                }
              })()}
            </TouchableOpacity>
          </LinearGradient>
        </View>

        <ShareQr card={this.props.route.params.card} />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    width: width,
    height: height,
    backgroundColor: 'white',
    justifyContent: 'center',
  },
  header: {
    flex: 1,
    flexDirection: 'row',
  },
  back: {
    marginLeft: 15,
    marginTop: 13,
    flex: 2,
  },
  title: {
    flex: 12,
    marginRight: 20,
    fontFamily: 'iCielCadena',
    fontSize: 18,
    paddingTop: 13,
    color: '#386de8',
  },
  search: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  frameSearch: {
    backgroundColor: '#f7f4f4',
    borderRadius: 5,
    marginTop: -20,
    flexDirection: 'row',
    paddingRight: 10,
    paddingLeft: 10,
    width: '93%',
    height: 40,
    borderWidth: 1,
    borderColor: '#9b9b9b',
  },
  txtsearch: {
    flex: 14,
    marginRight: 5,
  },
  close: {
    width: 25,
    height: 40,
    alignItems: 'center',
    justifyContent: 'center',
  },
  mid: {
    flex: 1,
    // backgroundColor: 'blue',
    justifyContent: 'center',
    alignItems: 'center',
  },
  convert: {
    width: 36,
    height: 36,
    borderRadius: 5,
    position: 'absolute',
    zIndex: 10,
  },
});

function mapStateToProps(state) {
  return {
    Status: state.Status,
    activityIndicator: state.activityIndicator,
  };
}

export default connect(mapStateToProps)(ShareScreen);
