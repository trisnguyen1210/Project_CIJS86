import { initializeApp } from "firebase/app";
import { getDatabase } from "firebase/database";
import { getAuth } from "firebase/auth";
import { createContext } from "react";

const firebaseConfig = {
  apiKey: "AIzaSyC_EEGBqZM8g6iEawlhPYFqz0o2HEjm2j4",
  authDomain: "project-cijs86.firebaseapp.com",
  databaseURL:
    "https://project-cijs86-default-rtdb.asia-southeast1.firebasedatabase.app",
  projectId: "project-cijs86",
  storageBucket: "project-cijs86.appspot.com",
  messagingSenderId: "482592482731",
  appId: "1:482592482731:web:c0cc2844f44cd9cfc21eee",
  measurementId: "G-TTR6PGPBFC",
};

const app = initializeApp(firebaseConfig);
const firebase = getDatabase(app);
const auth = getAuth(app);

export const FirebaseContext = createContext();

const FirebaseProvider = ({ children }) => {
  return (
    <FirebaseContext.Provider value={{ firebase, auth, app }}>
      {children}
    </FirebaseContext.Provider>
  );
};

export default FirebaseProvider;
