/**
 * LocalStorage Manager for Anthropic Exam Prep (Foundations & Professional)
 * Tracks mastery level, consecutive rights, history, and mock exam results per certification track.
 */

class StudyStorage {
  constructor(initialTrack = 'ccaf') {
    this.currentTrack = localStorage.getItem('active_exam_track') || initialTrack;
    this.reloadForTrack();
  }

  setTrack(track) {
    this.currentTrack = track;
    localStorage.setItem('active_exam_track', track);
    this.reloadForTrack();
  }

  reloadForTrack() {
    const prefix = this.currentTrack === 'ccarp' ? 'ccarp' : 'ccaf';
    this.storageKeys = {
      QUESTIONS: `${prefix}_custom_questions`,
      PROGRESS: `${prefix}_question_progress`,
      MOCKS: `${prefix}_mock_history`,
      SETTINGS: `${prefix}_settings`
    };
    this.progress = this.load(this.storageKeys.PROGRESS, {});
    this.mockHistory = this.load(this.storageKeys.MOCKS, []);
    this.customQuestions = this.load(this.storageKeys.QUESTIONS, []);
  }

  load(key, fallback) {
    try {
      const data = localStorage.getItem(key);
      return data ? JSON.parse(data) : fallback;
    } catch (e) {
      console.error(`Error loading key ${key} from localStorage:`, e);
      return fallback;
    }
  }

  save(key, data) {
    try {
      localStorage.setItem(key, JSON.stringify(data));
    } catch (e) {
      console.error(`Error saving key ${key} to localStorage:`, e);
    }
  }

  // Get combined question list (default + custom imported) based on active track
  getAllQuestions() {
    let defaults = [];
    if (this.currentTrack === 'ccarp') {
      defaults = window.DEFAULT_EXAM_QUESTIONS_CCARP || [];
    } else {
      defaults = window.DEFAULT_EXAM_QUESTIONS || [];
    }
    const custom = this.customQuestions || [];
    const map = new Map();
    
    // Add defaults first
    defaults.forEach(q => map.set(q.id, { ...q, isCustom: false }));
    // Add or override with custom
    custom.forEach(q => map.set(q.id, { ...q, isCustom: true }));
    
    return Array.from(map.values());
  }

  // Get progress record for a single question
  getProgress(questionId) {
    if (!this.progress[questionId]) {
      this.progress[questionId] = {
        questionId,
        masteryLevel: 0, // 0: Unseen, 1: Needs Practice, 2: Learning (1st right), 3: Mastered (2 consecutive)
        consecutiveCorrect: 0,
        timesSeen: 0,
        timesCorrect: 0,
        timesFailed: 0,
        lastAttempt: null,
        history: []
      };
    }
    return this.progress[questionId];
  }

  /**
   * Records an answer attempt.
   * Rules:
   * - If incorrect:
   *     masteryLevel becomes 1 ('Needs Practice')
   *     consecutiveCorrect resets to 0
   * - If correct:
   *     consecutiveCorrect increments by 1
   *     if consecutiveCorrect >= 2, masteryLevel becomes 3 ('Mastered')
   *     if consecutiveCorrect === 1, masteryLevel becomes 2 ('Learning')
   */
  recordAttempt(questionId, selectedOption, isCorrect, mode = 'free') {
    const p = this.getProgress(questionId);
    p.timesSeen += 1;
    p.lastAttempt = new Date().toISOString();

    if (isCorrect) {
      p.timesCorrect += 1;
      p.consecutiveCorrect += 1;
      if (p.consecutiveCorrect >= 2) {
        p.masteryLevel = 3; // Mastered! Cleared out!
      } else {
        p.masteryLevel = 2; // Learning, needs 1 more right answer to clear
      }
    } else {
      p.timesFailed += 1;
      p.consecutiveCorrect = 0;
      p.masteryLevel = 1; // Needs Practice (Failed)
    }

    p.history.push({
      timestamp: Date.now(),
      selectedOption,
      isCorrect,
      mode
    });

    // Save
    this.save(this.storageKeys.PROGRESS, this.progress);
    return p;
  }

