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
  Alert,
} from 'react-native';
import {connect} from 'react-redux';
import {
  width,
  height,
  getDate,
  Region,
  isValidationEmail,
  Validation,
  isValidationPhone,
} from '../common/CommonComponent';
import Feather from 'react-native-vector-icons/Feather';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import LinearGradient from 'react-native-linear-gradient';
import Ionicons from 'react-native-vector-icons/Ionicons';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import {Card} from './../common/CommonScreen';
import {FireBaseApp} from '../common/FireBaseConfig';
// Cannot fit requested classes in a single dex file (# methods: 82071 > 65536) (bị khi cài react-native-image-crop-picker)
//Cách khắc phục lỗi này ,sửa trong android/app/build.gradle
// android {
//   defaultConfig {
//       ...
//       minSdkVersion 15
//       targetSdkVersion 28
//       multiDexEnabled true
//   }
//   ...
// }

// dependencies {
// implementation 'com.android.support:multidex:1.0.3'
// }
import ImagePicker from 'react-native-image-crop-picker';
import AsyncStorage from '@react-native-async-storage/async-storage';
import RNFetchBlob from 'react-native-fetch-blob';
import MD5 from 'react-native-md5';

const storage = FireBaseApp.storage();

const Blob = RNFetchBlob.polyfill.Blob;
const fs = RNFetchBlob.fs;

window.XMLHttpRequest = RNFetchBlob.polyfill.XMLHttpRequest;
window.Blob = Blob;
const Fetch = RNFetchBlob.polyfill.Fetch;
window.fetch = new Fetch({
  auto: true,
}).build();

class Add extends Component {
  constructor(props) {
    super(props);
    this.state = {
      card: this.props.card,
      uploading: false,
      transferred: 0,
      Id: '',
      validation: Validation,
    };
  }

  componentDidMount = async () => {
    var region = {
      latitudeDelta: Region.latitudeDelta,
      longitudeDelta: Region.longitudeDelta,
      latitude: this.props.card.latitude,
      longitude: this.props.card.longitude,
    };
    this.setState({
      Id: await AsyncStorage.getItem('@IdUser:key'),
    });
    this.props.dispatch({
      type: 'setAddress',
      value: this.props.card.address,
    });
    this.props.dispatch({
      type: 'setRegion',
      value: region,
    });
    this.props.dispatch({
      type: 'setTemplate',
      value: this.props.card.template,
    });
  };

  choosePhotoFromLibrary = () => {
    ImagePicker.openPicker({
      // width: 1200,
      // height: 780,
      cropping: true,
    }).then((image) => {
      var imageUri = Platform.OS === 'ios' ? image.sourceURL : image.path;
      this.setState({
        card: {
          ...this.state.card,
          linkimage: imageUri,
        },
        validation: {
          ...this.state.validation,
          linkimage: true,
        },
      });
    });
  };

  uploadImage = (uri, mime = 'application/octet-stream') => {
    return new Promise((resolve, reject) => {
      const uploadUri =
        Platform.OS === 'ios' ? uri.replace('file://', '') : uri;
      const sessionId = MD5.hex_md5(this.state.Id) + getDate();
      let uploadBlob = null;
      const imageRef = storage
        .ref('Images')
        .child(MD5.hex_md5(this.state.Id))
        .child(`${sessionId}.jpg`);
      fs.readFile(uploadUri, 'base64')
        .then((data) => {
          return Blob.build(data, {type: `${mime};BASE64`});
        })
        .then((blob) => {
          uploadBlob = blob;
          return imageRef.put(blob, {contentType: mime});
        })
        .then(() => {
          uploadBlob.close();
          return imageRef.getDownloadURL();
        })
        .then((url) => {
          resolve(url);
        })
        .catch((error) => {
          reject(error);
        });
    });
  };

  isEmpty() {
    var res = true;
    var validation = {...this.state.validation};
    if (this.state.card.companyname == '') {
      res = false;
      validation.companyname = false;
    }
    if (this.state.card.yourname == '') {
      res = false;
      validation.yourname = false;
    }
    if (this.state.card.position == '') {
      res = false;
      validation.position = false;
    }
    if (this.state.card.email == '') {
      res = false;
      validation.email = false;
    }
    if (this.state.card.phone == '') {
      res = false;
      validation.phone = false;
    }
    if (this.state.card.website == '') {
      res = false;
      validation.website = false;
    }
    if (this.props.Address == 'Địa Chỉ') {
      res = false;
      validation.address = false;
    }
    if (this.state.card.linkimage == '') {
      res = false;
      validation.linkimage = false;
    }
    if (this.state.validation.email == false) {
      res = false;
    }
    if (this.state.validation.phone == false) {
      res = false;
    }
    this.setState({
      validation: validation,
    });
    return res;
  }

