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

export async function submitScore(name, score, completionTimeSeconds = null) {
  const cleanName = String(name || "Player").trim().slice(0, 20) || "Player";
  const cleanScore = Number(score);

  if (!Number.isFinite(cleanScore)) {
    throw new Error("Invalid leaderboard score");
  }

  const docRef = await addDoc(collection(db, LEADERBOARD_COLLECTION), {
    name: cleanName,
    score: cleanScore,
    completionTimeSeconds: Number.isFinite(Number(completionTimeSeconds))
        ? Number(completionTimeSeconds)
        : null,
    completedAt: serverTimestamp(),
    version: "1.0",
    
  });

  return docRef.id;
}

export async function getTopScores(limit = 10) {
  const leaderboardQuery = query(
    collection(db, LEADERBOARD_COLLECTION),
    orderBy("score", "desc"),
    orderBy("completionTimeSeconds", "asc"),
    orderBy("completedAt", "asc"),
    firestoreLimit(limit)
  );

  const snapshot = await getDocs(leaderboardQuery);

  return snapshot.docs.map((doc) => ({
    id: doc.id,
    ...doc.data(),
  }));
}

export async function getRankForEntry(entryId) {
  const leaderboardQuery = query(
    collection(db, LEADERBOARD_COLLECTION),
    orderBy("score", "desc"),
    orderBy("completionTimeSeconds", "asc"),
    orderBy("completedAt", "asc")
  );

  const snapshot = await getDocs(leaderboardQuery);

  const entries = snapshot.docs.map((doc, index) => ({
    id: doc.id,
    rank: index + 1,
    ...doc.data(),
  }));

  return entries.find((entry) => entry.id === entryId) || null;
}

window.CSLeaderboard = {
  submitScore,
  getTopScores,
  getRankForEntry,
};

