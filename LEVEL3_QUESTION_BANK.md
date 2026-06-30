# Level 3 Question Bank – Logic Gates

This document tracks curated Level 3 question-bank content for the Logic Gates level.

The goal is to expand replayability while keeping advanced questions manually verified and educationally useful.

---

## Level 3 Learning Progression

| Tier | Theme | Skill |
|---|---|---|
| Tier 1 | Learn | Evaluate a single gate |
| Tier 2 | Trace | Follow a two-gate circuit |
| Tier 3 | Analyse | Follow a multi-gate circuit |
| Tier 4 | Diagnose | Identify or repair a missing gate |
| Tier 5 | Engineer | Reverse-engineer a circuit outcome |

---

## Design Principles

Every Level 3 question should:

- Reinforce a specific logic gate concept.
- Have exactly one correct answer from the displayed options.
- Increase replayability through varied wording and scenarios.
- Be solvable using knowledge taught in Practice mode.
- Include an explanation that teaches the reasoning, not just the answer.
- Fit naturally into the "repairing a computer system" theme of the game.

## Difficulty Guidelines

### Tier 1 – Learn
Evaluate a single logic gate.

### Tier 2 – Trace
Follow a signal through two connected gates.

### Tier 3 – Analyse
Trace multi-stage logic chains.

### Tier 4 – Diagnose
Identify, repair, or replace faulty logic gates within a circuit.

### Tier 5 – Engineer
Reverse engineer circuit behaviour, diagnose system faults, or determine the only valid repair.

## Question Pack 1 – Circuit Repair

### Goal

Expand the curated advanced question bank:

- Tier 4: from 3 questions to 10 questions
- Tier 5: from 2 questions to 8 questions

---

## Tier 4 – Circuit Diagnosis

Tier 4 questions should:
- Have exactly one correct answer from the displayed options
- Use simple A/B inputs
- Show a required output
- Ask the player to identify, replace, or repair a missing gate
- Avoid ambiguous options where more than one gate could be correct

### Categories

- Missing Gate
- Circuit Repair
- Fault Diagnosis
- Security Door Controller
- Design Challenge

### Question Drafts

| ID | Category | Inputs | Target | Correct Gate | Options | Scenario |
|---|---|---|---|---|---|---|
| T4-001 | Missing Gate | A=1, B=1 | 1 | OR | XOR, NOR, OR, NAND | Existing question |
| T4-002 | Missing Gate | A=0, B=0 | 1 | NOR | AND, OR, XOR, NOR | Existing question |
| T4-003 | Missing Gate | A=0, B=1 | 0 | AND | OR, AND, NAND, XOR | Existing question |

---

## Tier 5 – Reverse Engineering

Tier 5 questions should:
- Require working backwards through a circuit
- Use a missing first gate or failed component
- Have exactly one correct answer from the displayed options
- Feel like a system repair/debugging task
- Be harder than Tier 4 but still solvable from gate rules

### Categories

- Reverse Logic
- CPU Debugging
- Firewall Authentication
- Robotics
- Alarm Systems
- Factory Automation

### Question Drafts

| ID | Category | Circuit | Target | Correct Gate | Options | Scenario |
|---|---|---|---|---|---|---|
| T5-001 | Reverse Logic | A=1, B=1 → ??? → NOT | 1 | NAND | AND, NAND, OR | Existing question |
| T5-002 | Reverse Logic | A=0, B=1 → ??? → NOT | 0 | OR | AND, NOR, OR | Existing question |

---

## Verification Rules

Before adding any question to the game:

1. Confirm the correct answer produces the target output.
2. Confirm every wrong option does not produce the target output.
3. Confirm the wording matches the diagram shown in game.
4. Confirm the explanation clearly shows the logic.
5. Test the question in an actual Level 3 playthrough.

---

## Future Expansion Notes

Potential future packs:

- Question Pack 2 – Security Systems
- Question Pack 3 – CPU and ALU Debugging
- Question Pack 4 – Robotics and Automation