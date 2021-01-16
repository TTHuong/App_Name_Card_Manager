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
} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import AntDesign from 'react-native-vector-icons/AntDesign';
import Ionicons from 'react-native-vector-icons/Ionicons';
import {connect} from 'react-redux';
import {
  getDate,
  toUpper,
  changePhoneNumber,
} from '../../common/CommonComponent';

class Template2 extends Component {
  render() {
    return (
      <LinearGradient
        colors={['#ff8d1c', '#ffd016']}
        start={{x: 0, y: 1}}
        end={{x: 1, y: 0}}
        style={styles.item}>
        <View style={styles.image_container}>
          <Image
            source={{uri: this.props.card.linkimage}}
            style={styles.image}
          />
        </View>

        <View style={styles.content}>
          <Text
            numberOfLines={1}
            ellipsizeMode="tail"
            style={styles.companyname}>
            {this.props.card.companyname.toUpperCase()}
          </Text>
          <Text numberOfLines={1} ellipsizeMode="tail" style={styles.name}>
            {this.props.card.yourname.toUpperCase()}
          </Text>
          <Text numberOfLines={1} ellipsizeMode="tail" style={styles.name}>
            {toUpper(this.props.card.position)}
          </Text>
          <Text numberOfLines={1} ellipsizeMode="tail" style={styles.name}>
            Email: {this.props.card.email.toLowerCase()}
          </Text>
          <Text numberOfLines={1} ellipsizeMode="tail" style={styles.name}>
            Phone: {changePhoneNumber(this.props.card.phone)}
          </Text>
        </View>
        <View
          style={{
            flexDirection: 'column',
            justifyContent: 'space-between',
          }}>
          <TouchableOpacity
            style={styles.button}
            onPress={() =>
              this.props.props.navigation.navigate('DetailCard', {
                card: this.props.card,
                page: this.props.page,
              })
            }>
            <AntDesign name="arrowright" color="#3465d9" size={15} />
          </TouchableOpacity>

          <TouchableOpacity
            onPress={() => {
              this.props.props.navigation.navigate('Share', {
                card: this.props.card,
              });
            }}>
            <Ionicons name="share-social-outline" color="white" size={25} />
          </TouchableOpacity>
        </View>
      </LinearGradient>
    );
  }
}

const styles = StyleSheet.create({
  
  item: {
    flex: 1,
    paddingHorizontal: 5,
    paddingVertical: 7,
    flexDirection: 'row',
    borderRadius: 10,
  },
  image_container: {
    width: 90,
    height: 90,
  },
  image: {
    width: '100%',
    height: '100%',
    borderWidth: 2,
    borderColor: 'black',
    borderRadius: 10,
  },
  content: {
    flex: 1,
    // justifyContent: 'center',
    paddingHorizontal: 5,
    // backgroundColor:'red',
  },
  companyname: {
    color: 'black',
    fontSize: 18,
    fontFamily:'iCielCadena',
  },
  name: {
    // color: 'white',
    color: '#424240',
    fontWeight: 'bold',
    fontSize: 12,
  },
  button: {
    width: 30,
    height: 30,
    backgroundColor: 'white',
    borderRadius: 15,
    justifyContent: 'center',
    alignItems: 'center',
  },
  section: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 5,
    paddingHorizontal: 10,
    borderRadius: 30,
    backgroundColor: '#f2f2f2',
    marginTop: 10,
    justifyContent: 'center',
  },
});

Template2.propTypes = {
  props: PropTypes.object,
  page:PropTypes.string,
};

export default connect()(Template2);
