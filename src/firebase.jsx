import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getAuth } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyCmv9M2JQowkJD8NP-SQCtt-PnDFKWF1CA",
  authDomain: "catalog-online-1af02.firebaseapp.com",
  projectId: "catalog-online-1af02",
  storageBucket: "catalog-online-1af02.appspot.com",
  messagingSenderId: "963043333160",
  appId: "1:963043333160:web:8be49b9de0593158c4911d"
};

const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);
export const auth = getAuth(app);