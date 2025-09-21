// src/firebase.js
import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider, signInWithPopup, signOut } from "firebase/auth";
import { getFirestore, collection, addDoc, getDocs, query, where, doc, getDoc, serverTimestamp } from "firebase/firestore";
import { getAnalytics } from "firebase/analytics";

// Your Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyD-TYs0sZix8klLWTsLnW6DwqxCtM4GVV4",
  authDomain: "civicfix-87d92.firebaseapp.com",
  projectId: "civicfix-87d92",
  storageBucket: "civicfix-87d92.appspot.com",
  messagingSenderId: "278974482190",
  appId: "1:278974482190:web:8ac59717e10901523e795f",
  measurementId: "G-4SSZ8ZJJ9F"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const analytics = getAnalytics(app);

// Auth
export const auth = getAuth(app);
export const provider = new GoogleAuthProvider();

// Sign in with Google
export const signInWithGoogle = () => signInWithPopup(auth, provider);

// Logout
export const logOut = () => signOut(auth);

// Firestore
export const db = getFirestore(app);
export const issuesCollection = collection(db, "issues");
export const usersCollection = collection(db, "users");

// Helper: Get all issues by a specific user
export const getUserIssues = async (uid) => {
  const q = query(issuesCollection, where("submitted_by", "==", uid));
  const querySnapshot = await getDocs(q);
  return querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
};

// Helper: Get single issue by ID
export const getIssueById = async (id) => {
  const docRef = doc(db, "issues", id);
  const docSnap = await getDoc(docRef);
  if (docSnap.exists()) return { id: docSnap.id, ...docSnap.data() };
  return null;
};

// Helper: Add a new issue
export const addNewIssue = async ({ description, category, photo_url, location, submitted_by }) => {
  const docRef = await addDoc(issuesCollection, {
    description,
    category,
    photo_url,
    location,
    status: "Submitted",
    submitted_by,
    submitted_on: serverTimestamp()
  });
  return docRef.id;
};
