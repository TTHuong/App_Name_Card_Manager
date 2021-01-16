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
  Linking,
  ScrollView,
} from 'react-native';
import {connect} from 'react-redux';
import {
  width,
  height,
  standarWidth,
  standardHeight,
  ucWords,
  getDate,
  changePhoneNumber,
  toUpper,
  openLink,
  sendEmail,
  call,
} from '../common/CommonComponent';
import Feather from 'react-native-vector-icons/Feather';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';

class Detail extends Component {
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
            <View style={styles.icon}></View>
            <Text numberOfLines={2} ellipsizeMode="tail" style={styles.text}>
              {toUpper(this.props.card.position) + ' : '}
              {ucWords(this.props.card.yourname)}
            </Text>
          </View>

          <TouchableOpacity
            activeOpacity={0.7}
            style={styles.item}
            onPress={() => {
              call(this.props.card.phone);
            }}>
            <View style={styles.icon}>
              <Feather name="phone-call" size={19} color="#d3d3d3" />
            </View>
            <Text numberOfLines={1} ellipsizeMode="tail" style={styles.text}>
              {changePhoneNumber(this.props.card.phone)}
            </Text>
          </TouchableOpacity>

          <TouchableOpacity
            activeOpacity={0.7}
            style={styles.item}
            onPress={() => {
              sendEmail(this.props.card.email);
            }}>
            <View style={styles.icon}>
              <MaterialCommunityIcons
                name="email-outline"
                size={19}
                color="#d3d3d3"
              />
            </View>
            <Text numberOfLines={2} ellipsizeMode="tail" style={styles.text}>
              {(() => {
                var email = this.props.card.email;
                return email.toLowerCase();
              })()}
            </Text>
          </TouchableOpacity>

          <TouchableOpacity
            activeOpacity={0.7}
            style={styles.item}
            onPress={() => openLink(this.props.card.website)}>
            <View style={styles.icon}>
              <MaterialCommunityIcons name="web" size={19} color="#d3d3d3" />
            </View>
            <Text numberOfLines={2} ellipsizeMode="tail" style={styles.text}>
              {(() => {
                var website = this.props.card.website;
                return website.toLowerCase();
              })()}
            </Text>
          </TouchableOpacity>

          <View style={styles.item}>
            <View style={styles.icon}>
              <MaterialCommunityIcons
                name="map-outline"
                size={19}
                color="#d3d3d3"
              />
            </View>
            <Text numberOfLines={3} ellipsizeMode="tail" style={styles.text}>
              {this.props.card.address}
            </Text>
          </View>
        </View>
      </ScrollView>
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
    height: height,
    // backgroundColor: 'red',
  },
  information: {
    position: 'absolute',
    zIndex: 10,
    height: height / 2.5,
    height: '100%',
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

Detail.propTypes = {
  card: PropTypes.object,
};

export default connect()(Detail);
