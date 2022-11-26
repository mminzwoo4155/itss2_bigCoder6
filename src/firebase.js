import firebase from "firebase/app";
import "firebase/auth";

const app = firebase.initializeApp({
  apiKey: "AIzaSyC-1RecflNOCSKs1YPWLwSbH2UaFMwCkwI",
  authDomain: "big-coder-6.firebaseapp.com",
  projectId: "big-coder-6",
  storageBucket: "big-coder-6.appspot.com",
  messagingSenderId: "786892963858",
  appId: "1:786892963858:web:55d2449ad2e615cc3e58cb",
});

export const auth = app.auth();
export default app;
