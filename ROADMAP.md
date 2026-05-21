# CS Puzzle Game – Development Roadmap

---

# Global / Main Menu Systems

## Current
- [x] Level selection screen
- [x] Achievement system
- [x] Best score tracking
- [x] Background music system
- [x] Level unlock flow

## To Do
- [ ] Add player/system profile panel
  - [ ] Total score
  - [ ] Completed levels
  - [ ] Achievement count
  - [ ] Future player rank

- [ ] Add localStorage persistence
  - [ ] Scores
  - [ ] Completed levels
  - [ ] Achievements
  - [ ] Settings

- [ ] Disable TEST_MODE for release
- [ ] Add Firestore leaderboard
- [ ] Mobile/tablet UI testing pass
- [ ] Final balancing pass

---

# Level 1 – Binary to Decimal

## Current
- [x] Practice mode
- [x] Challenge mode
- [x] Progressive random questions
- [x] Streak system
- [x] Rank/result screen
- [x] Binary input buttons
- [x] Animated streak feedback

## To Do
- [ ] Add live score display
  - [ ] Current score
  - [ ] Max score
  - [ ] Streak indicator

- [ ] Improve binary button UI
  - [ ] Add place values above buttons
  - [ ] Add selected binary preview

- [ ] Review score balancing
- [ ] Review star/rank thresholds
- [ ] Extract reusable bit-button component

---

# Level 2 – If / Else

## Current
- [x] Challenge questions
- [x] Progress tracking
- [x] Score system
- [x] Mistake tracking
- [x] Achievement integration

## To Do
- [ ] Add Practice / Challenge tabs

## Practice Mode
- [ ] Explain if statements
- [ ] Explain else statements
- [ ] Explain comparison operators
- [ ] Interactive TRUE/FALSE evaluator
- [ ] AND / OR / NOT examples
- [ ] Mini loop + break examples

## Challenge Mode
- [ ] Expand to 15 questions
- [ ] Add difficulty tiers
- [ ] Add streak system
- [ ] Add rank/result screen
- [ ] Improve animations/feedback

---

# Level 3 – Logic Gates

## Current
- [x] Practice mode
- [x] Challenge mode
- [x] Interactive gate diagrams
- [x] Truth tables
- [x] 15 challenge puzzles
- [x] Difficulty tiers
- [x] Score system

## To Do
- [ ] Add final rank screen
- [ ] Add streak/combo system
- [ ] Add live score + max score display
- [ ] Improve UI consistency with Level 1
- [ ] Review score balancing

---

# Level 4 – Text Adventure

## Current
- [x] Text adventure engine
- [x] Room navigation
- [x] Puzzle rooms
- [x] Score system
- [x] Time penalties
- [x] Time bonuses
- [x] Binary fragment collection
- [x] Firewall boss
- [x] Final exit command
- [x] Clickable commands
- [x] Room completion protection

## To Do
- [ ] Add score breakdown UI
  - [ ] Current score
  - [ ] Fragment count
  - [ ] Time warning

- [ ] Add final rank/debrief screen
- [ ] Improve ending sequence polish
- [ ] Review scoring balance
- [ ] Final playthrough testing
- [ ] Set FAST_MODE = false for release

---

# Future Features

## Leaderboard
- [ ] Firebase leaderboard
- [ ] Player name entry
- [ ] Global high scores
- [ ] Session stats

## Audio
- [ ] More SFX variety
- [ ] Volume controls
- [ ] Music toggle

## Polish
- [ ] Loading transitions
- [ ] Accessibility pass
- [ ] Additional achievements
- [ ] Better responsive layout
- [ ] Save/resume support

---

# Suggested Commit Milestones

## Next Commits
- [ ] Level 1 score display + binary UI polish
- [ ] Level 2 practice/challenge refactor
- [ ] Level 3 result screen + streaks
- [ ] Level 4 score breakdown
- [ ] localStorage save system
- [ ] Leaderboard integration
- [ ] Final release cleanup