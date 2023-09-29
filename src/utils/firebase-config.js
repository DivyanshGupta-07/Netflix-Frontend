import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyCsgOkg0p2KQ1YrGrv1718KSnHdF9YEHTY",
  authDomain: "netflix-clone-570dd.firebaseapp.com",
  projectId: "netflix-clone-570dd",
  storageBucket: "netflix-clone-570dd.appspot.com",
  messagingSenderId: "408436030387",
  appId: "1:408436030387:web:da51dbec45e1f9f0e469c6",
  measurementId: "G-PP0FTWY99M",
};


const app = initializeApp(firebaseConfig);

export const firebaseAuth = getAuth(app);
