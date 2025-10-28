//Importación de firebase

// Import the functions you need from the SDKs you need
import { initializeApp } from "https://www.gstatic.com/firebasejs/12.4.0/firebase-app.js";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

//autenticacion
import { getAuth } from "https://www.gstatic.com/firebasejs/12.4.0/firebase-auth.js";

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyCUGq38rSWmDS1Edga40v6jD7XflSCuiQY",
  authDomain: "doctor-iss.firebaseapp.com",
  projectId: "doctor-iss",
  storageBucket: "doctor-iss.firebasestorage.app",
  messagingSenderId: "816578305619",
  appId: "1:816578305619:web:2e8f9e9fa91bf538f6b0a6",
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);

//constante de Autenticacion 
export const auth = getAuth(app);
 
