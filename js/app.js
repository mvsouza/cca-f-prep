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

  // Navigation Logic
  function switchView(targetView) {
    currentView = targetView;
    Object.keys(views).forEach(key => {
      if (views[key]) {
        views[key].classList.toggle("active", key === targetView);
      }
    });

    navButtons.forEach(btn => {
      btn.classList.toggle("active", btn.dataset.view === targetView);
    });

    trackEvent('page_view', { page_view: targetView });

    if (targetView === 'dashboard') {
      renderDashboard();
    } else if (targetView === 'free') {
      loadNextFreeQuestion();
    } else if (targetView === 'bank') {
      renderQuestionBankManager();
    }
  }

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

    const domains = [
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
        const shareText = `I scored ${mockRecord.scaledScore}/1000 (${statusEmoji}) on the Claude Certified Architect - Foundations (CCA-F) Mock Simulator!\n\n700+ questions, free & runs client-side in the browser.\n\nPractice here: https://matheussouza.github.io/ai-engineer/ #Claude #Anthropic #AIEngineer`;
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
https://matheussouza.github.io/ai-engineer/`;

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

  // Initial Load
  renderDashboard();
});
