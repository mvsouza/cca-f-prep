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

### 6. 🎟️ $0 Exam Voucher & Pitch Deck
* **Free Certification Voucher Guide:** Built-in tab and roadmap detailing how to get a 100% free Pearson VUE exam voucher ($125 value) through Claude Partner Network (CPN) members such as RemoteHub.
* **14-Day Study Plan:** Structured schedule to reach 720+ scaled score readiness in 14 days (~1.5 hours/day).
* Full documentation available in [PITCH_DECK.md](file:///Users/matheussouza/Workspace/ai-eng-repos/ai-engineer/cca-f-prep/PITCH_DECK.md).

---

## 🌐 Deploy to GitHub Pages

1. Push this repository to GitHub:
   ```bash
   git remote add origin https://github.com/<your-username>/<your-repo>.git
   git push -u origin main
   ```
2. In your GitHub repository settings:
   * Go to **Settings** → **Pages**.
   * Under **Build and deployment** → **Source**, select **GitHub Actions**.
3. The included workflow (`.github/workflows/deploy.yml`) will automatically deploy the static application to `https://<your-username>.github.io/<your-repo>/`.

### 📊 Google Analytics 4 (GA4) Configuration
To activate Google Analytics tracking on your deployment, either:
* Replace `'G-XXXXXXXXXX'` in `index.html` with your GA4 Measurement ID, or
* Open your browser console on the deployed page and run:
  ```javascript
  localStorage.setItem('ccaf_ga_id', 'G-YOUR_MEASUREMENT_ID');
  ```
