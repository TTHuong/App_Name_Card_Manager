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
  Alert,
} from 'react-native';
import {connect} from 'react-redux';
import {width, height, isValidationEmail} from '../common/CommonComponent';
import Ionicons from 'react-native-vector-icons/Ionicons';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import {FireBaseApp} from '../common/FireBaseConfig';
import AsyncStorage from '@react-native-async-storage/async-storage';
import * as Animatable from 'react-native-animatable';
import QRCodeScanner from 'react-native-qrcode-scanner';
import {RNCamera} from 'react-native-camera';
import MD5 from 'react-native-md5';

class ShareQr extends Component {
  constructor(props) {
    super(props);
    this.state = {
      id: '',
      animationQr: null,
      animationCoating: null,
    };
  }

  shouldComponentUpdate(nextProps, nextState) {
    if (this.props.Status != nextProps.Status) {
      if (nextProps.Status == false) {
        this.setState({
          animationQr: 'rubberBand',
        });
      }
    }
    return true;
  }

  componentDidMount = async () => {
    this.setState({
      id: await AsyncStorage.getItem('@IdUser:key'),
      animationQr: 'bounceInUp',
    });
  };

  notification(val) {
    Alert.alert(
      'Thông báo chia sẻ ',
      val,
      [
        {
          text: 'Ok',
          onPress: () => console.log('Cancel Pressed'),
          style: 'cancel',
        },
      ],
      {cancelable: false},
    );
  }

  onRead = async (e) => {
    if (isValidationEmail(e.data)) {
      this.setState({
        search: 3,
        animationQr: 'rubberBand',
      });
      Keyboard.dismiss();

      var isAcount = await FireBaseApp.auth().fetchSignInMethodsForEmail(
        e.data,
      );
      if (isAcount.length > 0) {
        var email = e.data;
        email = MD5.hex_md5(email.toLowerCase());
        if (email != MD5.hex_md5(this.state.id)) {
          if (email != this.props.card.idusersend) {
            this.props.dispatch({
              type: 'setActivityIndicator',
              value: true,
            });
            FireBaseApp.database()
              .ref('send')
              .child(email)
              .child(this.props.card.idcard)
              .set({
                idcard: this.props.card.idcard,
                idusersend: MD5.hex_md5(this.state.id),
              })
              .then(() => {
                this.props.dispatch({
                  type: 'setActivityIndicator',
                  value: false,
                });
                this.notification('Bạn chia sẻ thành công');
              });
          } else {
            this.notification(
              'Bạn không thể chia sẻ cho chủ sở hữu của card !',
            );
          }
        } else {
          this.notification('Bạn không thể chia sẻ cho chính mình !');
        }
      } else {
        this.notification('Tài khoản chia sẻ này không tồn tại !');
      }
    }
  };

  render() {
    return (
      <Animatable.View
        animation={this.state.animationQr}
        onAnimationEnd={() => {
          this.setState({
            animationQr: null,
          });
        }}
        delay={0}
        duration={1000}
        useNativeDriver
        style={styles.container}>
        <ImageBackground
          source={require('../assets/images/shareqr.jpg')}
          resizeMode="center"
          style={{
            flex: 1,
            justifyContent: 'center',
            alignItems: 'center',
            // backgroundColor: 'red',
          }}>
          <View
            style={{
              width: '90%',
              height: '90%',
              // backgroundColor: 'blue',
              // borderRadius: 10,
            }}>
            {(() => {
              if (this.props.Status == false) {
                return (
                  <QRCodeScanner
                    ref={(node) => {
                      this.scanner = node;
                    }}
                    reactivate={true}
                    reactivateTimeout={4000}
                    onRead={(e) => this.onRead(e)}
                  />
                );
              }
            })()}
          </View>
        </ImageBackground>
        {(() => {
          if (this.props.Status == true) {
            return (
              <Animatable.View
                animation={this.state.animationCoating}
                onAnimationEnd={() => {
                  this.setState({
                    animationCoating: null,
                  });
                }}
                delay={0}
                duration={1000}
                useNativeDriver
                style={{
                  width: '100%',
                  height: '100%',
                  backgroundColor: '#e0e0e0',
                  zIndex: 10,
                  position: 'absolute',
                  opacity: 0.3,
                }}></Animatable.View>
            );
          }
        })()}
      </Animatable.View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 7,
    // backgroundColor: 'red',
  },
});

function mapStateToProps(state) {
  return {
    Status: state.Status,
  };
}

export default connect(mapStateToProps)(ShareQr);
