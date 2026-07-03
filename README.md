# CS Puzzle Game

An interactive educational game designed to introduce core computer
science concepts to students aged **14--17** through puzzle-based
learning and a terminal-style adventure. The project was developed as
part of a **University of Lincoln** Computer Science team software
engineering module.

------------------------------------------------------------------------

# Educational Design

Each level follows the same learning structure:

1.  Learn the concept through guided explanations.
2.  Experiment using interactive practice activities.
3.  Complete a progressively harder challenge.
4.  Receive immediate feedback, a score and an overall rank.

The final level combines concepts from the previous three levels into a
single integrated text adventure.

------------------------------------------------------------------------

# Features

-   Four educational learning levels
-   Practice and Challenge modes
-   Progressive difficulty
-   Live score and streak systems
-   Achievement system
-   Interactive command-line adventure
-   Dynamic room randomisation
-   Firebase leaderboard
-   Background music and sound effects
-   Persistent progress using browser storage

------------------------------------------------------------------------

# Technologies Used

-   HTML5
-   CSS3
-   JavaScript (ES6)
-   React
-   Firebase Firestore
-   Local Storage

------------------------------------------------------------------------

# Installation

1.  Clone or download the repository.
2.  Open the project in **Visual Studio Code**.
3.  Install the **Live Server** extension if required.
4.  Right-click `index.html`.
5.  Select **Open with Live Server**.

The game will launch in your default web browser.

------------------------------------------------------------------------

# Gameplay Overview

## Level 1 -- Binary to Decimal

Learn binary place values using interactive binary switches before
completing progressively harder binary conversion challenges.

**Topics covered**

-   Binary place values
-   Binary to decimal conversion
-   Decimal to binary conversion

------------------------------------------------------------------------

## Level 2 -- If / Else and Loops

Introduces conditional logic, comparison operators and iteration through
interactive practice activities and generated challenge questions.

**Topics covered**

-   If / Else
-   Comparison operators
-   Boolean logic
-   For loops
-   While loops
-   Break and Continue

------------------------------------------------------------------------

## Level 3 -- Logic Gates

Explore digital logic using interactive gate diagrams, truth tables and
progressively harder circuit puzzles.

**Topics covered**

-   AND
-   OR
-   NOT
-   NAND
-   NOR
-   XOR

------------------------------------------------------------------------

## Level 4 -- Text Adventure

The final challenge places the player inside a digitised computer
system.

Navigate using commands such as:

-   `go north`
-   `go south`
-   `go east`
-   `go west`
-   `go firewall`
-   `look`
-   `solve [answer]`
-   `help`

Players solve multi-stage puzzles, collect binary fragments and defeat
the firewall by applying concepts learned throughout the game.

------------------------------------------------------------------------

# Scoring

Players are rewarded for:

-   Correct answers
-   Consecutive answer streaks
-   Fast completion
-   Collecting binary fragments
-   Completing every level

Incorrect answers and unnecessary actions reduce the player's score.

------------------------------------------------------------------------

# Leaderboard

After completing the final level, players can submit their score to the
global Firebase Firestore leaderboard and compare their performance with
other players.

------------------------------------------------------------------------

# Project Structure

``` text
main.js
Level1Binary.js
Level2IfElse.js
Level3LogicGates.js
Level4TextAdventure.js
firebase.js
assets/
```

------------------------------------------------------------------------

# Screenshots

Add screenshots before submission.

Suggested images:

-   Main Menu
-   Level 1 Practice
-   Level 2 Challenge
-   Level 3 Logic Gates
-   Level 4 Text Adventure
-   Final Results Screen
-   Leaderboard

------------------------------------------------------------------------

# Acknowledgements

## Sound Effects

-   Keyboard typing sound --- Pixabay
-   Access Granted --- Freesound Community

## Background Music

Music sourced from Pixabay Music.

Tracks include:

-   Technology Science Digital Technology Music
-   Cyber Dance
-   Cyber Sport
-   Sport Cyber

------------------------------------------------------------------------

# Future Improvements

-   Additional achievements
-   Expanded puzzle banks
-   Accessibility improvements
-   Mobile optimisation
-   Additional sound effects
-   More educational levels
