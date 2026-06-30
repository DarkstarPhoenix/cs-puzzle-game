# Leaderboard Plan

## Goal

Add a simple global leaderboard for completed game runs.

The leaderboard should only submit scores after the player completes Level 4, preventing partial-game score farming.

## Technology

- Firebase Hosting
- Firestore Database
- Firebase JavaScript SDK
- No login/authentication
- No backend server
- Local browser storage for personal progress
- Firestore only for global leaderboard scores

## Firestore Data Model

Collection: `leaderboard`

Fields:

- `name`
- `score`
- `completedAt`
- `version`

## Submission Flow

Complete Level 4 → final results → enter name → submit → show top scores.

## First Version Scope

- Submit final score
- Read top scores
- Show leaderboard
- No accounts
- No editing scores
- No per-level cloud scores