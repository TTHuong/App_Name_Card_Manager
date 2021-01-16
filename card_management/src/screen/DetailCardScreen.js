import React, {Component} from 'react';
import PropTypes from 'prop-types';
import {
  View,
  StyleSheet,
  TouchableOpacity,
  ActivityIndicator,
  BackHandler,
  Modal,
} from 'react-native';
import {connect} from 'react-redux';
import {width, height, Region} from '../common/CommonComponent';
import Ionicons from 'react-native-vector-icons/Ionicons';
import MapView, {Marker, PROVIDER_GOOGLE} from 'react-native-maps';
import {GooglePlacesAutocomplete} from 'react-native-google-places-autocomplete';
import Detail from '../components/Detail';
import Add from '../components/Add';
import Edit from '../components/Edit';
import ChooseTemplate from '../components/ChooseTemplate';

class DetailCardScreen extends Component {
  constructor(props) {
    super(props);
    this.state = {
      region: {
        latitude: this.props.route.params.card.latitude,
        longitude: this.props.route.params.card.longitude,
        latitudeDelta: Region.latitudeDelta,
        longitudeDelta: Region.longitudeDelta,
      },
    };
  }

  componentDidMount() {
    BackHandler.removeEventListener('hardwareBackPress', function () {
      return true;
    });
  }

  back() {
    this.props.dispatch({
      type: 'setAddress',
      value: 'Địa Chỉ',
    });
    this.props.dispatch({
      type: 'setRegion',
      value: Region,
    });
    this.props.dispatch({
      type: 'setTemplate',
      value: 1,
    });
    this.props.navigation.goBack();
  }

  clear() {
    if (this.google.getAddressText() != '') {
      this.google.clear();
      this.setState({
        region: {
          ...this.state.region,
          latitude: this.props.route.params.card.latitude,
          longitude: this.props.route.params.card.longitude,
        },
      });

      this.props.dispatch(
        {
          type: 'setAddress',
          value: 'Địa Chỉ',
        },
        {
          type: 'setRegion',
          value: Region,
        },
      );
    }
  }

  render() {
    return (
      <View style={styles.container}>
        {(() => {
          if (this.props.activityIndicator) {
            return (
              <View
                style={{
                  position: 'absolute',
                  zIndex: 30,
                  width: width,
                  height: height,
                  justifyContent: 'center',
                  alignItems: 'center',
                }}>
                <View
                  style={{
                    backgroundColor: '#dddddd',
                    width: width,
                    height: height,
                    opacity: 0.2,
                  }}></View>
                <ActivityIndicator
                  style={{position: 'absolute', zIndex: 20}}
                  size={40}
                  color="#386de8"
                />
              </View>
            );
          }
        })()}

        <View style={styles.map}>
          <View style={styles.searchBar}>
            <TouchableOpacity
              style={styles.back}
              activeOpacity={0.7}
              onPress={() => this.back()}>
              <Ionicons name="chevron-back-sharp" size={29} color="black" />
            </TouchableOpacity>

            <GooglePlacesAutocomplete
              ref={(ref) => {
                this.google = ref;
                if (this.props.autoFocus) {
                  this.google && this.google.focus();
                  this.props.dispatch({
                    type: 'setFocus',
                    value: false,
                  });
                } else if (this.props.reset) {
                  this.google && this.google.clear();
                  this.props.dispatch({
                    type: 'setReset',
                    value: false,
                  });
                }
              }}
              placeholder="Tìm kiếm..."
              enablePoweredByContainer={false}
              fetchDetails={true}
              onPress={(data, details = null) => {
                var region = {
                  latitudeDelta: Region.latitudeDelta,
                  longitudeDelta: Region.longitudeDelta,
                  latitude: details.geometry.location.lat,
                  longitude: details.geometry.location.lng,
                };
                this.setState({
                  region: region,
                });
                this.props.dispatch({
                  type: 'setAddress',
                  value: this.google.getAddressText(),
                });
                this.props.dispatch({
                  type: 'setRegion',
                  value: region,
                });
              }}
              query={{
                /// kiếm key thì vô trang web này https://tranhieuit.com/share-google-maps-api-key/
                // hoặc tìm kiếm với từ khoa share key api google
                key: 'AIzaSyDNI_ZWPqvdS6r6gPVO50I4TlYkfkZdXh8',
                language: 'vn',
              }}
              styles={{
                container: {
                  flex: 13,
                  marginRight: 20,
                  marginTop: 10,
                },
                textInput: {
                  paddingRight: 25,
                  height: 40,
                },
              }}
            />

            <TouchableOpacity
              activeOpacity={0.7}
              onPress={() => this.clear()}
              style={styles.close}>
              <Ionicons name="md-close-outline" size={25} color="gray" />
            </TouchableOpacity>
          </View>
          <MapView
            provider={PROVIDER_GOOGLE}
            region={this.state.region}
            mapType={'standard'}
            style={styles.image}>
            <Marker coordinate={this.state.region} />
          </MapView>
        </View>
        {(() => {
          if (this.props.route.params.page == 'chitiet') {
            return <Detail card={this.props.route.params.card} />;
          } else if (this.props.route.params.page == 'them') {
            return <Add />;
          } else if (this.props.route.params.page == 'sua') {
            return (
              <Edit props={this.props} card={this.props.route.params.card} />
            );
          }
        })()}
        <ChooseTemplate />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
  },
  map: {
    width: width,
    height: height,
    // backgroundColor: 'blue',
  },
  image: {
    width: width,
    height: height / 1.4,
    // backgroundColor: 'red',
  },
  searchBar: {
    flexDirection: 'row',
    position: 'absolute',
    zIndex: 10,
    width: width,
    // backgroundColor:'blue',
    marginTop: 35,
    justifyContent: 'center',
  },
  back: {
    // backgroundColor:'red',
    // marginTop: 35,
    marginLeft: 15,
    marginTop: 13,
    flex: 2,
  },
  close: {
    position: 'absolute',
    zIndex: 10,
    // backgroundColor: 'black',
    width: 25,
    height: 45,
    marginTop: 7,
    right: 20,
    alignItems: 'center',
    justifyContent: 'center',
  },
  information: {
    position: 'absolute',
    zIndex: 10,
    height: height / 2.5,
    width: width,
    backgroundColor: 'white',
    top: height - height / 2.5,
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
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
  text: {
    fontSize: 15,
    fontWeight: '700',
    color: '#383838',
    justifyContent: 'center',
    alignItems: 'center',
    // backgroundColor:'yellow',
  },
});
function mapStateToProps(state) {
  return {
    autoFocus: state.autoFocus,
    reset: state.reset,
    activityIndicator: state.activityIndicator,
    ShowTemplate: state.ShowTemplate,
  };
}
export default connect(mapStateToProps)(DetailCardScreen);
