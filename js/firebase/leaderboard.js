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
  const cleanName = String(name || "Player").trim().slice(0, 20) || "Player";
  const cleanScore = Number(score);

  if (!Number.isFinite(cleanScore)) {
    throw new Error("Invalid leaderboard score");
  }

  const docRef = await addDoc(collection(db, LEADERBOARD_COLLECTION), {
    name: cleanName,
    score: cleanScore,
    completedAt: serverTimestamp(),
    version: "1.0",
  });

  return docRef.id;
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

export async function getRankForScore(score) {
  const cleanScore = Number(score);

  if (!Number.isFinite(cleanScore)) {
    throw new Error("Invalid leaderboard score");
  }

  const higherScoresQuery = query(
    collection(db, LEADERBOARD_COLLECTION),
    orderBy("score", "desc")
  );

  const snapshot = await getDocs(higherScoresQuery);

  const higherScoreCount = snapshot.docs.filter((doc) => {
    const entry = doc.data();
    return Number(entry.score) > cleanScore;
  }).length;

  return higherScoreCount + 1;
}

window.CSLeaderboard = {
  submitScore,
  getTopScores,
  getRankForScore,
};

