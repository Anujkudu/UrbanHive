// Import the Firebase modules
import { initializeApp } from "https://www.gstatic.com/firebasejs/10.9.0/firebase-app.js";
import { getAuth } from "https://www.gstatic.com/firebasejs/10.9.0/firebase-auth.js";
import { getAnalytics } from "https://www.gstatic.com/firebasejs/10.9.0/firebase-analytics.js";
import { getFirestore } from "https://www.gstatic.com/firebasejs/10.9.0/firebase-firestore.js";

const firebaseConfig = {
  apiKey: "AIzaSyAG6msPRh-FU6CTJhAvfX-74K_fvdJrfSU",
  authDomain: "urbanhive26.firebaseapp.com",
  projectId: "urbanhive26",
  storageBucket: "urbanhive26.firebasestorage.app",
  messagingSenderId: "410054022868",
  appId: "1:410054022868:web:a40a956c6ff7e67b534d41",
  measurementId: "G-6RNKQMRBPN"
};

// Initialize Firebase App
const app = initializeApp(firebaseConfig);

// Initialize Firebase Services
export const auth = getAuth(app);
export const analytics = getAnalytics(app);
export const db = getFirestore(app);
