import React, {Component} from 'react';
import {
  Text,
  View,
  StyleSheet,
  TextInput,
  Image,
  TouchableOpacity,
  Alert,
} from 'react-native';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
// import {ForgetPassWord} from '../untils/handle_FormLoginAndRegistration';
import {FireBaseApp} from '../common/FireBaseConfig';

export default class ForgetPassWordScreen extends Component {
  constructor(props) {
    super(props);
    this.state = {
      borderColor: null,
      email: null,
    };
  }

  componentWillUnmount() {
    FireBaseApp.auth().onAuthStateChanged((user) => {
      if (user) {
        this.props.navigation.navigate('Home');
      }
    });
  }

  onFocus(value) {
    this.setState({
      borderColor: value,
    });
  }

  ForgetPassWord() {
    if (this.state.email != null && this.state.email != '') {
      // ForgetPassWord(this.state.email,this.props);
      FireBaseApp.auth()
        .sendPasswordResetEmail(this.state.email)
        .then(() => {
          Alert.alert(
            'Thông báo quên mật khẩu !',
            'Gửi tin lấy lại mật khẩu thành công',
            [
              {
                text: 'OK',
                onPress: () => this.props.navigation.navigate('Swiper'),
              },
            ],
            {cancelable: false},
          );
        })
        .catch(function (error) {
          console.log(error);
          var notification = '';
          if (error == 'Error: The email address is badly formatted.') {
            notification = 'Vui lòng nhập đúng định dạng email !';
          } else if (
            error ==
            'Error: There is no user record corresponding to this identifier. The user may have been deleted.'
          ) {
            notification = 'Tài khoản này không tồn tại !';
          } else {
            notification = error;
          }
          Alert.alert(
            'Thông báo quên mật khẩu !',
            notification,
            [
              {
                text: 'Ok',
                onPress: () => console.log('Cancel Pressed'),
                style: 'cancel',
              },
            ],
            {cancelable: false},
          );
        });
    } else {
      Alert.alert(
        'Thông báo thông tin lấy lại mật khẩu !',
        'Vui lòng điền đầy đủ thông tin ',
        [
          //   {
          //     text: 'Ask me later',
          //     onPress: () => console.log('Ask me later pressed'),
          //   },
          {
            text: 'Ok',
            onPress: () => console.log('Cancel Pressed'),
            style: 'cancel',
          },
          //   {text: 'OK', onPress: () => console.log('OK Pressed')},
        ],
        {cancelable: false},
      );
    }
  }

  render() {
    return (
      <View style={styles.container}>
        <Text style={styles.title}>Quên Mật Khẩu </Text>
        <Text style={styles.text}>Lấy lại mật khẩu với email đã đăng ký </Text>
        <View style={styles.action}>
          <View
            style={[
              styles.section,
              {
                borderColor:
                  this.state.borderColor == 'email' ? '#3465d9' : 'gray',
              },
            ]}>
            <MaterialIcons
              name="email"
              size={25}
              color={this.state.borderColor == 'email' ? '#3465d9' : 'gray'}
            />
            <TextInput
              placeholder={'Email'}
              style={styles.textInput}
              onFocus={() => this.onFocus('email')}
              onChangeText={(value) => this.setState({email: value})}
              value={this.state.email}
            />
          </View>
        </View>

        <TouchableOpacity
          style={styles.login}
          onPress={() => this.ForgetPassWord()}>
          <Text style={styles.textLogin}> Gửi </Text>
        </TouchableOpacity>
        <View style={styles.signup}>
          <Text
            style={[
              styles.textSignup,
              {
                color: 'gray',
              },
            ]}>
            Không có tài khoản ?
          </Text>

          <TouchableOpacity
            onPress={() => this.props.navigation.navigate('SignUp')}>
            <Text
              style={[
                styles.textSignup,
                {
                  color: '#3465d9',
                  marginLeft: 3,
                },
              ]}>
              Đăng Ký{' '}
            </Text>
          </TouchableOpacity>
        </View>
      </View>
    );
  }
}

var styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
    justifyContent: 'center',
    paddingHorizontal: 30,
    paddingVertical: 100,
  },
  title: {
    color: '#3465d9',
    // fontWeight: 'bold',
    fontSize: 30,
    fontFamily: 'icielCadena',
  },
  text: {
    color: 'gray',
  },
  section: {
    flexDirection: 'row',
    borderWidth: 1,
    borderRadius: 5,
    paddingVertical: 10,
    paddingHorizontal: 15,
    alignItems: 'center',
    marginTop: 10,
    // backgroundColor:'blue',
    // height:56,
  },
  textInput: {
    flex: 1,
    paddingLeft: 10,
    // backgroundColor:'yellow',
    height: 38,
  },
  forget: {
    textAlign: 'right',
    marginTop: 15,
    color: '#3465d9',
  },
  textLogin: {
    color: 'white',
    fontSize: 15,
    fontWeight: 'bold',
  },
  login: {
    width: '100%',
    height: 40,
    backgroundColor: '#3465d9',
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 50,
    marginTop: 25,
  },
  signup: {
    marginTop: 25,
    flexDirection: 'row',
    justifyContent: 'center',
  },
  textSignup: {
    textAlign: 'center',
  },
});
