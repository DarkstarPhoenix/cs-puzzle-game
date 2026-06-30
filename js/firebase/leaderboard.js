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

export async function submitScore(name, score) {
  console.log("submitScore()", { name, score });

  // Firestore write will be added next.
}

export async function getTopScores(limit = 10) {
  const leaderboardQuery = query(
    collection(db, LEADERBOARD_COLLECTION),
    orderBy("score", "desc"),
    firestoreLimit(limit)
  );

  const snapshot = await getDocs(leaderboardQuery);

  return snapshot.docs.map((doc) => ({
    id: doc.id,
    ...doc.data(),
  }));
}