  upDataToCloud(url) {
    FireBaseApp.database()
      .ref('card')
      .child(MD5.hex_md5(this.state.Id))
      .child(this.state.card.idcard)
      .set({
        address: this.props.Address,
        email: this.state.card.email,
        linkimage: url,
        yourname: this.state.card.yourname,
        phone: this.state.card.phone,
        position: this.state.card.position,
        website: this.state.card.website,
        companyname: this.state.card.companyname,
        template: this.props.Template,
        latitude: this.props.Region.latitude,
        longitude: this.props.Region.longitude,
      });
  }

  update = async () => {
    if (this.isEmpty() == true) {
      this.props.dispatch({
        type: 'setActivityIndicator',
        value: true,
      });
      if (this.state.card.linkimage == this.props.card.linkimage) {
        this.upDataToCloud(this.props.card.linkimage);
        this.props.dispatch({
          type: 'setActivityIndicator',
          value: false,
        });
      } else {
        console.log(this.state.card);
        this.uploadImage(this.state.card.linkimage)
          .then((url) => {
            this.upDataToCloud(url);
            this.props.dispatch({
              type: 'setActivityIndicator',
              value: false,
            });
          })
          .catch((err) => {
            this.props.dispatch({
              type: 'setActivityIndicator',
              value: false,
            });
            console.log(err);
          });
      }
    }
  };

  remove = async () => {
    var that = this;
    Alert.alert(
      'Thông báo !',
      'Bạn có chắc muốn xóa không ?',
      [
        {
          text: 'Không',
          onPress: () => console.log('Cancel Pressed'),
          style: 'cancel',
        },
        {
          text: 'Có',
          onPress: () => {
            FireBaseApp.database()
              .ref('card')
              .child(MD5.hex_md5(this.state.Id))
              .child(this.state.card.idcard)
              .remove();
            FireBaseApp.database()
              .ref('send')
              .once('value', function (snapshot) {
                snapshot.forEach(function (childSnapshot) {
                  childSnapshot.forEach(function (childItem) {
                    var key = childItem.key;
                    if (key == that.state.card.idcard) {
                      console.log(childItem.key);
                      FireBaseApp.database()
                        .ref('send')
                        .child(childSnapshot.key)
                        .child(childItem.key)
                        .remove();
                    }
                  });
                });
              });
            this.props.props.navigation.goBack();
          },
        },
      ],
      {cancelable: false},
    );
  };

  close() {
    var card = {...this.state.card};
    card.linkimage = '';
    this.setState({
      card: card,
    });
  }

  focus() {
    this.props.dispatch({
      type: 'setFocus',
      value: true,
    });
    this.setState({
      validation: {
        ...this.state.validation,
        address: true,
      },
    });
  }

  changeEmail(text) {
    if (isValidationEmail(text)) {
      this.setState({
        card: {
          ...this.state.card,
          email: text,
        },
        validation: {
          ...this.state.validation,
          email: true,
        },
      });
    } else {
      this.setState({
        card: {
          ...this.state.card,
          email: text,
        },
        validation: {
          ...this.state.validation,
          email: false,
        },
      });
    }
  }

  changePhone(text) {
    if (isValidationPhone(text)) {
      this.setState({
        card: {
          ...this.state.card,
          phone: text,
        },
        validation: {
          ...this.state.validation,
          phone: true,
        },
      });
    } else {
      this.setState({
        card: {
          ...this.state.card,
          phone: text,
        },
        validation: {
          ...this.state.validation,
          phone: false,
        },
      });
    }
  }

  ShowTemplate() {
    this.props.dispatch({
      type: 'setShowTemplate',
      value: true,
    });
  }

