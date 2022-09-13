import firebase from 'firebase/app'; // Import the functions you need from the SDKs you need
import 'firebase/auth'
import 'firebase/database';
import 'firebase/storage';


// Firebase configuration
const firebaseConfig = {

    apiKey: "AIzaSyDnPWzuGhhbokQqV1s9BjhSQiZclRfNUc0",
  
    authDomain: "baatcheet-3c34f.firebaseapp.com",

    databaseURL: "https://baatcheet-3c34f-default-rtdb.asia-southeast1.firebasedatabase.app/",
  
    projectId: "baatcheet-3c34f",
  
    storageBucket: "baatcheet-3c34f.appspot.com",
  
    messagingSenderId: "443981498690",
  
    appId: "1:443981498690:web:ca12df85671d24f61a60db"
  
};
  
// Initialize Firebase
const app = firebase.initializeApp(firebaseConfig);

export const auth = app.auth();     // authentication function

export const database = app.database();     // database function

export const storage = app.storage();   // firebase storage this we are going use it to store images, 

