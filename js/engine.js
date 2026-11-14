/**
 * Wise Feeder & Exam Engine for CCA-F
 * Adaptive spaced repetition, domain balancing, and scaled scoring.
 */

class WiseFeeder {
  constructor(storage) {
    this.storage = storage;
    this.recentQuestionIds = []; // Prevent immediate back-to-back repeats
    this.recentHistoryLimit = 3;
  }

  /**
   * Selects the next best question to display to the user in Free Mode.
   * Priority:
   * 1. High: Questions with masteryLevel === 1 (Needs Practice / Failed)
   * 2. Medium-High: Questions with masteryLevel === 0 (Unseen questions to increase coverage)
   * 3. Medium: Questions with masteryLevel === 2 (Learning - need 1 more correct answer to clear 100%)
   * 4. Low: Questions with masteryLevel === 3 (Mastered maintenance review, least recently seen)
   */
  getNextQuestion(filterDomain = 'all', modeFilter = 'smart') {
    let allQuestions = this.storage.getAllQuestions();

    // Domain filter
    if (filterDomain !== 'all') {
      allQuestions = allQuestions.filter(q => q.domain === filterDomain);
    }

    if (allQuestions.length === 0) return null;

    // Categorize questions
    const needsPractice = [];
    const unseen = [];
    const learning = [];
    const mastered = [];

    allQuestions.forEach(q => {
      const p = this.storage.getProgress(q.id);
      if (p.masteryLevel === 1) needsPractice.push({ q, p });
      else if (p.masteryLevel === 0) unseen.push({ q, p });
      else if (p.masteryLevel === 2) learning.push({ q, p });
      else mastered.push({ q, p });
    });

    // If explicit filter requested
    if (modeFilter === 'failed_only') {
      const pool = [...needsPractice, ...learning];
      return this._pickFromPool(pool.map(item => item.q)) || this._pickFromPool(allQuestions);
    }
    if (modeFilter === 'unseen_only') {
      return this._pickFromPool(unseen.map(item => item.q)) || this._pickFromPool(allQuestions);
    }

    // Wise adaptive feeder algorithm
    let candidatePool = [];

    // 1. If we have failed questions waiting for redemption (and not in recent history)
    const validFailed = needsPractice
      .filter(item => !this.recentQuestionIds.includes(item.q.id))
      .map(item => item.q);

    // 2. Unseen questions (to push bank coverage)
    const validUnseen = unseen
      .filter(item => !this.recentQuestionIds.includes(item.q.id))
      .map(item => item.q);

    // 3. Learning questions (need 2nd consecutive pass to clear)
    const validLearning = learning
      .filter(item => !this.recentQuestionIds.includes(item.q.id))
      .map(item => item.q);

    // 4. Mastered questions (review)
    const validMastered = mastered
      .sort((a, b) => (new Date(a.p.lastAttempt) || 0) - (new Date(b.p.lastAttempt) || 0))
      .map(item => item.q);

    // Dynamic probabilistic weighting
    // 45% chance to review failed/learning, 40% chance for fresh unseen, 15% chance for mastered review
    const rand = Math.random();

    if ((validFailed.length > 0 || validLearning.length > 0) && rand < 0.50) {
      candidatePool = validFailed.length > 0 ? validFailed : validLearning;
    } else if (validUnseen.length > 0 && rand < 0.85) {
      candidatePool = validUnseen;
    } else if (validLearning.length > 0) {
      candidatePool = validLearning;
    } else if (validFailed.length > 0) {
      candidatePool = validFailed;
    } else if (validUnseen.length > 0) {
      candidatePool = validUnseen;
    } else {
      candidatePool = validMastered.length > 0 ? validMastered : allQuestions;
    }

    const chosen = this._pickFromPool(candidatePool) || allQuestions[0];
    this._recordRecent(chosen.id);
    return chosen;
  }

  _pickFromPool(pool) {
    if (!pool || pool.length === 0) return null;
    const idx = Math.floor(Math.random() * pool.length);
    return pool[idx];
  }

