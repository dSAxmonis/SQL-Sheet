/**
 * SQL Practice Tracker - Client Application
 * Features:
 * - Motion.dev visual styling & minimal animation
 * - Cool Dedicated Focus Timer with Sound Chime & Radial Progress
 * - JWT Auth & Multi-User SQLite Database Sync (for you & your friend)
 * - Study Buddy Progress Comparison Bar
 * - Spaced Repetition Queue & Instant Filtering
 */

(function () {
  'use strict';

  const STORAGE_KEY = 'sql_practice_state_v2';
  const TOKEN_KEY = 'sql_auth_token_v1';
  const USER_KEY = 'sql_auth_user_v1';

  // Application State
  let state = {
    user: null,         // { id, username, displayName }
    token: null,
    progress: {},       // { [qId]: { status, notes, code, timeSpent, markedDate, solvedAt } }
    openDays: [1],      // Default day 1 open
    activeTab: 'sheet',  // 'sheet' | 'timer' | 'revision'
    filters: {
      search: '',
      phase: 'all',
      platform: 'all',
      difficulty: 'all',
      status: 'all'
    },
    timer: {
      mode: '15m',             // '15m', '25m', '45m', '90m', 'custom', 'stopwatch'
      initialSeconds: 900,     // 15 mins default
      remainingSeconds: 900,
      isRunning: false,
      intervalId: null,
      soundEnabled: true
    },
    authMode: 'login',         // 'login' | 'register'
    friends: []                // Study buddy list
  };

  // Web Audio Synthesizer Chime (Zero external audio files needed!)
  function playTimerChime() {
    if (!state.timer.soundEnabled) return;
    try {
      const ctx = new (window.AudioContext || window.webkitAudioContext)();
      const now = ctx.currentTime;

      // Note 1: E5 (659Hz)
      const osc1 = ctx.createOscillator();
      const gain1 = ctx.createGain();
      osc1.frequency.setValueAtTime(659.25, now);
      gain1.gain.setValueAtTime(0.3, now);
      gain1.gain.exponentialRampToValueAtTime(0.001, now + 1.2);
      osc1.connect(gain1);
      gain1.connect(ctx.destination);
      osc1.start(now);
      osc1.stop(now + 1.2);

      // Note 2: G#5 (830Hz)
      const osc2 = ctx.createOscillator();
      const gain2 = ctx.createGain();
      osc2.frequency.setValueAtTime(830.61, now + 0.25);
      gain2.gain.setValueAtTime(0.3, now + 0.25);
      gain2.gain.exponentialRampToValueAtTime(0.001, now + 1.5);
      osc2.connect(gain2);
      gain2.connect(ctx.destination);
      osc2.start(now + 0.25);
      osc2.stop(now + 1.5);
    } catch (e) {
      console.warn('Audio not supported or blocked:', e);
    }
  }

  // =========================================================================
  // State & LocalStorage / API Sync
  // =========================================================================
  function loadLocalState() {
    try {
      const savedToken = localStorage.getItem(TOKEN_KEY);
      const savedUser = localStorage.getItem(USER_KEY);
      if (savedToken && savedUser) {
        state.token = savedToken;
        state.user = JSON.parse(savedUser);
      }

      const saved = localStorage.getItem(STORAGE_KEY);
      if (saved) {
        const parsed = JSON.parse(saved);
        if (parsed.progress) state.progress = parsed.progress;
        if (Array.isArray(parsed.openDays)) state.openDays = parsed.openDays;
      }
    } catch (e) {
      console.error('Error reading localStorage:', e);
    }
  }

  function saveLocalState() {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify({
        progress: state.progress,
        openDays: state.openDays
      }));
    } catch (e) {
      console.error('Error saving localStorage:', e);
    }
    updateAllMetrics();
  }

  // Sync with Backend API if user is authenticated
  async function fetchUserProgressFromAPI() {
    if (!state.token) return;
    try {
      const res = await fetch('/api/progress', {
        headers: { 'Authorization': `Bearer ${state.token}` }
      });
      if (res.ok) {
        const data = await res.json();
        if (data.progress) {
          state.progress = { ...state.progress, ...data.progress };
          saveLocalState();
        }
      } else if (res.status === 401 || res.status === 403) {
        logout(false);
      }
    } catch (e) {
      console.log('Using local progress (offline mode)');
    }
  }

  async function syncQuestionToAPI(qId) {
    if (!state.token) return;
    const qData = getQuestionData(qId);
    try {
      await fetch(`/api/progress/${qId}`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${state.token}`
        },
        body: JSON.stringify(qData)
      });
      fetchFriendsSummary();
    } catch (e) {
      console.warn('API sync deferred (network offline)');
    }
  }

  async function fetchFriendsSummary() {
    try {
      const res = await fetch('/api/friends/summary');
      if (res.ok) {
        const data = await res.json();
        state.friends = data.friends || [];
        renderStudyBuddyBar();
      }
    } catch (e) {}
  }

  function getQuestionData(qId) {
    return state.progress[qId] || {
      status: 'notstarted',
      notes: '',
      code: '',
      timeSpent: '',
      markedDate: null,
      solvedAt: null
    };
  }

  function getAllQuestions() {
    const list = [];
    SQL_ROADMAP.forEach(day => {
      day.questions.forEach(q => {
        list.push({ ...q, dayNum: day.day, phase: day.phase });
      });
    });
    return list;
  }

  // Theme Management (Light / Dark)
  function initTheme() {
    const saved = localStorage.getItem('sql_tracker_theme');
    const prefersLight = window.matchMedia && window.matchMedia('(prefers-color-scheme: light)').matches;
    const theme = saved || (prefersLight ? 'light' : 'dark');
    applyTheme(theme, false);
  }

  function applyTheme(theme, showToastMsg = false) {
    document.documentElement.setAttribute('data-theme', theme);
    localStorage.setItem('sql_tracker_theme', theme);
    const icon = document.getElementById('theme-toggle-icon');
    const label = document.getElementById('theme-toggle-label');
    if (icon) icon.textContent = theme === 'light' ? '🌙' : '☀️';
    if (label) label.textContent = theme === 'light' ? 'Dark' : 'Light';
    if (showToastMsg) {
      showToast(`Switched to ${theme === 'light' ? 'Classic Moon' : 'Carbon Dark'} theme`, 'info');
    }
  }

  function toggleTheme() {
    const current = document.documentElement.getAttribute('data-theme') || 'dark';
    const next = current === 'light' ? 'dark' : 'light';
    applyTheme(next, true);
  }

  // =========================================================================
  // App Initialization
  // =========================================================================
  async function init() {
    initTheme();
    loadLocalState();
    renderAuthBadge();
    setupEventListeners();
    updateTimerDisplays();
    initVibePlayer();
    renderMain();
    updateAllMetrics();
    removeBottomRightPopups();
    setInterval(removeBottomRightPopups, 1500);

    if (state.token) {
      await fetchUserProgressFromAPI();
      renderMain();
      updateAllMetrics();
      fetchFriendsSummary();
    }
  }

  // =========================================================================
  // Auth & Study Buddy
  // =========================================================================
  function renderAuthBadge() {
    const container = document.getElementById('auth-status-container');
    if (!container) return;

    if (state.user) {
      const initial = (state.user.displayName || state.user.username || 'U')[0].toUpperCase();
      container.innerHTML = `
        <div class="user-auth-badge" title="Logged in as ${escapeHtml(state.user.displayName || state.user.username)}">
          <div class="user-avatar-circle">${initial}</div>
          <span class="user-name-text">${escapeHtml(state.user.displayName || state.user.username)}</span>
          <button class="btn-logout-tiny" onclick="window.sqlTracker.logout()" title="Sign Out">Exit</button>
        </div>
      `;
    } else {
      container.innerHTML = `
        <button class="btn-auth-trigger" onclick="window.sqlTracker.openAuthModal()">
          <span>Sign In</span>
          <span aria-hidden="true">&rarr;</span>
        </button>
      `;
    }
  }

  // Study Buddy Comparison Bar
  async function fetchFriendsSummary() {
    try {
      const res = await fetch(`${API_BASE}/api/friends-summary`);
      if (!res.ok) return;
      const data = await res.json();
      renderStudyBuddyBar(data.users || []);
    } catch (e) {}
  }

  function renderStudyBuddyBar(users) {
    const bar = document.getElementById('study-buddy-bar');
    const list = document.getElementById('study-buddy-list');
    if (!bar || !list) return;

    if (!users || users.length === 0) {
      bar.style.display = 'none';
    }
  }

  function openAuthModal() {
    const modal = document.getElementById('auth-modal');
    if (modal) modal.classList.add('active');
    switchAuthMode('login');
  }

  function closeAuthModal() {
    const modal = document.getElementById('auth-modal');
    if (modal) modal.classList.remove('active');
    clearAuthError();
  }

  function switchAuthMode(mode) {
    state.authMode = mode;
    clearAuthError();
    const titleEl = document.getElementById('auth-modal-title');
    const submitBtn = document.getElementById('auth-submit-btn');
    const displayGroup = document.getElementById('auth-displayname-group');
    const tabLogin = document.getElementById('auth-tab-login');
    const tabRegister = document.getElementById('auth-tab-register');

    if (mode === 'register') {
      if (titleEl) titleEl.textContent = 'Create Practice Account';
      if (submitBtn) submitBtn.innerHTML = '<span>Create Account</span> &rarr;';
      if (displayGroup) displayGroup.style.display = 'block';
      if (tabRegister) tabRegister.classList.add('active');
      if (tabLogin) tabLogin.classList.remove('active');
    } else {
      if (titleEl) titleEl.textContent = 'Sign In to Tracker';
      if (submitBtn) submitBtn.innerHTML = '<span>Sign In</span> &rarr;';
      if (displayGroup) displayGroup.style.display = 'none';
      if (tabLogin) tabLogin.classList.add('active');
      if (tabRegister) tabRegister.classList.remove('active');
    }
  }

  function showAuthError(msg) {
    const errBox = document.getElementById('auth-error-msg');
    if (errBox) {
      errBox.textContent = msg;
      errBox.style.display = 'block';
    }
  }

  function clearAuthError() {
    const errBox = document.getElementById('auth-error-msg');
    if (errBox) errBox.style.display = 'none';
  }

  async function submitAuth() {
    const usernameInput = document.getElementById('auth-username');
    const passwordInput = document.getElementById('auth-password');
    const displayInput = document.getElementById('auth-displayname');

    const username = usernameInput ? usernameInput.value.trim() : '';
    const password = passwordInput ? passwordInput.value : '';
    const displayName = displayInput ? displayInput.value.trim() : '';

    if (!username || !password) {
      showAuthError('Please enter username and password');
      return;
    }

    const endpoint = state.authMode === 'register' ? '/api/auth/register' : '/api/auth/login';
    const body = state.authMode === 'register'
      ? { username, password, displayName }
      : { username, password };

    try {
      const res = await fetch(endpoint, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(body)
      });

      const data = await res.json();
      if (!res.ok) {
        showAuthError(data.error || 'Authentication failed');
        return;
      }

      // Save Auth State
      state.token = data.token;
      state.user = data.user;
      localStorage.setItem(TOKEN_KEY, data.token);
      localStorage.setItem(USER_KEY, JSON.stringify(data.user));

      renderAuthBadge();
      closeAuthModal();
      showToast(`Welcome, ${state.user.displayName || state.user.username}!`, 'success');

      // Fetch user's saved progress from database
      await fetchUserProgressFromAPI();
      renderMain();
      updateAllMetrics();
      fetchFriendsSummary();
    } catch (e) {
      showAuthError('Server connection error. Is the server running?');
    }
  }

  function logout(showMsg = true) {
    state.token = null;
    state.user = null;
    localStorage.removeItem(TOKEN_KEY);
    localStorage.removeItem(USER_KEY);
    renderAuthBadge();
    renderMain();
    updateAllMetrics();
    renderStudyBuddyBar();
    if (showMsg) showToast('Signed out successfully', 'info');
  }

  // =========================================================================
  // Metrics & Counters
  // =========================================================================
  function updateAllMetrics() {
    const allQuestions = getAllQuestions();
    const totalCount = allQuestions.length;

    let solvedCount = 0;
    let inProgressCount = 0;
    let revisionCount = 0;

    let diffStats = {
      Easy: { total: 0, solved: 0 },
      Medium: { total: 0, solved: 0 },
      Hard: { total: 0, solved: 0 }
    };

    allQuestions.forEach(q => {
      const diff = q.difficulty in diffStats ? q.difficulty : 'Medium';
      diffStats[diff].total++;

      const qData = getQuestionData(q.id);
      if (qData.status === 'solved') {
        solvedCount++;
        diffStats[diff].solved++;
      } else if (qData.status === 'inprogress') {
        inProgressCount++;
      } else if (qData.status === 'revision') {
        revisionCount++;
      }
    });

    const remainingCount = totalCount - solvedCount;
    const percent = totalCount > 0 ? Math.round((solvedCount / totalCount) * 100) : 0;

    const circleText = document.getElementById('progress-percent-text');
    const ruleProgressBar = document.getElementById('overall-rule-progress-bar');
    if (circleText) circleText.textContent = `${percent}%`;
    if (ruleProgressBar) ruleProgressBar.style.width = `${percent}%`;

    const elTotal = document.getElementById('stat-total-solved');
    const elDone = document.getElementById('stat-done-val');
    const elRemaining = document.getElementById('stat-remaining');
    const elRevision = document.getElementById('stat-revision');
    const tabRevisionBadge = document.getElementById('tab-revision-count');

    if (elTotal) elTotal.textContent = solvedCount;
    if (elDone) elDone.textContent = solvedCount;
    if (elRemaining) elRemaining.textContent = remainingCount;
    if (elRevision) elRevision.textContent = revisionCount;
    if (tabRevisionBadge) tabRevisionBadge.textContent = revisionCount;

    ['Easy', 'Medium', 'Hard'].forEach(diff => {
      const countEl = document.getElementById(`diff-${diff.toLowerCase()}-count`);
      if (countEl) {
        const d = diffStats[diff];
        countEl.textContent = `${d.solved}/${d.total}`;
      }
    });

    SQL_ROADMAP.forEach(day => {
      updateDayProgressDOM(day.day);
    });
  }

  function updateDayProgressDOM(dayNum) {
    const dayObj = SQL_ROADMAP.find(d => d.day === dayNum);
    if (!dayObj) return;
    const dayTotal = dayObj.questions.length;
    let daySolved = 0;
    dayObj.questions.forEach(q => {
      if (getQuestionData(q.id).status === 'solved') daySolved++;
    });
    const dayPct = dayTotal > 0 ? Math.round((daySolved / dayTotal) * 100) : 0;

    const fill = document.getElementById(`day-progress-fill-${dayNum}`);
    const text = document.getElementById(`day-progress-text-${dayNum}`);
    if (fill) fill.style.width = `${dayPct}%`;
    if (text) text.textContent = `${daySolved}/${dayTotal} (${dayPct}%)`;
  }

  // =========================================================================
  // Main Content Switcher
  // =========================================================================
  function renderMain() {
    const container = document.getElementById('main-content-container');
    const controlsSection = document.getElementById('controls-bar-section');
    if (!container) return;

    if (state.activeTab === 'timer') {
      if (controlsSection) controlsSection.style.display = 'none';
      renderFocusTimerView(container);
    } else if (state.activeTab === 'revision') {
      if (controlsSection) controlsSection.style.display = 'none';
      renderRevisionQueue(container);
    } else if (state.activeTab === 'vibe') {
      if (controlsSection) controlsSection.style.display = 'none';
      renderVibeSongView(container);
    } else {
      if (controlsSection) controlsSection.style.display = 'flex';
      renderRoadmapSheet(container);
    }
    updateAllMetrics();
  }

  // =========================================================================
  // Cool Dedicated Focus Timer View
  // =========================================================================
  function renderFocusTimerView(container) {
    const circumference = 816.8; // 2 * PI * 130
    let progressRatio = 0;
    if (state.timer.mode !== 'stopwatch' && state.timer.initialSeconds > 0) {
      progressRatio = (state.timer.initialSeconds - state.timer.remainingSeconds) / state.timer.initialSeconds;
    }
    const strokeOffset = circumference * (1 - Math.min(1, Math.max(0, progressRatio)));

    let modeDescription = '';
    if (state.timer.mode === '15m') modeDescription = '15-Minute Rule // Solve independently; check editorial only if stuck for 15+ mins';
    else if (state.timer.mode === '25m') modeDescription = 'Pomodoro // High-intensity deep focus interval';
    else if (state.timer.mode === '45m') modeDescription = 'Interview Mock // Standard single-question interview round simulation';
    else if (state.timer.mode === '90m') modeDescription = 'Capstone Challenge // Timed drill: 5 hard questions in 90 minutes';
    else if (state.timer.mode === 'stopwatch') modeDescription = 'Stopwatch // Track exact duration spent on query';

    container.innerHTML = `
      <div class="focus-timer-section">
        
        <!-- Preset Mode Selector -->
        <div class="focus-timer-mode-selector">
          <button class="focus-mode-btn ${state.timer.mode === '15m' ? 'active' : ''}" onclick="window.sqlTracker.setFocusTimerMode('15m')">15m Rule</button>
          <button class="focus-mode-btn ${state.timer.mode === '25m' ? 'active' : ''}" onclick="window.sqlTracker.setFocusTimerMode('25m')">25m Focus</button>
          <button class="focus-mode-btn ${state.timer.mode === '45m' ? 'active' : ''}" onclick="window.sqlTracker.setFocusTimerMode('45m')">45m Mock</button>
          <button class="focus-mode-btn ${state.timer.mode === '90m' ? 'active' : ''}" onclick="window.sqlTracker.setFocusTimerMode('90m')">90m Capstone</button>
          <button class="focus-mode-btn ${state.timer.mode === 'stopwatch' ? 'active' : ''}" onclick="window.sqlTracker.setFocusTimerMode('stopwatch')">Stopwatch</button>
        </div>

        <!-- Radial Display Ring -->
        <div class="timer-radial-wrap">
          <svg class="timer-radial-svg" viewBox="0 0 280 280">
            <circle class="timer-radial-track" cx="140" cy="140" r="130" />
            <circle class="timer-radial-bar" id="focus-radial-bar" cx="140" cy="140" r="130" style="stroke-dashoffset: ${strokeOffset};" />
          </svg>

          <div class="timer-center-content">
            <div class="timer-giant-digits" id="focus-timer-digits">${formatTime(state.timer.remainingSeconds)}</div>
            <div class="timer-current-mode-label" id="focus-timer-mode-label">${state.timer.mode.toUpperCase()}</div>
          </div>
        </div>

        <!-- Controls -->
        <div class="focus-timer-actions">
          <button class="btn-timer-primary" onclick="window.sqlTracker.toggleTimer()">
            <span>${state.timer.isRunning ? 'Pause' : 'Start Focus'}</span>
            <span aria-hidden="true">${state.timer.isRunning ? '⏸' : '▶'}</span>
          </button>
          <button class="btn-timer-secondary" onclick="window.sqlTracker.resetTimer()">
            Reset ↺
          </button>
        </div>

        <!-- Extras & Note -->
        <div class="timer-extras-row">
          <label class="timer-sound-toggle">
            <input type="checkbox" ${state.timer.soundEnabled ? 'checked' : ''} onchange="window.sqlTracker.toggleSound(this.checked)">
            <span>Audio Chime on Finish</span>
          </label>
        </div>

        <div style="font-size: 12px; color: var(--foreground-feint); margin-top: 18px; text-align: center; max-width: 600px;">
          ${modeDescription}
        </div>

      </div>
    `;
  }

  function setFocusTimerMode(mode) {
    resetTimer();
    state.timer.mode = mode;
    if (mode === '15m') state.timer.initialSeconds = 15 * 60;
    else if (mode === '25m') state.timer.initialSeconds = 25 * 60;
    else if (mode === '45m') state.timer.initialSeconds = 45 * 60;
    else if (mode === '90m') state.timer.initialSeconds = 90 * 60;
    else if (mode === 'stopwatch') state.timer.initialSeconds = 0;

    state.timer.remainingSeconds = state.timer.initialSeconds;
    updateTimerDisplays();
    if (state.activeTab === 'timer') renderMain();
  }

  function toggleSound(enabled) {
    state.timer.soundEnabled = enabled;
  }

  function updateTimerDisplays() {
    const formatted = formatTime(state.timer.remainingSeconds);
    const headerDisplay = document.getElementById('header-mini-timer-time');
    const focusDigits = document.getElementById('focus-timer-digits');
    const headerBtn = document.getElementById('header-timer-toggle-btn');
    const radialBar = document.getElementById('focus-radial-bar');

    if (headerDisplay) headerDisplay.textContent = formatted;
    if (focusDigits) focusDigits.textContent = formatted;
    if (headerBtn) headerBtn.textContent = state.timer.isRunning ? '⏸' : '▶';

    if (radialBar && state.timer.mode !== 'stopwatch' && state.timer.initialSeconds > 0) {
      const circumference = 816.8;
      const progressRatio = (state.timer.initialSeconds - state.timer.remainingSeconds) / state.timer.initialSeconds;
      const offset = circumference * (1 - Math.min(1, Math.max(0, progressRatio)));
      radialBar.style.strokeDashoffset = offset;
    }
  }

  function toggleTimer() {
    if (state.timer.isRunning) {
      clearInterval(state.timer.intervalId);
      state.timer.isRunning = false;
    } else {
      state.timer.isRunning = true;
      state.timer.intervalId = setInterval(() => {
        if (state.timer.mode === 'stopwatch') {
          state.timer.remainingSeconds++;
          updateTimerDisplays();
        } else {
          if (state.timer.remainingSeconds > 0) {
            state.timer.remainingSeconds--;
            updateTimerDisplays();
          } else {
            clearInterval(state.timer.intervalId);
            state.timer.isRunning = false;
            updateTimerDisplays();
            playTimerChime();
            showToast('Time completed! Check solution or take a break.', 'warn');
          }
        }
      }, 1000);
    }
    updateTimerDisplays();
    if (state.activeTab === 'timer') renderMain();
  }

  function resetTimer() {
    if (state.timer.intervalId) clearInterval(state.timer.intervalId);
    state.timer.isRunning = false;
    state.timer.remainingSeconds = state.timer.initialSeconds;
    updateTimerDisplays();
    if (state.activeTab === 'timer') renderMain();
  }

  function formatTime(seconds) {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${String(mins).padStart(2, '0')}:${String(secs).padStart(2, '0')}`;
  }

  // =========================================================================
  // Roadmap & Questions Table (Motion.dev Atlas)
  // =========================================================================
  function matchesFilter(q, day) {
    const qData = getQuestionData(q.id);
    const filters = state.filters;

    if (filters.search) {
      const term = filters.search.toLowerCase();
      const matchTitle = q.title.toLowerCase().includes(term);
      const matchTag = (q.tag || '').toLowerCase().includes(term);
      const matchPlatform = q.platform.toLowerCase().includes(term);
      const matchDay = `day ${day.day}`.includes(term);
      if (!matchTitle && !matchTag && !matchPlatform && !matchDay) {
        return false;
      }
    }

    if (filters.phase !== 'all' && day.phase.toLowerCase() !== filters.phase.toLowerCase()) return false;
    if (filters.platform !== 'all' && q.platform.toLowerCase() !== filters.platform.toLowerCase()) return false;
    if (filters.difficulty !== 'all' && q.difficulty.toLowerCase() !== filters.difficulty.toLowerCase()) return false;
    if (filters.status !== 'all' && qData.status !== filters.status) return false;

    return true;
  }

  function renderRoadmapSheet(container) {
    let html = '<div class="days-container">';
    let renderedDaysCount = 0;

    SQL_ROADMAP.forEach(day => {
      const filteredQuestions = day.questions.filter(q => matchesFilter(q, day));

      if (filteredQuestions.length === 0 && (state.filters.search || state.filters.phase !== 'all' || state.filters.platform !== 'all' || state.filters.difficulty !== 'all' || state.filters.status !== 'all')) {
        return;
      }

      renderedDaysCount++;
      const isOpen = state.openDays.includes(day.day) || Boolean(state.filters.search);
      const dayIndexPadded = String(day.day).padStart(2, '0');

      const dayTotal = day.questions.length;
      let daySolved = 0;
      day.questions.forEach(q => {
        if (getQuestionData(q.id).status === 'solved') daySolved++;
      });
      const dayPct = dayTotal > 0 ? Math.round((daySolved / dayTotal) * 100) : 0;

      html += `
        <div class="motion-day-block ${isOpen ? 'open' : ''}" id="day-card-${day.day}">
          <div class="motion-day-header" onclick="window.sqlTracker.toggleDay(${day.day})">
            
            <div class="day-header-left">
              <div class="day-index-mono">DAY ${dayIndexPadded}</div>
              <div class="day-titles-wrap">
                <span class="day-meta-phase">// ${day.phase.toUpperCase()}</span>
                <h2>${escapeHtml(day.title)}</h2>
                <div class="day-goal-text">${escapeHtml(day.goal)}</div>
              </div>
            </div>

            <div class="day-header-right">
              <div class="day-metric-pill">
                <div class="day-metric-bar">
                  <div class="day-metric-bar-fill" id="day-progress-fill-${day.day}" style="width: ${dayPct}%"></div>
                </div>
                <span id="day-progress-text-${day.day}">${daySolved}/${dayTotal} (${dayPct}%)</span>
              </div>
              <span class="chevron-arrow">▼</span>
            </div>

          </div>

          <div class="motion-day-body">
            ${day.note ? `
              <div class="day-tip-banner">
                <strong>CURRICULUM NOTE //</strong>
                <span>${escapeHtml(day.note)}</span>
              </div>
            ` : ''}

            <table class="question-table">
              <tbody>
                ${filteredQuestions.map(q => renderQuestionRow(q, day.day)).join('')}
              </tbody>
            </table>
          </div>
        </div>
      `;
    });

    if (renderedDaysCount === 0) {
      html += `
        <div class="empty-state-card">
          <p style="font-family: var(--font-mono); font-size: 13px; text-transform: uppercase; letter-spacing: 0.08em; margin-bottom: 8px;">
            // NO PROBLEMS MATCH CURRENT FILTERS
          </p>
          <p style="font-size: 13px; color: var(--foreground-feint);">Clear search or toggle active filter chips to see problems.</p>
          <button class="btn-secondary-action" style="margin-top: 16px;" onclick="window.sqlTracker.resetFilters()">Reset All Filters</button>
        </div>
      `;
    }

    html += '</div>';
    container.innerHTML = html;
  }

  function renderQuestionRow(q, dayNum) {
    const qData = getQuestionData(q.id);
    const platformClass = `platform-${q.platform.toLowerCase()}`;
    const diffClass = `diff-${q.difficulty.toLowerCase()}`;
    const hasNotes = Boolean(qData.notes || qData.code);
    const numPadded = String(q.num).padStart(2, '0');

    return `
      <tr class="question-row status-${qData.status}" id="row-${q.id}">
        <td class="question-cell cell-index">
          <span>${numPadded}</span>
        </td>
        
        <td class="question-cell">
          <div class="cell-info">
            <span class="q-title-text">${escapeHtml(q.title)}</span>
            ${q.tag ? `<span class="motion-readout-code">{ ${escapeHtml(q.tag)} }</span>` : ''}
          </div>
        </td>

        <td class="question-cell" style="width: 140px;">
          <span class="motion-platform-pill ${platformClass}">${escapeHtml(q.platform)}</span>
        </td>

        <td class="question-cell" style="width: 90px;">
          <span class="motion-diff-pill ${diffClass}">${escapeHtml(q.difficulty)}</span>
        </td>

        <td class="question-cell" style="width: 185px;">
          <div class="status-toggle-group">
            <button type="button" class="btn-mark btn-done ${qData.status === 'solved' ? 'active' : ''}" 
                    onclick="event.stopPropagation(); window.sqlTracker.toggleDone('${q.id}')" 
                    title="${qData.status === 'solved' ? 'Completed (Click to unmark)' : 'Mark as Done'}">
              <span class="btn-icon">${qData.status === 'solved' ? '✓' : '○'}</span>
              <span>Done</span>
            </button>
            <button type="button" class="btn-mark btn-rev ${qData.status === 'revision' ? 'active' : ''}" 
                    onclick="event.stopPropagation(); window.sqlTracker.toggleRevision('${q.id}')" 
                    title="${qData.status === 'revision' ? 'In Revision Queue (Click to unmark)' : 'Mark for Revision'}">
              <span>🔁</span>
              <span>Revise</span>
            </button>
          </div>
        </td>

        <td class="question-cell" style="width: 160px;">
          <div class="row-actions-wrap">
            <a href="${escapeHtml(q.url)}" target="_blank" rel="noopener noreferrer" class="motion-btn-solve">
              <span>Solve</span>
              <span aria-hidden="true">&rarr;</span>
            </a>
            <button type="button" class="motion-btn-notes ${hasNotes ? 'has-notes' : ''}" onclick="event.stopPropagation(); window.sqlTracker.openNotes('${q.id}')" title="SQL Solution & Notes">
              Notes
            </button>
          </div>
        </td>
      </tr>
    `;
  }

  // =========================================================================
  // Spaced Repetition Queue View
  // =========================================================================
  function renderRevisionQueue(container) {
    const allQuestions = getAllQuestions();
    const revisionList = allQuestions.filter(q => {
      const qData = getQuestionData(q.id);
      return qData.status === 'revision';
    });

    let html = `
      <div class="revision-hero-box">
        <h2>
          <span>🔁</span> Spaced Repetition Queue (${revisionList.length})
        </h2>
        <p>
          Curriculum rule: <strong>"Re-attempt any question you struggled with after 3–4 days before moving to interview mocks."</strong>
          Testing yourself after a short delay reinforces query patterns and builds lasting mastery.
        </p>
      </div>
    `;

    if (revisionList.length === 0) {
      html += `
        <div class="empty-state-card">
          <p style="font-family: var(--font-mono); font-size: 13px; text-transform: uppercase; letter-spacing: 0.1em; color: var(--color-green); margin-bottom: 6px;">
            // REVISION QUEUE EMPTY
          </p>
          <p style="font-size: 13px; color: var(--foreground-muted);">When you encounter a difficult query or need 15+ minutes to solve, click <strong>"Revise"</strong> to track it here.</p>
          <button class="btn-secondary-action" style="margin-top: 16px;" onclick="window.sqlTracker.switchTab('sheet')">Return to Roadmap &rarr;</button>
        </div>
      `;
    } else {
      html += `
        <div class="motion-day-block open">
          <div class="motion-day-body" style="display: block;">
            <table class="question-table">
              <tbody>
                ${revisionList.map(q => {
                  const qData = getQuestionData(q.id);
                  let dueBadge = '';
                  if (qData.markedDate) {
                    const daysAgo = Math.floor((Date.now() - new Date(qData.markedDate).getTime()) / (1000 * 60 * 60 * 24));
                    if (daysAgo >= 3) {
                      dueBadge = `<span class="motion-diff-pill diff-hard" style="margin-left: 8px;">DUE FOR RE-ATTEMPT (${daysAgo}d ago)</span>`;
                    } else {
                      dueBadge = `<span class="motion-diff-pill diff-medium" style="margin-left: 8px;">RE-ATTEMPT IN ${3 - daysAgo}d</span>`;
                    }
                  }
                  return `
                    <tr class="question-row status-revision">
                      <td class="question-cell cell-index">
                        <span style="font-family: var(--font-mono); font-size: 11px; color: var(--accent);">D${q.dayNum}</span>
                      </td>
                      <td class="question-cell">
                        <div class="cell-info">
                          <span class="q-title-text">${escapeHtml(q.title)} ${dueBadge}</span>
                          ${q.tag ? `<span class="motion-readout-code">{ ${escapeHtml(q.tag)} }</span>` : ''}
                        </div>
                      </td>
                      <td class="question-cell"><span class="motion-platform-pill platform-${q.platform.toLowerCase()}">${escapeHtml(q.platform)}</span></td>
                      <td class="question-cell"><span class="motion-diff-pill diff-${q.difficulty.toLowerCase()}">${escapeHtml(q.difficulty)}</span></td>
                      <td class="question-cell" style="width: 175px;">
                        <div class="status-toggle-group">
                          <button class="btn-mark btn-done" onclick="window.sqlTracker.toggleDone('${q.id}')" title="Mark Solved">
                            <span>✓</span>
                            <span>Solved</span>
                          </button>
                          <button class="btn-mark btn-rev active" onclick="window.sqlTracker.toggleRevision('${q.id}')" title="Remove from Revision">
                            <span>✕</span>
                            <span>Remove</span>
                          </button>
                        </div>
                      </td>
                      <td class="question-cell">
                        <div class="row-actions-wrap">
                          <a href="${escapeHtml(q.url)}" target="_blank" rel="noopener noreferrer" class="motion-btn-solve">Solve Again &rarr;</a>
                          <button class="motion-btn-notes ${qData.notes || qData.code ? 'has-notes' : ''}" onclick="window.sqlTracker.openNotes('${q.id}')">Notes</button>
                        </div>
                      </td>
                    </tr>
                  `;
                }).join('')}
              </tbody>
            </table>
          </div>
        </div>
      `;
    }

    container.innerHTML = html;
  }

  // =========================================================================
  // Match Song Vibe with Monis (Music Player Engine)
  // =========================================================================
  const VIBE_PLAYLIST = [
    {
      id: 'stan',
      title: 'Stan (Long Version)',
      artist: 'Eminem ft. Dido',
      file: 'vibe song/Eminem - Stan (Long Version) ft. Dido.mp3',
      duration: '6:44',
      tag: 'Classic Hip-Hop • Focus'
    },
    {
      id: 'after-dark',
      title: 'After Dark',
      artist: 'Mr.Kitty',
      file: 'vibe song/Mr.Kitty - After Dark.mp3',
      duration: '4:17',
      tag: 'Synthwave • Night Coding'
    },
    {
      id: 'kal-ho-naa-ho',
      title: 'Kal Ho Naa Ho',
      artist: 'Sonu Nigam • Shankar Ehsaan Loy',
      file: 'vibe song/Kal Ho Naa Ho - Official Audio Song  Sonu Nigam  Shankar Ehsaan Loy  Javed Akhtar.mp3',
      duration: '5:23',
      tag: 'Soulful • Flow State'
    },
    {
      id: 'sadgi',
      title: 'Sadgi Tou Hamari Zara Dekhiye',
      artist: 'Nusrat Fateh Ali Khan',
      file: 'vibe song/Sadgi Tou Hamari Zara Dekhiye Nusrat Fateh Ali Khan.mp3',
      duration: '15:10',
      tag: 'Sufi Qawwali • Deep Trance'
    },
    {
      id: 'l-theme',
      title: 'L\'s Theme',
      artist: 'Hideki Taniuchi (Death Note)',
      file: 'vibe song/L no Theme.mp3',
      duration: '3:04',
      tag: 'Detective Mode • Intense SQL'
    },
    {
      id: 'kyrie',
      title: 'Kyrie',
      artist: 'Yoshihisa Hirano (Death Note)',
      file: 'vibe song/Kyrie.mp3',
      duration: '2:21',
      tag: 'Epic Choral • Mastermind'
    },
    {
      id: 'mahiya-ve-soniya',
      title: 'Mahiya Ve Soniya',
      artist: 'Lo-Fi Chill Mix',
      file: 'vibe song/Mahiya Ve Soniya.mp3',
      duration: '4:39',
      tag: 'Lo-Fi • Late Night Practice'
    }
  ];

  const vibePlayer = {
    audio: null,
    currentIdx: 0,
    isPlaying: false,
    loopMode: 'all', // 'all' (Loop all songs in queue) or 'one' (Loop this one song)
    volume: 0.8,
    dockDismissed: false
  };

  function initVibePlayer() {
    vibePlayer.audio = document.getElementById('vibe-audio-element');
    if (!vibePlayer.audio) return;

    try {
      const savedLoop = localStorage.getItem('sql_vibe_loop');
      if (savedLoop === 'one' || savedLoop === 'all') vibePlayer.loopMode = savedLoop;
      const savedVol = localStorage.getItem('sql_vibe_vol');
      if (savedVol !== null) vibePlayer.volume = parseFloat(savedVol) || 0.8;
      const savedIdx = localStorage.getItem('sql_vibe_idx');
      if (savedIdx !== null) vibePlayer.currentIdx = parseInt(savedIdx, 10) || 0;
    } catch (e) {}

    vibePlayer.audio.volume = vibePlayer.volume;

    const initialSong = VIBE_PLAYLIST[vibePlayer.currentIdx] || VIBE_PLAYLIST[0];
    if (initialSong) {
      vibePlayer.audio.src = encodeURI(initialSong.file);
    }

    vibePlayer.audio.addEventListener('play', () => {
      vibePlayer.isPlaying = true;
      vibePlayer.dockDismissed = false;
      updateVibeUI();
    });

    vibePlayer.audio.addEventListener('pause', () => {
      vibePlayer.isPlaying = false;
      updateVibeUI();
    });

    vibePlayer.audio.addEventListener('timeupdate', () => {
      updateVibeProgressUI();
    });

    vibePlayer.audio.addEventListener('ended', () => {
      if (vibePlayer.loopMode === 'one') {
        vibePlayer.audio.currentTime = 0;
        vibePlayer.audio.play().catch(() => {});
        showToast(`Looping: ${VIBE_PLAYLIST[vibePlayer.currentIdx].title} 🔂`, 'info');
      } else {
        nextVibeSong(true);
      }
    });

    vibePlayer.audio.addEventListener('error', (e) => {
      console.warn('Vibe audio event error:', e);
      vibePlayer.isPlaying = false;
      updateVibeUI();
    });

    updateVibeUI();
  }

  function playVibeSong(idx) {
    if (idx < 0 || idx >= VIBE_PLAYLIST.length) return;
    vibePlayer.currentIdx = idx;
    try { localStorage.setItem('sql_vibe_idx', idx); } catch (e) {}

    const song = VIBE_PLAYLIST[idx];
    if (!vibePlayer.audio) vibePlayer.audio = document.getElementById('vibe-audio-element');
    if (!vibePlayer.audio) return;

    vibePlayer.audio.src = encodeURI(song.file);
    vibePlayer.audio.play().then(() => {
      vibePlayer.isPlaying = true;
      vibePlayer.dockDismissed = false;
      updateVibeUI();
      showToast(`Now Playing: ${song.title} 🎵`, 'success');
    }).catch(err => {
      console.log('Playback error / user gesture needed:', err);
      updateVibeUI();
    });
  }

  function toggleVibePlay() {
    if (!vibePlayer.audio) vibePlayer.audio = document.getElementById('vibe-audio-element');
    if (!vibePlayer.audio) return;

    if (vibePlayer.isPlaying) {
      vibePlayer.audio.pause();
    } else {
      if (!vibePlayer.audio.src || vibePlayer.audio.src.endsWith('/')) {
        playVibeSong(vibePlayer.currentIdx);
      } else {
        vibePlayer.audio.play().then(() => {
          vibePlayer.isPlaying = true;
          vibePlayer.dockDismissed = false;
          updateVibeUI();
        }).catch(() => {
          playVibeSong(vibePlayer.currentIdx);
        });
      }
    }
  }

  function nextVibeSong(isAuto = false) {
    const next = (vibePlayer.currentIdx + 1) % VIBE_PLAYLIST.length;
    playVibeSong(next);
  }

  function prevVibeSong() {
    if (vibePlayer.audio && vibePlayer.audio.currentTime > 3) {
      vibePlayer.audio.currentTime = 0;
      return;
    }
    const prev = (vibePlayer.currentIdx - 1 + VIBE_PLAYLIST.length) % VIBE_PLAYLIST.length;
    playVibeSong(prev);
  }

  function setVibeLoopMode(mode) {
    vibePlayer.loopMode = mode;
    try { localStorage.setItem('sql_vibe_loop', mode); } catch (e) {}
    updateVibeUI();
    if (mode === 'one') {
      showToast('Loop Mode: Single Song (🔂 Infinite Loop)', 'info');
    } else {
      showToast('Loop Mode: All Songs in Queue (🔁 Playlist Loop)', 'info');
    }
  }

  function toggleVibeLoopMode() {
    const newMode = vibePlayer.loopMode === 'all' ? 'one' : 'all';
    setVibeLoopMode(newMode);
  }

  function seekVibe(e) {
    if (!vibePlayer.audio || !vibePlayer.audio.duration) return;
    const bar = e.currentTarget;
    const rect = bar.getBoundingClientRect();
    const clickX = e.clientX - rect.left;
    const percent = Math.max(0, Math.min(1, clickX / rect.width));
    vibePlayer.audio.currentTime = percent * vibePlayer.audio.duration;
  }

  function setVibeVolume(val) {
    vibePlayer.volume = parseFloat(val);
    if (vibePlayer.audio) {
      vibePlayer.audio.volume = vibePlayer.volume;
      vibePlayer.audio.muted = (vibePlayer.volume === 0);
    }
    try { localStorage.setItem('sql_vibe_vol', vibePlayer.volume); } catch (e) {}
    updateVibeUI();
  }

  function hideFloatingDock() {
    vibePlayer.dockDismissed = true;
    const dock = document.getElementById('vibe-floating-dock');
    if (dock) dock.style.display = 'none';
  }

  function updateVibeUI() {
    const currentSong = VIBE_PLAYLIST[vibePlayer.currentIdx] || VIBE_PLAYLIST[0];

    // Header Mini Box
    const headerTitle = document.getElementById('header-vibe-song-title');
    const headerBtn = document.getElementById('header-vibe-toggle-btn');
    const navWave = document.getElementById('nav-vibe-wave');
    if (headerTitle) {
      headerTitle.textContent = vibePlayer.isPlaying ? currentSong.title : 'Off';
    }
    if (headerBtn) {
      headerBtn.textContent = vibePlayer.isPlaying ? '⏸' : '▶';
    }
    if (navWave) {
      navWave.style.display = vibePlayer.isPlaying ? 'inline-flex' : 'none';
    }

    // Floating Dock
    const dock = document.getElementById('vibe-floating-dock');
    const dockTitle = document.getElementById('dock-song-title');
    const dockPlayBtn = document.getElementById('dock-play-btn');
    const dockLoopIcon = document.getElementById('dock-loop-icon');
    const dockLoopText = document.getElementById('dock-loop-text');
    const dockLoopBtn = document.getElementById('dock-loop-btn');
    const dockVinyl = document.getElementById('dock-vinyl-icon');

    if (dock) {
      if (!vibePlayer.dockDismissed && (vibePlayer.isPlaying || (vibePlayer.audio && vibePlayer.audio.currentTime > 0))) {
        dock.style.display = 'flex';
      }
    }
    if (dockTitle) dockTitle.textContent = `${currentSong.title} — ${currentSong.artist}`;
    if (dockPlayBtn) dockPlayBtn.textContent = vibePlayer.isPlaying ? '⏸' : '▶';
    if (dockLoopIcon) dockLoopIcon.textContent = vibePlayer.loopMode === 'one' ? '🔂' : '🔁';
    if (dockLoopText) dockLoopText.textContent = vibePlayer.loopMode === 'one' ? 'Loop One' : 'Loop All';
    if (dockLoopBtn) {
      dockLoopBtn.classList.toggle('active-one', vibePlayer.loopMode === 'one');
      dockLoopBtn.classList.toggle('active-all', vibePlayer.loopMode === 'all');
    }
    if (dockVinyl) {
      dockVinyl.classList.toggle('spinning', vibePlayer.isPlaying);
    }

    // Update Full Tab View if active
    if (state.activeTab === 'vibe') {
      const mainTitle = document.getElementById('vibe-main-song-title');
      const mainArtist = document.getElementById('vibe-main-song-artist');
      const mainTag = document.getElementById('vibe-main-song-tag');
      const mainPlayBtn = document.getElementById('vibe-main-play-btn');
      const mainVinyl = document.getElementById('vibe-main-vinyl');
      const loopAllBtn = document.getElementById('vibe-loop-btn-all');
      const loopOneBtn = document.getElementById('vibe-loop-btn-one');
      const volModeBadge = document.getElementById('vibe-vol-mode-badge');

      if (mainTitle) mainTitle.textContent = currentSong.title;
      if (mainArtist) mainArtist.textContent = currentSong.artist;
      if (mainTag) mainTag.textContent = currentSong.tag;
      if (mainPlayBtn) mainPlayBtn.textContent = vibePlayer.isPlaying ? '⏸ Pause' : '▶ Play';
      if (mainVinyl) mainVinyl.classList.toggle('spinning', vibePlayer.isPlaying);
      if (volModeBadge) volModeBadge.textContent = vibePlayer.loopMode === 'one' ? '🔂 Single Repeat' : '🔁 All Repeat';

      if (loopAllBtn) loopAllBtn.classList.toggle('active', vibePlayer.loopMode === 'all');
      if (loopOneBtn) loopOneBtn.classList.toggle('active', vibePlayer.loopMode === 'one');

      document.querySelectorAll('.vibe-track-row').forEach(row => {
        const rowIdx = parseInt(row.getAttribute('data-song-idx'), 10);
        const isActive = (rowIdx === vibePlayer.currentIdx);
        row.classList.toggle('active-playing', isActive && vibePlayer.isPlaying);
        row.classList.toggle('active-selected', isActive && !vibePlayer.isPlaying);
        const playIcon = row.querySelector('.track-play-icon');
        if (playIcon) {
          playIcon.textContent = (isActive && vibePlayer.isPlaying) ? '⏸' : '▶';
        }
      });
    }
  }

  function updateVibeProgressUI() {
    if (!vibePlayer.audio) return;
    const cur = vibePlayer.audio.currentTime || 0;
    const dur = vibePlayer.audio.duration || 0;
    const percent = dur > 0 ? (cur / dur) * 100 : 0;

    const timeCurrent = document.getElementById('vibe-time-current');
    const timeTotal = document.getElementById('vibe-time-total');
    const progressFill = document.getElementById('vibe-progress-fill');

    if (timeCurrent) timeCurrent.textContent = formatAudioTime(cur);
    if (timeTotal && dur > 0) timeTotal.textContent = formatAudioTime(dur);
    if (progressFill) progressFill.style.width = `${percent}%`;
  }

  function formatAudioTime(secs) {
    if (isNaN(secs) || secs < 0) return '0:00';
    const m = Math.floor(secs / 60);
    const s = Math.floor(secs % 60);
    return `${m}:${s < 10 ? '0' : ''}${s}`;
  }

  function renderVibeSongView(container) {
    const currentSong = VIBE_PLAYLIST[vibePlayer.currentIdx] || VIBE_PLAYLIST[0];

    const trackRowsHtml = VIBE_PLAYLIST.map((song, idx) => {
      const isCurrent = (idx === vibePlayer.currentIdx);
      const isPlaying = isCurrent && vibePlayer.isPlaying;
      return `
        <tr class="vibe-track-row ${isPlaying ? 'active-playing' : ''} ${isCurrent && !isPlaying ? 'active-selected' : ''}" data-song-idx="${idx}" onclick="window.sqlTracker.playVibeSong(${idx})">
          <td class="track-num-col">
            <span class="track-index">${idx + 1}</span>
            <span class="track-play-icon">${isPlaying ? '⏸' : '▶'}</span>
          </td>
          <td class="track-title-col">
            <div class="track-title-text">${escapeHtml(song.title)}</div>
            <div class="track-artist-sub">${escapeHtml(song.artist)}</div>
          </td>
          <td class="track-tag-col">
            <span class="vibe-genre-badge">${escapeHtml(song.tag)}</span>
          </td>
          <td class="track-duration-col">${song.duration}</td>
        </tr>
      `;
    }).join('');

    container.innerHTML = `
      <div class="vibe-view-container">
        
        <!-- Header Section -->
        <div class="vibe-hero-header">
          <div class="hero-meta-kicker">
            <span>SONG VIBE LOUNGE</span>
            <span class="bullet">&bull;</span>
            <span>7 CURATED TRACKS</span>
            <span class="bullet">&bull;</span>
            <span>DEEP CODING FLOW</span>
          </div>
          <h2 class="vibe-main-title">
            <em>Match Song Vibe</em> with Monis 🎧
          </h2>
          <p class="vibe-main-desc">
            Handpicked playlist to get locked in while grinding your 20-Day SQL practice sheet.
            Choose whether to loop all songs in sequence or keep your favorite track on repeat!
          </p>
        </div>

        <!-- Loop Mode Segmented Bar (Explicit requirement) -->
        <div class="vibe-loop-selector-card">
          <div class="loop-selector-info">
            <span class="loop-badge-icon">${vibePlayer.loopMode === 'one' ? '🔂' : '🔁'}</span>
            <div>
              <div class="loop-selector-title">Playback Loop Mode</div>
              <div class="loop-selector-sub">Choose how your playlist repeats while you study</div>
            </div>
          </div>
          <div class="loop-segmented-pill">
            <button class="loop-segment-btn ${vibePlayer.loopMode === 'all' ? 'active' : ''}" id="vibe-loop-btn-all" onclick="window.sqlTracker.setVibeLoopMode('all')">
              <span class="segment-icon">🔁</span>
              <span>Loop All Songs in Queue</span>
            </button>
            <button class="loop-segment-btn ${vibePlayer.loopMode === 'one' ? 'active' : ''}" id="vibe-loop-btn-one" onclick="window.sqlTracker.setVibeLoopMode('one')">
              <span class="segment-icon">🔂</span>
              <span>Loop One Song Infinitely</span>
            </button>
          </div>
        </div>

        <!-- Master Deck & Player -->
        <div class="vibe-master-deck">
          
          <!-- Left: Animated Vinyl Turntable Display -->
          <div class="vibe-turntable-card">
            <div class="vinyl-record-wrap">
              <div class="vinyl-disc ${vibePlayer.isPlaying ? 'spinning' : ''}" id="vibe-main-vinyl">
                <div class="vinyl-groove-ring ring-1"></div>
                <div class="vinyl-groove-ring ring-2"></div>
                <div class="vinyl-center-sticker">
                  <span class="center-symbol">⚡</span>
                  <span class="center-text">SQL VIBE</span>
                </div>
              </div>
            </div>

            <div class="deck-song-info">
              <span class="deck-vibe-tag" id="vibe-main-song-tag">${escapeHtml(currentSong.tag)}</span>
              <h3 class="deck-song-title" id="vibe-main-song-title">${escapeHtml(currentSong.title)}</h3>
              <p class="deck-song-artist" id="vibe-main-song-artist">${escapeHtml(currentSong.artist)}</p>
            </div>

            <!-- Scrubber -->
            <div class="vibe-scrubber-row">
              <span class="time-readout" id="vibe-time-current">0:00</span>
              <div class="vibe-progress-bar" onclick="window.sqlTracker.seekVibe(event)" title="Click to seek">
                <div class="vibe-progress-fill" id="vibe-progress-fill" style="width: 0%;"></div>
              </div>
              <span class="time-readout" id="vibe-time-total">${currentSong.duration}</span>
            </div>

            <!-- Controls -->
            <div class="deck-controls-row">
              <button class="deck-btn deck-btn-prev" onclick="window.sqlTracker.prevVibeSong()" title="Previous Song (⏮)">⏮</button>
              <button class="deck-btn deck-btn-main-play" id="vibe-main-play-btn" onclick="window.sqlTracker.toggleVibePlay()" title="Play / Pause">
                ${vibePlayer.isPlaying ? '⏸ Pause' : '▶ Play'}
              </button>
              <button class="deck-btn deck-btn-next" onclick="window.sqlTracker.nextVibeSong()" title="Next Song (⏭)">⏭</button>
            </div>

            <!-- Volume Slider -->
            <div class="deck-volume-row">
              <span class="vol-icon">🔊</span>
              <input type="range" class="vibe-vol-slider" min="0" max="1" step="0.05" value="${vibePlayer.volume}" oninput="window.sqlTracker.setVibeVolume(this.value)" title="Volume Slider">
              <span class="vol-mode-badge" id="vibe-vol-mode-badge">${vibePlayer.loopMode === 'one' ? '🔂 Single Repeat' : '🔁 All Repeat'}</span>
            </div>

          </div>

          <!-- Right: Playlist Tracks Table -->
          <div class="vibe-playlist-card">
            <div class="playlist-card-header">
              <div>
                <h4 class="playlist-header-title">Match Song Vibe Tracklist</h4>
                <p class="playlist-header-sub">Click any track to switch song immediately</p>
              </div>
              <span class="playlist-badge-count">7 Tracks</span>
            </div>

            <div class="playlist-table-wrap">
              <table class="vibe-tracks-table">
                <thead>
                  <tr>
                    <th style="width: 44px;">#</th>
                    <th>Track & Artist</th>
                    <th>Vibe Type</th>
                    <th style="width: 60px;">Time</th>
                  </tr>
                </thead>
                <tbody>
                  ${trackRowsHtml}
                </tbody>
              </table>
            </div>

            <div class="playlist-footer-note">
              <span>💡 <strong>Background Listening:</strong> Music keeps playing seamlessly when you switch back to the <a href="#" onclick="window.sqlTracker.switchTab('sheet'); return false;">Roadmap</a> or <a href="#" onclick="window.sqlTracker.switchTab('timer'); return false;">Focus Timer</a>!</span>
            </div>

          </div>

        </div>

      </div>
    `;

    updateVibeProgressUI();
  }

  // =========================================================================
  // Question Status & Notes Actions
  // =========================================================================
  function updateRowDOM(qId, status) {
    const row = document.getElementById(`row-${qId}`);
    if (!row) return false;

    row.className = `question-row status-${status}`;
    const btnDone = row.querySelector('.btn-done');
    const btnRev = row.querySelector('.btn-rev');

    if (btnDone) {
      const isDone = status === 'solved';
      btnDone.classList.toggle('active', isDone);
      const icon = btnDone.querySelector('.btn-icon');
      if (icon) icon.textContent = isDone ? '✓' : '○';
      btnDone.title = isDone ? 'Completed (Click to unmark)' : 'Mark as Done';
    }

    if (btnRev) {
      const isRev = status === 'revision';
      btnRev.classList.toggle('active', isRev);
      btnRev.title = isRev ? 'In Revision Queue (Click to unmark)' : 'Mark for Revision';
    }

    return true;
  }

  function updateStatus(qId, newStatus) {
    if (!state.progress[qId]) {
      state.progress[qId] = getQuestionData(qId);
    }
    state.progress[qId].status = newStatus;

    if (newStatus === 'solved') {
      state.progress[qId].solvedAt = new Date().toISOString();
      showToast('Marked as Done! 🎉', 'success');
    } else if (newStatus === 'revision') {
      state.progress[qId].markedDate = new Date().toISOString();
      showToast('Added to Revision Queue 🔁', 'warn');
    } else if (newStatus === 'notstarted') {
      showToast('Status reset to unsolved', 'info');
    }

    saveLocalState();
    syncQuestionToAPI(qId);

    const rowUpdated = updateRowDOM(qId, newStatus);
    const allQ = getAllQuestions();
    const targetQ = allQ.find(q => q.id === qId);
    if (targetQ) {
      updateDayProgressDOM(targetQ.dayNum);
    }
    updateAllMetrics();

    // If on revision tab or a status filter is filtering this row out, re-render
    if (state.activeTab === 'revision' || (state.filters.status && state.filters.status !== 'all') || !rowUpdated) {
      renderMain();
    }
  }

  function toggleDone(qId) {
    const qData = getQuestionData(qId);
    const newStatus = qData.status === 'solved' ? 'notstarted' : 'solved';
    updateStatus(qId, newStatus);
  }

  function toggleRevision(qId) {
    const qData = getQuestionData(qId);
    const newStatus = qData.status === 'revision' ? 'notstarted' : 'revision';
    updateStatus(qId, newStatus);
  }

  let currentEditingQId = null;

  function openNotes(qId) {
    currentEditingQId = qId;
    const allQuestions = getAllQuestions();
    const question = allQuestions.find(q => q.id === qId);
    if (!question) return;

    const qData = getQuestionData(qId);
    const modal = document.getElementById('notes-modal');
    const titleEl = document.getElementById('modal-q-title');
    const metaEl = document.getElementById('modal-q-meta');
    const notesEl = document.getElementById('modal-notes-input');
    const codeEl = document.getElementById('modal-code-input');
    const timeEl = document.getElementById('modal-time-input');

    if (titleEl) titleEl.textContent = question.title;
    if (metaEl) {
      metaEl.textContent = `Day ${question.dayNum} // ${question.platform} // ${question.difficulty} // ${question.tag || ''}`;
    }
    if (notesEl) notesEl.value = qData.notes || '';
    if (codeEl) codeEl.value = qData.code || '';
    if (timeEl) timeEl.value = qData.timeSpent || '';

    if (modal) modal.classList.add('active');
  }

  function closeNotes() {
    const modal = document.getElementById('notes-modal');
    if (modal) modal.classList.remove('active');
    currentEditingQId = null;
  }

  function saveCurrentNotes() {
    if (!currentEditingQId) return;

    const notesEl = document.getElementById('modal-notes-input');
    const codeEl = document.getElementById('modal-code-input');
    const timeEl = document.getElementById('modal-time-input');

    if (!state.progress[currentEditingQId]) {
      state.progress[currentEditingQId] = getQuestionData(currentEditingQId);
    }

    state.progress[currentEditingQId].notes = notesEl ? notesEl.value : '';
    state.progress[currentEditingQId].code = codeEl ? codeEl.value : '';
    state.progress[currentEditingQId].timeSpent = timeEl ? timeEl.value : '';

    saveLocalState();
    syncQuestionToAPI(currentEditingQId);
    closeNotes();
    renderMain();
    showToast('Solution & notes saved 💾', 'success');
  }

  // =========================================================================
  // Accordions & Controls
  // =========================================================================
  function toggleDay(dayNum) {
    const idx = state.openDays.indexOf(dayNum);
    if (idx > -1) {
      state.openDays.splice(idx, 1);
    } else {
      state.openDays.push(dayNum);
    }
    saveLocalState();
    renderMain();
  }

  function expandAllDays() {
    state.openDays = SQL_ROADMAP.map(d => d.day);
    saveLocalState();
    renderMain();
  }

  function collapseAllDays() {
    state.openDays = [];
    saveLocalState();
    renderMain();
  }

  function switchTab(tabName) {
    state.activeTab = tabName;
    document.querySelectorAll('.tab-btn').forEach(btn => {
      btn.classList.toggle('active', btn.getAttribute('data-tab') === tabName);
    });
    renderMain();
  }

  function setStatusFilter(val) {
    state.filters.status = val;
    document.querySelectorAll('.filter-status-btn').forEach(btn => {
      btn.classList.toggle('active', btn.getAttribute('data-val') === val);
    });
    renderMain();
  }

  function setFilter(type, val) {
    state.filters[type] = val;
    renderMain();
  }

  function resetFilters() {
    state.filters = {
      search: '',
      phase: 'all',
      platform: 'all',
      difficulty: 'all',
      status: 'all'
    };
    const searchInput = document.getElementById('global-search-input');
    if (searchInput) searchInput.value = '';
    const phaseSelect = document.getElementById('phase-filter-select');
    if (phaseSelect) phaseSelect.value = 'all';
    const platSelect = document.getElementById('platform-filter-select');
    if (platSelect) platSelect.value = 'all';
    const diffSelect = document.getElementById('diff-filter-select');
    if (diffSelect) diffSelect.value = 'all';
    document.querySelectorAll('.filter-status-btn').forEach(btn => {
      btn.classList.toggle('active', btn.getAttribute('data-val') === 'all');
    });
    renderMain();
    showToast('Filters cleared', 'info');
  }

  // =========================================================================
  // Event Listeners
  // =========================================================================
  function setupEventListeners() {
    const searchInput = document.getElementById('global-search-input');
    if (searchInput) {
      searchInput.addEventListener('input', (e) => {
        state.filters.search = e.target.value.trim();
        renderMain();
      });
    }

    window.addEventListener('keydown', (e) => {
      if ((e.metaKey || e.ctrlKey) && e.key === 'k') {
        e.preventDefault();
        const input = document.getElementById('global-search-input');
        if (input) {
          input.focus();
          input.select();
        }
      }
    });

    document.querySelectorAll('.tab-btn').forEach(btn => {
      btn.addEventListener('click', () => {
        const tab = btn.getAttribute('data-tab');
        switchTab(tab);
      });
    });

    document.querySelectorAll('.filter-chip').forEach(chip => {
      chip.addEventListener('click', () => {
        const type = chip.getAttribute('data-filter-type');
        const val = chip.getAttribute('data-filter-val');

        if (state.filters[type] === val) {
          state.filters[type] = 'all';
          chip.classList.remove('active');
        } else {
          state.filters[type] = val;
          document.querySelectorAll(`.filter-chip[data-filter-type="${type}"]`).forEach(c => c.classList.remove('active'));
          chip.classList.add('active');
        }
        renderMain();
      });
    });

    // Close modals when clicking outside
    const notesModal = document.getElementById('notes-modal');
    if (notesModal) {
      notesModal.addEventListener('click', (e) => {
        if (e.target === notesModal) closeNotes();
      });
    }

    const authModal = document.getElementById('auth-modal');
    if (authModal) {
      authModal.addEventListener('click', (e) => {
        if (e.target === authModal) closeAuthModal();
      });
    }
  }

  // Bottom-Right Popups disabled per user request
  function showToast(message, type = 'info') {
    // Disabled (no popups on right bottom corner)
  }

  function removeBottomRightPopups() {
    const selectors = [
      '.toast-container',
      '.toast-item',
      '[data-netlify-badge]',
      '.netlify-badge',
      '#netlify-badge',
      '.netlify-drawer',
      'a[href*="netlify.com"]'
    ];
    selectors.forEach(sel => {
      document.querySelectorAll(sel).forEach(el => el.remove());
    });
  }

  function escapeHtml(str) {
    if (!str) return '';
    return String(str)
      .replace(/&/g, '&amp;')
      .replace(/</g, '&lt;')
      .replace(/>/g, '&gt;')
      .replace(/"/g, '&quot;')
      .replace(/'/g, '&#039;');
  }

  // Funny SQL Jokes & Interactive ASCII Cat Expressions
  const CAT_FACES = [
    "  /\\_/\\  \n ( • . • ) \n  /  > ☕",
    "  /\\_/\\  \n ( ^ . ^ ) \n  /  > ✨",
    "  /\\_/\\  \n ( ˶• ֊ •˶)\n  /  > 🍕",
    "  /\\_/\\  \n ( ✧_✧ ) \n  /  > 🚀",
    "  /\\_/\\  \n ( ᵔ ᵕ ᵔ ) \n  /  > 💡",
    "  /\\_/\\  \n ( > ᴗ < ) \n  /  > 🍪",
    "  /\\_/\\  \n ( •_• ) \n  /  > 🛡️",
    "  /\\_/\\  \n ( ⚆ _ ⚆ )\n  /  > 💥"
  ];

  const SQL_JOKES = [
    'A SQL query walks into a bar, walks up to two tables and asks: "Can I join you?" 🍺',
    'SELECT * FROM developers WHERE coffee_cups > 3 AND hours_slept < 4; -- 1,000,000 rows returned ☕',
    'Why did the developer break up with SQL? Too many one-to-many relationships and zero commits. 💔',
    'Optimist: Glass half full. Pessimist: Glass half empty. SQL Dev: "The glass is NOT NULL." 🥛',
    'There are 10 types of people: those who understand binary, and those who forgot the WHERE clause and wiped production. 💥',
    'SELECT sanity FROM brain WHERE interview_date = "tomorrow"; -- ERROR: Out of memory 🧠',
    'Don\'t worry, your O(N!) query runs in O(1) if you just kill the database server. ⚡',
    'Never DROP TABLE on a Friday. Monday is for panic, Friday is for pizza. 🍕',
    'Why do programmers hate nature? It has too many bugs and no stack trace. 🐛',
    'SELECT * FROM life WHERE coffee > 0 AND bugs = 0; -- Query timed out ⏳',
    'May all your JOINs be INNER and your queries index-scanned! 🚀'
  ];

  let currentJokeIdx = 0;
  let currentFaceIdx = 0;

  function pokeCatJoke() {
    const jokeEl = document.getElementById('footer-joke-text');
    const catEl = document.getElementById('cat-ascii-display');

    currentJokeIdx = (currentJokeIdx + 1) % SQL_JOKES.length;
    currentFaceIdx = (currentFaceIdx + 1) % CAT_FACES.length;

    if (catEl) {
      catEl.textContent = CAT_FACES[currentFaceIdx];
      catEl.style.transform = 'scale(1.12) translateY(-2px)';
      catEl.style.transition = 'transform 0.15s ease';
      setTimeout(() => {
        catEl.style.transform = 'scale(1) translateY(0)';
      }, 160);
    }

    if (jokeEl) {
      jokeEl.style.opacity = '0';
      jokeEl.style.transform = 'translateY(4px)';
      jokeEl.style.transition = 'opacity 0.15s ease, transform 0.15s ease';
      setTimeout(() => {
        jokeEl.textContent = SQL_JOKES[currentJokeIdx];
        jokeEl.style.opacity = '1';
        jokeEl.style.transform = 'translateY(0)';
      }, 140);
    }
  }

  // Global Tracker API
  window.sqlTracker = {
    toggleTheme,
    toggleDay,
    expandAllDays,
    collapseAllDays,
    updateStatus,
    toggleDone,
    toggleRevision,
    setStatusFilter,
    setFilter,
    nextSqlJoke: pokeCatJoke,
    pokeCatJoke,
    openNotes,
    closeNotes,
    saveCurrentNotes,
    switchTab,
    resetFilters,
    toggleTimer,
    resetTimer,
    setFocusTimerMode,
    toggleSound,
    openAuthModal,
    closeAuthModal,
    switchAuthMode,
    submitAuth,
    logout,
    // Match Song Vibe with Monis APIs
    playVibeSong,
    toggleVibePlay,
    nextVibeSong,
    prevVibeSong,
    setVibeLoopMode,
    toggleVibeLoopMode,
    seekVibe,
    setVibeVolume,
    hideFloatingDock
  };

  // Run theme immediately
  initTheme();

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }
})();
