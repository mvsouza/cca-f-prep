# Claude Certified Architect – Foundations (CCA-F) Prep Engine

An interactive, browser-based exam simulator and spaced-repetition mastery application designed specifically for the **Anthropic Claude Certified Architect – Foundations (CCA-F / CCAR-F)** certification.

---

## 🚀 Quick Start (Zero Setup)

You do **not** need `npm install` or external dependencies. It runs completely locally in any modern browser.

### Option A: Open directly
```bash
open cca-f-prep/index.html
```

### Option B: Local HTTP Server (Recommended)
```bash
cd cca-f-prep
python3 -m http.server 8080
```
Then open `http://localhost:8080` in your web browser.

---

## 🎯 Question Bank Sizing & Strategy

### How many questions should this bank have?
To pass the CCA-F and master the entire curriculum through practice questions alone, the question bank is planned for **360 to 400 questions**.

* **Why 360–400?**  
  The official exam has **60 scenario-based questions**. A pool of 360 questions provides **6 completely non-repeating, unique 60-question mock exams**.
* **Domain Distribution Target:**
  1. **Agentic Architecture & Orchestration:** ~100–120 questions (Agent SDK, subagents, loops, stop reasons)
  2. **Tool Design & Model Context Protocol (MCP) Integration:** ~90–110 questions (MCP servers, resources, tools, transports)
  3. **Claude Code Configuration & Workflows:** ~70–90 questions (`CLAUDE.md`, skills, hooks, headless CI/CD)
  4. **Context Window & Performance Optimization:** ~60–80 questions (Prompt caching, Batch API, structured outputs)
  5. **Security, Guardrails & Compliance:** ~50–60 questions (Prompt injection, HITL gates, Constitutional AI)

The app comes loaded with a comprehensive built-in bank of authentic scenario questions and includes an **In-App JSON Importer** (`Question Bank -> Import Questions JSON`) so you can paste additional question batches anytime!

---

## 🧠 Core Features & Modes

### 1. 🎯 Free Mode (Adaptive Learning)
* **Wise Adaptive Feeder:** Uses spaced-repetition logic to intelligently feed questions:
  1. **Failed / Weak Questions** (given priority after a short spacing gap).
  2. **Unseen Questions** (to push your total syllabus coverage).
  3. **Learning Questions** (waiting for a 2nd confirmation right answer).
  4. **Mastered Questions** (low-frequency maintenance review).
* **Instant Explanations:** Every question provides an immediate self-explanatory breakdown of the architectural concepts and a direct clickable link to the official Anthropic documentation.
* **Domain & Queue Filters:** Filter by specific domains, or select **"Drill Failed Questions Only"** to blitz your weak spots.

### 2. ⏱️ Mock Exam Mode (Official Simulation)
* **Real Exam Environment:** 60 questions, 120-minute countdown timer (plus a 15-question 30-min Sprint mode).
* **Exam Palette & Flags:** Jump between questions, flag questions for later review, track answered vs unanswered.
* **No Spoilers During the Exam:** Explanations and answer evaluations are hidden until you submit.
* **Comprehensive Post-Exam Scorecard:**
  * **Scaled Score (100–1000):** Visual PASS/FAIL status based on the official **720 passing benchmark**.
  * **Domain Diagnostic Breakdown:** Bar graphs highlighting your accuracy per domain.
  * **Detailed Question Review:** View your choice vs the correct choice, complete architectural explanations, and documentation references.
  * **Automatic Sync:** Questions missed during the mock test are automatically marked as `Needs Practice` in the learning engine.

### 3. 📈 Spaced Repetition Mastery ("Clear Out 100%")
* Every question has a mastery state:
  * `Unseen (0/2)`
  * `Needs Practice (0/2)` (answered incorrectly)
  * `Learning (1/2)` (answered right once after a failure)
  * `Mastered (2/2)` (cleared!)
* **Consecutive Rule:** A failed question requires **2 consecutive correct answers** across separate attempts to graduate to "Mastered". If you miss it again, its streak resets to 0.
* Your top header displays your real-time **Target 100% Cleared** progress.

### 4. 💾 Local Persistence & Data Portability
* All stats, attempt history, streaks, and mock exam results are saved automatically in your browser's `localStorage`.
* **Export Backup:** Download a full JSON snapshot of your learning progress anytime.
* **Reset Data:** Reset learning metrics if you want a clean slate.
