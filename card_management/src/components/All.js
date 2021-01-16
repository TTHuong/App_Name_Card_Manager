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
import LinearGradient from 'react-native-linear-gradient';
import AntDesign from 'react-native-vector-icons/AntDesign';
import Ionicons from 'react-native-vector-icons/Ionicons';
import {connect} from 'react-redux';
import {FireBaseApp} from '../common/FireBaseConfig';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {getDate, toUpper, changePhoneNumber} from '../common/CommonComponent';
import MD5 from 'react-native-md5';
import Template1 from '../components/template/template1';
import Template2 from '../components/template/template2';

class All extends Component {
  constructor(props) {
    super(props);
    this.state = {
      data: [],
      data_temp: [],
      search: '',
      load: true,
    };
  }

  componentDidMount() {
    this.loadData();
  }

  loadData = async () => {
    var IdUser = await AsyncStorage.getItem('@IdUser:key');
    var that = this;
    FireBaseApp.database()
      .ref('send/' + MD5.hex_md5(IdUser))
      .on('value', function (snapshot) {
        var Data = [];
        console.log('vone');
        snapshot.forEach(function (childSnapshot) {
          var childData = childSnapshot.val();
          FireBaseApp.database()
            .ref('card')
            .child(childData.idusersend)
            .child(childData.idcard)
            .once('value', (Item) => {
              var childItem = Item.val();
              if (childItem != null) {
                var temp = {
                  ...childItem,
                  idcard: childData.idcard,
                  idusersend: childData.idusersend,
                };
                // console.log(temp)
                Data.push(temp);
                that.setState({
                  data: Data,
                  data_temp: Data,
                });
              }
            });
        });
      });
  };

  renderItem = ({item}) => {
    if (item.template == 1) {
      return <Template1 page="chitiet" props={this.props.props} card={item} />;
    } else if (item.template == 2) {
      return <Template2 page="chitiet" props={this.props.props} card={item} />;
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
        <View style={styles.section}>
          <TextInput
            placeholder="Tìm kiếm..."
            style={{
              flex: 1,
              marginLeft: 10,
              height: 35,
              // backgroundColor: 'blue',
            }}
            value={this.state.search}
            onChangeText={(text) => this._search(text)}
          />
          <TouchableOpacity
            onPress={() => this._search('')}
            style={{
              paddingHorizontal: 10,
            }}>
            <Ionicons name="close" color="gray" size={20} />
          </TouchableOpacity>
        </View>
        <View style={styles.flatList}>
          {(() => {
            if (this.state.data != null) {
              return (
                <FlatList
                  data={this.state.data}
                  renderItem={this.renderItem}
                  removeClippedSubviews={true}
                  keyExtractor={(item, index) => index.toString()}
                  ItemSeparatorComponent={this.ItemSeparatorComponent}
                  showsVerticalScrollIndicator={false}
                />
              );
            }
          })()}
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

All.propTypes = {
  props: PropTypes.object,
  data: PropTypes.array,
};

function mapStateToProps(state) {
  return {
    ReLoad: state.ReLoad,
  };
}
export default connect(mapStateToProps)(All);
