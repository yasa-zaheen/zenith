import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyB4_CpCstx4wRlHUPcAe4X3vdqzeu2W9xw",
  authDomain: "zenith-84f07.firebaseapp.com",
  projectId: "zenith-84f07",
  storageBucket: "zenith-84f07.appspot.com",
  messagingSenderId: "673194842212",
  appId: "1:673194842212:web:18b13c30a2fbce9b8d2771",
  measurementId: "G-PDNFBRNB60",
};

const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
const auth = getAuth(app);
const db = getFirestore(app);

export { auth, db };