  recordMockExam(mockRecord) {
    this.mockHistory.push(mockRecord);
    this.save(this.storageKeys.MOCKS, this.mockHistory);

    // Also update individual question progress from the mock exam
    if (mockRecord.answers && Array.isArray(mockRecord.answers)) {
      mockRecord.answers.forEach(ans => {
        this.recordAttempt(ans.questionId, ans.selectedOption, ans.isCorrect, 'mock');
      });
    }
  }

  importQuestions(newQuestionsList) {
    if (!Array.isArray(newQuestionsList)) return 0;
    let count = 0;
    const existing = new Map(this.customQuestions.map(q => [q.id, q]));
    
    newQuestionsList.forEach(q => {
      if (q && q.id && q.question && Array.isArray(q.options) && typeof q.correct === 'number') {
        existing.set(q.id, q);
        count++;
      }
    });

    this.customQuestions = Array.from(existing.values());
    this.save(this.storageKeys.QUESTIONS, this.customQuestions);
    return count;
  }

  getMetrics() {
    const questions = this.getAllQuestions();
    const total = questions.length;
    let seenCount = 0;
    let masteredCount = 0;
    let learningCount = 0;
    let needsPracticeCount = 0;
    let totalAttempts = 0;
    let totalCorrect = 0;

    const domainBreakdown = {};

    questions.forEach(q => {
      const p = this.progress[q.id];
      const domain = q.domain || 'General';
      if (!domainBreakdown[domain]) {
        domainBreakdown[domain] = { total: 0, seen: 0, mastered: 0, correct: 0, attempts: 0 };
      }
      domainBreakdown[domain].total += 1;

      if (p && p.timesSeen > 0) {
        seenCount += 1;
        totalAttempts += p.timesSeen;
        totalCorrect += p.timesCorrect;
        domainBreakdown[domain].seen += 1;
        domainBreakdown[domain].attempts += p.timesSeen;
        domainBreakdown[domain].correct += p.timesCorrect;

        if (p.masteryLevel === 3) {
          masteredCount += 1;
          domainBreakdown[domain].mastered += 1;
        } else if (p.masteryLevel === 2) {
          learningCount += 1;
        } else if (p.masteryLevel === 1) {
          needsPracticeCount += 1;
        }
      }
    });

    const unseenCount = total - seenCount;
    const masteryPercentage = total > 0 ? Math.round((masteredCount / total) * 100) : 0;
    const coveragePercentage = total > 0 ? Math.round((seenCount / total) * 100) : 0;
    const overallSuccessRate = totalAttempts > 0 ? Math.round((totalCorrect / totalAttempts) * 100) : 0;

    return {
      total,
      seenCount,
      unseenCount,
      masteredCount,
      learningCount,
      needsPracticeCount,
      masteryPercentage,
      coveragePercentage,
      overallSuccessRate,
      totalAttempts,
      totalCorrect,
      domainBreakdown,
      mockExamsCount: this.mockHistory.length,
      latestMocks: this.mockHistory.slice(-5)
    };
  }

  resetAllProgress() {
    this.progress = {};
    this.mockHistory = [];
    localStorage.removeItem(this.storageKeys.PROGRESS);
    localStorage.removeItem(this.storageKeys.MOCKS);
  }

  exportData() {
    return JSON.stringify({
      version: 1,
      track: this.currentTrack,
      exportedAt: new Date().toISOString(),
      progress: this.progress,
      mockHistory: this.mockHistory,
      customQuestions: this.customQuestions
    }, null, 2);
  }

  importData(jsonString) {
    try {
      const data = JSON.parse(jsonString);
      if (data.progress) {
        this.progress = data.progress;
        this.save(this.storageKeys.PROGRESS, this.progress);
      }
      if (data.mockHistory) {
        this.mockHistory = data.mockHistory;
        this.save(this.storageKeys.MOCKS, this.mockHistory);
      }
      if (data.customQuestions) {
        this.customQuestions = data.customQuestions;
        this.save(this.storageKeys.QUESTIONS, this.customQuestions);
      }
      return true;
    } catch (e) {
      console.error("Failed to parse imported data:", e);
      return false;
    }
  }
}

if (typeof window !== "undefined") {
  window.StudyStorage = StudyStorage;
}
