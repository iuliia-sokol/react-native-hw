import firebase from 'firebase/compat/app'
import 'firebase/compat/firestore';
import "firebase/compat/auth";
import "firebase/compat/storage";



const firebaseConfig = {
  apiKey: "AIzaSyDm4vaIGrflJz5vJp22JbWfEGZF6QzhpRA",
  authDomain: "react-native-59ebf.firebaseapp.com",
  projectId: "react-native-59ebf",
  storageBucket: "react-native-59ebf.appspot.com",
  messagingSenderId: "932112919379",
  appId: "1:932112919379:web:815545c1cc2e36447bcfa6",
  measurementId: "G-ZY37JEF1X6"
};

firebase.initializeApp(firebaseConfig);

const auth = firebase.auth();
const db = firebase.firestore();
const storage = firebase.storage();

export { auth, db, storage };