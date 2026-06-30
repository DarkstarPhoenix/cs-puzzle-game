import { db } from "./firebaseConfig.js";
import {
  collection,
  addDoc,
  getDocs,
  query,
  orderBy,
  limit as firestoreLimit,
  serverTimestamp,
} from "https://www.gstatic.com/firebasejs/10.12.2/firebase-firestore.js";

const LEADERBOARD_COLLECTION = "leaderboard";

// Submit a completed game score
export async function submitScore(name, score) {
  console.log("submitScore()", { name, score });

  // Firestore write will be added next.
}

// Retrieve the top leaderboard scores
export async function getTopScores(limit = 10) {
  console.log("getTopScores()", { limit });

  // Firestore read will be added next.
  return [];
}