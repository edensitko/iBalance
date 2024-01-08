import firebase from 'firebase/compat/app';
import 'firebase/compat/auth';
import 'firebase/compat/firestore';

//configuation of firebase 
const firebaseConfig = {
  apiKey: "AIzaSyByIZMJlUVX6Jb1UwS8U8xovrp8KLPDZAM",
  authDomain: "cash-proj-5e0f9.firebaseapp.com",
  databaseURL: "https://cash-proj-5e0f9-default-rtdb.europe-west1.firebasedatabase.app",
  projectId: "cash-proj-5e0f9",
  storageBucket: "cash-proj-5e0f9.appspot.com",
  messagingSenderId: "312093184549",
  appId: "1:312093184549:web:51e4f9280821a1494365cc",
  measurementId: "G-KYJ9M1PT81"
};

firebase.initializeApp(firebaseConfig);

// Firebase Firestore main functions
const projectFireStore = firebase.firestore();
const { Timestamp } = firebase.firestore;
const timestamp = Timestamp;
const projectAuth = firebase.auth();




export { projectFireStore, projectAuth, timestamp };