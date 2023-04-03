import firebase from 'firebase/compat/app'
import 'firebase/compat/firestore';
import "firebase/compat/auth";
import "firebase/compat/storage";



const firebaseConfig = {
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