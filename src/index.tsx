import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './components/App';
import * as serviceWorker from './serviceWorker';
import firebase from 'firebase';

// Firebase
const firebaseConfig = {
  apiKey: "AIzaSyAT9hyOt9MJ1NaK-gxqTnLimr4HlVgDr68",
  authDomain: "karaban-swashbuckle.firebaseapp.com",
  databaseURL: "https://karaban-swashbuckle.firebaseio.com",
  projectId: "karaban-swashbuckle",
  storageBucket: "karaban-swashbuckle.appspot.com",
  messagingSenderId: "141693282926",
  appId: "1:141693282926:web:98f1ff4c88e9412b32d47f"
};

firebase.initializeApp(firebaseConfig);

ReactDOM.render(<App />, document.getElementById('root'));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
