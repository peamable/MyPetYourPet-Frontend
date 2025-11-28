import { auth } from "./firebaseConfig";
import { onAuthStateChanged } from "firebase/auth";

export const attachAuthListener = (logoutCallback) => {
  onAuthStateChanged(auth, (user) => {
    if (!user) {

      logoutCallback();   // token expired / user signed out
    }
  });
};