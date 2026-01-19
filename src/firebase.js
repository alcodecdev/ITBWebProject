// src/firebase.js
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth"; // Importamos Auth

// Tu configuración de Firebase
const firebaseConfig = {
    apiKey: "AIzaSyBDqP5fFcu3H2ASMx4d9wZ9w0HTEsZaAJk",
    authDomain: "itbwebproject-3a214.firebaseapp.com",
    projectId: "itbwebproject-3a214"
    // storageBucket, messagingSenderId, appId, measurementId no son necesarios ahora
};

// Inicializamos Firebase
const app = initializeApp(firebaseConfig);

// Creamos la instancia de Auth que usarás en toda la app
export const auth = getAuth(app);