# Claude Certified Architect – Foundations (CCA-F) Prep Engine

<div align="center">

[![Live Demo](https://img.shields.io/badge/Live%20Demo-mvsouza.com-22c55e?style=for-the-badge&logo=googlechrome)](https://mvsouza.com/cca-f-prep/)
[![GitHub Stars](https://img.shields.io/github/stars/mvsouza/cca-f-prep?style=for-the-badge&logo=github&color=d97706)](https://github.com/mvsouza/cca-f-prep)
[![Question Bank](https://img.shields.io/badge/Question%20Bank-701%20Scenario%20Drills-blue?style=for-the-badge&logo=anthropic)](https://github.com/mvsouza/cca-f-prep)
[![Benchmark](https://img.shields.io/badge/Passing%20Benchmark-720%20%2F%201000-success?style=for-the-badge)](https://github.com/mvsouza/cca-f-prep)
[![Architecture](https://img.shields.io/badge/Architecture-100%25%20Client--Side-purple?style=for-the-badge)](https://github.com/mvsouza/cca-f-prep)
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg?style=for-the-badge)](https://opensource.org/licenses/MIT)
[![Author](https://img.shields.io/badge/Author-Matheus%20Souza-orange?style=for-the-badge&logo=safari)](https://mvsouza.com)

**An interactive, browser-based exam simulator and spaced-repetition mastery engine designed specifically for the official Anthropic Claude Certified Architect – Foundations (CCA-F / CCAR-F) certification.**

[🚀 Try Live Simulator](https://mvsouza.com/cca-f-prep/) • [📊 14-Day Study Plan & Pitch Deck](PITCH_DECK.md) • [🎁 Partner Voucher Guide](#6-🎟️-sponsored-exam-vouchers--pitch-deck)

</div>

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

The app currently ships with **701 unique, high-yield scenario questions** compiled and deduplicated directly from premier open-source resources:
1. **[Neerajkr7 CCA Exam Practice](https://neerajkr7.github.io/cca-foundations-exam-practice/)** (200 scenario questions)
2. **Utkarsh1agarwal Claude Architect Exam Guide** (342 questions across 6 mock exams)
3. **Dojo Exam Task Statement Drills** (163 blueprint task statement questions)

* **Total Clean Questions in Bank:** **701 questions** (after removing near-identical duplicates with similarity > 0.80)
* **Coverage Margin:**  
  With 60 questions per real exam, a bank of 701 questions provides **more than 11 completely unique, non-repeating mock exams**, giving exhaustive exposure to every edge case and scenario variation.
* **Domain Distribution in Master Bank:**
  1. **Domain 1: Agentic Architecture & Orchestration:** 295 questions (~42.1%)
  2. **Domain 2: Claude Code Configuration & Workflows:** 123 questions (~17.5%)
  3. **Domain 3: Prompt Engineering & Structured Output:** 108 questions (~15.4%)
  4. **Domain 4: Tool Design & Model Context Protocol (MCP) Integration:** 95 questions (~13.6%)
  5. **Domain 5: Context Management & Reliability:** 80 questions (~11.4%)

* **Official 60-Question Mock Weighting:**
  When generating a 60-question mock exam, the engine dynamically balances selection against the official blueprint:
  * Domain 1: 27% (16 questions)
  * Domain 2: 20% (12 questions)
  * Domain 3: 20% (12 questions)
  * Domain 4: 18% (11 questions)
  * Domain 5: 15% (9 questions)

The app comes loaded with a comprehensive built-in bank of authentic scenario questions strictly weighted to this blueprint, and includes an **In-App JSON Importer** (`Question Bank -> Import Questions JSON`) so you can paste additional question batches anytime!

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

### 5. 📱 Smartphone & Tablet Responsive UI
* **Contained Question Map:** On mobile, the 60-question palette is neatly contained in a compact, scrollable tray with a quick **"Hide/Show Map"** toggle to prevent screen clutter.
* **Thumb-Friendly Pagers:** Bottom navigation buttons stack into responsive full-width touch targets on small viewports.
* **Swipe-Friendly Tabs:** Header navigation scrolls horizontally without breaking header layout on viewports as small as 320px.

### 6. 🎟️ Sponsored Exam Vouchers & Pitch Deck
* **Partner Sponsorship Guide:** Step-by-step roadmap explaining how candidate engineers leverage the **Claude Partner Network (CPN)** to receive corporate partner domain credentials, access the Anthropic Partner Academy, and claim up to 100% exam fee waivers on Pearson VUE ($125 value). *(Note: This project is an independent study tool and does not issue vouchers directly).*
* **14-Day Study Plan:** Structured schedule to reach 720+ scaled score readiness in 14 days (~1.5 hours/day).
* Full documentation available in [PITCH_DECK.md](PITCH_DECK.md).

---

## 🌐 Deploy to GitHub Pages

1. Create a new repository named `cca-f-prep` on [GitHub](https://github.com/new).
2. Link your local repo and push:
   ```bash
   cd cca-f-prep
   git remote add origin https://github.com/mvsouza/cca-f-prep.git
   git push -u origin main
   ```
3. In your GitHub repository settings:
   * Navigate to **Settings** → **Pages**.
   * Under **Build and deployment** → **Source**, select **GitHub Actions**.
4. The workflow in `.github/workflows/deploy.yml` will automatically publish the application live to:
   ```
   https://mvsouza.com/cca-f-prep/
   ```

### 📊 Google Analytics 4 (GA4) Configuration
Google Analytics 4 is pre-configured with Measurement ID `G-D1CH30V5KJ` to monitor live candidate traffic, exam completion rates, and domain diagnostics. You can also override it locally in your browser console:
```javascript
localStorage.setItem('ccaf_ga_id', 'G-YOUR_MEASUREMENT_ID');
```

---

## 👨‍💻 Author & Attribution

Created by **[Matheus Souza](https://mvsouza.com)** ([@mvsouza](https://github.com/mvsouza)) to democratize agentic AI engineering and empower developers preparing for Anthropic's flagship architecture credential.

* **Personal Website:** [mvsouza.com](https://mvsouza.com)
* **GitHub:** [@mvsouza](https://github.com/mvsouza)
* **License:** [MIT](LICENSE)
