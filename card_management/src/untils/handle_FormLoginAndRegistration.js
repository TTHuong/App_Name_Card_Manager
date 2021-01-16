import {FireBaseApp} from '../common/FireBaseConfig';
import {Alert} from 'react-native';
import MD5 from 'react-native-md5';

export function Login(username, password, props = null) {
  var passMd5 = MD5.hex_md5(password);
  FireBaseApp.auth()
    .signInWithEmailAndPassword(username, passMd5)
    .then(() => {
      props.navigation.navigate('Home');
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
        'Thông báo đăng nhập không thành công !',
        notification,
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
    });
}

export function SignUp(username, password, props = null) {
  var passMd5 = MD5.hex_md5(password);
  FireBaseApp.auth()
    .createUserWithEmailAndPassword(username, passMd5)
    .then(() => {
      props.navigation.navigate('Login');
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
    });
}

export function ForgetPassWord(email, props = null) {
  FireBaseApp.auth()
    .sendPasswordResetEmail(email)
    .then(() => {
      Alert.alert(
        'Thông báo quên mật khẩu !',
        'Gửi tin lấy lại mật khẩu thành công',
        [
          //   {
          //     text: 'Ask me later',
          //     onPress: () => console.log('Ask me later pressed'),
          //   },
          // {
          //   text: 'Ok',
          //   onPress: () => console.log('Cancel Pressed'),
          //   style: 'cancel',
          // },
          {text: 'OK', onPress: () => props.navigation.navigate("Swiper")},
        ],
        {cancelable: false},
      );
    })
    .catch(function (error) {
      // Alert.alert(
      //   'Thông báo lấy lại mật khẩu !',
      //   'Gửi email thất bại , không tồn tài tài khoản này ',
      // );
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
    });
}
