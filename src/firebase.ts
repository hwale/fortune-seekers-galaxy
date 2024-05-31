// firebase.js
import { initializeApp } from "firebase/app";
import { getFunctions } from "firebase/functions";

const firebaseConfig = {
  apiKey: "AIzaSyCTI02KP95PWpLvBlVQdthiUeYbZ6zcw_I",
  authDomain: "fortune-seekers-galaxy.firebaseapp.com",
  projectId: "fortune-seekers-galaxy",
  storageBucket: "fortune-seekers-galaxy.appspot.com",
  messagingSenderId: "901325621412",
  appId: "1:901325621412:web:511caf4be11c7190efbe31",
  measurementId: "G-9611MYJMTQ",
};

const app = initializeApp(firebaseConfig);
const functions = getFunctions(app);

export { functions };
