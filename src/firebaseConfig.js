import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getAnalytics } from "firebase/analytics";

const firebaseConfig = {

    apiKey: "AIzaSyAURRFzroSzfC6_JQ4m343gHeHPUBDF6TU",

    authDomain: "mypetyourpet-8f043.firebaseapp.com",

    projectId: "mypetyourpet-8f043",

    storageBucket: "mypetyourpet-8f043.firebasestorage.app",

    messagingSenderId: "270038458223",

    appId: "1:270038458223:web:c367327e0171c66e89529a",

    measurementId: "G-9J9LF0DES4"

  };

  // Initialize Firebase

  const app = initializeApp(firebaseConfig);

  const analytics = getAnalytics(app);
  export const auth = getAuth(app);
  export default app;


