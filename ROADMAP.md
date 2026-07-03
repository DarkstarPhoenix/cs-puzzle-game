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

- [x] Add audio feedback system
  - [x] Ensure all clickable buttons have audio feedback
  - [x] Add click sound to menu navigation
  - [x] Add click sound to tab switches
  - [x] Add click sound to Back/Menu buttons
  - [x] Add click sound to Next/Start buttons
  - [x] Keep correct/wrong sounds for answer feedback
  - [x] Check audio does not double-trigger on quiz answers

- [ ] Update README documentation
  - [ ] Installation/setup instructions
  - [ ] Firebase hosting instructions
  - [ ] Controls/gameplay guide
  - [ ] Level descriptions
  - [ ] Achievement system overview
  - [ ] Leaderboard explanation
  - [ ] Technologies used
  - [ ] Screenshots/GIFs

- [ ] Disable TEST_MODE for release
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
- [x] Add live score display
  - [x] Current score
  - [x] Streak indicator

- [x] Improve binary button UI
  - [x] Add place values above buttons

- [ ] Review score balancing
- [x] Review star/rank thresholds
- [ ] Extract reusable bit-button component

---

# Level 2 – If / Else + Loops

## Current
- [x] Challenge questions
- [x] Progress tracking
- [x] Score system
- [x] Mistake tracking
- [x] Achievement integration

## To Do
- [x] Add Practice / Challenge tabs

## Practice Mode
- [x] Explain if statements
- [x] Explain else statements
- [x] Explain comparison operators
- [x] Interactive TRUE/FALSE evaluator
- [x] AND / OR / NOT examples
- [x] Interactive For Loop visualiser
- [x] Interactive While Loop visualiser
- [x] Interactive Break visualiser
- [x] Interactive Continue visualiser

## Challenge Mode
- [x] Expand to 15 questions
- [x] Add progressive challenge question tiers
  - [x] Tier 1: evaluate simple if / else output
  - [x] Tier 2: choose missing if condition
  - [x] Tier 3: evaluate if / elif / else output
  - [x] Tier 4: basic for / while loop output
  - [x] Tier 5: break / continue behaviour
  - [x] Ensure generated questions remain logically consistent
  - [x] Still predictable enough for fair scoring
- [x] Improve randomised question generation
  - [x] Randomise variable values
  - [x] Randomise comparison operators
  - [x] Randomise correct answer logic
  - [x] Avoid same correct condition every run
  - [x] Randomise answer button positions
- [x] Add streak system
- [x] Add rank/result screen
- [x] Improve animations/feedback

## Results Screen
- [x] Rank grading system
- [x] Accuracy tracking
- [x] Mistake tracking
- [x] Rank card UI

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
- [x] Procedural challenge generation
  - [x] Tier 1 procedural
  - [x] Tier 2 procedural
  - [x] Tier 3 procedural
  - [x] Random Tier 4 selection
  - [x] Random Tier 5 order

## To Do
- [x] Add final rank screen
- [x] Add streak/combo system
- [x] Add live score display
  - [x] Current score
  - [x] Streak indicator

- [ ] Educational polish
  - [ ] Review gate selector styling
  - [ ] Review output panel sizing
  - [ ] Review input helper text ("click")
  - [ ] Align Practice/Challenge spacing with Levels 1 and 2
  
- [ ] Expand challenge question banks
  - [ ] Add more Tier 4 identify questions
  - [ ] Add more Tier 5 reverse-logic questions

- [ ] Improve UI consistency with Level 1 and Level 2
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
- [x] Dynamic room randomisation
- [x] Randomised Core room layout
- [x] Multi-stage Logic puzzle
- [x] Multi-stage Debug puzzle
- [x] Multi-stage If/Else puzzle
- [x] Interactive terminal command buttons
- [x] Dynamic Core room map
- [x] Exit command sequence
- [x] Terminal sound effects
- [x] Typewriter effect
- [x] Terminal glitch effects

## To Do
- [x] Add score breakdown UI
  - [x] Current score
  - [x] Fragment count
  - [x] Time display

- [x] Add final rank/debrief screen
- [x] Improve ending sequence polish
- [ ] Review scoring balance
- [ ] Final playthrough testing
- [ ] Disable FAST_MODE for release

---

# Future Features

## Leaderboard

- [x] Firebase project configured
- [x] Firestore connection
- [x] Read helper
- [x] Write helper
- [x] Navigation screen
- [x] Player name entry
- [x] Submit final score after Level 4
- [ ] Live leaderboard display
- [ ] Global leaderboard UI polish

## Audio
- [ ] More SFX variety
- [ ] Volume controls
- [ ] Music toggle

## Code Quality

- [x] Standardised section headers
- [x] Added documentation comments
- [x] Improved code organisation
- [x] Removed obsolete logic
- [x] Improved function grouping
- [x] Improved readability for assessment

## Polish
- [ ] Loading transitions
- [ ] Accessibility pass
- [ ] Additional achievements
- [ ] Better responsive layout
- [ ] Save/resume support

---

# Suggested Commit Milestones

## Next Commits
- [ ] Full code cleanup and documentation
- [ ] README rewrite
- [ ] Final balancing pass
- [ ] Responsive/mobile testing
- [ ] localStorage save system
- [ ] Leaderboard polish
- [ ] Final release cleanup
