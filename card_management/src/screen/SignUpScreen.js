import React, {Component} from 'react';
import {
  Text,
  View,
  StyleSheet,
  TextInput,
  Image,
  TouchableOpacity,
  Alert,
  StatusBar,
} from 'react-native';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
// import {SignUp} from '../untils/handle_FormLoginAndRegistration';
import {FireBaseApp} from '../common/FireBaseConfig';
import {connect} from 'react-redux';
import AsyncStorage from '@react-native-async-storage/async-storage';
import MD5 from 'react-native-md5';

class SignUpScreen extends Component {
  constructor(props) {
    super(props);
    this.state = {
      borderColor: null,
      email: null,
      password: null,
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

  setIdUser = async (value) => {
    await AsyncStorage.setItem('@IdUser:key', value);
  };

  SignUp = async () => {
    try {
      if (
        this.state.email != null &&
        this.state.email != '' &&
        this.state.password != null &&
        this.state.password != ''
      ) {
        // SignUp(this.state.email, this.state.password,this.props);
        var passMd5 = MD5.hex_md5(this.state.password);
        FireBaseApp.auth()
          .createUserWithEmailAndPassword(this.state.email, passMd5)
          .then(() => {
            // this.props.dispatch({
            //   type: 'changeIdUser',
            //   value: MD5.hex_md5(this.state.email),
            // });
            var email = this.state.email;
            this.setIdUser(email.toLowerCase());
            this.props.navigation.navigate('Home');
          })
          .catch(function (error) {
            console.log(error);
            var notification = '';
            if (error == 'Error: The email address is badly formatted.') {
              notification = 'Vui lòng nhập đúng định dạng email !';
            } else if (
              error ==
              'Error: The email address is already in use by another account.'
            ) {
              notification = 'Tài khoản này đã tồn tại !';
            } else {
              notification = error;
            }
            Alert.alert(
              'Thông báo đăng ký không thành công !',
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
          'Thông báo thông tin đăng ký !',
          'Vui lòng điền đầy đủ thông tin ',
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
    } catch (error) {
      console.log(error);
    }
  };

  render() {
    return (
      <View style={styles.container}>
        <StatusBar hidden backgroundColor="white" barStyle={'dark-content'} />
        <Text style={styles.title}>Đăng Ký</Text>
        <Text style={styles.text}>Đăng ký với email và mật khẩu </Text>
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

          <View
            style={[
              styles.section,
              {
                borderColor:
                  this.state.borderColor == 'password' ? '#3465d9' : 'gray',
              },
            ]}>
            <MaterialIcons
              name="lock-outline"
              size={25}
              color={this.state.borderColor == 'password' ? '#3465d9' : 'gray'}
            />
            <TextInput
              placeholder={'Mật Khẩu'}
              style={styles.textInput}
              secureTextEntry
              onFocus={() => this.onFocus('password')}
              onChangeText={(value) => this.setState({password: value})}
              value={this.state.password}
            />
          </View>
        </View>

        <TouchableOpacity
          onPress={() => this.props.navigation.navigate('ForgetPassWord')}>
          <Text style={styles.forget}>Quên mật khẩu ? </Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.login} onPress={() => this.SignUp()}>
          <Text style={styles.textLogin}> Đăng ký </Text>
        </TouchableOpacity>
        <View style={styles.signup}>
          <Text
            style={[
              styles.textSignup,
              {
                color: 'gray',
              },
            ]}>
            Đã có tài khoản ?
          </Text>

          <TouchableOpacity
            onPress={() => this.props.navigation.navigate('Login')}>
            <Text
              style={[
                styles.textSignup,
                {
                  color: '#3465d9',
                  marginLeft: 3,
                },
              ]}>
              Đăng Nhập
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
    fontFamily:"icielCadena"
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

export default connect()(SignUpScreen);
