import React, {useState} from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';
import {Region, height} from './src/common/CommonComponent';
import {Provider} from 'react-redux';
import {createStore, combineReducers} from 'redux';
import Swiper from './src/screen/SwiperScreen';
import SignUp from './src/screen/SignUpScreen';
import Login from './src/screen/LoginScreen';
import ForgetPassWord from './src/screen/ForgetPassWordScreen';
import Home from './src/screen/HomeScreen';
import DetailCard from './src/screen/DetailCardScreen';
import Share from './src/screen/ShareScreen';

const Stack = createStackNavigator();

export default function App() {
  return (
    <Provider store={store}>
      <NavigationContainer>
        <Stack.Navigator>
          <Stack.Screen
            name="Swiper"
            options={{title: 'screen Swiper', headerShown: false}}
            component={Swiper}
          />
          <Stack.Screen
            name="Login"
            options={{title: 'screen Login', headerShown: false}}
            component={Login}
          />
          <Stack.Screen
            name="SignUp"
            options={{title: 'screen SignUp', headerShown: false}}
            component={SignUp}
          />
          <Stack.Screen
            name="ForgetPassWord"
            options={{title: 'screen ForgetPassWord', headerShown: false}}
            component={ForgetPassWord}
          />
          <Stack.Screen
            name="Home"
            options={{title: 'screen Home', headerShown: false}}
            component={Home}
          />

          <Stack.Screen
            name="DetailCard"
            options={{title: 'screen DetailCard', headerShown: false}}
            component={DetailCard}
          />

          <Stack.Screen
            name="Share"
            options={{title: 'screen Share', headerShown: false}}
            component={Share}
          />
        </Stack.Navigator>
      </NavigationContainer>
    </Provider>
  );
}

//default state

const defaultState = {
  IdUser: '',
  Region: Region,
  Address: 'Địa Chỉ',
  autoFocus: false,
  reset: false,
  activityIndicator: false,
  Status: true,
  ReLoad: false,
  Template: 1,
  ShowTemplate: false,
  
};

//reducer -> tien doan action

const userReducer = (state = defaultState, action) => {
  switch (action.type) {
    case 'changeIdUser':
      state = {
        ...state,
        IdUser: action.value,
      };
      break;
    case 'setRegion':
      state = {
        ...state,
        Region: action.value,
      };
      break;
    case 'setAddress':
      state = {
        ...state,
        Address: action.value,
      };
      break;
    case 'setFocus':
      state = {
        ...state,
        autoFocus: action.value,
      };
      break;
    case 'setReset':
      state = {
        ...state,
        reset: action.value,
      };
      break;
    case 'setActivityIndicator':
      state = {
        ...state,
        activityIndicator: action.value,
      };
      break;
    case 'setStatus':
      state = {
        ...state,
        Status: action.value,
      };
      break;
    case 'setReLoad':
      state = {
        ...state,
        ReLoad: action.value,
      };
      break;
    case 'setTemplate':
      state = {
        ...state,
        Template: action.value,
      };
      break;
    case 'setShowTemplate':
      state = {
        ...state,
        ShowTemplate: action.value,
      };
      break;
  }
  return state;
};

// tao ra store

const reducers = combineReducers({
  user: userReducer,
});
const store = createStore(userReducer);

//tich hợp vào trong ứng dụng react - Provider -> 1 component - 1 props ->store
