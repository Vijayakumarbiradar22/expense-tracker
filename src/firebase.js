import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { getAnalytics } from "firebase/analytics";

// My Firebase configuration
// I have created expense-tracker project in firebase and added the rules
const firebaseConfig = {
  apiKey: "AIzaSyCSF0MbxWK0kEiLH6KT8eWcYZYYXSE5lHs",
  authDomain: "expense-tracker-47094.firebaseapp.com",
  projectId: "expense-tracker-47094",
  storageBucket: "expense-tracker-47094.appspot.com",
  messagingSenderId: "216027221176",
  appId: "1:216027221176:web:c52fd70b21673d2167f84d",
  measurementId: "G-VYJT5MTQSH"
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const firestore = getFirestore(app);
const analytics = getAnalytics(app);
export { auth, firestore, analytics };
