import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";

const firebaseConfig = {
  apiKey: "AIzaSyAmie3Vd7JjWjEvL3Egrq3Y_xegm9594po",
  authDomain: "matri-cd8af.firebaseapp.com",
  projectId: "matri-cd8af",
  storageBucket: "matri-cd8af.appspot.com",
  messagingSenderId: "966488153099",
  appId: "1:966488153099:web:6446bef44b90c57b13bb0e",
  measurementId: "G-1N1TBBNVVE"
};


const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);

export { app, analytics };