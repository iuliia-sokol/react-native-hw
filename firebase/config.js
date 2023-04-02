import firebase from 'firebase/compat/app'
import 'firebase/compat/firestore';
import "firebase/compat/auth";
import "firebase/compat/storage";



const firebaseConfig = {
  // apiKey: "AIzaSyDm4vaIGrflJz5vJp22JbWfEGZF6QzhpRA",
  // authDomain: "react-native-59ebf.firebaseapp.com",
  // projectId: "react-native-59ebf",
  // storageBucket: "react-native-59ebf.appspot.com",
  // messagingSenderId: "932112919379",
  // appId: "1:932112919379:web:815545c1cc2e36447bcfa6",
  // measurementId: "G-ZY37JEF1X6"
  apiKey: "AIzaSyCByErhsq3LLp4EP43WAZbl0sxDejFNU9c",
  authDomain: "rn-social-7d807.firebaseapp.com",
  projectId: "rn-social-7d807",
  storageBucket: "rn-social-7d807.appspot.com",
  messagingSenderId: "128764754238",
  appId: "1:128764754238:web:8d086d87338273b326d46f"
};

firebase.initializeApp(firebaseConfig);

const auth = firebase.auth();
const db = firebase.firestore();
const storage = firebase.storage();

export { auth, db, storage };