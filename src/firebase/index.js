import firebase from 'firebase/app';
import 'firebase/storage';
import 'firebase/auth';
import 'firebase/firestore';

const API_KEY = 'AIzaSyBTX5PJOE9a9nQGs0hdXc7tly62WU60ST8';
const AUTH_DOMAIN = 'daily-business-e6974.firebaseapp.com';
const DATABASE_URL = 'https://daily-business-e6974.firebaseio.com';
const PROJECT_ID = 'daily-business-e6974';
const STORAGE_BUCKET = 'daily-business-e6974.appspot.com';
const MESSAGING_SENDER_ID = '67379621962';

const prodConfig = {
  apiKey: API_KEY,
  authDomain: AUTH_DOMAIN,
  databaseURL: DATABASE_URL,
  projectId: PROJECT_ID,
  storageBucket: STORAGE_BUCKET,
  messagingSenderId: MESSAGING_SENDER_ID
};

const devConfig = {
  apiKey: API_KEY,
  authDomain: AUTH_DOMAIN,
  databaseURL: DATABASE_URL,
  projectId: PROJECT_ID,
  storageBucket: STORAGE_BUCKET,
  messagingSenderId: MESSAGING_SENDER_ID
};

const config = process.env.NODE_ENV === 'production' ? prodConfig : devConfig;

// if (!firebase.apps.length) {
//     firebase.initializeApp(config);
// }

firebase.initializeApp(config);

const auth = firebase.auth();
const storage = firebase.storage();

const db = firebase.firestore();

export { auth, db, storage };
