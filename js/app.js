/**
 * Main Application Controller for Claude CCA-F Exam Prep
 */

document.addEventListener("DOMContentLoaded", () => {
  // Initialize Core Engines
  const storage = new StudyStorage();
  const feeder = new WiseFeeder(storage);
  const mockEngine = new MockExamEngine(storage);

  // App State
  let currentView = 'dashboard';
  let activeQuestion = null;
  let selectedOptionIndex = null;
  let isAnswerSubmitted = false;

  // Active Mock Exam State
  let currentMock = null;
  let currentMockIndex = 0;
  let mockTimerInterval = null;
  let mockSecondsRemaining = 0;
  let mockSecondsElapsed = 0;

  // DOM Elements
  const navButtons = document.querySelectorAll(".nav-btn");
  const views = {
    dashboard: document.getElementById("view-dashboard"),
    shorts: document.getElementById("view-shorts"),
    free: document.getElementById("view-free"),
    mock: document.getElementById("view-mock"),
    review: document.getElementById("view-review"),
    bank: document.getElementById("view-bank"),
    voucher: document.getElementById("view-voucher"),
    pitch: document.getElementById("view-pitch")
  };

  const headerClearanceText = document.getElementById("header-clearance-text");

  // Google Analytics Event Helper
  function trackEvent(eventName, params = {}) {
    if (typeof window.gtag === 'function' && window.GA_MEASUREMENT_ID && window.GA_MEASUREMENT_ID !== 'G-XXXXXXXXXX') {
      try {
        window.gtag('event', eventName, params);
      } catch (e) {
        console.warn('GA event error:', e);
      }
    }
  }

  const viewTitles = {
    dashboard: "Claude CCA-F Architect Exam Simulator | 700+ Questions & 100% Free Practice",
    shorts: "⚡ Micro-Shorts Knowledge Pills | Claude Architect Prep",
    free: "Free Adaptive Practice | Claude CCA-F Architect Prep",
    mock: "Timed 60-Q Mock Exam (120 Mins) | Claude CCA-F Simulator",
    review: "Mock Exam Diagnostic & Scorecard | Claude CCA-F Simulator",
    bank: "Master Question Bank | Claude CCA-F Prep",
    voucher: "$0 Partner Exam Voucher Guide | Claude CCA-F Prep",
    pitch: "14-Day Study Plan & Pitch Deck | Claude CCA-F Prep"
  };

  // Navigation Logic
  function switchView(targetView, updateHash = true) {
    currentView = targetView;
    Object.keys(views).forEach(key => {
      if (views[key]) {
        views[key].classList.toggle("active", key === targetView);
      }
    });

    navButtons.forEach(btn => {
      btn.classList.toggle("active", btn.dataset.view === targetView);
    });

    if (viewTitles[targetView]) {
      document.title = viewTitles[targetView];
    }

    if (updateHash && window.location.hash !== '#' + targetView) {
      window.history.replaceState(null, '', '#' + targetView);
    }

    trackEvent('page_view', { page_view: targetView });

    if (targetView === 'dashboard') {
      renderDashboard();
    } else if (targetView === 'shorts') {
      renderCurrentShort();
    } else if (targetView === 'free') {
      loadNextFreeQuestion();
    } else if (targetView === 'bank') {
      renderQuestionBankManager();
    }
  }

  // Handle URL Hash Changes (Deep-linking)
  window.addEventListener("hashchange", () => {
    const hash = window.location.hash.replace('#', '');
    if (views[hash] && hash !== currentView) {
      switchView(hash, false);
    }
  });

  navButtons.forEach(btn => {
    btn.addEventListener("click", () => {
      const view = btn.dataset.view;
      if (currentMock && view !== 'mock') {
        if (!confirm("You have a mock exam in progress. Leaving will pause your mock test. Do you want to continue?")) {
          return;
        }
      }
      switchView(view);
    });
  });

  // ==========================================
  // DASHBOARD RENDERING
  // ==========================================
  function renderDashboard() {
    const metrics = storage.getMetrics();

    // Top Header Pill
    headerClearanceText.textContent = `${metrics.masteryPercentage}% Cleared`;

    // Metrics Cards
    document.getElementById("metric-mastery-val").textContent = `${metrics.masteryPercentage}%`;
    document.getElementById("metric-mastery-sub").textContent = `${metrics.masteredCount} of ${metrics.total} questions cleared (100% mastery goal)`;
    document.getElementById("metric-mastery-bar").style.width = `${metrics.masteryPercentage}%`;

    document.getElementById("metric-coverage-val").textContent = `${metrics.coveragePercentage}%`;
    document.getElementById("metric-coverage-sub").textContent = `${metrics.seenCount} seen • ${metrics.unseenCount} unseen questions remaining`;
    document.getElementById("metric-coverage-bar").style.width = `${metrics.coveragePercentage}%`;

    document.getElementById("metric-accuracy-val").textContent = `${metrics.overallSuccessRate}%`;
    document.getElementById("metric-accuracy-sub").textContent = `${metrics.totalCorrect} correct of ${metrics.totalAttempts} total attempts`;

    const latestMock = metrics.latestMocks[metrics.latestMocks.length - 1];
    if (latestMock) {
      document.getElementById("metric-mock-val").textContent = `${latestMock.scaledScore}/1000`;
      document.getElementById("metric-mock-sub").textContent = `${latestMock.pass ? 'PASS (Benchmark: 720)' : 'FAIL (Benchmark: 720)'} • ${metrics.mockExamsCount} total exams taken`;
    } else {
      document.getElementById("metric-mock-val").textContent = "N/A";
      document.getElementById("metric-mock-sub").textContent = "No mock exams taken yet";
    }

    // Spaced Repetition Queue status
    const needsPracticeEl = document.getElementById("count-needs-practice");
    if (needsPracticeEl) needsPracticeEl.textContent = metrics.needsPracticeCount;
    const needsPractice2El = document.getElementById("count-needs-practice-2");
    if (needsPractice2El) needsPractice2El.textContent = metrics.needsPracticeCount;
    document.getElementById("count-learning").textContent = metrics.learningCount;
    document.getElementById("count-mastered").textContent = metrics.masteredCount;

    // Domain Breakdown
    const domainContainer = document.getElementById("dashboard-domains-list");
    domainContainer.innerHTML = "";

    const isCcarp = storage.currentTrack === 'ccarp';
    const domains = isCcarp ? [
      { name: "Integration", weight: "19%" },
      { name: "Solution Design & Architecture", weight: "17%" },
      { name: "Evaluation, Testing & Optimization", weight: "16%" },
      { name: "Governance, Safety & Risk Management", weight: "14%" },
      { name: "Stakeholder Communication & Lifecycle Management", weight: "14%" },
      { name: "Claude Models, Prompting & Context Engineering", weight: "13%" },
      { name: "Developer Productivity & Operational Enablement", weight: "7%" }
    ] : [
      { name: "Agentic Architecture & Orchestration", weight: "27%" },
      { name: "Claude Code Configuration & Workflows", weight: "20%" },
      { name: "Prompt Engineering & Structured Output", weight: "20%" },
      { name: "Tool Design & Model Context Protocol (MCP) Integration", weight: "18%" },
      { name: "Context Management & Reliability", weight: "15%" }
    ];

    domains.forEach(dObj => {
      const d = dObj.name;
      const dWeight = dObj.weight;
      const dData = metrics.domainBreakdown[d] || { total: 0, seen: 0, mastered: 0, correct: 0, attempts: 0 };
      const domainMastery = dData.total > 0 ? Math.round((dData.mastered / dData.total) * 100) : 0;
      const domainAccuracy = dData.attempts > 0 ? Math.round((dData.correct / dData.attempts) * 100) : 0;

      const item = document.createElement("div");
      item.className = "domain-item";
      item.innerHTML = `
        <div class="domain-info">
          <span>${d} <span class="badge" style="background: rgba(217, 119, 6, 0.15); color: #f59e0b; font-size: 0.7rem; margin-left: 0.3rem;">${dWeight} Exam Weight</span></span>
          <span>${domainMastery}% Mastered</span>
        </div>
        <div class="progress-container">
          <div class="progress-bar ${domainMastery >= 80 ? 'success' : ''}" style="width: ${domainMastery}%"></div>
        </div>
        <div class="domain-stats-sub">
          <span>${dData.mastered}/${dData.total} Questions Cleared</span>
          <span>Accuracy: ${domainAccuracy}%</span>
        </div>
      `;
      domainContainer.appendChild(item);
    });

    // Mock History Table
    const historyBody = document.getElementById("mock-history-table-body");
    historyBody.innerHTML = "";
    if (metrics.latestMocks.length === 0) {
      historyBody.innerHTML = `<tr><td colspan="6" style="text-align: center; color: var(--text-muted); padding: 1rem;">No mock exam sessions recorded yet. Start a mock test to track your exam readiness.</td></tr>`;
    } else {
      metrics.latestMocks.slice().reverse().forEach((mock, idx) => {
        const row = document.createElement("tr");
        row.style.borderBottom = "1px solid var(--border-subtle)";
        row.innerHTML = `
          <td style="padding: 0.75rem;">${new Date(mock.date).toLocaleDateString()} ${new Date(mock.date).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}</td>
          <td style="padding: 0.75rem; font-weight: 700;">${mock.scaledScore} / 1000</td>
          <td style="padding: 0.75rem;"><span class="badge ${mock.pass ? 'badge-mastery-mastered' : 'badge-mastery-failed'}">${mock.pass ? 'PASS' : 'FAIL'}</span></td>
          <td style="padding: 0.75rem;">${mock.correctCount} / ${mock.totalQuestions} (${mock.percentage}%)</td>
          <td style="padding: 0.75rem;">${Math.round(mock.timeSpentSeconds / 60)} mins</td>
          <td style="padding: 0.75rem;"><button class="btn-secondary view-mock-review-btn" data-mock-id="${mock.id}" style="padding: 0.3rem 0.6rem; font-size: 0.75rem;">Review Exam</button></td>
        `;
        historyBody.appendChild(row);
      });

      document.querySelectorAll(".view-mock-review-btn").forEach(btn => {
        btn.addEventListener("click", () => {
          const mId = btn.dataset.mockId;
          const found = storage.mockHistory.find(m => m.id === mId);
          if (found) renderMockReview(found);
        });
      });
    }
  }

  // Quick Action Buttons on Dashboard
  document.getElementById("btn-dash-start-free").addEventListener("click", () => switchView('free'));
  document.getElementById("btn-dash-start-mock").addEventListener("click", () => {
    switchView('mock');
    startMockExam(60, 120);
  });
  document.getElementById("btn-dash-drill-failed").addEventListener("click", () => {
    document.getElementById("free-mode-filter").value = "failed_only";
    switchView('free');
  });

  // ==========================================
  // FREE MODE (Adaptive Spaced Repetition)
  // ==========================================
  const freeDomainFilter = document.getElementById("free-domain-filter");
  const freeModeFilter = document.getElementById("free-mode-filter");
  const questionDomainBadge = document.getElementById("free-q-domain");
  const questionMasteryBadge = document.getElementById("free-q-mastery");
  const questionIdText = document.getElementById("free-q-id");
  const questionTextEl = document.getElementById("free-q-text");
  const optionsListEl = document.getElementById("free-options-list");
  const submitAnswerBtn = document.getElementById("btn-free-submit");
  const nextQuestionBtn = document.getElementById("btn-free-next");
  const explanationCard = document.getElementById("free-explanation-card");
  const explanationTitle = document.getElementById("free-explanation-title");
  const explanationText = document.getElementById("free-explanation-text");
  const explanationRefLink = document.getElementById("free-explanation-link");

  function loadNextFreeQuestion() {
    isAnswerSubmitted = false;
    selectedOptionIndex = null;
    explanationCard.classList.remove("show", "correct-feedback", "incorrect-feedback");
    submitAnswerBtn.style.display = "inline-flex";
    submitAnswerBtn.disabled = true;
    nextQuestionBtn.style.display = "none";

    const dFilter = freeDomainFilter.value;
    const mFilter = freeModeFilter.value;
    activeQuestion = feeder.getNextQuestion(dFilter, mFilter);

    if (!activeQuestion) {
      questionTextEl.textContent = "No questions match your current filter selection.";
      optionsListEl.innerHTML = "";
      questionMasteryBadge.textContent = "Empty";
      questionDomainBadge.textContent = "N/A";
      return;
    }

    const prog = storage.getProgress(activeQuestion.id);

    // Meta Badges
    questionIdText.textContent = activeQuestion.id;
    questionDomainBadge.textContent = activeQuestion.domain;

    if (prog.masteryLevel === 3) {
      questionMasteryBadge.className = "badge badge-mastery-mastered";
      questionMasteryBadge.textContent = `Mastered (${prog.consecutiveCorrect}/2 streak)`;
    } else if (prog.masteryLevel === 2) {
      questionMasteryBadge.className = "badge badge-mastery-learning";
      questionMasteryBadge.textContent = `Learning (${prog.consecutiveCorrect}/2 - needs 1 more right answer to clear)`;
    } else if (prog.masteryLevel === 1) {
      questionMasteryBadge.className = "badge badge-mastery-failed";
      questionMasteryBadge.textContent = `Needs Practice (${prog.consecutiveCorrect}/2)`;
    } else {
      questionMasteryBadge.className = "badge badge-mastery-unseen";
      questionMasteryBadge.textContent = "Unseen (0/2)";
    }

    questionTextEl.textContent = activeQuestion.question;
    optionsListEl.innerHTML = "";

    const letters = ["A", "B", "C", "D"];
    activeQuestion.options.forEach((opt, idx) => {
      const optDiv = document.createElement("div");
      optDiv.className = "option-item";
      optDiv.dataset.index = idx;
      optDiv.innerHTML = `
        <div class="option-letter">${letters[idx]}</div>
        <div class="option-label">${opt}</div>
      `;
      optDiv.addEventListener("click", () => {
        if (isAnswerSubmitted) return;
        document.querySelectorAll("#free-options-list .option-item").forEach(item => item.classList.remove("selected"));
        optDiv.classList.add("selected");
        selectedOptionIndex = idx;
        submitAnswerBtn.disabled = false;
      });
      optionsListEl.appendChild(optDiv);
    });
  }

  submitAnswerBtn.addEventListener("click", () => {
    if (selectedOptionIndex === null || isAnswerSubmitted) return;
    isAnswerSubmitted = true;

    const isCorrect = selectedOptionIndex === activeQuestion.correct;
    const updatedProgress = storage.recordAttempt(activeQuestion.id, selectedOptionIndex, isCorrect, 'free');
    trackEvent('free_answer_submitted', { domain: activeQuestion.domain, is_correct: isCorrect });

    // UI feedback on options
    const optionCards = document.querySelectorAll("#free-options-list .option-item");
    optionCards.forEach((card, idx) => {
      card.classList.add("locked");
      if (idx === activeQuestion.correct) {
        card.classList.add("correct");
      }
      if (idx === selectedOptionIndex && !isCorrect) {
        card.classList.add("incorrect");
      }
    });

    // Update mastery badge
    if (updatedProgress.masteryLevel === 3) {
      questionMasteryBadge.className = "badge badge-mastery-mastered";
      questionMasteryBadge.textContent = `Mastered! (Cleared 2/2)`;
    } else if (updatedProgress.masteryLevel === 2) {
      questionMasteryBadge.className = "badge badge-mastery-learning";
      questionMasteryBadge.textContent = `Learning (1/2 - 1 more correct needed)`;
    } else {
      questionMasteryBadge.className = "badge badge-mastery-failed";
      questionMasteryBadge.textContent = `Failed (0/2 - resets streak)`;
    }

    // Explanation Box
    explanationCard.classList.add("show");
    if (isCorrect) {
      explanationCard.classList.add("correct-feedback");
      explanationTitle.textContent = "✓ Correct Answer!";
      explanationTitle.style.color = "var(--color-success)";
    } else {
      explanationCard.classList.add("incorrect-feedback");
      explanationTitle.textContent = "✕ Incorrect Architectural Choice";
      explanationTitle.style.color = "var(--color-danger)";
    }

    explanationText.textContent = activeQuestion.explanation;
    if (activeQuestion.referenceUrl) {
      explanationRefLink.href = activeQuestion.referenceUrl;
      explanationRefLink.textContent = activeQuestion.referenceTitle || "Official Documentation";
      explanationRefLink.parentElement.style.display = "block";
    } else {
      explanationRefLink.parentElement.style.display = "none";
    }

    submitAnswerBtn.style.display = "none";
    nextQuestionBtn.style.display = "inline-flex";

    // Refresh header clearance percentage
    const metrics = storage.getMetrics();
    headerClearanceText.textContent = `${metrics.masteryPercentage}% Cleared`;
  });

  nextQuestionBtn.addEventListener("click", loadNextFreeQuestion);
  freeDomainFilter.addEventListener("change", loadNextFreeQuestion);
  freeModeFilter.addEventListener("change", loadNextFreeQuestion);

  // ==========================================
  // MOCK EXAM MODE (Timed Simulation)
  // ==========================================
  const mockLauncher = document.getElementById("mock-launcher-card");
  const mockExamSession = document.getElementById("mock-active-card");
  const mockTimerEl = document.getElementById("mock-timer");
  const mockCurrentNumEl = document.getElementById("mock-q-current-num");
  const mockTotalNumEl = document.getElementById("mock-q-total-num");
  const mockPalette = document.getElementById("mock-question-palette");
  const mockQuestionText = document.getElementById("mock-q-text");
  const mockOptionsList = document.getElementById("mock-options-list");
  const mockFlagCheckbox = document.getElementById("mock-flag-checkbox");
  const mockPrevBtn = document.getElementById("btn-mock-prev");
  const mockNextBtn = document.getElementById("btn-mock-next");
  const mockSubmitBtn = document.getElementById("btn-mock-submit");
  const btnTogglePalette = document.getElementById("btn-toggle-palette");

  if (btnTogglePalette && mockPalette) {
    btnTogglePalette.addEventListener("click", () => {
      const isHidden = mockPalette.style.display === "none";
      mockPalette.style.display = isHidden ? "grid" : "none";
      btnTogglePalette.textContent = isHidden ? "Hide Map" : "Show Map";
    });
  }

  document.getElementById("btn-start-full-mock").addEventListener("click", () => startMockExam(60, 120));
  document.getElementById("btn-start-mini-mock").addEventListener("click", () => startMockExam(15, 30));

  function startMockExam(questionCount, timeLimitMinutes) {
    currentMock = mockEngine.generateMockExam(questionCount, timeLimitMinutes);
    currentMockIndex = 0;
    mockSecondsRemaining = timeLimitMinutes * 60;
    mockSecondsElapsed = 0;

    mockLauncher.style.display = "none";
    mockExamSession.style.display = "block";

    if (mockPalette) {
      mockPalette.style.display = "grid";
      if (btnTogglePalette) btnTogglePalette.textContent = "Hide Map";
    }

    trackEvent('start_mock_exam', { question_count: questionCount, time_limit: timeLimitMinutes });

    if (mockTimerInterval) clearInterval(mockTimerInterval);
    mockTimerInterval = setInterval(updateMockTimer, 1000);
    renderMockQuestion(currentMockIndex);
    renderMockPalette();
  }

  function updateMockTimer() {
    mockSecondsRemaining--;
    mockSecondsElapsed++;

    const mins = Math.floor(mockSecondsRemaining / 60);
    const secs = mockSecondsRemaining % 60;
    mockTimerEl.textContent = `${String(mins).padStart(2, '0')}:${String(secs).padStart(2, '0')}`;

    if (mockSecondsRemaining <= 0) {
      clearInterval(mockTimerInterval);
      alert("Time is up! Your mock exam is being automatically submitted for evaluation.");
      submitMockExam();
    }
  }

  function renderMockPalette() {
    mockPalette.innerHTML = "";
    currentMock.questions.forEach((q, idx) => {
      const btn = document.createElement("button");
      btn.className = "palette-btn";
      btn.textContent = idx + 1;
      if (idx === currentMockIndex) btn.classList.add("current");
      if (currentMock.userAnswers[q.id] !== undefined) btn.classList.add("answered");
      if (currentMock.flagged.has(q.id)) btn.classList.add("flagged");

      btn.addEventListener("click", () => {
        saveMockAnswer();
        currentMockIndex = idx;
        renderMockQuestion(currentMockIndex);
        renderMockPalette();
      });
      mockPalette.appendChild(btn);
    });
  }

  function renderMockQuestion(idx) {
    const q = currentMock.questions[idx];
    mockCurrentNumEl.textContent = idx + 1;
    mockTotalNumEl.textContent = currentMock.totalQuestions;
    mockQuestionText.textContent = q.question;
    mockFlagCheckbox.checked = currentMock.flagged.has(q.id);

    mockPrevBtn.disabled = idx === 0;
    mockNextBtn.disabled = idx === currentMock.totalQuestions - 1;

    mockOptionsList.innerHTML = "";
    const letters = ["A", "B", "C", "D"];
    const savedAnswer = currentMock.userAnswers[q.id];

    q.options.forEach((opt, optIdx) => {
      const optDiv = document.createElement("div");
      optDiv.className = "option-item" + (savedAnswer === optIdx ? " selected" : "");
      optDiv.innerHTML = `
        <div class="option-letter">${letters[optIdx]}</div>
        <div class="option-label">${opt}</div>
      `;
      optDiv.addEventListener("click", () => {
        document.querySelectorAll("#mock-options-list .option-item").forEach(item => item.classList.remove("selected"));
        optDiv.classList.add("selected");
        currentMock.userAnswers[q.id] = optIdx;
        renderMockPalette();
      });
      mockOptionsList.appendChild(optDiv);
    });
  }

  function saveMockAnswer() {
    // Current choice is already stored directly on click in currentMock.userAnswers
  }

  mockFlagCheckbox.addEventListener("change", (e) => {
    const q = currentMock.questions[currentMockIndex];
    if (e.target.checked) {
      currentMock.flagged.add(q.id);
    } else {
      currentMock.flagged.delete(q.id);
    }
    renderMockPalette();
  });

  mockPrevBtn.addEventListener("click", () => {
    if (currentMockIndex > 0) {
      currentMockIndex--;
      renderMockQuestion(currentMockIndex);
      renderMockPalette();
    }
  });

  mockNextBtn.addEventListener("click", () => {
    if (currentMockIndex < currentMock.totalQuestions - 1) {
      currentMockIndex++;
      renderMockQuestion(currentMockIndex);
      renderMockPalette();
    }
  });

  mockSubmitBtn.addEventListener("click", () => {
    const answeredCount = Object.keys(currentMock.userAnswers).length;
    const unansweredCount = currentMock.totalQuestions - answeredCount;
    const confirmMsg = unansweredCount > 0
      ? `You have ${unansweredCount} unanswered questions out of ${currentMock.totalQuestions}. Are you sure you want to finish and submit?`
      : `Are you ready to submit your exam and receive your score breakdown?`;

    if (confirm(confirmMsg)) {
      submitMockExam();
    }
  });

  function submitMockExam() {
    if (mockTimerInterval) clearInterval(mockTimerInterval);
    const mockRecord = mockEngine.gradeMockExam(currentMock, mockSecondsElapsed);
    storage.recordMockExam(mockRecord);

    trackEvent('submit_mock_exam', {
      scaled_score: mockRecord.scaledScore,
      pass: mockRecord.pass,
      percentage: mockRecord.percentage,
      time_spent: mockSecondsElapsed
    });

    currentMock = null;
    mockExamSession.style.display = "none";
    mockLauncher.style.display = "block";

    renderMockReview(mockRecord);
  }

  // ==========================================
  // POST-MOCK EXAM SCORECARD & REVIEW
  // ==========================================
  function renderMockReview(mockRecord) {
    switchView('review');

    const scorecardBanner = document.getElementById("review-scorecard-banner");
    const passStatusBadge = document.getElementById("review-pass-badge");
    const scaledScoreEl = document.getElementById("review-scaled-score");
    const reviewStatsSub = document.getElementById("review-stats-sub");
    const domainReviewContainer = document.getElementById("review-domain-breakdown");
    const questionsReviewContainer = document.getElementById("review-questions-list");

    // Return to dashboard button
    const backDashBtn = document.getElementById("btn-review-back-dash");
    if (backDashBtn) {
      backDashBtn.onclick = () => switchView('dashboard');
    }

    // Share & Copy buttons
    const btnShareScore = document.getElementById("btn-share-score");
    const btnCopyScore = document.getElementById("btn-copy-score");

    if (btnShareScore) {
      btnShareScore.onclick = () => {
        const statusEmoji = mockRecord.pass ? "🎉 PASSED" : "📚 STUDYING";
        const shareText = `I scored ${mockRecord.scaledScore}/1000 (${statusEmoji}) on the Claude Certified Architect - Foundations (CCA-F) Mock Simulator!\n\n700+ questions, free & runs client-side in the browser.\n\nPractice here: https://mvsouza.com/cca-f-prep/ #Claude #Anthropic #AIEngineer`;
        const twitterUrl = `https://twitter.com/intent/tweet?text=${encodeURIComponent(shareText)}`;
        window.open(twitterUrl, '_blank', 'noopener,noreferrer');
        trackEvent('share_score_twitter', { scaled_score: mockRecord.scaledScore, pass: mockRecord.pass });
      };
    }

    if (btnCopyScore) {
      btnCopyScore.onclick = () => {
        const copyText = `🎯 Claude Certified Architect - Foundations (CCA-F) Mock Result:
Result: ${mockRecord.pass ? '✅ OFFICIAL PASS' : '📚 IN TRAINING'}
Scaled Score: ${mockRecord.scaledScore}/1000 (Benchmark: 720)
Raw Accuracy: ${mockRecord.correctCount}/${mockRecord.totalQuestions} (${mockRecord.percentage}%)
Time Spent: ${Math.round(mockRecord.timeSpentSeconds / 60)} minutes

Practice with 700+ questions free:
https://mvsouza.com/cca-f-prep/`;

        navigator.clipboard.writeText(copyText).then(() => {
          const original = btnCopyScore.textContent;
          btnCopyScore.textContent = "✓ Copied to Clipboard!";
          setTimeout(() => {
            btnCopyScore.textContent = original;
          }, 2500);
          trackEvent('copy_score_clipboard', { scaled_score: mockRecord.scaledScore });
        }).catch(() => {
          alert("Score summary:\n\n" + copyText);
        });
      };
    }

    // Banner Styling
    scorecardBanner.className = "scorecard-banner " + (mockRecord.pass ? "pass" : "fail");
    passStatusBadge.className = "score-badge-large " + (mockRecord.pass ? "pass" : "fail");
    passStatusBadge.textContent = mockRecord.pass ? "OFFICIAL PASS" : "DID NOT PASS";

    scaledScoreEl.textContent = `${mockRecord.scaledScore} / 1000`;
    reviewStatsSub.textContent = `Raw Accuracy: ${mockRecord.correctCount}/${mockRecord.totalQuestions} (${mockRecord.percentage}%) • Time Spent: ${Math.round(mockRecord.timeSpentSeconds / 60)} minutes • Benchmark: 720/1000`;

    // Domain Breakdown
    domainReviewContainer.innerHTML = "";
    Object.keys(mockRecord.domainScores).forEach(d => {
      const dScore = mockRecord.domainScores[d];
      const dPct = dScore.total > 0 ? Math.round((dScore.correct / dScore.total) * 100) : 0;
      const dItem = document.createElement("div");
      dItem.className = "domain-item";
      dItem.innerHTML = `
        <div class="domain-info">
          <span>${d}</span>
          <span>${dPct}% (${dScore.correct}/${dScore.total})</span>
        </div>
        <div class="progress-container">
          <div class="progress-bar ${dPct >= 72 ? 'success' : ''}" style="width: ${dPct}%"></div>
        </div>
      `;
      domainReviewContainer.appendChild(dItem);
    });

    // Question List
    function renderQuestionsFilter(filter = 'all') {
      questionsReviewContainer.innerHTML = "";
      const letters = ["A", "B", "C", "D"];

      mockRecord.answers.forEach(item => {
        if (filter === 'wrong' && item.isCorrect) return;
        if (filter === 'right' && !item.isCorrect) return;

        const qCard = document.createElement("div");
        qCard.className = `review-item ${item.isCorrect ? 'right' : 'wrong'}`;

        const userChoiceLabel = item.selectedOption !== null ? `${letters[item.selectedOption]}: ${item.options[item.selectedOption]}` : "Unanswered";
        const correctChoiceLabel = `${letters[item.correctOption]}: ${item.options[item.correctOption]}`;

        qCard.innerHTML = `
          <div style="display: flex; justify-content: space-between; margin-bottom: 0.5rem; font-size: 0.8rem;">
            <span style="font-weight: 700; color: ${item.isCorrect ? 'var(--color-success)' : 'var(--color-danger)'};">
              ${item.isCorrect ? '✓ Correct' : '✕ Incorrect'} • Question ${item.index}
            </span>
            <span class="badge badge-domain">${item.domain}</span>
          </div>
          <div style="font-size: 0.95rem; font-weight: 600; margin-bottom: 0.85rem; color: #f8fafc;">
            ${item.question}
          </div>
          <div style="font-size: 0.85rem; margin-bottom: 0.4rem; color: ${item.isCorrect ? 'var(--color-success)' : 'var(--color-danger)'};">
            <strong>Your Answer:</strong> ${userChoiceLabel}
          </div>
          ${!item.isCorrect ? `
            <div style="font-size: 0.85rem; margin-bottom: 0.85rem; color: var(--color-success);">
              <strong>Correct Answer:</strong> ${correctChoiceLabel}
            </div>
          ` : ''}
          <div style="background: rgba(0,0,0,0.2); padding: 0.85rem; border-radius: var(--radius-sm); font-size: 0.85rem; line-height: 1.5; color: #cbd5e1; margin-top: 0.5rem;">
            <strong>Self-Explanatory Architectural Breakdown:</strong><br/>
            ${item.explanation}
            ${item.referenceUrl ? `<br/><br/><strong>Reference:</strong> <a href="${item.referenceUrl}" target="_blank" style="color: #60a5fa; text-decoration: underline;">${item.referenceTitle || 'Official Anthropic Documentation'}</a>` : ''}
          </div>
        `;
        questionsReviewContainer.appendChild(qCard);
      });
    }

    renderQuestionsFilter('all');

    // Filter Buttons in Review
    document.getElementById("btn-review-filter-all").onclick = () => renderQuestionsFilter('all');
    document.getElementById("btn-review-filter-wrong").onclick = () => renderQuestionsFilter('wrong');
    document.getElementById("btn-review-filter-right").onclick = () => renderQuestionsFilter('right');
  }

  // ==========================================
  // QUESTION BANK & DATA MANAGEMENT
  // ==========================================
  function renderQuestionBankManager() {
    const questions = storage.getAllQuestions();
    document.getElementById("bank-total-count").textContent = `${questions.length} Questions in Local Bank`;

    const tbody = document.getElementById("bank-table-body");
    tbody.innerHTML = "";

    questions.forEach((q, idx) => {
      const p = storage.getProgress(q.id);
      const row = document.createElement("tr");
      row.style.borderBottom = "1px solid var(--border-subtle)";

      let statusBadge = '<span class="badge badge-mastery-unseen">Unseen</span>';
      if (p.masteryLevel === 3) statusBadge = '<span class="badge badge-mastery-mastered">Mastered (2/2)</span>';
      else if (p.masteryLevel === 2) statusBadge = '<span class="badge badge-mastery-learning">Learning (1/2)</span>';
      else if (p.masteryLevel === 1) statusBadge = '<span class="badge badge-mastery-failed">Needs Practice</span>';

      row.innerHTML = `
        <td style="padding: 0.6rem; font-size: 0.8rem; font-family: monospace;">${q.id}</td>
        <td style="padding: 0.6rem; font-size: 0.85rem;">${q.domain}</td>
        <td style="padding: 0.6rem; font-size: 0.85rem; max-width: 400px; white-space: nowrap; overflow: hidden; text-overflow: ellipsis;">${q.question}</td>
        <td style="padding: 0.6rem;">${statusBadge}</td>
        <td style="padding: 0.6rem; font-size: 0.8rem;">${p.timesSeen > 0 ? `${p.timesCorrect}/${p.timesSeen}` : '0/0'}</td>
      `;
      tbody.appendChild(row);
    });
  }

  // Import JSON Modal
  const importModal = document.getElementById("import-modal");
  document.getElementById("btn-open-import-modal").onclick = () => importModal.classList.add("show");
  document.getElementById("btn-close-import-modal").onclick = () => importModal.classList.remove("show");

  document.getElementById("btn-confirm-import").onclick = () => {
    const raw = document.getElementById("json-import-textarea").value;
    try {
      const parsed = JSON.parse(raw);
      const count = storage.importQuestions(parsed);
      alert(`Successfully imported ${count} questions into your study bank!`);
      importModal.classList.remove("show");
      renderQuestionBankManager();
      renderDashboard();
    } catch (e) {
      alert("Invalid JSON format. Please ensure you are pasting an array of question objects.");
    }
  };

  // Export JSON Backup
  document.getElementById("btn-export-data").onclick = () => {
    const dataStr = "data:text/json;charset=utf-8," + encodeURIComponent(storage.exportData());
    const downloadAnchor = document.createElement("a");
    downloadAnchor.setAttribute("href", dataStr);
    downloadAnchor.setAttribute("download", `ccaf_study_backup_${new Date().toISOString().slice(0, 10)}.json`);
    document.body.appendChild(downloadAnchor);
    downloadAnchor.click();
    downloadAnchor.remove();
  };

  // Reset Progress
  document.getElementById("btn-reset-data").onclick = () => {
    if (confirm("Are you sure you want to reset all your learning progress and mock exam history? This action cannot be undone.")) {
      storage.resetAllProgress();
      alert("Progress reset. All questions set back to Unseen.");
      renderDashboard();
      switchView('dashboard');
    }
  };

  // ==========================================
  // TRACK SELECTOR & MULTI-CERTIFICATION LOGIC
  // ==========================================
  const trackSelector = document.getElementById("app-track-select");
  const headerTrackSubtitle = document.getElementById("header-track-subtitle");

  function updateTrackUI() {
    const isCcarp = storage.currentTrack === 'ccarp';
    if (trackSelector) {
      trackSelector.value = storage.currentTrack;
    }
    if (headerTrackSubtitle) {
      headerTrackSubtitle.textContent = isCcarp 
        ? "CCAR-P: Professional Track" 
        : "CCA-F: Foundations Track";
    }
    updateDomainOptions();
  }

  function updateDomainOptions() {
    const isCcarp = storage.currentTrack === 'ccarp';
    const ccarpDomains = [
      { name: "Integration", label: "1. Integration & Protocols (19%)" },
      { name: "Solution Design & Architecture", label: "2. Solution Design & Architecture (17%)" },
      { name: "Evaluation, Testing & Optimization", label: "3. Evaluation, Testing & Optimization (16%)" },
      { name: "Governance, Safety & Risk Management", label: "4. Governance, Safety & Risk (14%)" },
      { name: "Stakeholder Communication & Lifecycle Management", label: "5. Stakeholder Communication (14%)" },
      { name: "Claude Models, Prompting & Context Engineering", label: "6. Models & Prompting (13%)" },
      { name: "Developer Productivity & Operational Enablement", label: "7. Developer Productivity (7%)" }
    ];
    const ccafDomains = [
      { name: "Agentic Architecture & Orchestration", label: "1. Agentic Architecture & Orchestration (27%)" },
      { name: "Claude Code Configuration & Workflows", label: "2. Claude Code Configuration & Workflows (20%)" },
      { name: "Prompt Engineering & Structured Output", label: "3. Prompt Engineering & Structured Output (20%)" },
      { name: "Tool Design & Model Context Protocol (MCP) Integration", label: "4. Tool Design & MCP Integration (18%)" },
      { name: "Context Management & Reliability", label: "5. Context Management & Reliability (15%)" }
    ];
    const activeDomains = isCcarp ? ccarpDomains : ccafDomains;
    
    if (freeDomainFilter) {
      const currentVal = freeDomainFilter.value;
      freeDomainFilter.innerHTML = '<option value="all">All Domains (Official Balanced Weighting)</option>' +
        activeDomains.map(d => `<option value="${d.name}">${d.label}</option>`).join('');
      if (activeDomains.some(d => d.name === currentVal)) {
        freeDomainFilter.value = currentVal;
      } else {
        freeDomainFilter.value = "all";
      }
    }
  }

  if (trackSelector) {
    trackSelector.addEventListener("change", (e) => {
      const selectedTrack = e.target.value;
      storage.setTrack(selectedTrack);
      updateTrackUI();
      renderDashboard();
      if (currentView === 'free') {
        loadNextFreeQuestion();
      } else if (currentView === 'bank') {
        renderQuestionBankManager();
      }
    });
  }

  // ==========================================
  // MICRO-SHORTS KNOWLEDGE PILLS CONTROLLER
  // ==========================================
  const SHORTS_PILLS = [
    {
      id: "short-1",
      domain: "Domain 1: Integration & Protocols (19%)",
      title: "The 100-Tool Nightmare: Dynamic Discovery",
      hook: "Registering 50+ tools directly into Claude degrades precision and explodes prompt token costs. Here is the enterprise architectural fix.",
      concept: "Instead of dumping 50 tool schemas into your system prompt, use a <strong>Meta-Tool Discovery registry</strong>. Give Claude a single <code>search_tools</code> interface. It retrieves only the 2 required tool schemas dynamically at runtime, reducing capability bloat and cutting token spend by up to 90%.",
      takeaway: "Whenever an exam scenario mentions routing errors from too many tools or context bloat, the answer is always <strong>dynamic tool discovery or hierarchical subagents</strong>—never increasing max tokens.",
      speech: "The 100-Tool Nightmare. If you register 50 tools directly into your Claude agent, your system will hallucinate and drain your budget on every turn. Instead, use Progressive Tool Discovery with a single meta-tool called search_tools. Exam Golden Rule: whenever a question mentions tool capability bloat, the answer is dynamic tool discovery or hierarchical subagents, never increasing max tokens.",
      svg: `
        <svg viewBox="0 0 600 160" width="100%" height="100%" style="font-family: inherit;">
          <defs>
            <linearGradient id="grad1" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stop-color="#3b82f6" stop-opacity="0.2"/>
              <stop offset="100%" stop-color="#1e3a8a" stop-opacity="0.3"/>
            </linearGradient>
          </defs>
          <g>
            <rect x="20" y="55" width="120" height="50" rx="8" fill="url(#grad1)" stroke="#3b82f6" stroke-width="1.5"/>
            <text x="80" y="85" fill="#f8fafc" font-size="12" font-weight="600" text-anchor="middle">User Request</text>
            <path d="M 140 80 L 190 80" stroke="#60a5fa" stroke-width="2" stroke-dasharray="4,4" class="dataFlow"/>
            <rect x="190" y="45" width="140" height="70" rx="8" fill="rgba(217, 119, 6, 0.15)" stroke="#d97706" stroke-width="2" class="pulse"/>
            <text x="260" y="75" fill="#fbbf24" font-size="13" font-weight="700" text-anchor="middle">Claude Core</text>
            <text x="260" y="95" fill="#cbd5e1" font-size="10" text-anchor="middle">search_tools("billing")</text>
            <path d="M 330 80 L 380 80" stroke="#f59e0b" stroke-width="2" stroke-dasharray="4,4" class="dataFlow"/>
            <rect x="380" y="30" width="190" height="100" rx="8" fill="rgba(34, 197, 94, 0.1)" stroke="#22c55e" stroke-width="1.5"/>
            <text x="475" y="55" fill="#4ade80" font-size="12" font-weight="700" text-anchor="middle">Dynamic Tool Registry</text>
            <rect x="395" y="65" width="160" height="24" rx="4" fill="#0f172a" stroke="#334155"/>
            <text x="475" y="81" fill="#94a3b8" font-size="9" text-anchor="middle">100+ Total Registered Tools</text>
            <rect x="395" y="95" width="160" height="24" rx="4" fill="rgba(34, 197, 94, 0.25)" stroke="#22c55e"/>
            <text x="475" y="111" fill="#86efac" font-size="10" font-weight="600" text-anchor="middle">⚡ Injects 2 Matched Tools</text>
          </g>
        </svg>
      `
    },
    {
      id: "short-2",
      domain: "Domain 1: Integration & Protocols (19%)",
      title: "Production MCP: Stdio vs SSE / HTTP",
      hook: "Why does local stdio MCP fail the moment you deploy your agent to AWS or Kubernetes? Here is the enterprise distinction.",
      concept: "<strong>stdio</strong> launches a local child OS process. It is strictly meant for local developer tools (like Claude Code on a laptop). For enterprise container clouds, you must deploy <strong>SSE (Server-Sent Events) over HTTP</strong>, protected by mTLS and OAuth 2.0 JWT bearer authorization.",
      takeaway: "On the CCAR-P exam: Production multi-container enterprise MCP = <strong>SSE / HTTP with OAuth 2.0</strong>. Local developer CLI = <strong>stdio</strong>.",
      speech: "Production MCP: Stdio versus SSE over HTTP. Why does local stdio MCP fail the moment you deploy to Kubernetes? stdio spawns a local child process meant only for local developer machines. In production clouds, you must use SSE over HTTP with mutual TLS and OAuth 2.0 bearer tokens.",
      svg: `
        <svg viewBox="0 0 600 160" width="100%" height="100%" style="font-family: inherit;">
          <!-- Local Stdio Block -->
          <rect x="25" y="28" width="250" height="108" rx="8" fill="rgba(239, 68, 68, 0.08)" stroke="#ef4444" stroke-width="1.5"/>
          <circle cx="45" cy="48" r="5" fill="#ef4444"/>
          <text x="155" y="52" fill="#f87171" font-size="13" font-weight="700" text-anchor="middle">Local Stdio (CLI / Dev Only)</text>
          <path d="M 50 82 L 250 82" stroke="#ef4444" stroke-width="2" stroke-dasharray="4,4"/>
          <text x="150" y="78" fill="#cbd5e1" font-size="10" text-anchor="middle">stdin ⇄ stdout pipe</text>
          <text x="150" y="105" fill="#fca5a5" font-size="9" text-anchor="middle">❌ Single-host child process only</text>

          <!-- Cloud SSE/HTTP Block -->
          <rect x="325" y="28" width="250" height="108" rx="8" fill="rgba(34, 197, 94, 0.1)" stroke="#22c55e" stroke-width="1.8" class="pulse-green"/>
          <circle cx="345" cy="48" r="5" fill="#22c55e" class="pulse"/>
          <text x="455" y="52" fill="#4ade80" font-size="13" font-weight="700" text-anchor="middle">Cloud SSE / HTTP (Production)</text>
          <path d="M 350 82 L 550 82" stroke="#4ade80" stroke-width="2" stroke-dasharray="6,4" class="dataFlow"/>
          <text x="450" y="78" fill="#e2e8f0" font-size="10" text-anchor="middle">TLS 1.3 + OAuth 2.0 JWT Bearer</text>
          <text x="450" y="105" fill="#86efac" font-size="9" font-weight="600" text-anchor="middle">⚡ Distributed Kubernetes / Multi-VPC</text>
        </svg>
      `
    },
    {
      id: "short-3",
      domain: "Domain 4: Governance & Security (14%)",
      title: "Multi-Tenant Isolation: Never Trust The Prompt",
      hook: "Asking Claude to filter tenant data via prompt instruction is a critical vulnerability. Here is the compliant pattern.",
      concept: "Prompt instructions like 'Only return records for Tenant B' can be easily bypassed by indirect prompt injections found in retrieved documents. Enterprise multi-tenancy must be enforced <strong>deterministically at the Vector DB retrieval filter</strong>: <code>metadata: { tenant_id: session.tenant_id }</code>.",
      takeaway: "Security and data segregation must ALWAYS be enforced <strong>deterministically in code or the database layer</strong>, never probabilistically inside the LLM prompt.",
      speech: "Multi-Tenant Isolation: Never trust the prompt. If you instruct Claude in the prompt to only show Tenant B data, an indirect prompt injection in the document can override it. The only compliant pattern is deterministic metadata pre-filtering at the database layer before retrieval.",
      svg: `
        <svg viewBox="0 0 600 160" width="100%" height="100%" style="font-family: inherit;">
          <rect x="20" y="45" width="130" height="70" rx="8" fill="rgba(59, 130, 246, 0.12)" stroke="#3b82f6" stroke-width="1.5"/>
          <text x="85" y="75" fill="#93c5fd" font-size="12" font-weight="700" text-anchor="middle">Tenant A User</text>
          <text x="85" y="95" fill="#cbd5e1" font-size="10" text-anchor="middle">tenant_id = 'ORG-42'</text>

          <path d="M 150 80 L 220 80" stroke="#38bdf8" stroke-width="2" stroke-dasharray="4,4" class="dataFlow"/>

          <rect x="220" y="35" width="170" height="90" rx="8" fill="rgba(34, 197, 94, 0.15)" stroke="#22c55e" stroke-width="2"/>
          <text x="305" y="65" fill="#4ade80" font-size="12" font-weight="700" text-anchor="middle">Vector DB Hard Filter</text>
          <text x="305" y="85" fill="#f8fafc" font-size="10" font-family="monospace" text-anchor="middle">tenant_id == 'ORG-42'</text>
          <text x="305" y="105" fill="#86efac" font-size="9" text-anchor="middle">🛡️ Zero Cross-Tenant Leakage</text>

          <path d="M 390 80 L 460 80" stroke="#22c55e" stroke-width="2" stroke-dasharray="4,4" class="dataFlow"/>

          <rect x="460" y="45" width="120" height="70" rx="8" fill="rgba(217, 119, 6, 0.15)" stroke="#d97706" stroke-width="1.5"/>
          <text x="520" y="75" fill="#fbbf24" font-size="12" font-weight="700" text-anchor="middle">Claude Prompt</text>
          <text x="520" y="95" fill="#cbd5e1" font-size="9" text-anchor="middle">Safe Isolated Context</text>
        </svg>
      `
    },
    {
      id: "short-4",
      domain: "Domain 2: Solution Design & Architecture (17%)",
      title: "Workflows vs Autonomous Agent Swarms",
      hook: "When should you NOT use an autonomous AI agent? Enterprise SLAs demand predictability.",
      concept: "If an enterprise task has strict SLAs (under 3 seconds), zero tolerance for deviation, and predictable steps (such as structured insurance claim intake), an autonomous agent loop is an anti-pattern. Use <strong>deterministic workflow chains</strong> with schema-validated outputs instead.",
      takeaway: "Reserve autonomous loops only for open-ended problem spaces (such as coding or research). For compliance, auditability, and speed, <strong>deterministic workflows beat autonomous loops</strong>.",
      speech: "Workflows versus Autonomous Agent Swarms. When should you not use an autonomous agent? If your task has strict latency SLAs, zero tolerance for deviation, and predictable steps, an autonomous agent loop will be too slow and non-deterministic. Use structured code workflow chains instead.",
      svg: `
        <svg viewBox="0 0 600 160" width="100%" height="100%" style="font-family: inherit;">
          <!-- Deterministic Workflow -->
          <rect x="25" y="28" width="250" height="108" rx="8" fill="rgba(34, 197, 94, 0.1)" stroke="#22c55e" stroke-width="1.8" class="pulse-green"/>
          <text x="150" y="52" fill="#4ade80" font-size="13" font-weight="700" text-anchor="middle">Deterministic Workflow</text>
          <path d="M 45 80 L 255 80" stroke="#4ade80" stroke-width="2.5" stroke-dasharray="8,5" class="dataFlow"/>
          <circle cx="80" cy="80" r="7" fill="#22c55e"/>
          <circle cx="150" cy="80" r="7" fill="#22c55e"/>
          <circle cx="220" cy="80" r="7" fill="#22c55e"/>
          <text x="150" y="105" fill="#86efac" font-size="9" font-weight="600" text-anchor="middle">⚡ SLA &lt; 2s • 100% Audit Trail</text>

          <!-- Autonomous Agent Loop -->
          <rect x="325" y="28" width="250" height="108" rx="8" fill="rgba(245, 158, 11, 0.1)" stroke="#f59e0b" stroke-width="1.8" class="pulse"/>
          <text x="450" y="52" fill="#fbbf24" font-size="13" font-weight="700" text-anchor="middle">Autonomous Agent Loop</text>
          <path d="M 370 80 C 370 65, 530 65, 530 80 C 530 95, 370 95, 370 80" stroke="#f59e0b" stroke-width="2" stroke-dasharray="6,4" class="dataFlow" fill="none"/>
          <text x="450" y="84" fill="#cbd5e1" font-size="9" text-anchor="middle">Plan 🔁 Tool 🔁 Eval</text>
          <text x="450" y="115" fill="#fde68a" font-size="9" text-anchor="middle">⚠️ Non-deterministic • Open-ended only</text>
        </svg>
      `
    },
    {
      id: "short-5",
      domain: "Domain 2: Solution Design & Architecture (17%)",
      title: "3-Tier Model Cascading: Save 85% Cost",
      hook: "Routing every query to Opus is throwing money into a furnace. Here is the production cascade pattern.",
      concept: "Deploy a 3-tier routing cascade: <strong>Claude 3.5 Haiku</strong> handles triage, routing, and intent classification (80% of volume). Escalate multi-step tool calls to <strong>Claude 3.5 Sonnet</strong> (15%). Reserve <strong>Claude 3.5 Opus</strong> strictly for multi-step reasoning, mathematical proofs, or legal edge cases (5%).",
      takeaway: "Architectural efficiency is measured in cost-per-successful-task. Model routing cascades are the primary pattern tested for production cost and latency optimization.",
      speech: "Three-Tier Model Cascading: Save 85% Cost. Sending every enterprise query to Opus throws money away. Use Claude 3.5 Haiku for sub-second intent classification on 80% of queries. Escalate coding and tool use to Sonnet, and reserve Opus exclusively for complex legal or mathematical reasoning.",
      svg: `
        <svg viewBox="0 0 600 160" width="100%" height="100%" style="font-family: inherit;">
          <!-- Haiku Tier -->
          <rect x="25" y="38" width="160" height="85" rx="8" fill="rgba(59, 130, 246, 0.15)" stroke="#3b82f6" stroke-width="2" class="pulse-blue"/>
          <text x="105" y="65" fill="#93c5fd" font-size="13" font-weight="700" text-anchor="middle">Haiku 3.5</text>
          <text x="105" y="85" fill="#f8fafc" font-size="11" text-anchor="middle">80% Traffic</text>
          <text x="105" y="105" fill="#60a5fa" font-size="9" text-anchor="middle">Sub-second Triage</text>

          <path d="M 185 80 L 225 80" stroke="#3b82f6" stroke-width="2" stroke-dasharray="4,4" class="dataFlow"/>

          <!-- Sonnet Tier -->
          <rect x="225" y="38" width="160" height="85" rx="8" fill="rgba(217, 119, 6, 0.15)" stroke="#d97706" stroke-width="2" class="pulse"/>
          <text x="305" y="65" fill="#fbbf24" font-size="13" font-weight="700" text-anchor="middle">Sonnet 3.5</text>
          <text x="305" y="85" fill="#f8fafc" font-size="11" text-anchor="middle">15% Traffic</text>
          <text x="305" y="105" fill="#f59e0b" font-size="9" text-anchor="middle">Coding & Tools</text>

          <path d="M 385 80 L 425 80" stroke="#f59e0b" stroke-width="2" stroke-dasharray="4,4" class="dataFlow"/>

          <!-- Opus Tier -->
          <rect x="425" y="38" width="150" height="85" rx="8" fill="rgba(168, 85, 247, 0.15)" stroke="#a855f7" stroke-width="2"/>
          <text x="500" y="65" fill="#d8b4fe" font-size="13" font-weight="700" text-anchor="middle">Opus 3.5</text>
          <text x="500" y="85" fill="#f8fafc" font-size="11" text-anchor="middle">5% Traffic</text>
          <text x="500" y="105" fill="#c084fc" font-size="9" text-anchor="middle">Complex Logic</text>
        </svg>
      `
    },
    {
      id: "short-6",
      domain: "Domain 3: Evaluation & Optimization (16%)",
      title: "Prompt Caching: The Cryptographic Prefix Rule",
      hook: "Why did your 40,000-token prompt cache hit rate drop to 0%? You made this 1-character mistake.",
      concept: "Anthropic prompt caching requires an <strong>exact cryptographic prefix match from token 0</strong>. If you place dynamic timestamps or session IDs at the beginning of the prompt, the entire cache is busted. Always order prompts: <strong>Static System Prompt ➡️ Reference Docs/Tools ➡️ Cache Point ➡️ Dynamic User Query</strong>.",
      takeaway: "On the exam: Cache hit rate drops are almost always caused by dynamic variables placed before the cache checkpoint. Static content must always precede dynamic content.",
      speech: "Prompt Caching: The Cryptographic Prefix Rule. Why did your prompt cache hit rate drop to zero? Anthropic prompt caching requires an exact prefix match from token zero. Placing a dynamic timestamp at the top of the prompt invalidates the cache for all subsequent tokens. Static instructions and documents must always come first.",
      svg: `
        <svg viewBox="0 0 600 160" width="100%" height="100%" style="font-family: inherit;">
          <rect x="20" y="45" width="150" height="70" rx="8" fill="rgba(34, 197, 94, 0.15)" stroke="#22c55e" stroke-width="2"/>
          <text x="95" y="75" fill="#4ade80" font-size="12" font-weight="700" text-anchor="middle">1. Static System Prompt</text>
          <text x="95" y="95" fill="#86efac" font-size="10" text-anchor="middle">Cached Prefix (90% off)</text>

          <rect x="185" y="45" width="150" height="70" rx="8" fill="rgba(34, 197, 94, 0.15)" stroke="#22c55e" stroke-width="2"/>
          <text x="260" y="75" fill="#4ade80" font-size="12" font-weight="700" text-anchor="middle">2. Large Reference Docs</text>
          <text x="260" y="95" fill="#86efac" font-size="10" text-anchor="middle">Cached Prefix (90% off)</text>

          <rect x="350" y="45" width="70" height="70" rx="8" fill="rgba(234, 179, 8, 0.2)" stroke="#eab308" stroke-width="2" class="pulse"/>
          <text x="385" y="80" fill="#fde047" font-size="11" font-weight="700" text-anchor="middle">CACHE</text>
          <text x="385" y="98" fill="#fde047" font-size="9" text-anchor="middle">POINT</text>

          <rect x="435" y="45" width="145" height="70" rx="8" fill="rgba(59, 130, 246, 0.15)" stroke="#3b82f6" stroke-width="2"/>
          <text x="507" y="75" fill="#93c5fd" font-size="12" font-weight="700" text-anchor="middle">3. Dynamic User Query</text>
          <text x="507" y="95" fill="#bfdbfe" font-size="10" text-anchor="middle">Appended at End</text>
        </svg>
      `
    }
  ];

  let currentShortIndex = 0;
  let shortStreakCount = 1;
  let isShortAudioPlaying = false;

  function renderCurrentShort() {
    const pill = SHORTS_PILLS[currentShortIndex];
    if (!pill) return;

    const domainBadge = document.getElementById("shorts-domain-badge");
    if (domainBadge) domainBadge.textContent = pill.domain;

    const counter = document.getElementById("shorts-pill-counter");
    if (counter) counter.textContent = `Pill ${currentShortIndex + 1} of ${SHORTS_PILLS.length}`;

    const streak = document.getElementById("shorts-streak-count");
    if (streak) streak.textContent = shortStreakCount;
    
    const pct = Math.round(((currentShortIndex + 1) / SHORTS_PILLS.length) * 100);
    const progressFill = document.getElementById("shorts-progress-fill");
    if (progressFill) progressFill.style.width = `${pct}%`;

    const titleEl = document.getElementById("shorts-title");
    if (titleEl) titleEl.textContent = pill.title;

    const hookEl = document.getElementById("shorts-hook");
    if (hookEl) hookEl.textContent = pill.hook;

    const conceptEl = document.getElementById("shorts-concept");
    if (conceptEl) conceptEl.innerHTML = pill.concept;

    const takeawayEl = document.getElementById("shorts-takeaway");
    if (takeawayEl) takeawayEl.innerHTML = pill.takeaway;

    const viewportEl = document.getElementById("shorts-infographic-viewport");
    if (viewportEl) viewportEl.innerHTML = pill.svg;

    if ('speechSynthesis' in window && window.speechSynthesis.speaking) {
      window.speechSynthesis.cancel();
    }
    isShortAudioPlaying = false;
    const audioBtn = document.getElementById("btn-shorts-audio");
    if (audioBtn) {
      audioBtn.innerHTML = '<span>🔊</span> Listen (Web Audio)';
    }
  }

  const btnShortsAudio = document.getElementById("btn-shorts-audio");
  if (btnShortsAudio) {
    btnShortsAudio.addEventListener("click", () => {
      if (!('speechSynthesis' in window)) {
        alert("Text-to-speech is not supported in this browser.");
        return;
      }
      if (window.speechSynthesis.speaking) {
        window.speechSynthesis.cancel();
        isShortAudioPlaying = false;
        btnShortsAudio.innerHTML = '<span>🔊</span> Listen (Web Audio)';
        return;
      }
      const pill = SHORTS_PILLS[currentShortIndex];
      if (!pill) return;
      const utterance = new SpeechSynthesisUtterance(pill.speech);
      utterance.rate = 1.05;
      utterance.pitch = 1.0;
      utterance.onend = () => {
        isShortAudioPlaying = false;
        btnShortsAudio.innerHTML = '<span>🔊</span> Listen (Web Audio)';
      };
      utterance.onerror = () => {
        isShortAudioPlaying = false;
        btnShortsAudio.innerHTML = '<span>🔊</span> Listen (Web Audio)';
      };
      isShortAudioPlaying = true;
      btnShortsAudio.innerHTML = '<span>⏹️</span> Stop Audio';
      window.speechSynthesis.speak(utterance);
    });
  }

  const btnShortsNext = document.getElementById("btn-shorts-next");
  if (btnShortsNext) {
    btnShortsNext.addEventListener("click", () => {
      shortStreakCount++;
      currentShortIndex = (currentShortIndex + 1) % SHORTS_PILLS.length;
      renderCurrentShort();
    });
  }

  const btnShortsPrev = document.getElementById("btn-shorts-prev");
  if (btnShortsPrev) {
    btnShortsPrev.addEventListener("click", () => {
      currentShortIndex = (currentShortIndex - 1 + SHORTS_PILLS.length) % SHORTS_PILLS.length;
      renderCurrentShort();
    });
  }

  // Initial UI state setup
  updateTrackUI();

  // Initial Load (support deep-linking via URL hash)
  const initialHash = window.location.hash.replace('#', '');
  if (views[initialHash]) {
    switchView(initialHash, false);
  } else {
    renderDashboard();
  }
});
