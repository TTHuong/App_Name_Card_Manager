import React, {Component} from 'react';
import PropTypes from 'prop-types';
import {
  View,
  Text,
  StyleSheet,
  ImageBackground,
  StatusBar,
  FlatList,
  Image,
  TouchableOpacity,
  TextInput,
} from 'react-native';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import {connect} from 'react-redux';
import {FireBaseApp} from '../common/FireBaseConfig';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {getDate, height, width} from '../common/CommonComponent';
import QRCode from 'react-native-qrcode-svg';
import MD5 from 'react-native-md5';

class MyProfile extends Component {
  constructor(props) {
    super(props);
    this.state = {
      Id: '',
    };
  }

  logout = async () => {
    await AsyncStorage.removeItem('@IdUser:key');
    FireBaseApp.auth()
      .signOut()
      .then(() => this.props.props.navigation.navigate('Swiper'))
      .catch((error) => console.log(error.message));
  };

  componentDidMount = async () => {
    var id = await AsyncStorage.getItem('@IdUser:key');
    this.setState({
      Id: id,
    });
  };

  render() {
    return (
      <View style={styles.container}>
        <StatusBar
          hidden={true}
          backgroundColor="white"
          barStyle={'dark-content'}
        />
        <ImageBackground
          source={require('../assets/images/shareqr.jpg')}
          style={styles.image}
          resizeMode="cover">
          <View style={styles.frameQr}>
            {(() => {
              if (this.state.Id != '') {
                return (
                  <QRCode
                    size={110}
                    value={this.state.Id}
                    backgroundColor="transparent"
                  />
                );
              }
            })()}
          </View>
        </ImageBackground>

        <View style={styles.frameLogout}>
          <TouchableOpacity style={styles.logout} onPress={() => this.logout()}>
            <MaterialCommunityIcons name="logout" color="#3465d9" size={25} />
            <Text style={styles.textLogout}>Đăng xuất</Text>
          </TouchableOpacity>
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
    paddingBottom: 5,
  },
  frameQr: {
    marginTop: -12,
    marginLeft: 13,
  },
  frameLogout: {
    width: '100%',
    height: 40,
    // backgroundColor: 'red',
    alignItems: 'flex-end',
    // marginTop: 10,
  },
  logout: {
    justifyContent: 'center',
    alignItems: 'center',
    flexDirection: 'row',
    // backgroundColor:'red',
    height: '100%',
  },
  textLogout: {
    color: '#3465d9',
    marginLeft: 10,
    fontSize: 15,
    fontWeight: '700',
  },
  image: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});

MyProfile.propTypes = {
  props: PropTypes.object,
};

export default connect()(MyProfile);
