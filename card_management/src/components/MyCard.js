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
  ScrollView,
} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import AntDesign from 'react-native-vector-icons/AntDesign';
import Ionicons from 'react-native-vector-icons/Ionicons';
import {connect} from 'react-redux';
import {FireBaseApp} from '../common/FireBaseConfig';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {getDate, changePhoneNumber, width} from '../common/CommonComponent';
import {Card} from '../common/CommonScreen';
import MD5 from 'react-native-md5';
import Template1 from '../components/template/template1';
import Template2 from '../components/template/template2';

class MyCard extends Component {
  constructor(props) {
    super(props);
    this.state = {
      data: null,
      data_temp: null,
      search: '',
    };
  }

  componentDidMount() {
    this.loadData();
  }

  loadData = async () => {
    var IdUser = await AsyncStorage.getItem('@IdUser:key');
    FireBaseApp.database()
      .ref('card/' + MD5.hex_md5(IdUser))
      .on(
        'value',
        function (snapshot) {
          let data = [];
          snapshot.forEach(function (childSnapshot) {
            var childData = childSnapshot.val();
            data.push({
              address: childData.address,
              companyname: childData.companyname,
              email: childData.email,
              idcard: childSnapshot.key,
              linkimage: childData.linkimage,
              phone: childData.phone,
              position: childData.position,
              template: childData.template,
              website: childData.website,
              yourname: childData.yourname,
              latitude: childData.latitude,
              longitude: childData.longitude,
            });
          });
          this.setState({
            data: data,
            data_temp: data,
          });
        }.bind(this),
      );
  };

  renderItem = ({item}) => {
    if (item.template == 1) {
      return <Template1 page="sua" props={this.props.props} card={item} />;
    } else if (item.template == 2) {
      return <Template2 page="sua" props={this.props.props} card={item} />;
    }
  };

  ItemSeparatorComponent = () => {
    return <View style={{height: 10}}></View>;
  };

  _search(text) {
    let data = [];
    this.state.data_temp.map(function (value) {
      var companyname = value.companyname.toLowerCase();
      text = text.toLowerCase();
      if (companyname.indexOf(text) > -1) {
        data.push(value);
      }
    });
    this.setState({
      data: data,
      search: text,
    });
  }

  render() {
    return (
      <View style={styles.container}>
        <StatusBar
          hidden={true}
          backgroundColor="white"
          barStyle={'dark-content'}
        />
        <View style={styles.header}>
          <View style={styles.section}>
            <TextInput
              placeholder="Tìm kiếm..."
              style={{
                flex: 1,
                marginLeft: 10,
                height: 35,
              }}
              value={this.state.search}
              onChangeText={(text) => this._search(text)}
            />
            <TouchableOpacity
              onPress={() => this._search('')}
              style={{
                paddingHorizontal: 1,
              }}>
              <Ionicons name="close" color="gray" size={20} />
            </TouchableOpacity>
          </View>
          <LinearGradient
            colors={['#0537ad', '#7cffed']}
            start={{x: 0, y: 1}}
            end={{x: 1, y: 0}}
            style={styles.add}>
            <TouchableOpacity
              onPress={() =>
                this.props.props.navigation.navigate('DetailCard', {
                  card: Card,
                  page: 'them',
                })
              }>
              <Ionicons name="add" color="white" size={25} />
            </TouchableOpacity>
          </LinearGradient>
        </View>

        <View style={styles.flatList}>
          <FlatList
            data={this.state.data}
            renderItem={this.renderItem}
            removeClippedSubviews={true}
            keyExtractor={(item, index) => index.toString()}
            ItemSeparatorComponent={this.ItemSeparatorComponent}
            showsVerticalScrollIndicator={false}
          />
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
  flatList: {
    flex: 1,
    marginTop: 10,
  },
  item: {
    flex: 1,
    paddingHorizontal: 5,
    paddingVertical: 7,
    flexDirection: 'row',
    borderRadius: 10,
  },
  image_container: {
    width: 60,
    height: 90,
  },
  image: {
    width: '100%',
    height: '100%',
    borderWidth: 5,
    borderColor: 'white',
    borderRadius: 10,
  },
  content: {
    flex: 1,
    // justifyContent: 'center',
    paddingHorizontal: 5,
    // backgroundColor:'red',
  },
  companyname: {
    color: 'white',
    fontWeight: 'bold',
    fontSize: 15,
  },
  name: {
    // color: 'white',
    color: '#efefef',
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
  header: {
    // backgroundColor: 'red',
    flexDirection: 'row',
  },
  section: {
    flex: 13,
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 5,
    paddingHorizontal: 10,
    borderRadius: 5,
    backgroundColor: '#f2f2f2',
    marginTop: 10,
  },
  add: {
    flex: 2,
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 10,
    borderRadius: 5,
    marginLeft: 5,
  },
});

MyCard.propTypes = {
  props: PropTypes.object,
};

export default connect()(MyCard);
