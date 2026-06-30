// Firebase configuration and Firestore setup will live here.
// This file will initialise Firebase for the leaderboard feature.

import { initializeApp } from "https://www.gstatic.com/firebasejs/10.12.2/firebase-app.js";
import { getFirestore } from "https://www.gstatic.com/firebasejs/10.12.2/firebase-firestore.js";

const firebaseConfig = {
  apiKey: "AIzaSyCA3YPjEDOFHGTZucd4rWtp7qHb0ki9GtU",
  authDomain: "protocol-zero-cs-game.firebaseapp.com",
  projectId: "protocol-zero-cs-game",
  storageBucket: "protocol-zero-cs-game.firebasestorage.app",
  messagingSenderId: "853991965383",
  appId: "1:853991965383:web:669fc71a4d753e812f34e2"
};

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

console.log("Firebase initialised");

export { db };