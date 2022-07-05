import { initializeApp } from "firebase/app";
import { doc, getFirestore, setDoc, Timestamp } from "firebase/firestore";
import { getAuth } from "firebase/auth";
import { GasEntry } from "./Types";
import toast from "react-hot-toast";

const firebaseConfig = {
  apiKey: "AIzaSyDFq1rm_s80fwB_dCoDcSmL2s9mx39EC_8",
  authDomain: "gascalc-3c535.firebaseapp.com",
  projectId: "gascalc-3c535",
  storageBucket: "gascalc-3c535.appspot.com",
  messagingSenderId: "995500541164",
  appId: "1:995500541164:web:12be761261e52bbb3a11c9",
  measurementId: "G-7NRY1QQEDD",
};

// Initialize Firebase

const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);
export const auth = getAuth();

export const getTimestampString = (x: Timestamp): string => {
  let tmp = x.toDate();
  return tmp.getDate() + "." + (tmp.getMonth() + 1) + "." + tmp.getFullYear();
};

export const uploadDoc = async (data: GasEntry[], isAdding: boolean) => {
  await setDoc(doc(db, "users", auth.currentUser!.uid), { data })
    .then(() => {
      isAdding
        ? toast.success("Úspěšně přidáno")
        : toast.success("Úspěšně odstraněno");
    })
    .catch(() => {
      toast.error("Error");
    });
};
