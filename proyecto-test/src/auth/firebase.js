import { initializeApp } from "firebase/app";
import { getAuth, createUserWithEmailAndPassword } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyBYNIFfUKGg7-5QhBYw0WSKm2Xf-vGemAk",
  authDomain: "proyect-e-commerce.firebaseapp.com",
  projectId: "proyect-e-commerce",
  storageBucket: "proyect-e-commerce.firebasestorage.app",
  messagingSenderId: "256477414579",
  appId: "1:256477414579:web:8b7e02c60c88290de6dcc6",
};

const app = initializeApp(firebaseConfig);

const auth = getAuth();

export function createUser(email, password) {
  return createUserWithEmailAndPassword(auth, email, password)
    .then((userCredential) => {
      console.log("credenciales", userCredential);
      return userCredential.user;
    })
    .catch((error) => {
      console.error("Error en registro:", error.code, error.message);
      throw error;
    });
}