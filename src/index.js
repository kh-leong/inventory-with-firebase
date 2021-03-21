import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import {BrowserRouter as Router} from 'react-router-dom';
import firebase from "firebase/app";
import "firebase/auth";
import { FirebaseAuthProvider } from '@react-firebase/auth';

const firebaseConfig = {
  apiKey: "AIzaSyBJ11xDevbg1eRozNFKjDTbbUQ79qUp2E4",
  authDomain: "inventory-with-firebase.firebaseapp.com",
  projectId: "inventory-with-firebase",
  storageBucket: "inventory-with-firebase.appspot.com",
  messagingSenderId: "901719176299",
  appId: "1:901719176299:web:9f7274a7d839ab40de2d2e",
  measurementId: "G-HMR3VSQKYL"
};

ReactDOM.render(
  <React.StrictMode>
    <FirebaseAuthProvider firebase={firebase} {...firebaseConfig}>
    <Router>
     <App />
    </Router>
    </FirebaseAuthProvider>
  </React.StrictMode>,
  document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
