import { getApp, getApps, initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";

const firebaseConfig = {
  apiKey: "AIzaSyC4D-ch38GjO5T6vfL8SF2dW5OI_8p7zU8",
  authDomain: "restaurantapp-2b979.firebaseapp.com",
  databaseURL: "https://restaurantapp-2b979-default-rtdb.firebaseio.com",
  projectId: "restaurantapp-2b979",
  storageBucket: "restaurantapp-2b979.appspot.com",
  messagingSenderId: "3223562091",
  appId: "1:3223562091:web:babd45c89e01bac210ce2e",
};

const app = getApps.Length > 0 ? getApp() : initializeApp(firebaseConfig);
const firestore = getFirestore(app);
const storage = getStorage(app);

export { app, firestore, storage };