  render() {
    return (
      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{
          alignItems: 'center',
          justifyContent: 'center',
        }}
        style={styles.information}>
        <View style={styles.header}>
          <Text style={styles.title}>
            {this.props.card.companyname.toUpperCase()}
          </Text>
        </View>
        <View style={styles.body}>
          <View style={styles.item}>
            <View style={styles.icon}>
              <Ionicons
                name="business"
                size={19}
                color={this.state.validation.companyname ? '#d3d3d3' : 'red'}
              />
            </View>
            <TextInput
              placeholder="Tên Công Ty"
              numberOfLines={1}
              style={styles.text}
              value={this.state.card.companyname}
              onChangeText={(value) =>
                this.setState({
                  card: {
                    ...this.state.card,
                    companyname: value,
                  },
                  validation: {
                    ...this.state.validation,
                    companyname: true,
                  },
                })
              }></TextInput>
          </View>

          <View style={styles.item}>
            <View style={styles.icon}>
              <Feather
                name="user"
                size={21}
                color={this.state.validation.yourname ? '#d3d3d3' : 'red'}
              />
            </View>
            <TextInput
              placeholder="Họ Và Tên"
              numberOfLines={1}
              style={styles.text}
              value={this.state.card.yourname}
              onChangeText={(value) =>
                this.setState({
                  card: {
                    ...this.state.card,
                    yourname: value,
                  },
                  validation: {
                    ...this.state.validation,
                    yourname: true,
                  },
                })
              }></TextInput>
          </View>

          <View style={styles.item}>
            <View style={styles.icon}>
              <MaterialIcons
                name="person-pin"
                size={22}
                color={this.state.validation.position ? '#d3d3d3' : 'red'}
              />
            </View>
            <TextInput
              placeholder="Chức Vụ"
              numberOfLines={1}
              style={styles.text}
              value={this.state.card.position}
              onChangeText={(value) =>
                this.setState({
                  card: {
                    ...this.state.card,
                    position: value,
                  },
                  validation: {
                    ...this.state.validation,
                    position: true,
                  },
                })
              }></TextInput>
          </View>

          <View style={styles.item}>
            <View style={styles.icon}>
              <MaterialCommunityIcons
                name="email-outline"
                size={19}
                color={this.state.validation.email ? '#d3d3d3' : 'red'}
              />
            </View>
            <TextInput
              placeholder="Email"
              numberOfLines={1}
              style={styles.text}
              value={this.state.card.email}
              onChangeText={(value) => this.changeEmail(value)}></TextInput>
          </View>

          <View style={styles.item}>
            <View style={styles.icon}>
              <Feather
                name="phone-call"
                size={19}
                color={this.state.validation.phone ? '#d3d3d3' : 'red'}
              />
            </View>
            <TextInput
              placeholder="Số Điện Thoại"
              numberOfLines={1}
              style={styles.text}
              value={this.state.card.phone}
              onChangeText={(value) => this.changePhone(value)}></TextInput>
          </View>

          <View style={styles.item}>
            <View style={styles.icon}>
              <MaterialCommunityIcons
                name="web"
                size={19}
                color={this.state.validation.website ? '#d3d3d3' : 'red'}
              />
            </View>
            <TextInput
              placeholder="Địa Chỉ Website"
              numberOfLines={1}
              style={styles.text}
              value={this.state.card.website}
              onChangeText={(value) =>
                this.setState({
                  card: {
                    ...this.state.card,
                    website: value,
                  },
                  validation: {
                    ...this.state.validation,
                    website: true,
                  },
                })
              }></TextInput>
          </View>

          <View style={styles.item}>
            <View style={styles.icon}>
              <MaterialCommunityIcons
                name="map-outline"
                size={19}
                color={this.state.validation.address ? '#d3d3d3' : 'red'}
              />
            </View>
            <TouchableOpacity
              activeOpacity={0.7}
              style={styles.touchableAddress}
              onPress={() => this.focus()}>
              <Text
                style={[
                  styles.text,
                  {
                    borderBottomWidth: 0,
                  },
                ]}>
                {this.props.Address}
              </Text>
            </TouchableOpacity>
          </View>

          <View style={styles.item}>
            <View style={styles.icon}>
              <MaterialCommunityIcons
                name="credit-card-multiple-outline"
                size={20}
                color={'#d3d3d3'}
              />
            </View>
            <TouchableOpacity
              onPress={() => this.ShowTemplate()}
              activeOpacity={0.7}
              style={{
                // alignItems: 'center',
                justifyContent: 'center',
                paddingBottom: 13,
                marginTop: 19,
                borderBottomWidth: 1,
                borderBottomColor: '#7a7a7a',
                flex: 1,
              }}>
              <Text
                numberOfLines={1}
                style={{
                  color: '#8c8c8c',
                  fontSize: 15,
                  fontWeight: 'bold',
                }}>
                Mẫu {this.props.Template}
              </Text>
            </TouchableOpacity>
          </View>

          <View style={styles.item}>
            <View style={styles.icon}>
              <MaterialCommunityIcons
                name="file-image-outline"
                size={22}
                color={this.state.validation.linkimage ? '#d3d3d3' : 'red'}
              />
            </View>
            <TouchableOpacity
              onPress={() => this.choosePhotoFromLibrary()}
              activeOpacity={0.7}
              style={{
                // alignItems: 'center',
                justifyContent: 'center',
                paddingBottom: 13,
                marginTop: 19,
                borderBottomWidth: 1,
                borderBottomColor: '#7a7a7a',
                flex: 1,
              }}>
              <Text
                numberOfLines={1}
                style={{
                  color: '#8c8c8c',
                  fontSize: 15,
                  fontWeight: 'bold',
                }}>
                Ảnh
              </Text>
            </TouchableOpacity>
          </View>

          {(() => {
            if (this.state.card.linkimage != '') {
              return (
                <View
                  style={[
                    styles.item,
                    {
                      alignItems: 'center',
                      justifyContent: 'center',
                    },
                  ]}>
                  <Image
                    source={{
                      uri: this.state.card.linkimage,
                    }}
                    style={styles.image}
                  />
                  <TouchableOpacity
                    activeOpacity={0.7}
                    onPress={() => this.close()}
                    style={styles.close}>
                    <Ionicons name="md-close-outline" size={28} color="gray" />
                  </TouchableOpacity>
                </View>
              );
            }
          })()}
          <View
            style={[
              {
                justifyContent: 'space-between',
                padding: 20,
                // backgroundColor: 'red',
              },
              styles.item,
            ]}>
            <LinearGradient
              colors={['#0537ad', '#7cffed']}
              start={{x: 0, y: 1}}
              end={{x: 1, y: 0}}
              style={[
                styles.add,
                {
                  marginTop: 10,
                },
              ]}>
              <TouchableOpacity
                style={styles.add}
                activeOpacity={0.7}
                onPress={() => this.update()}>
                <Ionicons name="cloud-upload-outline" color="white" size={25} />
              </TouchableOpacity>
            </LinearGradient>

            <LinearGradient
              colors={['#0537ad', '#7cffed']}
              start={{x: 0, y: 1}}
              end={{x: 1, y: 0}}
              style={[
                styles.add,
                {
                  marginTop: 10,
                },
              ]}>
              <TouchableOpacity
                style={styles.add}
                activeOpacity={0.7}
                onPress={() => this.remove()}>
                <Ionicons name="ios-trash-outline" color="white" size={25} />
              </TouchableOpacity>
            </LinearGradient>
          </View>
        </View>
      </ScrollView>
    );
  }
}

