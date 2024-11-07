// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyBYPjsq-GyKOYImMW8ERE7h8kNNbtH-5MM",
  authDomain: "online-job-portal-450e4.firebaseapp.com",
  projectId: "online-job-portal-450e4",
  storageBucket: "online-job-portal-450e4.firebasestorage.app",
  messagingSenderId: "1029437856621",
  appId: "1:1029437856621:web:fe18ae670c5ba3c4335864"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

export {db};