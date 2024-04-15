import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyDCLpao94EBsIfXaLC0XsL8EF8BUGWK9Ho",
  authDomain: "listingapp-f5e5f.firebaseapp.com",
  projectId: "listingapp-f5e5f",
  storageBucket: "listingapp-f5e5f.appspot.com",
  messagingSenderId: "300292201521",
  appId: "1:300292201521:web:dbfeea8dcc0b49cbc20910",
  measurementId: "G-V2L7ZPJNSG",
};

const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