  _recordRecent(id) {
    this.recentQuestionIds.push(id);
    if (this.recentQuestionIds.length > this.recentHistoryLimit) {
      this.recentQuestionIds.shift();
    }
  }
}

class MockExamEngine {
  constructor(storage) {
    this.storage = storage;
  }

  /**
   * Generates a balanced mock exam.
   * If totalQuestions is 60 (standard) or 30 (mini-mock).
   */
  generateMockExam(questionCount = 60, timeLimitMinutes = 120) {
    const allQuestions = [...this.storage.getAllQuestions()];
    const count = Math.min(questionCount, allQuestions.length);

    // Group questions by domain
    const byDomain = {};
    allQuestions.forEach(q => {
      const d = q.domain || 'General';
      if (!byDomain[d]) byDomain[d] = [];
      byDomain[d].push(q);
    });

    const domains = Object.keys(byDomain);
    const selected = [];
    const questionsPerDomain = Math.floor(count / domains.length);
    let remainder = count % domains.length;

    // Balanced pick from each domain
    domains.forEach(d => {
      const pool = byDomain[d].sort(() => 0.5 - Math.random());
      const takeCount = questionsPerDomain + (remainder > 0 ? 1 : 0);
      if (remainder > 0) remainder--;
      selected.push(...pool.slice(0, takeCount));
    });

    // If still short due to domain size imbalances, fill from remaining
    if (selected.length < count) {
      const selectedIds = new Set(selected.map(q => q.id));
      const remaining = allQuestions.filter(q => !selectedIds.has(q.id)).sort(() => 0.5 - Math.random());
      selected.push(...remaining.slice(0, count - selected.length));
    }

    // Shuffle the final selection
    const shuffled = selected.sort(() => 0.5 - Math.random());

    return {
      id: 'mock-' + Date.now(),
      startTime: Date.now(),
      timeLimitMinutes,
      timeLimitSeconds: timeLimitMinutes * 60,
      totalQuestions: shuffled.length,
      questions: shuffled,
      userAnswers: {}, // questionId -> selectedOption
      flagged: new Set()
    };
  }

  /**
   * Evaluates mock exam results and computes scaled score (100 - 1000).
   * Passing benchmark: 720.
   */
  gradeMockExam(mockInstance, timeSpentSeconds) {
    let correctCount = 0;
    const domainScores = {};
    const reviewList = [];

    mockInstance.questions.forEach((q, idx) => {
      const selectedOption = mockInstance.userAnswers[q.id];
      const isAnswered = selectedOption !== undefined && selectedOption !== null;
      const isCorrect = isAnswered && selectedOption === q.correct;

      if (isCorrect) correctCount++;

      const domain = q.domain || 'General';
      if (!domainScores[domain]) {
        domainScores[domain] = { total: 0, correct: 0 };
      }
      domainScores[domain].total += 1;
      if (isCorrect) domainScores[domain].correct += 1;

      reviewList.push({
        index: idx + 1,
        questionId: q.id,
        domain: q.domain,
        topic: q.topic,
        question: q.question,
        options: q.options,
        selectedOption: isAnswered ? selectedOption : null,
        correctOption: q.correct,
        isCorrect,
        explanation: q.explanation,
        referenceTitle: q.referenceTitle,
        referenceUrl: q.referenceUrl
      });
    });

    const total = mockInstance.questions.length;
    const percentage = total > 0 ? Math.round((correctCount / total) * 100) : 0;

    // Scaled score formula (100 to 1000 scale)
    // 0% -> 100, 100% -> 1000
    // 72% -> ~720 (Pass threshold)
    const scaledScore = Math.min(1000, Math.max(100, Math.round(100 + (correctCount / total) * 900)));
    const passed = scaledScore >= 720;

    const mockRecord = {
      id: mockInstance.id,
      date: new Date().toISOString(),
      timeSpentSeconds,
      totalQuestions: total,
      correctCount,
      percentage,
      scaledScore,
      pass: passed,
      domainScores,
      answers: reviewList
    };

    return mockRecord;
  }
}

if (typeof window !== "undefined") {
  window.WiseFeeder = WiseFeeder;
  window.MockExamEngine = MockExamEngine;
}
