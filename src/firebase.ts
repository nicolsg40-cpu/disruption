console.log("firebase.ts: module load");
import { initializeApp } from 'firebase/app';
import { getAuth, signInAnonymously, onAuthStateChanged, User } from 'firebase/auth';
import { getFirestore, getDocFromServer, doc, collection, addDoc, updateDoc, onSnapshot, serverTimestamp, query, where, getDocs, deleteDoc, setDoc } from 'firebase/firestore';

// Import the Firebase configuration
import firebaseConfig from './firebase-applet-config.json';

// Initialize Firebase SDK
const app = initializeApp(firebaseConfig);
export const db = getFirestore(app, firebaseConfig.firestoreDatabaseId);
export const auth = getAuth();

export { signInAnonymously, onAuthStateChanged, collection, addDoc, updateDoc, onSnapshot, serverTimestamp, query, where, getDocs, deleteDoc, setDoc, doc, getDocFromServer };
export type { User };
