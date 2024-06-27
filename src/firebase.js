import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';

const firebaseConfig = {
  apiKey: "AIzaSyDzCW8Rehq8oTZQFLiBiqTBkixrRkXfulo",
  authDomain: "jwrandki.firebaseapp.com",
  projectId: "jwrandki",
  storageBucket: "jwrandki.appspot.com",
  messagingSenderId: "777592030363",
  appId: "1:777592030363:web:a009ad09f798cfc935323e",
  measurementId: "G-E3VHS2KMNT"
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app);

export { auth, db };