const styles = StyleSheet.create({
  share: {
    width: 50,
    height: 40,
    // backgroundColor: 'red',
    justifyContent: 'center',
    alignItems: 'center',
  },
  information: {
    position: 'absolute',
    zIndex: 10,
    height: height / 1.8,
    width: width,
    backgroundColor: 'white',
    top: height - height / 1.8,
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    paddingRight: 10,
  },
  header: {
    flexDirection: 'row',
    width: '100%',
    height: 50,
    // backgroundColor:'blue',
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    alignItems: 'center',
    padding: 20,
  },
  title: {
    fontSize: 18,
    fontWeight: '700',
    color: 'black',
    flex: 13,
  },
  add: {
    width: width / 3,
    height: 40,
    borderRadius: 10,
    justifyContent: 'center',
    alignItems: 'center',
  },
  body: {
    flexDirection: 'column',
    width: '100%',
    paddingTop: 5,
    paddingBottom: 5,
    // backgroundColor:'blue',
    alignItems: 'center',
  },
  item: {
    flexDirection: 'row',
    width: width,
    // backgroundColor:'red',
    alignItems: 'center',
    marginBottom: 10,
    paddingRight: 5,
  },
  icon: {
    marginLeft: 20,
    marginRight: 8,
    width: 19,
    height: 19,
    // backgroundColor: 'blue',
  },
  touchableAddress: {
    justifyContent: 'center',
    // alignItems: 'center',
    // backgroundColor: 'yellow',
    flex: 1,
    borderBottomWidth: 1,
    borderBottomColor: '#7a7a7a',
    paddingTop: 12,
    paddingBottom: 12,
  },
  text: {
    fontSize: 15,
    fontWeight: '700',
    color: '#939393',
    flex: 1,
    borderBottomWidth: 1,
    borderBottomColor: '#7a7a7a',
    justifyContent: 'center',
    alignItems: 'center',
  },
  image: {
    width: width / 4,
    height: width / 4,
    borderRadius: 10,
  },
  close: {
    margin: 20,
    width: 50,
    height: 50,
    // backgroundColor: 'red',
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 1000,
    borderWidth: 1,
    borderColor: 'gray',
  },
});

Add.propTypes = {
  card: PropTypes.object,
  props: PropTypes.object,
};

function mapStateToProps(state) {
  return {
    Address: state.Address,
    Region: state.Region,
    Template: state.Template,
  };
}
export default connect(mapStateToProps)(Add);
