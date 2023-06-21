import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { GoogleAuthProvider, getAuth } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyBtp6sBR9mh0F2JZ9rI6POVDwUEpgDvBJQ",
  authDomain: "discode-clone-35eae.firebaseapp.com",
  projectId: "discode-clone-35eae",
  storageBucket: "discode-clone-35eae.appspot.com",
  messagingSenderId: "489627881384",
  appId: "1:489627881384:web:98b0cdcfe6fd12bc51179d",
};

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);
const auth = getAuth(app);
const provider = new GoogleAuthProvider();

export { auth, provider, db };
