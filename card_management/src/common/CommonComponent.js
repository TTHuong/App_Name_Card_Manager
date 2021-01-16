import {Dimensions, Linking, Alert} from 'react-native';
import {FireBaseApp} from '../common/FireBaseConfig';

export const {width, height} = Dimensions.get('window');
export const standarWidth = 360;
export const standardHeight = 592;
export const Region = {
  latitude: 10.980624,
  longitude: 106.674425,
  latitudeDelta: 0.009,
  longitudeDelta: 0.009,
};
export const Validation = {
  email: true,
  phone: true,
  position: true,
  website: true,
  yourname: true,
  address: true,
  companyname: true,
  linkimage: true,
};
export function getDate() {
  var date = new Date().getDate(); //Current Date
  var month = new Date().getMonth() + 1; //Current Month
  var year = new Date().getFullYear(); //Current Year
  var hours = new Date().getHours(); //Current Hours
  var min = new Date().getMinutes(); //Current Minutes
  var sec = new Date().getSeconds(); //Current Seconds
  var key =
    date + '-' + month + '-' + year + '-' + hours + ':' + min + ':' + sec;
  return key;
}
export function ucWords(str) {
  return (str + '').replace(/^([a-z])|\s+([a-z])/g, function ($1) {
    return $1.toUpperCase();
  });
}
export function toUpper(str) {
  var position = str;
  position = position.charAt(0).toUpperCase() + position.slice(1).toLowerCase();
  return position;
}
export function changePhoneNumber(str) {
  var array = str.replace(/ +/g, '');
  array = array.split('');
  var text = '';
  for (var i = 0; i < array.length; i++) {
    if (i == 4) {
      text += ' ';
    } else if (i == 7) {
      text += ' ';
    }
    text += array[i];
  }
  return text;
}
export async function openLink(url) {
  url = url.toLowerCase();
  const supported = await Linking.canOpenURL(url);
  if (supported) {
    await Linking.openURL(url);
  } else {
    Alert.alert(
      'Thông báo !',
      'Liên kế không thể mở được, bạn có thể thử lại sau !',
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
}
export function sendEmail(text) {
  text = text.toLowerCase();
  Linking.openURL(`mailto:${text}`);
}
export function call(text) {
  Linking.openURL(`tel:${text}`);
}
export function isValidationEmail(text) {
  let reg = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  if (reg.test(text) === false) {
    return false;
  } else {
    return true;
  }
}
export function isValidationPhone(text) {
  const reg = /^\d{10}$/;
  if (reg.test(text) === false) {
    return false;
  } else {
    return true;
  }
}
