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
import {FireBaseApp} from '../common/FireBaseConfig';
import {connect} from 'react-redux';
import AsyncStorage from '@react-native-async-storage/async-storage';
import MD5 from 'react-native-md5';

class LoginScreen extends Component {
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

  Login = async () => {
    try {
      if (
        this.state.email != null &&
        this.state.email != '' &&
        this.state.password != null &&
        this.state.password != ''
      ) {
        var passMd5 = MD5.hex_md5(this.state.password);
        FireBaseApp.auth()
          .signInWithEmailAndPassword(this.state.email, passMd5)
          .then((data) => {
            // this.props.dispatch({
            //   type: 'changeIdUser',
            //   value: MD5.hex_md5(this.state.email),
            // });
            // console.log(data.user.uid);
            var email = this.state.email;
            this.setIdUser(email.toLowerCase());
            this.props.navigation.navigate('Home');
          })
          .catch(function (error) {
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
              'Thông báo đăng nhập không thành công !',
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
        <Text style={styles.title}>Đăng Nhập</Text>
        <Text style={styles.text}>Đăng nhập với email và mật khẩu </Text>
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
        <TouchableOpacity style={styles.login} onPress={() => this.Login()}>
          <Text style={styles.textLogin}> Đăng nhập </Text>
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
    fontFamily:"icielCadena",
    fontSize: 30,
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

// function mapStateToProps(state) {
//   return {
//     Id: state.IdUser,
//   };
// }

// export default connect(mapStateToProps)(LoginScreen);
export default connect()(LoginScreen);
