import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.tsx'
import './index.css'

// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyCTI02KP95PWpLvBlVQdthiUeYbZ6zcw_I",
  authDomain: "fortune-seekers-galaxy.firebaseapp.com",
  projectId: "fortune-seekers-galaxy",
  storageBucket: "fortune-seekers-galaxy.appspot.com",
  messagingSenderId: "901325621412",
  appId: "1:901325621412:web:511caf4be11c7190efbe31",
  measurementId: "G-9611MYJMTQ"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
)
