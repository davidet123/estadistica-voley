import firebase from 'firebase'
import 'firebase/firestore'

// Your web app's Firebase configuration
var firebaseConfig = {
  apiKey: "AIzaSyCfaCYVWjeTv2wORapjeOtmOlYoqWdEwCE",
  authDomain: "estadistica-voley.firebaseapp.com",
  databaseURL: "https://estadistica-voley.firebaseio.com",
  projectId: "estadistica-voley",
  storageBucket: "estadistica-voley.appspot.com",
  messagingSenderId: "271180027148",
  appId: "1:271180027148:web:4971a05353e4e5bf56a529"
};
// Initialize Firebase
const firebaseApp = firebase.initializeApp(firebaseConfig)
export default firebaseApp.firestore()