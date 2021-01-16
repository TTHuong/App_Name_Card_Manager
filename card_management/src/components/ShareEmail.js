import React, {Component} from 'react';
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
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import {FireBaseApp} from '../common/FireBaseConfig';
import AsyncStorage from '@react-native-async-storage/async-storage';
import * as Animatable from 'react-native-animatable';
import {
  width,
  height,
  isValidationEmail,
  getDate,
} from '../common/CommonComponent';
import MD5 from 'react-native-md5';

class ShareEmail extends Component {
  constructor(props) {
    super(props);
    this.state = {
      send: '',
      id: '',
      search: 3,
      animationSearch: null,
      animationCoating: null,
      isValidationEmail: true,
    };
  }

  shouldComponentUpdate(nextProps, nextState) {
    if (this.props.Status != nextProps.Status) {
      if (nextProps.Status == true) {
        this.outFocus();
      } else {
        Keyboard.dismiss();
      }
    }
    return true;
  }

  componentDidMount = async () => {
    this.setState({
      id: await AsyncStorage.getItem('@IdUser:key'),
      animationSearch: 'bounceInDown',
    });
  };

  onChangeText(val) {
    this.setState({
      send: val,
    });
    if (isValidationEmail(val)) {
      this.setState({
        isValidationEmail: true,
      });
    } else {
      this.setState({
        isValidationEmail: false,
      });
    }
  }

  onFocus() {
    this.setState({
      search: 6,
      animationSearch: 'rubberBand',
    });
  }

  outFocus() {
    this.setState({
      search: 3,
      animationSearch: 'rubberBand',
    });
    Keyboard.dismiss();
  }

  notification(val) {
    Alert.alert(
      'Thông báo chia sẻ',
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

  share = async () => {
    if (this.state.send != '') {
      if (isValidationEmail(this.state.send)) {
        this.setState({
          search: 3,
          animationSearch: 'rubberBand',
        });
        Keyboard.dismiss();

        var isAcount = await FireBaseApp.auth().fetchSignInMethodsForEmail(
          this.state.send,
        );
        if (isAcount.length > 0) {
          var email = this.state.send;
          email = MD5.hex_md5(email.toLowerCase());
          if (email != MD5.hex_md5(this.state.id)) {
            if (email != this.props.card.idusersend) {
              console.log(email)
              console.log(this.props.card)
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
    }
  };

  render() {
    return (
      <Animatable.View
        animation={this.state.animationSearch}
        onAnimationEnd={() => {
          this.setState({
            animationSearch: null,
          });
        }}
        delay={0}
        duration={1000}
        useNativeDriver
        style={[
          styles.search,
          {
            flex: this.state.search,
          },
        ]}>
        <ImageBackground
          source={require('../assets/images/share.jpg')}
          resizeMode="center"
          style={{
            width: '100%',
            height: '100%',
            justifyContent: 'center',
            alignItems: 'center',
          }}>
          <View
            style={[
              styles.frameSearch,
              {
                borderColor: this.state.isValidationEmail ? '#9b9b9b' : 'red',
              },
            ]}>
            <TextInput
              onFocus={() => this.onFocus()}
              onSubmitEditing={() => {
                this.outFocus();
              }}
              style={styles.txtsearch}
              placeholder="Email tài khoản mà bạn muốn chia sẻ card..."
              value={this.state.send}
              onChangeText={(val) => this.onChangeText(val)}></TextInput>

            <TouchableOpacity
              activeOpacity={0.7}
              onPress={() => this.share()}
              style={styles.close}>
              <FontAwesome
                name="send-o"
                size={25}
                color={this.state.isValidationEmail ? 'gray' : 'red'}
              />
            </TouchableOpacity>
          </View>
        </ImageBackground>
        {(() => {
          if (this.props.Status == false) {
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
  search: {
    // backgroundColor: 'red',
    justifyContent: 'center',
    alignItems: 'center',
  },
  frameSearch: {
    backgroundColor: '#f7f7f7',
    borderRadius: 5,
    marginTop: -20,
    flexDirection: 'row',
    paddingRight: 10,
    paddingLeft: 10,
    width: '93%',
    height: 40,
    borderWidth: 1,
    // borderColor: '#9b9b9b',
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
});

function mapStateToProps(state) {
  return {
    Status: state.Status,
    activityIndicator: state.activityIndicator,
  };
}

export default connect(mapStateToProps)(ShareEmail);
