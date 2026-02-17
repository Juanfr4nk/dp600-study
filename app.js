// ═══════════════════════════════════════════
// DP-600 Study Companion — Main Application
// ═══════════════════════════════════════════

(function () {
  'use strict';

  const TOTAL_EXAM_QUESTIONS = 50;

  // ─── State ──────────────────────────────────────────────────────────────────
  const state = {
    currentSection: 'dashboard',

    // Quiz
    quizDomain: 0,
    quizDiff: 0,
    quizQuestions: [],
    quizIndex: 0,
    quizAnswered: false,
    quizScore: 0,
    quizSubtopic: '',

    // Flashcards
    fcDomain: 0,
    fcIndex: 0,
    fcFlipped: false,
    fcOrder: [],

    // Labs
    labsDomain: 0,
    labsDiff: 0,
    labsOpen: {},

    // Glossary
    glossarySearch: '',
    glossaryDomain: 0,
    glossaryRelevance: 'all',

    // Exam
    examActive: false,
    examQuestions: [],
    examIndex: 0,
    examAnswers: {},
    examMarked: {},
    examTimer: null,
    examTimeLeft: 6000,

    // Notes
    notesSearch: '',
    notesDomainFilter: 0,
    noteEditingId: null,

    // Stats (persisted)
    stats: loadStats()
  };

  const reviewState = { questions: [], index: 0, answered: false, score: 0 };

  const DOMAIN_LABEL_SHORT = {
    1: 'D1',
    2: 'D2',
    3: 'D3'
  };

  // ─── Persistence ────────────────────────────────────────────────────────────
  function defaultStats() {
    return {
      answered: 0,
      correct: 0,
      totalAnswered: 0,
      totalCorrect: 0,
      byDomain: {
        1: { a: 0, c: 0 },
        2: { a: 0, c: 0 },
        3: { a: 0, c: 0 }
      },
      domainCorrect: { 1: 0, 2: 0, 3: 0 },
      domainTotal: { 1: 0, 2: 0, 3: 0 },
      fcReviewed: 0,
      examsCompleted: 0,
      fcRatings: {},
      examDate: null,
      wrongQuestions: {},
      wrongIds: [],
      correctIds: [],
      questionHistory: {},
      earnedBadges: [],
      streak: 0,
      maxStreak: 0,
      lastStudyDate: null,
      lastExamScore: 0,
      reviewAnswered: 0,
      labsProgress: {},
      labsCompleted: [],
      dailyLog: {},
      sessionStart: null,
      lastActivityTs: null,
      notes: []
    };
  }

  function normalizeStats(raw) {
    const base = defaultStats();
    const rawObj = raw && typeof raw === 'object' ? raw : {};
    const s = Object.assign({}, base, rawObj);

    if (!Object.prototype.hasOwnProperty.call(rawObj, 'answered') && Number.isFinite(Number(rawObj.totalAnswered))) {
      s.answered = Number(rawObj.totalAnswered);
    }
    if (!Object.prototype.hasOwnProperty.call(rawObj, 'correct') && Number.isFinite(Number(rawObj.totalCorrect))) {
      s.correct = Number(rawObj.totalCorrect);
    }
    s.answered = Number.isFinite(Number(s.answered)) ? Number(s.answered) : 0;
    s.correct = Number.isFinite(Number(s.correct)) ? Number(s.correct) : 0;

    const legacyDomainTotal = rawObj.domainTotal && typeof rawObj.domainTotal === 'object' ? rawObj.domainTotal : {};
    const legacyDomainCorrect = rawObj.domainCorrect && typeof rawObj.domainCorrect === 'object' ? rawObj.domainCorrect : {};
    const rawByDomain = rawObj.byDomain && typeof rawObj.byDomain === 'object' ? rawObj.byDomain : {};

    s.byDomain = Object.assign({}, base.byDomain, s.byDomain || {});
    [1, 2, 3].forEach((d) => {
      s.byDomain[d] = Object.assign({}, base.byDomain[d], s.byDomain[d] || {});
      const rawDomain = rawByDomain[d] || {};
      const hasRawA = Object.prototype.hasOwnProperty.call(rawDomain, 'a');
      const hasRawC = Object.prototype.hasOwnProperty.call(rawDomain, 'c');

      if (!hasRawA && Number.isFinite(Number(legacyDomainTotal[d]))) s.byDomain[d].a = Number(legacyDomainTotal[d]);
      if (!hasRawC && Number.isFinite(Number(legacyDomainCorrect[d]))) s.byDomain[d].c = Number(legacyDomainCorrect[d]);

      s.byDomain[d].a = Number.isFinite(Number(s.byDomain[d].a)) ? Number(s.byDomain[d].a) : 0;
      s.byDomain[d].c = Number.isFinite(Number(s.byDomain[d].c)) ? Number(s.byDomain[d].c) : 0;
    });

    s.fcReviewed = Number.isFinite(Number(s.fcReviewed)) ? Number(s.fcReviewed) : 0;
    s.examsCompleted = Number.isFinite(Number(s.examsCompleted)) ? Number(s.examsCompleted) : 0;
    s.streak = Number.isFinite(Number(s.streak)) ? Number(s.streak) : 0;
    s.lastExamScore = Number.isFinite(Number(s.lastExamScore)) ? Number(s.lastExamScore) : 0;
    s.reviewAnswered = Number.isFinite(Number(s.reviewAnswered)) ? Number(s.reviewAnswered) : 0;

    if (!s.wrongQuestions || typeof s.wrongQuestions !== 'object') s.wrongQuestions = {};
    if (!s.fcRatings || typeof s.fcRatings !== 'object') s.fcRatings = {};
    if (!Array.isArray(s.earnedBadges)) s.earnedBadges = [];
    if (!Array.isArray(s.wrongIds)) s.wrongIds = [];
    if (!Array.isArray(s.correctIds)) s.correctIds = [];
    s.wrongIds = s.wrongIds.map(Number).filter((n) => Number.isFinite(n));
    s.correctIds = s.correctIds.map(Number).filter((n) => Number.isFinite(n));
    if (!s.questionHistory || typeof s.questionHistory !== 'object') s.questionHistory = {};
    Object.keys(s.questionHistory).forEach((qId) => {
      const h = s.questionHistory[qId] || {};
      s.questionHistory[qId] = {
        answered: Number.isFinite(Number(h.answered)) ? Number(h.answered) : 0,
        correct: Number.isFinite(Number(h.correct)) ? Number(h.correct) : 0,
        wrong: Number.isFinite(Number(h.wrong)) ? Number(h.wrong) : 0,
        lastResult: h.lastResult === 'correct' ? 'correct' : 'wrong'
      };
    });

    Object.keys(s.wrongQuestions).forEach((qId) => {
      const qNum = Number(qId);
      if (!Number.isFinite(qNum)) return;
      if (!s.wrongIds.includes(qNum)) s.wrongIds.push(qNum);
      if (!s.questionHistory[qNum]) {
        const wrongCount = Math.max(1, Number(s.wrongQuestions[qId]) || 1);
        s.questionHistory[qNum] = {
          answered: wrongCount,
          correct: 0,
          wrong: wrongCount,
          lastResult: 'wrong'
        };
      }
    });

    if (!s.labsProgress || typeof s.labsProgress !== 'object') s.labsProgress = {};
    if (!Array.isArray(s.labsCompleted)) s.labsCompleted = [];
    Object.keys(s.labsProgress).forEach((labId) => {
      const value = s.labsProgress[labId];
      s.labsProgress[labId] = Array.isArray(value)
        ? value.map(Number).filter((n) => Number.isFinite(n))
        : [];
    });

    if (!s.dailyLog || typeof s.dailyLog !== 'object') s.dailyLog = {};
    Object.keys(s.dailyLog).forEach((dayKey) => {
      const entry = s.dailyLog[dayKey] || {};
      s.dailyLog[dayKey] = {
        answered: Number.isFinite(Number(entry.answered)) ? Number(entry.answered) : 0,
        correct: Number.isFinite(Number(entry.correct)) ? Number(entry.correct) : 0,
        timeSpent: Number.isFinite(Number(entry.timeSpent)) ? Number(entry.timeSpent) : 0
      };
    });

    if (!Number.isFinite(Number(s.sessionStart))) s.sessionStart = null;
    if (!Number.isFinite(Number(s.lastActivityTs))) s.lastActivityTs = null;
    if (!Number.isFinite(Number(s.maxStreak))) s.maxStreak = 0;
    if (!Array.isArray(s.notes)) s.notes = [];
    s.notes = s.notes
      .filter((note) => note && typeof note === 'object')
      .map((note) => ({
        id: String(note.id || `note_${Date.now()}`),
        title: String(note.title || '').trim(),
        content: String(note.content || ''),
        domain: [1, 2, 3].includes(Number(note.domain)) ? Number(note.domain) : 1,
        subtopic: String(note.subtopic || ''),
        createdAt: note.createdAt || new Date().toISOString(),
        updatedAt: note.updatedAt || new Date().toISOString()
      }));

    if (s.streak > s.maxStreak) s.maxStreak = s.streak;
    trimDailyLog(s, 90);
    refreshComputedAliases(s);
    refreshLabsCompletedInStats(s);
    return s;
  }

  function loadStats() {
    try {
      const parsed = JSON.parse(localStorage.getItem('dp600_stats'));
      return normalizeStats(parsed);
    } catch (e) {
      return defaultStats();
    }
  }

  function saveStats() {
    updateStreak();
    trimDailyLog(state.stats, 90);
    refreshComputedAliases(state.stats);
    refreshLabsCompletedInStats(state.stats);
    localStorage.setItem('dp600_stats', JSON.stringify(state.stats));
    checkBadges();
    updateNavBadges();
    if (state.currentSection === 'knowledge-map') renderKnowledgeMap();
    if (state.currentSection === 'analytics') renderAnalytics();
    if (state.currentSection === 'notes') renderNotes();
  }

  function updateStreak() {
    const today = new Date().toISOString().slice(0, 10);
    const s = state.stats;
    if (s.lastStudyDate === today) return;

    const yesterday = new Date(Date.now() - 86400000).toISOString().slice(0, 10);
    if (s.lastStudyDate === yesterday) s.streak = (s.streak || 0) + 1;
    else s.streak = 1;

    s.lastStudyDate = today;
    if ((s.streak || 0) > (s.maxStreak || 0)) s.maxStreak = s.streak;
  }

  function trimDailyLog(statsObj, daysToKeep) {
    if (!statsObj.dailyLog || typeof statsObj.dailyLog !== 'object') statsObj.dailyLog = {};
    const keys = Object.keys(statsObj.dailyLog).sort();
    if (keys.length <= daysToKeep) return;
    keys.slice(0, keys.length - daysToKeep).forEach((k) => {
      delete statsObj.dailyLog[k];
    });
  }

  function refreshComputedAliases(statsObj) {
    statsObj.totalAnswered = statsObj.answered;
    statsObj.totalCorrect = statsObj.correct;
    statsObj.domainCorrect = {
      1: statsObj.byDomain[1].c,
      2: statsObj.byDomain[2].c,
      3: statsObj.byDomain[3].c
    };
    statsObj.domainTotal = {
      1: statsObj.byDomain[1].a,
      2: statsObj.byDomain[2].a,
      3: statsObj.byDomain[3].a
    };
  }

  function registerSessionStart() {
    const now = Date.now();
    state.stats.sessionStart = now;
    state.stats.lastActivityTs = now;
    trimDailyLog(state.stats, 90);
    localStorage.setItem('dp600_stats', JSON.stringify(state.stats));
  }

  function trackDailyActivity(answeredDelta, correctDelta) {
    const day = new Date().toISOString().slice(0, 10);
    const now = Date.now();
    const log = state.stats.dailyLog || {};
    if (!log[day]) log[day] = { answered: 0, correct: 0, timeSpent: 0 };

    log[day].answered += Math.max(0, Number(answeredDelta) || 0);
    log[day].correct += Math.max(0, Number(correctDelta) || 0);

    const anchor = Number.isFinite(Number(state.stats.lastActivityTs))
      ? Number(state.stats.lastActivityTs)
      : (Number.isFinite(Number(state.stats.sessionStart)) ? Number(state.stats.sessionStart) : now);
    const elapsedSec = Math.max(0, Math.min(1800, Math.round((now - anchor) / 1000)));
    log[day].timeSpent += elapsedSec;

    state.stats.dailyLog = log;
    state.stats.lastActivityTs = now;
    trimDailyLog(state.stats, 90);
  }

  function recordQuestionOutcome(questionId, isCorrect) {
    if (!Number.isFinite(Number(questionId))) return;
    const qId = Number(questionId);

    if (!state.stats.questionHistory[qId]) {
      state.stats.questionHistory[qId] = { answered: 0, correct: 0, wrong: 0, lastResult: 'wrong' };
    }
    const h = state.stats.questionHistory[qId];
    h.answered += 1;

    if (isCorrect) {
      h.correct += 1;
      h.lastResult = 'correct';
      if (!state.stats.correctIds.includes(qId)) state.stats.correctIds.push(qId);
    } else {
      h.wrong += 1;
      h.lastResult = 'wrong';
      if (!state.stats.wrongIds.includes(qId)) state.stats.wrongIds.push(qId);
    }
  }

  function refreshLabsCompletedInStats(statsObj) {
    if (!Array.isArray(LABS)) return;
    const completed = [];
    LABS.forEach((lab) => {
      const set = new Set((statsObj.labsProgress[lab.id] || []).map(Number));
      const allDone = lab.steps.every((st) => set.has(Number(st.step)));
      if (allDone) completed.push(lab.id);
    });
    statsObj.labsCompleted = completed;
  }

  // ─── Badges ─────────────────────────────────────────────────────────────────
  const BADGES = [
    { id: 'first_answer', icon: '🌱', name: 'Primera Respuesta', desc: 'Responde tu primera pregunta' },
    { id: 'quiz_10', icon: '🔟', name: 'Diez Respondidas', desc: 'Responde 10 preguntas en total' },
    { id: 'quiz_50', icon: '🎯', name: 'Cincuenta Preguntas', desc: 'Responde 50 preguntas en total' },
    { id: 'quiz_200', icon: '💯', name: 'Centurion', desc: 'Responde 200 preguntas' },
    { id: 'accuracy_70', icon: '✅', name: 'Nivel Suficiente', desc: 'Supera el 70% de acierto global' },
    { id: 'accuracy_85', icon: '🏅', name: 'Experto', desc: 'Supera el 85% de acierto global' },
    { id: 'streak_3', icon: '🔥', name: 'Racha de 3 días', desc: 'Estudia 3 días consecutivos' },
    { id: 'streak_7', icon: '⚡', name: 'Racha de 7 días', desc: 'Estudia 7 días consecutivos' },
    { id: 'first_exam', icon: '📝', name: 'Primer Simulacro', desc: 'Completa tu primer examen' },
    { id: 'pass_exam', icon: '🎓', name: 'Aprobado', desc: 'Supera 700/1000 en un simulacro' },
    { id: 'fc_20', icon: '💡', name: 'Memorista', desc: 'Revisa 20 flashcards' },
    { id: 'fc_100', icon: '🧠', name: 'Maestro del Lakehouse', desc: 'Revisa 100 flashcards' },
    { id: 'domain1_80', icon: '📘', name: 'Maestro Datos', desc: '80%+ en Preparar Datos' },
    { id: 'domain2_80', icon: '🔧', name: 'Maestro Solución', desc: '80%+ en Mantener Solución' },
    { id: 'domain3_80', icon: '📐', name: 'Maestro Semántico', desc: '80%+ en Modelos Semánticos' },
    { id: 'review_5', icon: '💪', name: 'Aprendo del Error', desc: 'Repasa 5 preguntas falladas' },
    { id: 'labs_5', icon: '🔬', name: 'Lab Runner', desc: 'Completa 5 laboratorios' }
  ];

  function checkBadges() {
    const s = state.stats;
    const acc = s.answered > 0 ? s.correct / s.answered : 0;

    const conditions = {
      first_answer: s.answered >= 1,
      quiz_10: s.answered >= 10,
      quiz_50: s.answered >= 50,
      quiz_200: s.answered >= 200,
      accuracy_70: s.answered >= 10 && acc >= 0.70,
      accuracy_85: s.answered >= 10 && acc >= 0.85,
      streak_3: (s.streak || 0) >= 3,
      streak_7: (s.streak || 0) >= 7,
      first_exam: s.examsCompleted >= 1,
      pass_exam: (s.lastExamScore || 0) >= 700,
      fc_20: s.fcReviewed >= 20,
      fc_100: s.fcReviewed >= 100,
      domain1_80: s.byDomain[1].a >= 5 && s.byDomain[1].c / s.byDomain[1].a >= 0.80,
      domain2_80: s.byDomain[2].a >= 5 && s.byDomain[2].c / s.byDomain[2].a >= 0.80,
      domain3_80: s.byDomain[3].a >= 5 && s.byDomain[3].c / s.byDomain[3].a >= 0.80,
      review_5: (s.reviewAnswered || 0) >= 5,
      labs_5: (s.labsCompleted || []).length >= 5
    };

    let changed = false;
    BADGES.forEach((b) => {
      if (!s.earnedBadges.includes(b.id) && conditions[b.id]) {
        s.earnedBadges.push(b.id);
        changed = true;
        showBadgeToast(b);
      }
    });

    if (changed) localStorage.setItem('dp600_stats', JSON.stringify(s));
  }

  function showBadgeToast(badge) {
    const toast = document.createElement('div');
    toast.className = 'badge-toast';
    toast.innerHTML = `<span>${badge.icon}</span><div><strong>¡Insignia desbloqueada!</strong><div>${badge.name}</div></div>`;
    document.body.appendChild(toast);

    setTimeout(() => toast.classList.add('visible'), 60);
    setTimeout(() => {
      toast.classList.remove('visible');
      setTimeout(() => toast.remove(), 400);
    }, 3400);
  }

  function renderBadges() {
    const earned = state.stats.earnedBadges || [];
    const grid = document.getElementById('badges-grid');
    grid.innerHTML = BADGES.map((b) => {
      const unlocked = earned.includes(b.id);
      return `<div class="badge-item ${unlocked ? 'earned badge-earned-glow' : 'locked'}" title="${escapeHtml(b.desc)}">
        <div class="badge-icon">${b.icon}</div>
        <div class="badge-name">${escapeHtml(b.name)}</div>
        <div class="badge-desc">${escapeHtml(b.desc)}</div>
      </div>`;
    }).join('');
  }

  // ─── Navigation ─────────────────────────────────────────────────────────────
  document.querySelectorAll('.nav-link').forEach((btn) => {
    btn.addEventListener('click', () => {
      const section = btn.dataset.section;
      setActiveSection(section);
    });
  });

  function setActiveSection(section) {
    document.querySelectorAll('.nav-link').forEach((b) => b.classList.remove('active'));
    const navBtn = document.querySelector(`.nav-link[data-section="${section}"]`);
    if (navBtn) navBtn.classList.add('active');

    document.querySelectorAll('.section').forEach((s) => s.classList.remove('active'));
    const sec = document.getElementById(section);
    if (sec) sec.classList.add('active');

    state.currentSection = section;
    window.scrollTo({ top: 0, behavior: 'smooth' });

    if (section === 'dashboard') updateDashboard();
    if (section === 'knowledge-map') renderKnowledgeMap();
    if (section === 'analytics') renderAnalytics();
    if (section === 'quiz') syncQuizSubtopicOptions();
    if (section === 'notes') renderNotes();
    if (section === 'summaries') renderSummaries(document.getElementById('search-input').value.trim());
    if (section === 'review') initReview();
    if (section === 'labs') renderLabs();
    if (section === 'glossary') renderGlossary();
  }

  // ─── Dashboard ──────────────────────────────────────────────────────────────
  function updateDashboard() {
    const s = state.stats;
    document.getElementById('stat-questions').textContent = s.answered;
    document.getElementById('stat-correct').textContent = s.answered > 0 ? `${Math.round((s.correct / s.answered) * 100)}%` : '0%';
    document.getElementById('stat-flashcards').textContent = s.fcReviewed;
    document.getElementById('stat-exams').textContent = s.examsCompleted;

    [1, 2, 3].forEach((d) => {
      const data = s.byDomain[d];
      const pct = data.a > 0 ? Math.round((data.c / data.a) * 100) : 0;
      document.getElementById(`bar-d${d}`).style.width = `${pct}%`;
      document.getElementById(`pct-d${d}`).textContent = `${pct}%`;
    });

    let recommendation = '¡Empieza con el Quiz para evaluar tu nivel actual!';
    if (s.answered > 0) {
      const weakest = [1, 2, 3].reduce((minDomain, d) => {
        const pctD = s.byDomain[d].a > 0 ? s.byDomain[d].c / s.byDomain[d].a : 0;
        const pctMin = s.byDomain[minDomain].a > 0 ? s.byDomain[minDomain].c / s.byDomain[minDomain].a : 0;
        return pctD < pctMin ? d : minDomain;
      }, 1);

      const weakPct = s.byDomain[weakest].a > 0 ? Math.round((s.byDomain[weakest].c / s.byDomain[weakest].a) * 100) : 0;
      if (weakPct < 70) {
        recommendation = `Enfócate en <strong>${DOMAIN_NAMES[weakest]}</strong> (${weakPct}% aciertos).`; 
      } else if (s.examsCompleted === 0) {
        recommendation = '¡Buen progreso! Pasa al <strong>Simulador de Examen</strong> para medir nivel real.';
      } else if ((s.labsCompleted || []).length < 3) {
        recommendation = 'Refuerza práctica real con la sección <strong>Labs</strong> para consolidar el conocimiento.';
      } else {
        recommendation = 'Mantén ritmo: repasa errores, mejora el dominio más débil y repite simulacro.';
      }
    }

    document.getElementById('recommendation-text').innerHTML = recommendation;

    const examDateInput = document.getElementById('exam-date');
    if (s.examDate) examDateInput.value = s.examDate;
    updateCountdown();
    renderGlobalSparkline();
    renderStudyPlan();
    updateNavBadges();
    renderBadges();
  }

  function updateNavBadges() {
    const badge = document.getElementById('review-nav-badge');
    if (!badge) return;
    const wrongCount = Object.keys(state.stats.wrongQuestions || {}).length;
    badge.textContent = String(wrongCount);
    badge.style.display = wrongCount > 0 ? 'inline-flex' : 'none';
  }

  function getLastDateKeys(days) {
    const out = [];
    for (let i = days - 1; i >= 0; i--) {
      const date = new Date(Date.now() - (i * 86400000));
      out.push(date.toISOString().slice(0, 10));
    }
    return out;
  }

  function renderGlobalSparkline() {
    const container = document.getElementById('global-accuracy-sparkline');
    if (!container) return;

    const keys = getLastDateKeys(7);
    const values = keys.map((k) => {
      const row = (state.stats.dailyLog || {})[k] || { answered: 0, correct: 0 };
      if (row.answered <= 0) return 0;
      return Math.round((row.correct / row.answered) * 100);
    });
    const max = Math.max(10, ...values);

    container.innerHTML = values.map((v, i) => {
      const h = Math.max(4, Math.round((v / max) * 24));
      return `<span class="spark-bar ${i === values.length - 1 ? 'active' : ''}" style="height:${h}px" title="${keys[i]} • ${v}%"></span>`;
    }).join('');
  }

  function getSubtopicAttemptStats() {
    const acc = {};
    ALL_QUESTIONS.forEach((q) => {
      if (!acc[q.subtopic]) {
        acc[q.subtopic] = {
          subtopic: q.subtopic,
          domain: q.domain,
          answered: 0,
          correct: 0
        };
      }
      const h = state.stats.questionHistory[q.id];
      if (!h) return;
      acc[q.subtopic].answered += Number(h.answered) || 0;
      acc[q.subtopic].correct += Number(h.correct) || 0;
    });

    return Object.values(acc).map((x) => {
      const accuracy = x.answered > 0 ? Math.round((x.correct / x.answered) * 100) : 0;
      return Object.assign({}, x, { accuracy });
    });
  }

  function renderStudyPlan() {
    const list = document.getElementById('study-plan-list');
    if (!list) return;

    const weak = getSubtopicAttemptStats()
      .filter((x) => x.answered >= 3)
      .sort((a, b) => a.accuracy - b.accuracy);
    const primaryWeak = weak[0];

    const wrongCount = Object.keys(state.stats.wrongQuestions || {}).length;
    const pendingLab = LABS.find((lab) => !(state.stats.labsCompleted || []).includes(lab.id));

    const items = [];
    if (primaryWeak) {
      items.push(`Practica el subtema <strong>${escapeHtml(primaryWeak.subtopic)}</strong> — tu tasa de acierto es ${primaryWeak.accuracy}%.`);
    } else {
      items.push('Responde más preguntas para identificar subtemas débiles con suficiente evidencia.');
    }
    items.push(`Revisa tus <strong>${wrongCount}</strong> errores pendientes en la sección de repaso.`);
    if (pendingLab) {
      items.push(`Completa el lab <strong>${escapeHtml(pendingLab.title)}</strong> para practicar hands-on.`);
    } else {
      items.push('Mantén práctica activa repitiendo un lab avanzado para consolidar técnicas.');
    }

    list.innerHTML = items.map((item) => `<li>${item}</li>`).join('');
  }

  function updateCountdown() {
    const value = document.getElementById('exam-date').value;
    if (!value) {
      document.getElementById('countdown-value').textContent = '--';
      return;
    }

    const diff = Math.ceil((new Date(value) - new Date()) / 86400000);
    document.getElementById('countdown-value').textContent = diff >= 0 ? diff : 0;
  }

  document.getElementById('exam-date').addEventListener('change', function () {
    state.stats.examDate = this.value;
    saveStats();
    updateCountdown();
  });

  // ─── Quiz ───────────────────────────────────────────────────────────────────
  function setQuizDomainFilter(domain) {
    state.quizDomain = Number(domain) || 0;
    document.querySelectorAll('.quiz-filter .filter-btn').forEach((btn) => {
      btn.classList.toggle('active', Number(btn.dataset.domain) === state.quizDomain);
    });
    syncQuizSubtopicOptions();
  }

  function setQuizDiffFilter(diff) {
    state.quizDiff = Number(diff) || 0;
    document.querySelectorAll('.quiz-difficulty .filter-btn').forEach((btn) => {
      btn.classList.toggle('active', Number(btn.dataset.diff) === state.quizDiff);
    });
  }

  function getSubtopicsForDomain(domain) {
    const filtered = domain > 0
      ? ALL_QUESTIONS.filter((q) => q.domain === domain)
      : ALL_QUESTIONS;
    return [...new Set(filtered.map((q) => q.subtopic))].sort((a, b) => a.localeCompare(b, 'es'));
  }

  function syncQuizSubtopicOptions() {
    const select = document.getElementById('quiz-subtopic-select');
    if (!select) return;

    const options = getSubtopicsForDomain(state.quizDomain);
    const activeValue = state.quizSubtopic;
    select.innerHTML = `<option value="">Todos los subtopics</option>${options.map((s) => `<option value="${escapeHtml(s)}">${escapeHtml(s)}</option>`).join('')}`;

    if (activeValue && options.includes(activeValue)) {
      select.value = activeValue;
    } else {
      state.quizSubtopic = '';
      select.value = '';
    }
  }

  document.querySelectorAll('.quiz-filter .filter-btn').forEach((btn) => {
    btn.addEventListener('click', () => setQuizDomainFilter(Number(btn.dataset.domain)));
  });

  document.querySelectorAll('.quiz-difficulty .filter-btn').forEach((btn) => {
    btn.addEventListener('click', () => setQuizDiffFilter(Number(btn.dataset.diff)));
  });

  const quizSubtopicSelect = document.getElementById('quiz-subtopic-select');
  if (quizSubtopicSelect) {
    quizSubtopicSelect.addEventListener('change', () => {
      state.quizSubtopic = quizSubtopicSelect.value || '';
    });
  }

  document.getElementById('start-quiz-btn').addEventListener('click', startQuiz);
  document.getElementById('quiz-next-btn').addEventListener('click', () => {
    state.quizIndex += 1;
    renderQuizQuestion();
  });
  document.getElementById('quiz-finish-btn').addEventListener('click', showQuizResults);

  function startQuiz() {
    let questions = [...ALL_QUESTIONS];
    if (state.quizDomain > 0) questions = questions.filter((q) => q.domain === state.quizDomain);
    if (state.quizDiff > 0) questions = questions.filter((q) => q.difficulty === state.quizDiff);
    if (state.quizSubtopic) questions = questions.filter((q) => q.subtopic === state.quizSubtopic);

    if (questions.length === 0) {
      alert('No hay preguntas con estos filtros');
      return;
    }

    state.quizQuestions = shuffle(questions).slice(0, 10);
    state.quizIndex = 0;
    state.quizScore = 0;
    state.quizAnswered = false;

    document.getElementById('quiz-empty').style.display = 'none';
    document.getElementById('quiz-results').style.display = 'none';
    document.getElementById('quiz-content').style.display = 'block';

    renderQuizQuestion();
  }

  function renderQuizQuestion() {
    const q = state.quizQuestions[state.quizIndex];
    const total = state.quizQuestions.length;
    state.quizAnswered = false;

    document.getElementById('quiz-progress-fill').style.width = `${(state.quizIndex / total) * 100}%`;
    document.getElementById('quiz-progress-text').textContent = `${state.quizIndex + 1} / ${total}`;

    const badge = document.getElementById('quiz-badge');
    badge.className = `quiz-domain-badge badge-d${q.domain}`;
    badge.textContent = `${DOMAIN_NAMES[q.domain]} • Dificultad ${'⭐'.repeat(q.difficulty)}`;

    document.getElementById('quiz-question').textContent = q.question;
    document.getElementById('quiz-explanation').style.display = 'none';
    document.getElementById('quiz-next-btn').style.display = 'none';
    document.getElementById('quiz-finish-btn').style.display = 'none';

    const optContainer = document.getElementById('quiz-options');
    optContainer.innerHTML = '';

    q.options.forEach((opt, i) => {
      const div = document.createElement('div');
      div.className = 'quiz-option';
      div.textContent = `${String.fromCharCode(65 + i)}. ${opt}`;
      div.addEventListener('click', () => selectQuizAnswer(i, q));
      optContainer.appendChild(div);
    });
  }

  function selectQuizAnswer(selected, q) {
    if (state.quizAnswered) return;
    state.quizAnswered = true;

    const options = document.querySelectorAll('#quiz-options .quiz-option');
    options.forEach((o) => o.classList.add('disabled'));

    if (selected === q.correct) {
      options[selected].classList.add('correct');
      state.quizScore += 1;
      state.stats.correct += 1;
      state.stats.byDomain[q.domain].c += 1;
      if (state.stats.wrongQuestions[q.id]) delete state.stats.wrongQuestions[q.id];
      recordQuestionOutcome(q.id, true);
      trackDailyActivity(1, 1);
    } else {
      options[selected].classList.add('incorrect');
      options[q.correct].classList.add('correct-answer');
      state.stats.wrongQuestions[q.id] = (state.stats.wrongQuestions[q.id] || 0) + 1;
      recordQuestionOutcome(q.id, false);
      trackDailyActivity(1, 0);
    }

    state.stats.answered += 1;
    state.stats.byDomain[q.domain].a += 1;
    saveStats();

    const expl = document.getElementById('quiz-explanation');
    expl.innerHTML = `<strong>💡 Explicación:</strong> ${formatText(q.explanation)}`;
    expl.style.display = 'block';

    if (state.quizIndex < state.quizQuestions.length - 1) document.getElementById('quiz-next-btn').style.display = 'inline-flex';
    else document.getElementById('quiz-finish-btn').style.display = 'inline-flex';
  }

  function showQuizResults() {
    document.getElementById('quiz-content').style.display = 'none';

    const total = state.quizQuestions.length;
    const pct = Math.round((state.quizScore / total) * 100);
    const pass = pct >= 70;

    const results = document.getElementById('quiz-results');
    results.style.display = 'block';
    results.innerHTML = `
      <div style="text-align:center;padding:2rem 0">
        <div class="results-score ${pass ? 'pass' : 'fail'}">${pct}%</div>
        <div class="results-status ${pass ? 'pass' : 'fail'}">${pass ? '¡Aprobado! 🎉' : 'Necesitas repasar 📚'}</div>
        <p style="color:var(--text-secondary);margin-bottom:1.5rem">${state.quizScore} de ${total} correctas</p>
        <button class="btn btn-primary" id="quiz-repeat-btn">Hacer otro Quiz</button>
      </div>
    `;

    const repeatBtn = document.getElementById('quiz-repeat-btn');
    if (repeatBtn) {
      repeatBtn.addEventListener('click', () => {
        document.getElementById('quiz-results').style.display = 'none';
        document.getElementById('quiz-empty').style.display = 'block';
      });
    }
  }

  // ─── Flashcards ─────────────────────────────────────────────────────────────
  document.querySelectorAll('[data-fc-domain]').forEach((btn) => {
    btn.addEventListener('click', () => {
      document.querySelectorAll('[data-fc-domain]').forEach((b) => b.classList.remove('active'));
      btn.classList.add('active');
      state.fcDomain = Number(btn.dataset.fcDomain);
      initFlashcards();
    });
  });

  document.getElementById('flashcard').addEventListener('click', () => {
    if (state.fcOrder.length === 0) return;
    state.fcFlipped = !state.fcFlipped;
    document.getElementById('flashcard').classList.toggle('flipped');
    if (state.fcFlipped) {
      state.stats.fcReviewed += 1;
      saveStats();
    }
  });

  document.getElementById('fc-prev').addEventListener('click', () => {
    if (state.fcIndex > 0) {
      state.fcIndex -= 1;
      renderFlashcard();
    }
  });

  document.getElementById('fc-next').addEventListener('click', () => {
    if (state.fcIndex < state.fcOrder.length - 1) {
      state.fcIndex += 1;
      renderFlashcard();
    }
  });

  document.querySelectorAll('.rating-btn').forEach((btn) => {
    btn.addEventListener('click', () => {
      if (state.fcOrder.length === 0) return;

      const card = state.fcOrder[state.fcIndex];
      state.stats.fcRatings[card.id] = btn.dataset.rating;
      saveStats();

      if (state.fcIndex < state.fcOrder.length - 1) {
        state.fcIndex += 1;
        renderFlashcard();
      }
    });
  });

  function initFlashcards() {
    let cards = [...FLASHCARDS];
    if (state.fcDomain > 0) cards = cards.filter((c) => c.domain === state.fcDomain);

    const ratingOrder = { hard: 0, medium: 1, easy: 2 };
    cards.sort((a, b) => {
      const ra = state.stats.fcRatings[a.id] || 'medium';
      const rb = state.stats.fcRatings[b.id] || 'medium';
      return ratingOrder[ra] - ratingOrder[rb];
    });

    state.fcOrder = cards;
    state.fcIndex = 0;
    state.fcFlipped = false;
    renderFlashcard();
  }

  function renderFlashcard() {
    if (state.fcOrder.length === 0) {
      document.getElementById('fc-front').textContent = 'No hay flashcards para este filtro.';
      document.getElementById('fc-back').textContent = 'Prueba otro dominio.';
      document.getElementById('fc-counter').textContent = '0 / 0';
      return;
    }

    const card = state.fcOrder[state.fcIndex];
    document.getElementById('flashcard').classList.remove('flipped');
    state.fcFlipped = false;

    document.getElementById('fc-front').innerHTML = formatText(card.front);
    document.getElementById('fc-back').innerHTML = formatText(card.back);
    document.getElementById('fc-counter').textContent = `${state.fcIndex + 1} / ${state.fcOrder.length}`;
  }

  // ─── Summaries ──────────────────────────────────────────────────────────────
  document.getElementById('search-input').addEventListener('input', function () {
    renderSummaries(this.value.trim());
  });

  function renderSummaries(filterText) {
    const container = document.getElementById('summaries-list');
    let items = SUMMARIES;

    if (filterText) {
      const f = filterText.toLowerCase();
      items = items.filter((s) => {
        if (s.title.toLowerCase().includes(f)) return true;
        if (s.summary.toLowerCase().includes(f)) return true;
        return s.keyPoints.some((k) => k.toLowerCase().includes(f));
      });
    }

    container.innerHTML = items.map((s) => {
      return `
        <div class="card summary-card">
          <div class="summary-header" onclick="this.parentElement.classList.toggle('open')">
            <div class="summary-title-row">
              <span class="quiz-domain-badge badge-d${s.domain}" style="margin:0">${escapeHtml(DOMAIN_NAMES[s.domain])}</span>
              <span class="summary-title">${escapeHtml(s.title)}</span>
            </div>
            <span class="summary-toggle">▾</span>
          </div>
          <div class="summary-content">
            <div class="summary-text">${formatText(s.summary)}</div>
            <ul class="key-points">${s.keyPoints.map((k) => `<li>${formatText(k)}</li>`).join('')}</ul>
            <a href="${escapeHtml(s.link)}" target="_blank" rel="noopener noreferrer" class="summary-link">📖 Ver en Microsoft Learn →</a>
          </div>
        </div>
      `;
    }).join('');
  }

  // ─── Labs ───────────────────────────────────────────────────────────────────
  document.querySelectorAll('[data-lab-domain]').forEach((btn) => {
    btn.addEventListener('click', () => {
      document.querySelectorAll('[data-lab-domain]').forEach((b) => b.classList.remove('active'));
      btn.classList.add('active');
      state.labsDomain = Number(btn.dataset.labDomain);
      renderLabs();
    });
  });

  document.querySelectorAll('[data-lab-diff]').forEach((btn) => {
    btn.addEventListener('click', () => {
      document.querySelectorAll('[data-lab-diff]').forEach((b) => b.classList.remove('active'));
      btn.classList.add('active');
      state.labsDiff = Number(btn.dataset.labDiff);
      renderLabs();
    });
  });

  function renderLabs() {
    const list = document.getElementById('labs-list');

    const filtered = LABS.filter((lab) => {
      if (state.labsDomain > 0 && lab.domain !== state.labsDomain) return false;
      if (state.labsDiff > 0 && lab.difficulty !== state.labsDiff) return false;
      return true;
    });

    updateLabsSummary();

    if (filtered.length === 0) {
      list.innerHTML = `<div class="card empty-state"><div class="icon">🔬</div><p>No hay labs para estos filtros.</p></div>`;
      return;
    }

    list.innerHTML = filtered.map((lab) => {
      const doneSet = new Set((state.stats.labsProgress[lab.id] || []).map(Number));
      const totalSteps = lab.steps.length;
      const completed = lab.steps.filter((st) => doneSet.has(Number(st.step))).length;
      const pct = Math.round((completed / totalSteps) * 100);
      const isOpen = !!state.labsOpen[lab.id];

      const diffText = lab.difficulty === 1 ? 'Fácil' : lab.difficulty === 2 ? 'Media' : 'Difícil';

      return `
        <div class="card lab-card ${isOpen ? 'open' : ''}" data-lab-id="${lab.id}">
          <div class="lab-header" data-lab-toggle="${lab.id}">
            <div class="lab-header-left">
              <div class="lab-title-row">
                <span class="lab-title">${escapeHtml(lab.title)}</span>
              </div>
              <div class="lab-badges">
                <span class="lab-pill">${DOMAIN_LABEL_SHORT[lab.domain]} • ${escapeHtml(DOMAIN_NAMES[lab.domain])}</span>
                <span class="lab-pill diff-${lab.difficulty}">${diffText}</span>
                <span class="lab-pill">⏱ ${escapeHtml(lab.duration)}</span>
                <span class="lab-pill">${completed}/${totalSteps} pasos</span>
              </div>
            </div>
            <span class="lab-toggle">▾</span>
          </div>

          <div class="lab-body">
            <div class="lab-prereq"><strong>Prerequisitos:</strong><ul>${lab.prerequisites.map((p) => `<li>${formatText(p)}</li>`).join('')}</ul></div>
            <div class="lab-objectives"><strong>Objetivos:</strong><ul>${lab.objectives.map((o) => `<li>${formatText(o)}</li>`).join('')}</ul></div>

            <div class="lab-progress-row">
              <div class="lab-progress-text"><span>Progreso del lab</span><span>${pct}%</span></div>
              <div class="lab-progress-track"><div class="lab-progress-fill" style="width:${pct}%"></div></div>
            </div>

            <div class="lab-steps">
              ${lab.steps.map((st) => {
                const checked = doneSet.has(Number(st.step));
                return `
                  <div class="lab-step">
                    <label>
                      <input type="checkbox" data-lab-step="1" data-lab-id="${lab.id}" data-step-id="${st.step}" ${checked ? 'checked' : ''}>
                      <span>
                        <div class="lab-step-title">Paso ${st.step}: ${escapeHtml(st.title)}</div>
                        <div class="lab-step-body">${formatText(st.instruction)}</div>
                        <div class="lab-step-tip">💡 ${formatText(st.tip)}</div>
                        <div class="lab-step-validation">✔ Validación: ${formatText(st.validation)}</div>
                      </span>
                    </label>
                  </div>
                `;
              }).join('')}
            </div>

            <div class="lab-final-validation"><strong>Validación final:</strong> ${formatText(lab.validation)}</div>
            <div class="lab-takeaways">${lab.keyTakeaways.map((k) => `<span class="lab-takeaway-pill">${formatText(k)}</span>`).join('')}</div>
          </div>
        </div>
      `;
    }).join('');

    list.querySelectorAll('[data-lab-toggle]').forEach((el) => {
      el.addEventListener('click', () => {
        const labId = Number(el.dataset.labToggle);
        state.labsOpen[labId] = !state.labsOpen[labId];
        renderLabs();
      });
    });

    list.querySelectorAll('input[data-lab-step]').forEach((input) => {
      input.addEventListener('change', () => {
        const labId = Number(input.dataset.labId);
        const stepId = Number(input.dataset.stepId);
        toggleLabStep(labId, stepId, input.checked);
      });
    });
  }

  function toggleLabStep(labId, stepId, checked) {
    const current = new Set((state.stats.labsProgress[labId] || []).map(Number));
    if (checked) current.add(stepId);
    else current.delete(stepId);

    state.stats.labsProgress[labId] = Array.from(current).sort((a, b) => a - b);
    saveStats();
    renderLabs();
  }

  function updateLabsSummary() {
    const completedLabs = (state.stats.labsCompleted || []).length;
    document.getElementById('labs-completed-count').textContent = completedLabs;

    let totalSteps = 0;
    LABS.forEach((lab) => { totalSteps += lab.steps.length; });

    let doneSteps = 0;
    Object.keys(state.stats.labsProgress || {}).forEach((labId) => {
      doneSteps += (state.stats.labsProgress[labId] || []).length;
    });

    const pct = totalSteps > 0 ? Math.round((doneSteps / totalSteps) * 100) : 0;
    document.getElementById('labs-progress-pct').textContent = `${pct}%`;
  }

  // ─── Glossary ───────────────────────────────────────────────────────────────
  const glossarySearchInput = document.getElementById('glossary-search-input');
  glossarySearchInput.addEventListener('input', () => {
    state.glossarySearch = glossarySearchInput.value.trim();
    renderGlossary();
  });

  document.querySelectorAll('[data-glossary-domain]').forEach((btn) => {
    btn.addEventListener('click', () => {
      document.querySelectorAll('[data-glossary-domain]').forEach((b) => b.classList.remove('active'));
      btn.classList.add('active');
      state.glossaryDomain = Number(btn.dataset.glossaryDomain);
      renderGlossary();
    });
  });

  document.querySelectorAll('[data-glossary-relevance]').forEach((btn) => {
    btn.addEventListener('click', () => {
      document.querySelectorAll('[data-glossary-relevance]').forEach((b) => b.classList.remove('active'));
      btn.classList.add('active');
      state.glossaryRelevance = btn.dataset.glossaryRelevance;
      renderGlossary();
    });
  });

  function renderGlossary() {
    const container = document.getElementById('glossary-list');
    const relLabel = { high: '🔴 Alta', medium: '🟡 Media', low: '🟢 Baja' };

    const sorted = [...GLOSSARY].sort((a, b) => a.term.localeCompare(b.term, 'es', { sensitivity: 'base' }));

    const filtered = sorted.filter((item) => {
      if (state.glossaryDomain > 0 && item.domain !== state.glossaryDomain) return false;
      if (state.glossaryRelevance !== 'all' && item.examRelevance !== state.glossaryRelevance) return false;

      if (state.glossarySearch) {
        const f = state.glossarySearch.toLowerCase();
        if (item.term.toLowerCase().includes(f)) return true;
        if (item.definition.toLowerCase().includes(f)) return true;
        if ((item.relatedTerms || []).some((t) => t.toLowerCase().includes(f))) return true;
        return false;
      }

      return true;
    });

    if (filtered.length === 0) {
      container.innerHTML = `<div class="card empty-state"><div class="icon">📖</div><p>No hay términos que coincidan con los filtros.</p></div>`;
      return;
    }

    container.innerHTML = filtered.map((item) => {
      const rel = item.examRelevance;
      return `
        <div class="card glossary-card rel-${rel}" id="glossary-term-${item.id}" data-term="${escapeHtml(item.term)}">
          <div class="glossary-term-row">
            <div class="glossary-term">${escapeHtml(item.term)}</div>
            <div class="glossary-term-meta">
              <span class="glossary-domain-pill">${DOMAIN_LABEL_SHORT[item.domain]} • ${escapeHtml(DOMAIN_NAMES[item.domain])}</span>
              <span class="glossary-rel-pill rel-${rel}">${relLabel[rel]}</span>
            </div>
          </div>
          <div class="glossary-definition">${formatText(item.definition)}</div>
          <div class="glossary-related">
            ${(item.relatedTerms || []).map((rt) => `<button class="related-term-btn" data-related-term="${escapeHtml(rt)}">${escapeHtml(rt)}</button>`).join('')}
          </div>
        </div>
      `;
    }).join('');

    container.querySelectorAll('.related-term-btn').forEach((btn) => {
      btn.addEventListener('click', () => {
        const term = btn.dataset.relatedTerm || '';
        glossarySearchInput.value = term;
        state.glossarySearch = term;
        renderGlossary();

        const target = [...document.querySelectorAll('.glossary-card')].find((el) => (el.dataset.term || '').toLowerCase() === term.toLowerCase());
        if (target) target.scrollIntoView({ behavior: 'smooth', block: 'center' });
      });
    });
  }

  // ─── Exam Advanced ──────────────────────────────────────────────────────────
  const examElements = {
    setup: document.getElementById('exam-setup'),
    active: document.getElementById('exam-active'),
    review: document.getElementById('exam-review'),
    results: document.getElementById('exam-results'),
    timer: document.getElementById('exam-timer'),
    progressText: document.getElementById('exam-progress-text'),
    nav: document.getElementById('exam-q-nav'),
    card: document.getElementById('exam-question-card'),
    markBtn: document.getElementById('mark-exam-btn')
  };

  document.getElementById('start-exam-btn').addEventListener('click', startExam);
  document.getElementById('exam-prev-btn').addEventListener('click', () => {
    if (state.examIndex > 0) {
      state.examIndex -= 1;
      renderExamNav();
      renderExamQuestion();
    }
  });
  document.getElementById('exam-next-btn').addEventListener('click', () => {
    if (state.examIndex < state.examQuestions.length - 1) {
      state.examIndex += 1;
      renderExamNav();
      renderExamQuestion();
    }
  });

  document.getElementById('finish-exam-btn').addEventListener('click', () => {
    openExamReviewScreen();
  });

  document.getElementById('exam-review-back-btn').addEventListener('click', () => {
    examElements.review.style.display = 'none';
    examElements.active.style.display = 'block';
    renderExamNav();
    renderExamQuestion();
  });

  document.getElementById('exam-review-submit-btn').addEventListener('click', () => {
    if (confirm('¿Deseas enviar el examen ahora?')) finishExam();
  });

  examElements.markBtn.addEventListener('click', () => {
    const idx = state.examIndex;
    if (state.examMarked[idx]) delete state.examMarked[idx];
    else state.examMarked[idx] = true;

    renderExamNav();
    updateMarkButton();
  });

  function startExam() {
    const questions = buildExamQuestionSet(TOTAL_EXAM_QUESTIONS);

    state.examQuestions = questions;
    state.examIndex = 0;
    state.examAnswers = {};
    state.examMarked = {};
    state.examTimeLeft = 6000;
    state.examActive = true;
    examElements.timer.textContent = '100:00';
    examElements.timer.className = 'timer-display';

    examElements.setup.style.display = 'none';
    examElements.results.style.display = 'none';
    examElements.review.style.display = 'none';
    examElements.active.style.display = 'block';

    renderExamNav();
    renderExamQuestion();
    startExamTimer();
  }

  function buildExamQuestionSet(totalCount) {
    const multiCount = randomInt(3, 5);
    const orderCount = randomInt(2, 3);

    const multi = shuffle(MULTI_QUESTIONS).slice(0, multiCount).map((q) => Object.assign({}, q, { questionType: 'multi' }));
    const order = shuffle(ORDER_QUESTIONS).slice(0, orderCount).map((q) => Object.assign({}, q, { questionType: 'order' }));

    const selectedCases = shuffle(CASE_STUDIES).slice(0, 2);
    const caseQuestions = [];
    selectedCases.forEach((cs) => {
      const maxPerCase = Math.min(3, cs.questions.length);
      const minPerCase = Math.min(2, cs.questions.length);
      const pick = randomInt(minPerCase, maxPerCase);
      shuffle(cs.questions).slice(0, pick).forEach((sq, idx) => {
        caseQuestions.push({
          id: `${cs.id}_Q${idx + 1}`,
          questionType: 'case',
          caseId: cs.id,
          caseScenario: cs.scenario,
          domain: cs.domain,
          difficulty: cs.difficulty,
          subtopic: 'Case Study',
          question: sq.question,
          options: sq.options,
          correct: sq.correct,
          explanation: sq.explanation
        });
      });
    });

    const remaining = totalCount - (multi.length + order.length + caseQuestions.length);
    const standard = buildWeightedStandardQuestions(Math.max(0, remaining)).map((q) => Object.assign({}, q, { questionType: 'single' }));

    return shuffle([...standard, ...multi, ...order, ...caseQuestions]);
  }

  function buildWeightedStandardQuestions(count) {
    if (count <= 0) return [];

    const d1Target = Math.round(count * 0.5);
    const d2Target = Math.round(count * 0.25);
    const d3Target = count - d1Target - d2Target;

    const d1 = shuffle(ALL_QUESTIONS.filter((q) => q.domain === 1)).slice(0, d1Target);
    const d2 = shuffle(ALL_QUESTIONS.filter((q) => q.domain === 2)).slice(0, d2Target);
    const d3 = shuffle(ALL_QUESTIONS.filter((q) => q.domain === 3)).slice(0, d3Target);

    const combined = [...d1, ...d2, ...d3];
    if (combined.length < count) {
      const missing = count - combined.length;
      const extra = shuffle(ALL_QUESTIONS.filter((q) => !combined.includes(q))).slice(0, missing);
      combined.push(...extra);
    }

    return combined.slice(0, count);
  }

  function renderExamNav() {
    examElements.nav.innerHTML = state.examQuestions.map((_, i) => {
      const classes = ['q-nav-btn'];
      if (i === state.examIndex) classes.push('current');
      if (isExamQuestionAnswered(i)) classes.push('answered');
      if (state.examMarked[i]) classes.push('flagged');

      return `<button class="${classes.join(' ')}" onclick="goToExamQ(${i})">${i + 1}</button>`;
    }).join('');

    examElements.progressText.textContent = `${state.examIndex + 1} / ${state.examQuestions.length}`;
  }

  function updateMarkButton() {
    const marked = !!state.examMarked[state.examIndex];
    examElements.markBtn.textContent = marked ? 'Marcada' : 'Marcar';
    examElements.markBtn.classList.toggle('mark-btn-active', marked);
  }

  function getQuestionTypeHint(q) {
    if (q.questionType === 'multi') return `Tipo: Multi-respuesta • Selecciona ${q.requiredSelections} opciones`;
    if (q.questionType === 'order') return 'Tipo: Ordenar pasos • Usa drag & drop o botones ↑↓';
    if (q.questionType === 'case') return `Tipo: Case Study • ${q.caseId}`;
    return 'Tipo: Selección única';
  }

  function renderExamQuestion() {
    const q = state.examQuestions[state.examIndex];
    const selected = state.examAnswers[state.examIndex];

    const badgeClass = `badge-d${q.domain}`;
    let bodyHtml = '';

    if (q.questionType === 'multi') {
      const picked = Array.isArray(selected) ? selected : [];
      bodyHtml = `
        <div class="quiz-options">
          ${q.options.map((opt, i) => `
            <label class="quiz-option multi-option">
              <input type="checkbox" data-exam-multi="${i}" class="multi-check" ${picked.includes(i) ? 'checked' : ''}>
              <span>${String.fromCharCode(65 + i)}. ${escapeHtml(opt)}</span>
            </label>
          `).join('')}
        </div>
      `;
    } else if (q.questionType === 'order') {
      if (!Array.isArray(selected)) state.examAnswers[state.examIndex] = [...q.options.keys()];
      const order = Array.isArray(state.examAnswers[state.examIndex]) ? state.examAnswers[state.examIndex] : [...q.options.keys()];

      bodyHtml = `
        <div class="order-list">
          ${order.map((optIndex, pos) => `
            <div class="order-item" draggable="true" data-order-pos="${pos}">
              <div class="order-item-main">
                <span class="order-number">${pos + 1}</span>
                <span class="order-text">${escapeHtml(q.options[optIndex])}</span>
              </div>
              <div class="order-controls">
                <button type="button" data-order-up="${pos}" title="Subir">↑</button>
                <button type="button" data-order-down="${pos}" title="Bajar">↓</button>
              </div>
            </div>
          `).join('')}
        </div>
      `;
    } else {
      bodyHtml = `
        <div class="quiz-options">
          ${q.options.map((opt, i) => `
            <div class="quiz-option exam-single-option ${selected === i ? 'selected' : ''}" data-exam-single="${i}">
              ${String.fromCharCode(65 + i)}. ${escapeHtml(opt)}
            </div>
          `).join('')}
        </div>
      `;
    }

    examElements.card.innerHTML = `
      <div class="quiz-domain-badge ${badgeClass}">${escapeHtml(DOMAIN_NAMES[q.domain])}</div>
      <div class="exam-type-hint">${escapeHtml(getQuestionTypeHint(q))}</div>
      ${q.questionType === 'case' ? `<div class="exam-case-scenario">${formatText(q.caseScenario)}</div>` : ''}
      <div class="quiz-question">${escapeHtml(q.question)}</div>
      ${bodyHtml}
    `;

    bindExamQuestionEvents(q);
    updateMarkButton();
  }

  function bindExamQuestionEvents(q) {
    const card = examElements.card;

    if (q.questionType === 'single' || q.questionType === 'case') {
      card.querySelectorAll('[data-exam-single]').forEach((el) => {
        el.addEventListener('click', () => {
          state.examAnswers[state.examIndex] = Number(el.dataset.examSingle);
          renderExamQuestion();
          renderExamNav();
        });
      });
      return;
    }

    if (q.questionType === 'multi') {
      card.querySelectorAll('[data-exam-multi]').forEach((input) => {
        input.addEventListener('change', () => {
          const idx = Number(input.dataset.examMulti);
          const current = new Set(Array.isArray(state.examAnswers[state.examIndex]) ? state.examAnswers[state.examIndex] : []);

          if (input.checked) {
            if (current.size >= q.requiredSelections) {
              input.checked = false;
              return;
            }
            current.add(idx);
          } else {
            current.delete(idx);
          }

          state.examAnswers[state.examIndex] = Array.from(current).sort((a, b) => a - b);
          renderExamNav();
        });
      });
      return;
    }

    if (q.questionType === 'order') {
      const move = (from, to) => {
        const arr = [...state.examAnswers[state.examIndex]];
        if (to < 0 || to >= arr.length) return;
        const [moved] = arr.splice(from, 1);
        arr.splice(to, 0, moved);
        state.examAnswers[state.examIndex] = arr;
        renderExamQuestion();
        renderExamNav();
      };

      card.querySelectorAll('[data-order-up]').forEach((btn) => {
        btn.addEventListener('click', () => {
          const pos = Number(btn.dataset.orderUp);
          move(pos, pos - 1);
        });
      });

      card.querySelectorAll('[data-order-down]').forEach((btn) => {
        btn.addEventListener('click', () => {
          const pos = Number(btn.dataset.orderDown);
          move(pos, pos + 1);
        });
      });

      let dragFrom = -1;
      card.querySelectorAll('.order-item').forEach((item) => {
        item.addEventListener('dragstart', () => {
          dragFrom = Number(item.dataset.orderPos);
          item.classList.add('dragging');
        });

        item.addEventListener('dragend', () => {
          item.classList.remove('dragging');
        });

        item.addEventListener('dragover', (e) => {
          e.preventDefault();
        });

        item.addEventListener('drop', (e) => {
          e.preventDefault();
          const dropPos = Number(item.dataset.orderPos);
          if (dragFrom === -1 || dragFrom === dropPos) return;
          move(dragFrom, dropPos);
        });
      });
    }
  }

  function isExamQuestionAnswered(i) {
    const q = state.examQuestions[i];
    const a = state.examAnswers[i];

    if (!q) return false;
    if (q.questionType === 'multi') return Array.isArray(a) && a.length > 0;
    if (q.questionType === 'order') return Array.isArray(a) && a.length === q.options.length;
    return typeof a === 'number';
  }

  function openExamReviewScreen() {
    examElements.active.style.display = 'none';
    examElements.review.style.display = 'block';

    const answered = state.examQuestions.filter((_, i) => isExamQuestionAnswered(i)).length;
    const marked = Object.keys(state.examMarked).length;
    const unanswered = state.examQuestions.length - answered;

    document.getElementById('exam-review-stats').innerHTML = `
      <span class="exam-review-chip">Respondidas: ${answered}</span>
      <span class="exam-review-chip warn">Marcadas: ${marked}</span>
      <span class="exam-review-chip bad">Sin responder: ${unanswered}</span>
    `;

    const rows = state.examQuestions.map((q, i) => {
      const statuses = [];
      if (!isExamQuestionAnswered(i)) statuses.push('<span class="exam-review-item-status unanswered">Sin responder</span>');
      if (state.examMarked[i]) statuses.push('<span class="exam-review-item-status marked">Marcada</span>');
      if (statuses.length === 0) statuses.push('<span class="exam-review-item-status">Respondida</span>');

      return `
        <div class="exam-review-item">
          <div>
            <div style="font-weight:600;font-size:0.9rem;">Pregunta ${i + 1} • ${escapeHtml(getQuestionTypeHint(q).replace('Tipo: ', ''))}</div>
            <div style="font-size:0.8rem;color:var(--text-muted);margin-top:0.2rem;">${escapeHtml(DOMAIN_NAMES[q.domain])}</div>
            <div style="display:flex;gap:0.45rem;flex-wrap:wrap;margin-top:0.25rem;">${statuses.join('')}</div>
          </div>
          <button class="exam-review-go" data-exam-go="${i}">Ir</button>
        </div>
      `;
    }).join('');

    const list = document.getElementById('exam-review-list');
    list.innerHTML = rows;

    list.querySelectorAll('[data-exam-go]').forEach((btn) => {
      btn.addEventListener('click', () => {
        const index = Number(btn.dataset.examGo);
        state.examIndex = index;
        examElements.review.style.display = 'none';
        examElements.active.style.display = 'block';
        renderExamNav();
        renderExamQuestion();
      });
    });
  }

  function startExamTimer() {
    if (state.examTimer) clearInterval(state.examTimer);

    state.examTimer = setInterval(() => {
      state.examTimeLeft -= 1;
      if (state.examTimeLeft <= 0) {
        finishExam();
        return;
      }

      const mins = Math.floor(state.examTimeLeft / 60);
      const secs = state.examTimeLeft % 60;
      examElements.timer.textContent = `${String(mins).padStart(2, '0')}:${String(secs).padStart(2, '0')}`;
      examElements.timer.className = 'timer-display';

      if (state.examTimeLeft <= 300) examElements.timer.classList.add('timer-danger');
      else if (state.examTimeLeft <= 600) examElements.timer.classList.add('timer-warning');
    }, 1000);
  }

  function finishExam() {
    clearInterval(state.examTimer);
    state.examActive = false;

    let correct = 0;
    const domainScores = {
      1: { a: 0, c: 0 },
      2: { a: 0, c: 0 },
      3: { a: 0, c: 0 }
    };

    state.examQuestions.forEach((q, i) => {
      const answer = state.examAnswers[i];
      const ok = isExamAnswerCorrect(q, answer);

      domainScores[q.domain].a += 1;
      if (ok) {
        correct += 1;
        domainScores[q.domain].c += 1;
      }

      state.stats.answered += 1;
      state.stats.byDomain[q.domain].a += 1;

      if (ok) {
        state.stats.correct += 1;
        state.stats.byDomain[q.domain].c += 1;
        if (typeof q.id === 'number' && state.stats.wrongQuestions[q.id]) delete state.stats.wrongQuestions[q.id];
        recordQuestionOutcome(q.id, true);
      } else {
        if (typeof q.id === 'number') {
          state.stats.wrongQuestions[q.id] = (state.stats.wrongQuestions[q.id] || 0) + 1;
        }
        recordQuestionOutcome(q.id, false);
      }
    });

    trackDailyActivity(state.examQuestions.length, correct);
    state.stats.examsCompleted += 1;
    state.stats.lastExamScore = Math.round((correct / state.examQuestions.length) * 1000);
    saveStats();

    const total = state.examQuestions.length;
    const score = Math.round((correct / total) * 1000);
    const pass = score >= 700;

    examElements.active.style.display = 'none';
    examElements.review.style.display = 'none';
    examElements.results.style.display = 'block';

    examElements.results.innerHTML = `
      <div style="padding:2rem 0">
        <div class="results-score ${pass ? 'pass' : 'fail'}">${score}</div>
        <div style="color:var(--text-muted);margin-bottom:0.5rem;">/1000</div>
        <div class="results-status ${pass ? 'pass' : 'fail'}">${pass ? '¡APROBADO! 🎉' : 'No aprobado 📚'}</div>
        <p style="color:var(--text-secondary);margin:1rem 0">${correct} de ${total} correctas (${Math.round((correct / total) * 100)}%). Puntuación mínima: 700/1000</p>

        <div class="results-breakdown">
          <h3 style="font-size:1rem;font-weight:600;margin-bottom:0.75rem;">Desglose por Dominio</h3>
          ${[1, 2, 3].map((d) => {
            const ds = domainScores[d];
            const pct = ds.a > 0 ? Math.round((ds.c / ds.a) * 100) : 0;
            return `<div class="results-domain">
              <span class="results-domain-name">${escapeHtml(DOMAIN_NAMES[d])}</span>
              <span class="results-domain-score" style="color:${pct >= 70 ? 'var(--accent-green)' : 'var(--accent-red)'}">${ds.c}/${ds.a} (${pct}%)</span>
            </div>`;
          }).join('')}
        </div>

        <div style="display:flex;gap:1rem;justify-content:center;margin-top:1.5rem;flex-wrap:wrap;">
          <button class="btn btn-primary" id="exam-restart-btn">Hacer otro examen</button>
          <button class="btn btn-secondary" onclick="showExamReview()">Revisar respuestas</button>
        </div>
      </div>
    `;

    const restartBtn = document.getElementById('exam-restart-btn');
    if (restartBtn) {
      restartBtn.addEventListener('click', () => {
        examElements.results.style.display = 'none';
        examElements.setup.style.display = 'block';
      });
    }

    updateDashboard();
  }

  function isExamAnswerCorrect(q, answer) {
    if (q.questionType === 'multi') {
      if (!Array.isArray(answer)) return false;
      if (answer.length !== q.requiredSelections) return false;
      return arraysEqual([...answer].sort((a, b) => a - b), [...q.correct].sort((a, b) => a - b));
    }

    if (q.questionType === 'order') {
      if (!Array.isArray(answer)) return false;
      return arraysEqual(answer, q.correctOrder);
    }

    return answer === q.correct;
  }

  window.goToExamQ = function (i) {
    state.examIndex = i;
    examElements.review.style.display = 'none';
    examElements.active.style.display = 'block';
    renderExamNav();
    renderExamQuestion();
  };

  window.showExamReview = function () {
    const container = examElements.results;
    let html = '<div style="padding:1rem 0"><h3 style="font-size:1.2rem;font-weight:700;margin-bottom:1.5rem;">Revisión de Respuestas</h3>';

    state.examQuestions.forEach((q, i) => {
      const userAnswer = state.examAnswers[i];
      const ok = isExamAnswerCorrect(q, userAnswer);

      html += `
        <div style="margin-bottom:1.1rem;padding:1rem;border-radius:var(--radius-sm);border:1px solid ${ok ? 'rgba(16,185,129,0.2)' : 'rgba(239,68,68,0.2)'};background:${ok ? 'rgba(16,185,129,0.05)' : 'rgba(239,68,68,0.05)'}">
          <div style="font-size:0.8rem;font-weight:600;margin-bottom:0.5rem;color:${ok ? 'var(--accent-green)' : 'var(--accent-red)'}">${ok ? '✅ Correcta' : '❌ Incorrecta'} — Pregunta ${i + 1}</div>
          <div style="font-weight:600;margin-bottom:0.75rem;font-size:0.95rem;">${escapeHtml(q.question)}</div>
          ${q.questionType === 'case' ? `<div style="font-size:0.78rem;color:var(--text-muted);margin-bottom:0.55rem;">${escapeHtml(q.caseId)}</div>` : ''}
          <div style="font-size:0.85rem;color:var(--text-secondary);margin-bottom:0.3rem;"><strong>Tu respuesta:</strong> ${formatExamAnswer(q, userAnswer)}</div>
          <div style="font-size:0.85rem;color:var(--accent-green);margin-bottom:0.3rem;"><strong>Respuesta correcta:</strong> ${formatExamAnswer(q, q.questionType === 'order' ? q.correctOrder : q.correct)}</div>
          <div style="margin-top:0.45rem;font-size:0.83rem;color:var(--text-secondary);">${formatText(q.explanation)}</div>
        </div>
      `;
    });

    html += '<button class="btn btn-secondary" id="exam-review-back-results" style="margin-top:1rem;">Volver</button></div>';
    container.innerHTML = html;

    const backBtn = document.getElementById('exam-review-back-results');
    if (backBtn) {
      backBtn.addEventListener('click', () => {
        examElements.results.style.display = 'none';
        examElements.setup.style.display = 'block';
      });
    }
  };

  function formatExamAnswer(q, answer) {
    if (answer === undefined || answer === null) return 'Sin responder';

    if (q.questionType === 'multi') {
      if (!Array.isArray(answer) || answer.length === 0) return 'Sin responder';
      return answer.map((i) => `${String.fromCharCode(65 + i)}. ${escapeHtml(q.options[i])}`).join(' | ');
    }

    if (q.questionType === 'order') {
      if (!Array.isArray(answer) || answer.length === 0) return 'Sin responder';
      return answer.map((idx, pos) => `${pos + 1}. ${escapeHtml(q.options[idx])}`).join(' → ');
    }

    if (typeof answer !== 'number') return 'Sin responder';
    return `${String.fromCharCode(65 + answer)}. ${escapeHtml(q.options[answer])}`;
  }

  // ─── Review Errors ──────────────────────────────────────────────────────────
  function initReview() {
    const wrongIds = Object.keys(state.stats.wrongQuestions || {}).map((k) => Number(k)).filter((x) => !Number.isNaN(x));

    if (wrongIds.length === 0) {
      document.getElementById('review-empty').style.display = 'block';
      document.getElementById('review-start').style.display = 'none';
      document.getElementById('review-quiz-area').style.display = 'none';
      document.getElementById('review-results').style.display = 'none';
      return;
    }

    document.getElementById('review-empty').style.display = 'none';
    document.getElementById('review-start').style.display = 'block';
    document.getElementById('review-quiz-area').style.display = 'none';
    document.getElementById('review-results').style.display = 'none';

    const wrongQ = ALL_QUESTIONS.filter((q) => wrongIds.includes(q.id));
    wrongQ.sort((a, b) => (state.stats.wrongQuestions[b.id] || 0) - (state.stats.wrongQuestions[a.id] || 0));
    reviewState.questions = wrongQ;

    document.getElementById('review-stats-row').innerHTML = `
      <div class="review-stat"><div class="review-stat-value">${wrongQ.length}</div><div class="review-stat-label">Preguntas pendientes</div></div>
      <div class="review-stat"><div class="review-stat-value">${Math.max(...Object.values(state.stats.wrongQuestions || { 0: 0 }))}</div><div class="review-stat-label">Máximo fallos en una</div></div>
    `;
  }

  document.getElementById('start-review-btn').addEventListener('click', () => {
    reviewState.index = 0;
    reviewState.score = 0;
    reviewState.answered = false;

    document.getElementById('review-start').style.display = 'none';
    document.getElementById('review-results').style.display = 'none';
    document.getElementById('review-quiz-area').style.display = 'block';

    renderReviewQuestion();
  });

  document.getElementById('review-next-btn').addEventListener('click', () => {
    reviewState.index += 1;
    renderReviewQuestion();
  });

  document.getElementById('review-finish-btn').addEventListener('click', showReviewResults);

  function renderReviewQuestion() {
    const q = reviewState.questions[reviewState.index];
    const total = reviewState.questions.length;
    reviewState.answered = false;

    document.getElementById('review-progress-fill').style.width = `${(reviewState.index / total) * 100}%`;
    document.getElementById('review-progress-text').textContent = `${reviewState.index + 1} / ${total}`;

    const badge = document.getElementById('review-badge');
    badge.className = `quiz-domain-badge badge-d${q.domain}`;
    badge.textContent = `${DOMAIN_NAMES[q.domain]} • Fallada ${(state.stats.wrongQuestions[q.id] || 1)}x`;

    document.getElementById('review-question').textContent = q.question;
    document.getElementById('review-explanation').style.display = 'none';
    document.getElementById('review-next-btn').style.display = 'none';
    document.getElementById('review-finish-btn').style.display = 'none';

    const opts = document.getElementById('review-options');
    opts.innerHTML = '';

    q.options.forEach((opt, i) => {
      const div = document.createElement('div');
      div.className = 'quiz-option';
      div.textContent = `${String.fromCharCode(65 + i)}. ${opt}`;
      div.addEventListener('click', () => selectReviewAnswer(i, q));
      opts.appendChild(div);
    });
  }

  function selectReviewAnswer(selected, q) {
    if (reviewState.answered) return;
    reviewState.answered = true;

    const options = document.querySelectorAll('#review-options .quiz-option');
    options.forEach((o) => o.classList.add('disabled'));

    if (selected === q.correct) {
      options[selected].classList.add('correct');
      reviewState.score += 1;
      delete state.stats.wrongQuestions[q.id];
      recordQuestionOutcome(q.id, true);
      trackDailyActivity(1, 1);
    } else {
      options[selected].classList.add('incorrect');
      options[q.correct].classList.add('correct-answer');
      recordQuestionOutcome(q.id, false);
      trackDailyActivity(1, 0);
    }

    state.stats.reviewAnswered = (state.stats.reviewAnswered || 0) + 1;
    saveStats();

    const expl = document.getElementById('review-explanation');
    expl.innerHTML = `<strong>💡 Explicación:</strong> ${formatText(q.explanation)}`;
    expl.style.display = 'block';

    if (reviewState.index < reviewState.questions.length - 1) document.getElementById('review-next-btn').style.display = 'inline-flex';
    else document.getElementById('review-finish-btn').style.display = 'inline-flex';
  }

  function showReviewResults() {
    document.getElementById('review-quiz-area').style.display = 'none';

    const total = reviewState.questions.length;
    const pct = total > 0 ? Math.round((reviewState.score / total) * 100) : 0;

    const container = document.getElementById('review-results');
    container.style.display = 'block';
    container.innerHTML = `
      <div class="card" style="max-width:600px;margin:0 auto;text-align:center;padding:2rem;">
        <div class="results-score ${pct >= 70 ? 'pass' : 'fail'}">${pct}%</div>
        <div class="results-status ${pct >= 70 ? 'pass' : 'fail'}">${pct >= 70 ? '¡Buen repaso! 🎉' : 'Sigue practicando 📚'}</div>
        <p style="color:var(--text-secondary);margin:1rem 0">${reviewState.score} de ${total} resueltas correctamente</p>
        <p style="color:var(--text-muted);font-size:0.85rem;margin-bottom:1.5rem;">Las preguntas contestadas correctamente se eliminan de la lista de errores.</p>
        <button class="btn btn-primary" id="review-again-btn">Volver al Repaso</button>
      </div>
    `;

    const again = document.getElementById('review-again-btn');
    if (again) again.addEventListener('click', initReview);
  }

  // ─── Export / Import ────────────────────────────────────────────────────────
  document.getElementById('export-btn').addEventListener('click', () => {
    const payload = JSON.stringify(state.stats, null, 2);
    const blob = new Blob([payload], { type: 'application/json' });
    const url = URL.createObjectURL(blob);

    const a = document.createElement('a');
    a.href = url;
    a.download = `dp600-progress-${new Date().toISOString().slice(0, 10)}.json`;
    a.click();

    URL.revokeObjectURL(url);
  });

  document.getElementById('import-file').addEventListener('change', function () {
    const file = this.files && this.files[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = (e) => {
      try {
        const parsed = JSON.parse(e.target.result);
        if (typeof parsed.answered !== 'number' || !parsed.byDomain) {
          alert('Archivo de progreso inválido.');
          return;
        }

        state.stats = normalizeStats(parsed);
        saveStats();
        updateDashboard();
        updateLabsSummary();
        renderNotes();
        renderKnowledgeMap();
        renderAnalytics();
        alert('✅ Progreso importado correctamente.');
      } catch (err) {
        alert('Error al leer el archivo JSON.');
      }
    };

    reader.readAsText(file);
    this.value = '';
  });

  // ─── Knowledge Map ──────────────────────────────────────────────────────────
  function getAnsweredAndCorrectSets() {
    const answered = new Set();
    const correct = new Set();

    (state.stats.correctIds || []).forEach((id) => {
      const num = Number(id);
      if (!Number.isFinite(num)) return;
      answered.add(num);
      correct.add(num);
    });

    (state.stats.wrongIds || []).forEach((id) => {
      const num = Number(id);
      if (!Number.isFinite(num)) return;
      answered.add(num);
    });

    Object.keys(state.stats.wrongQuestions || {}).forEach((id) => {
      const num = Number(id);
      if (Number.isFinite(num)) answered.add(num);
    });

    Object.keys(state.stats.questionHistory || {}).forEach((id) => {
      const num = Number(id);
      if (!Number.isFinite(num)) return;
      const h = state.stats.questionHistory[id] || {};
      if ((Number(h.answered) || 0) > 0) answered.add(num);
      if ((Number(h.correct) || 0) > 0) correct.add(num);
    });

    return { answered, correct };
  }

  function getSubtopicCoverage() {
    const { answered, correct } = getAnsweredAndCorrectSets();
    const byDomain = { 1: {}, 2: {}, 3: {} };

    ALL_QUESTIONS.forEach((q) => {
      if (!byDomain[q.domain][q.subtopic]) {
        byDomain[q.domain][q.subtopic] = {
          domain: q.domain,
          subtopic: q.subtopic,
          total: 0,
          answered: 0,
          correct: 0
        };
      }
      const item = byDomain[q.domain][q.subtopic];
      item.total += 1;
      if (answered.has(q.id)) item.answered += 1;
      if (correct.has(q.id)) item.correct += 1;
    });

    [1, 2, 3].forEach((d) => {
      Object.values(byDomain[d]).forEach((row) => {
        row.accuracy = row.answered > 0 ? Math.round((row.correct / row.answered) * 100) : 0;
      });
    });

    return byDomain;
  }

  function getCoverageStatusClass(item) {
    if (item.answered === 0) return 'st-red';
    if (item.accuracy < 50) return 'st-orange';
    if (item.accuracy < 70) return 'st-yellow';
    return 'st-green';
  }

  function renderKnowledgeMap() {
    const grid = document.getElementById('knowledge-map-grid');
    if (!grid) return;

    const byDomain = getSubtopicCoverage();
    const domainHTML = [1, 2, 3].map((domain) => {
      const rows = Object.values(byDomain[domain]).sort((a, b) => a.subtopic.localeCompare(b.subtopic, 'es'));
      const totalQuestions = rows.reduce((sum, r) => sum + r.total, 0);
      const totalAnswered = rows.reduce((sum, r) => sum + r.answered, 0);
      const coverage = totalQuestions > 0 ? Math.round((totalAnswered / totalQuestions) * 100) : 0;

      return `
        <div class="knowledge-domain-card">
          <div class="knowledge-domain-title">
            <div class="knowledge-domain-name">${escapeHtml(DOMAIN_NAMES[domain])}</div>
            <div class="knowledge-domain-pct">Cobertura: ${coverage}%</div>
          </div>
          <div class="knowledge-subtopic-grid">
            ${rows.map((row) => `
              <button class="knowledge-node ${getCoverageStatusClass(row)}" data-topic-open="1" data-topic-domain="${row.domain}" data-topic-subtopic="${escapeHtml(row.subtopic)}">
                <h4>${escapeHtml(row.subtopic)}</h4>
                <div class="knowledge-meta">${row.answered}/${row.total} respondidas</div>
                <div class="knowledge-meta">${row.accuracy}% acierto</div>
              </button>
            `).join('')}
          </div>
        </div>
      `;
    }).join('');

    grid.innerHTML = domainHTML;

    grid.querySelectorAll('[data-topic-open]').forEach((btn) => {
      btn.addEventListener('click', () => {
        const domain = Number(btn.dataset.topicDomain);
        const subtopic = btn.dataset.topicSubtopic || '';
        openTopicModal(domain, subtopic);
      });
    });
  }

  function normalizeToken(text) {
    return String(text || '')
      .toLowerCase()
      .normalize('NFD')
      .replace(/[\u0300-\u036f]/g, '');
  }

  function findSummaryForSubtopic(domain, subtopic) {
    const key = normalizeToken(subtopic);
    const domainList = SUMMARIES.filter((s) => s.domain === domain);
    const direct = domainList.find((s) => normalizeToken(s.title).includes(key));
    if (direct) return direct;
    const inBody = domainList.find((s) => normalizeToken(`${s.summary} ${(s.keyPoints || []).join(' ')}`).includes(key));
    if (inBody) return inBody;
    return domainList[0] || null;
  }

  function hasSubtopicMatch(text, subtopic) {
    const nText = normalizeToken(text);
    const tokens = normalizeToken(subtopic).split(/[^a-z0-9]+/).filter((t) => t.length >= 3);
    return tokens.some((token) => nText.includes(token));
  }

  function getRelatedFlashcards(domain, subtopic) {
    const filtered = FLASHCARDS.filter((fc) => fc.domain === domain);
    const match = filtered.filter((fc) => hasSubtopicMatch(`${fc.front} ${fc.back}`, subtopic));
    return (match.length > 0 ? match : filtered).slice(0, 6);
  }

  function getRelatedLabs(domain, subtopic) {
    const filtered = LABS.filter((lab) => lab.domain === domain);
    const match = filtered.filter((lab) => {
      const text = `${lab.title} ${(lab.objectives || []).join(' ')} ${(lab.keyTakeaways || []).join(' ')}`;
      return hasSubtopicMatch(text, subtopic);
    });
    return (match.length > 0 ? match : filtered).slice(0, 4);
  }

  function openTopicModal(domain, subtopic) {
    const modal = document.getElementById('topic-modal');
    const content = document.getElementById('topic-modal-content');
    if (!modal || !content) return;

    const domainQuestions = ALL_QUESTIONS.filter((q) => q.domain === domain && q.subtopic === subtopic);
    const { answered, correct } = getAnsweredAndCorrectSets();
    const summary = findSummaryForSubtopic(domain, subtopic);
    const flashcards = getRelatedFlashcards(domain, subtopic);
    const labs = getRelatedLabs(domain, subtopic);
    const answeredCount = domainQuestions.filter((q) => answered.has(q.id)).length;
    const correctCount = domainQuestions.filter((q) => correct.has(q.id)).length;
    const accuracy = answeredCount > 0 ? Math.round((correctCount / answeredCount) * 100) : 0;

    content.innerHTML = `
      <div class="topic-header">
        <h3>${escapeHtml(subtopic)}</h3>
        <p>${escapeHtml(DOMAIN_NAMES[domain])} • ${answeredCount}/${domainQuestions.length} respondidas • ${accuracy}% acierto</p>
      </div>

      <div class="topic-columns">
        <div class="topic-block">
          <h4>Resumen del tema</h4>
          <div class="note-content">${summary ? formatText(summary.summary) : 'No hay resumen específico para este subtopic.'}</div>
        </div>
        <div class="topic-block">
          <h4>Preguntas del subtopic</h4>
          <ul class="topic-list">
            ${domainQuestions.map((q) => {
              let css = 'pending';
              let label = 'Pendiente';
              if (answered.has(q.id) && correct.has(q.id)) {
                css = 'ok';
                label = 'Respondida ✓';
              } else if (answered.has(q.id)) {
                css = 'pending';
                label = 'Respondida ✗';
              }
              return `<li class="${css}"><strong>${label}</strong><br>${escapeHtml(q.question)}</li>`;
            }).join('')}
          </ul>
        </div>
        <div class="topic-block">
          <h4>Flashcards relacionadas</h4>
          <ul class="topic-list">
            ${flashcards.map((fc) => `<li>${escapeHtml(fc.front)}</li>`).join('')}
          </ul>
        </div>
        <div class="topic-block">
          <h4>Labs relacionados</h4>
          <ul class="topic-list">
            ${labs.map((lab) => `<li><strong>${escapeHtml(lab.title)}</strong><br>${escapeHtml(lab.duration)} • Dificultad ${'⭐'.repeat(lab.difficulty)}</li>`).join('')}
          </ul>
        </div>
      </div>

      <div class="topic-actions">
        <button class="btn btn-primary" data-practice-subtopic="${escapeHtml(subtopic)}" data-practice-domain="${domain}">Practicar este tema</button>
      </div>
    `;

    modal.style.display = 'block';
  }

  function closeTopicModal() {
    const modal = document.getElementById('topic-modal');
    if (modal) modal.style.display = 'none';
  }

  // ─── Analytics ──────────────────────────────────────────────────────────────
  function getDayLog(key) {
    const row = (state.stats.dailyLog || {})[key];
    if (!row) return { answered: 0, correct: 0, timeSpent: 0 };
    return {
      answered: Number(row.answered) || 0,
      correct: Number(row.correct) || 0,
      timeSpent: Number(row.timeSpent) || 0
    };
  }

  function getHeatLevel(answered) {
    if (answered <= 0) return 0;
    if (answered <= 2) return 1;
    if (answered <= 5) return 2;
    if (answered <= 9) return 3;
    return 4;
  }

  function renderActivityHeatmap() {
    const host = document.getElementById('activity-heatmap');
    if (!host) return;

    const keys = getLastDateKeys(91);
    const weeks = [];
    for (let i = 0; i < 13; i++) {
      weeks.push(keys.slice(i * 7, (i + 1) * 7));
    }

    host.innerHTML = weeks.map((week) => {
      return `<div class="heat-week">${week.map((day) => {
        const row = getDayLog(day);
        const level = getHeatLevel(row.answered);
        const labelDate = new Date(`${day}T00:00:00`).toLocaleDateString('es-ES');
        return `<span class="heat-cell lv${level}" title="${labelDate} • ${row.answered} preguntas"></span>`;
      }).join('')}</div>`;
    }).join('');
  }

  function renderAccuracyTrendChart() {
    const host = document.getElementById('accuracy-trend-chart');
    if (!host) return;

    const keys = getLastDateKeys(30);
    const values = keys.map((k) => {
      const row = getDayLog(k);
      if (row.answered <= 0) return 0;
      return Math.round((row.correct / row.answered) * 100);
    });

    const width = 620;
    const height = 220;
    const pad = 28;
    const stepX = (width - pad * 2) / (values.length - 1 || 1);
    const getY = (v) => pad + ((100 - v) / 100) * (height - pad * 2);
    const points = values.map((v, i) => [pad + (i * stepX), getY(v)]);
    const path = points.map((p, i) => `${i === 0 ? 'M' : 'L'}${p[0].toFixed(1)},${p[1].toFixed(1)}`).join(' ');

    const xVals = values.map((_, i) => i);
    const meanX = xVals.reduce((a, b) => a + b, 0) / xVals.length;
    const meanY = values.reduce((a, b) => a + b, 0) / values.length;
    let num = 0;
    let den = 0;
    xVals.forEach((x, i) => {
      num += (x - meanX) * (values[i] - meanY);
      den += (x - meanX) * (x - meanX);
    });
    const slope = den > 0 ? num / den : 0;
    const intercept = meanY - (slope * meanX);
    const trendPoints = xVals.map((x, i) => {
      const v = Math.max(0, Math.min(100, intercept + (slope * x)));
      return [pad + (i * stepX), getY(v)];
    });
    const trendPath = trendPoints.map((p, i) => `${i === 0 ? 'M' : 'L'}${p[0].toFixed(1)},${p[1].toFixed(1)}`).join(' ');

    host.innerHTML = `
      <svg viewBox="0 0 ${width} ${height}" role="img" aria-label="Evolución de acierto">
        <line x1="${pad}" y1="${height - pad}" x2="${width - pad}" y2="${height - pad}" stroke="rgba(148,163,184,0.35)" stroke-width="1"/>
        <line x1="${pad}" y1="${pad}" x2="${pad}" y2="${height - pad}" stroke="rgba(148,163,184,0.35)" stroke-width="1"/>
        <line x1="${pad}" y1="${getY(70)}" x2="${width - pad}" y2="${getY(70)}" stroke="rgba(16,185,129,0.25)" stroke-width="1" stroke-dasharray="4 4"/>
        <path d="${path}" fill="none" stroke="url(#trendMain)" stroke-width="3" stroke-linecap="round"/>
        <path d="${trendPath}" fill="none" stroke="rgba(148,163,184,0.7)" stroke-width="2" stroke-dasharray="5 5"/>
        ${points.map((p) => `<circle cx="${p[0].toFixed(1)}" cy="${p[1].toFixed(1)}" r="2.2" fill="#60a5fa"/>`).join('')}
        <defs>
          <linearGradient id="trendMain" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stop-color="#3b82f6"/>
            <stop offset="100%" stop-color="#8b5cf6"/>
          </linearGradient>
        </defs>
      </svg>
    `;
  }

  function getWeightedPassPrediction() {
    const d1 = state.stats.byDomain[1].a > 0 ? (state.stats.byDomain[1].c / state.stats.byDomain[1].a) * 100 : 0;
    const d2 = state.stats.byDomain[2].a > 0 ? (state.stats.byDomain[2].c / state.stats.byDomain[2].a) * 100 : 0;
    const d3 = state.stats.byDomain[3].a > 0 ? (state.stats.byDomain[3].c / state.stats.byDomain[3].a) * 100 : 0;
    return Math.round((d1 * 0.5) + (d2 * 0.25) + (d3 * 0.25));
  }

  function renderPrediction() {
    const donut = document.getElementById('pass-prediction-donut');
    const value = document.getElementById('pass-prediction-value');
    const text = document.getElementById('pass-prediction-text');
    if (!donut || !value || !text) return;

    const prediction = getWeightedPassPrediction();
    const angle = Math.round((prediction / 100) * 360);
    donut.style.background = `conic-gradient(#3b82f6 ${angle}deg, rgba(148,163,184,0.2) ${angle}deg)`;
    value.textContent = `${prediction}%`;

    const weak = getSubtopicAttemptStats()
      .filter((x) => x.answered >= 3)
      .sort((a, b) => a.accuracy - b.accuracy)
      .slice(0, 2)
      .map((x) => x.subtopic);

    if (state.stats.answered < 12) {
      text.textContent = 'Probabilidad de aprobar aún poco confiable: responde más preguntas para mejorar la predicción.';
      return;
    }

    if (weak.length > 0) {
      text.innerHTML = `Probabilidad de aprobar: <strong>${prediction}%</strong> — Refuerza: <em>${escapeHtml(weak.join(', '))}</em>.`;
    } else {
      text.innerHTML = `Probabilidad de aprobar: <strong>${prediction}%</strong> — Mantén el ritmo actual y valida con simulador completo.`;
    }
  }

  function formatDuration(totalSec) {
    const sec = Math.max(0, Number(totalSec) || 0);
    const hours = Math.floor(sec / 3600);
    const mins = Math.floor((sec % 3600) / 60);
    if (hours <= 0) return `${mins} min`;
    return `${hours} h ${mins} min`;
  }

  function renderAnalyticsSummary() {
    const host = document.getElementById('analytics-summary-grid');
    if (!host) return;

    const totalTime = Object.keys(state.stats.dailyLog || {}).reduce((sum, day) => sum + (Number((state.stats.dailyLog[day] || {}).timeSpent) || 0), 0);
    const totalAvailable = ALL_QUESTIONS.length;
    const covered = getAnsweredAndCorrectSets().answered.size;
    const coveredPct = totalAvailable > 0 ? Math.round((covered / totalAvailable) * 100) : 0;

    host.innerHTML = `
      <div class="summary-stat">
        <div class="summary-stat-label">Tiempo de estudio</div>
        <div class="summary-stat-value">${escapeHtml(formatDuration(totalTime))}</div>
      </div>
      <div class="summary-stat">
        <div class="summary-stat-label">Racha actual / máxima</div>
        <div class="summary-stat-value">${state.stats.streak || 0} / ${state.stats.maxStreak || 0}</div>
      </div>
      <div class="summary-stat">
        <div class="summary-stat-label">Preguntas respondidas</div>
        <div class="summary-stat-value">${state.stats.answered} / ${totalAvailable}</div>
      </div>
      <div class="summary-stat">
        <div class="summary-stat-label">Banco cubierto</div>
        <div class="summary-stat-value">${coveredPct}%</div>
      </div>
    `;
  }

  function renderWeaknessList() {
    const host = document.getElementById('weakness-list');
    if (!host) return;

    const rows = getSubtopicAttemptStats()
      .filter((x) => x.answered >= 3)
      .sort((a, b) => a.accuracy - b.accuracy)
      .slice(0, 10);

    if (rows.length === 0) {
      host.innerHTML = '<div class="empty-state"><p>Responde más preguntas para detectar debilidades con base estadística.</p></div>';
      return;
    }

    host.innerHTML = rows.map((row) => `
      <div class="weakness-row">
        <div class="weakness-head">
          <strong>${escapeHtml(row.subtopic)}</strong>
          <span>${row.accuracy}% • ${row.answered} intentos</span>
        </div>
        <div class="weakness-bar"><div class="weakness-fill" style="width:${row.accuracy}%"></div></div>
        <div class="weakness-actions">
          <button class="weakness-practice-btn" data-practice-subtopic="${escapeHtml(row.subtopic)}" data-practice-domain="${row.domain}">Practicar</button>
        </div>
      </div>
    `).join('');
  }

  function renderAnalytics() {
    renderActivityHeatmap();
    renderAccuracyTrendChart();
    renderPrediction();
    renderAnalyticsSummary();
    renderWeaknessList();
  }

  // ─── Notes ──────────────────────────────────────────────────────────────────
  function parseInlineMarkdown(text) {
    return escapeHtml(String(text || ''))
      .replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>')
      .replace(/`(.*?)`/g, '<code>$1</code>');
  }

  function renderBasicMarkdown(text) {
    const lines = String(text || '').split('\n');
    let html = '';
    let openList = false;

    lines.forEach((line) => {
      const trimmed = line.trim();
      if (/^- /.test(trimmed)) {
        if (!openList) {
          html += '<ul>';
          openList = true;
        }
        html += `<li>${parseInlineMarkdown(trimmed.replace(/^- /, ''))}</li>`;
      } else {
        if (openList) {
          html += '</ul>';
          openList = false;
        }
        if (trimmed.length === 0) html += '<br>';
        else html += `<p>${parseInlineMarkdown(trimmed)}</p>`;
      }
    });

    if (openList) html += '</ul>';
    return html;
  }

  function fillNoteSubtopicOptions(domain, selectedSubtopic) {
    const select = document.getElementById('note-subtopic');
    if (!select) return;
    const options = getSubtopicsForDomain(domain);
    select.innerHTML = options.map((s) => `<option value="${escapeHtml(s)}">${escapeHtml(s)}</option>`).join('');
    if (selectedSubtopic && options.includes(selectedSubtopic)) select.value = selectedSubtopic;
  }

  function openNoteEditor(note) {
    const editor = document.getElementById('notes-editor');
    if (!editor) return;

    const titleInput = document.getElementById('note-title');
    const domainSelect = document.getElementById('note-domain');
    const contentArea = document.getElementById('note-content');

    if (note) {
      state.noteEditingId = note.id;
      titleInput.value = note.title || '';
      domainSelect.value = String(note.domain || 1);
      fillNoteSubtopicOptions(Number(domainSelect.value), note.subtopic);
      contentArea.value = note.content || '';
    } else {
      state.noteEditingId = null;
      titleInput.value = '';
      domainSelect.value = '1';
      fillNoteSubtopicOptions(1, '');
      contentArea.value = '';
    }

    editor.style.display = 'block';
  }

  function closeNoteEditor() {
    const editor = document.getElementById('notes-editor');
    if (!editor) return;
    editor.style.display = 'none';
    state.noteEditingId = null;
  }

  function saveNote() {
    const title = (document.getElementById('note-title').value || '').trim();
    const domain = Number(document.getElementById('note-domain').value || 1);
    const subtopic = document.getElementById('note-subtopic').value || '';
    const content = (document.getElementById('note-content').value || '').trim();

    if (!title) {
      alert('El título de la nota es obligatorio.');
      return;
    }

    if (!content) {
      alert('El contenido de la nota no puede estar vacío.');
      return;
    }

    if (!Array.isArray(state.stats.notes)) state.stats.notes = [];
    const now = new Date().toISOString();

    if (state.noteEditingId) {
      const idx = state.stats.notes.findIndex((n) => n.id === state.noteEditingId);
      if (idx >= 0) {
        state.stats.notes[idx] = Object.assign({}, state.stats.notes[idx], {
          title,
          domain,
          subtopic,
          content,
          updatedAt: now
        });
      }
    } else {
      state.stats.notes.push({
        id: `note_${Date.now()}`,
        title,
        domain,
        subtopic,
        content,
        createdAt: now,
        updatedAt: now
      });
    }

    saveStats();
    closeNoteEditor();
    renderNotes();
  }

  function renderNotes() {
    const list = document.getElementById('notes-list');
    if (!list) return;

    const notes = [...(state.stats.notes || [])]
      .sort((a, b) => String(b.updatedAt || '').localeCompare(String(a.updatedAt || '')))
      .filter((note) => {
        if (state.notesDomainFilter > 0 && Number(note.domain) !== state.notesDomainFilter) return false;
        if (!state.notesSearch) return true;
        const target = `${note.title} ${note.content} ${note.subtopic}`.toLowerCase();
        return target.includes(state.notesSearch.toLowerCase());
      });

    if (notes.length === 0) {
      list.innerHTML = '<div class="card empty-state"><div class="icon">📝</div><p>No hay notas para los filtros seleccionados.</p></div>';
      return;
    }

    list.innerHTML = notes.map((note) => `
      <article class="note-card">
        <div class="note-head">
          <div>
            <div class="note-title">${escapeHtml(note.title)}</div>
            <div class="note-meta">${escapeHtml(DOMAIN_NAMES[note.domain] || '')} • ${escapeHtml(note.subtopic || 'Sin subtopic')} • Actualizada ${new Date(note.updatedAt).toLocaleDateString('es-ES')}</div>
          </div>
          <div class="note-actions">
            <button class="note-btn" data-note-action="edit" data-note-id="${escapeHtml(note.id)}">Editar</button>
            <button class="note-btn delete" data-note-action="delete" data-note-id="${escapeHtml(note.id)}">Eliminar</button>
          </div>
        </div>
        <div class="note-content">${renderBasicMarkdown(note.content)}</div>
      </article>
    `).join('');
  }

  // ─── Shared Actions ─────────────────────────────────────────────────────────
  function practiceSubtopic(subtopic, domain) {
    setQuizDomainFilter(Number(domain) || 0);
    setQuizDiffFilter(0);
    state.quizSubtopic = subtopic || '';
    syncQuizSubtopicOptions();
    const select = document.getElementById('quiz-subtopic-select');
    if (select) select.value = state.quizSubtopic;
    closeTopicModal();
    setActiveSection('quiz');
    startQuiz();
  }

  document.addEventListener('click', (event) => {
    const btn = event.target.closest('[data-practice-subtopic]');
    if (btn) {
      const subtopic = btn.dataset.practiceSubtopic || '';
      const domain = Number(btn.dataset.practiceDomain || 0);
      practiceSubtopic(subtopic, domain);
    }
  });

  const modalBackdrop = document.getElementById('topic-modal-close');
  if (modalBackdrop) modalBackdrop.addEventListener('click', closeTopicModal);
  const modalX = document.getElementById('topic-modal-x');
  if (modalX) modalX.addEventListener('click', closeTopicModal);

  document.addEventListener('keydown', (event) => {
    if (event.key === 'Escape') closeTopicModal();
  });

  const notesSearchInput = document.getElementById('notes-search');
  if (notesSearchInput) {
    notesSearchInput.addEventListener('input', () => {
      state.notesSearch = notesSearchInput.value.trim();
      renderNotes();
    });
  }

  const notesDomainFilter = document.getElementById('notes-domain-filter');
  if (notesDomainFilter) {
    notesDomainFilter.addEventListener('change', () => {
      state.notesDomainFilter = Number(notesDomainFilter.value || 0);
      renderNotes();
    });
  }

  const notesNewBtn = document.getElementById('notes-new-btn');
  if (notesNewBtn) notesNewBtn.addEventListener('click', () => openNoteEditor(null));

  const notesCancelBtn = document.getElementById('notes-cancel-btn');
  if (notesCancelBtn) notesCancelBtn.addEventListener('click', closeNoteEditor);

  const noteDomain = document.getElementById('note-domain');
  if (noteDomain) {
    noteDomain.addEventListener('change', () => {
      fillNoteSubtopicOptions(Number(noteDomain.value || 1), '');
    });
  }

  const notesSaveBtn = document.getElementById('notes-save-btn');
  if (notesSaveBtn) notesSaveBtn.addEventListener('click', saveNote);

  const notesList = document.getElementById('notes-list');
  if (notesList) {
    notesList.addEventListener('click', (event) => {
      const btn = event.target.closest('[data-note-action]');
      if (!btn) return;

      const action = btn.dataset.noteAction;
      const noteId = btn.dataset.noteId;
      const note = (state.stats.notes || []).find((n) => n.id === noteId);
      if (!note) return;

      if (action === 'edit') {
        openNoteEditor(note);
      } else if (action === 'delete') {
        if (!confirm('¿Eliminar esta nota?')) return;
        state.stats.notes = (state.stats.notes || []).filter((n) => n.id !== noteId);
        saveStats();
        renderNotes();
      }
    });
  }

  // ─── Utilities ──────────────────────────────────────────────────────────────
  function shuffle(arr) {
    const a = [...arr];
    for (let i = a.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [a[i], a[j]] = [a[j], a[i]];
    }
    return a;
  }

  function randomInt(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
  }

  function arraysEqual(a, b) {
    if (!Array.isArray(a) || !Array.isArray(b)) return false;
    if (a.length !== b.length) return false;
    for (let i = 0; i < a.length; i++) {
      if (a[i] !== b[i]) return false;
    }
    return true;
  }

  function escapeHtml(str) {
    return String(str)
      .replace(/&/g, '&amp;')
      .replace(/</g, '&lt;')
      .replace(/>/g, '&gt;')
      .replace(/"/g, '&quot;')
      .replace(/'/g, '&#39;');
  }

  function formatText(text) {
    if (text === null || text === undefined) return '';
    return escapeHtml(String(text))
      .replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>')
      .replace(/`(.*?)`/g, '<code>$1</code>')
      .replace(/\n/g, '<br>');
  }

  // ─── Init ───────────────────────────────────────────────────────────────────
  registerSessionStart();
  setQuizDomainFilter(0);
  setQuizDiffFilter(0);
  syncQuizSubtopicOptions();
  fillNoteSubtopicOptions(1, '');
  updateDashboard();
  initFlashcards();
  renderSummaries();
  renderLabs();
  renderGlossary();
  renderNotes();
  renderKnowledgeMap();
  renderAnalytics();
  updateNavBadges();
  checkBadges();

})();
