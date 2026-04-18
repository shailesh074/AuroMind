import { initializeApp } from 'firebase/app';
import { getAuth, GoogleAuthProvider } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';

const firebaseConfig = {
  apiKey: "AIzaSyAGPg3EiEeeavS-xXoAZHYX0BCuPrGvBds",
  authDomain: "auromind-57fbd.firebaseapp.com",
  projectId: "auromind-57fbd",
  storageBucket: "auromind-57fbd.firebasestorage.app",
  messagingSenderId: "48388726906",
  appId: "1:48388726906:web:3ee058e6a6287df7a01bc3"
};

const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const db = getFirestore(app);
export const googleProvider = new GoogleAuthProvider();