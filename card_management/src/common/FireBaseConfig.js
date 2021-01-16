import * as firebase from 'firebase';

const firebaseConfig = {
  apiKey: 'AIzaSyAOCb11U8ZbKazEzHl3r6_wKHNXyfgOm34',
  authDomain: 'cardmanagement-719e8.firebaseapp.com',
  databaseURL: 'https://cardmanagement-719e8.firebaseio.com',
  projectId: 'cardmanagement-719e8',
  storageBucket: 'cardmanagement-719e8.appspot.com',
  messagingSenderId: '332026123612',
  appId: '1:332026123612:web:04724251cd95819c361d99',
  measurementId: 'G-28R60XMT27',
};

export const FireBaseApp = firebase.initializeApp(firebaseConfig);
