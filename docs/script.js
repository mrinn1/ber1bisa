// ===========================
// CONFIGURATION
// ===========================
const CONFIG = {
  REFRESH_INTERVAL: 30000, // 30 seconds
  DATA_URL_WAR: './data/war-data.json',
  DATA_URL_ACTIVITY: './data/activity.json',
  TIMEZONE: 'en-US',
  TIME_FORMAT: { hour: '2-digit', minute: '2-digit', second: '2-digit', hour12: true }
};

// ===========================
// STATE MANAGEMENT
// ===========================
let warData = null;
let activityData = null;
let refreshTimer = null;
let lastFetch = null;

// ===========================
// DOM ELEMENTS
// ===========================
const elements = {
  // War Stats
  clanName: document.getElementById('clanName'),
  clanTag: document.getElementById('clanTag'),
  clanStars: document.getElementById('clanStars'),
  clanDestruction: document.getElementById('clanDestruction'),
  clanLevel: document.getElementById('clanLevel'),
  clanMembers: document.getElementById('clanMembers'),
  clanProgressBar: document.getElementById('clanProgressBar'),

  enemyName: document.getElementById('enemyName'),
  enemyTag: document.getElementById('enemyTag'),
  enemyStars: document.getElementById('enemyStars'),
  enemyDestruction: document.getElementById('enemyDestruction'),
  enemyLevel: document.getElementById('enemyLevel'),
  enemyMembers: document.getElementById('enemyMembers'),
  enemyProgressBar: document.getElementById('enemyProgressBar'),

  // Attack Stats
  totalAttacks: document.getElementById('totalAttacks'),
  attackPercentage: document.getElementById('attackPercentage'),
  remainingAttacks: document.getElementById('remainingAttacks'),
  remainingDesc: document.getElementById('remainingDesc'),
  warStatus: document.getElementById('warStatus'),
  warTime: document.getElementById('warTime'),

  // Members
  membersGrid: document.getElementById('membersGrid'),
  memberCount: document.getElementById('memberCount'),
  emptyMembers: document.getElementById('emptyMembers'),

  // Activity
  activityFeed: document.getElementById('activityFeed'),
  activityCount: document.getElementById('activityCount'),

  // Header
  lastUpdated: document.getElementById('lastUpdated'),
  footerTime: document.getElementById('footerTime'),
  liveIndicator: document.getElementById('liveIndicator'),
  loadingOverlay: document.getElementById('loadingOverlay'),

  // Buttons
  refreshBtn: document.getElementById('refreshBtn'),
  darkModeToggle: document.getElementById('darkModeToggle'),

  // Toast
  toast: document.getElementById('toast')
};

// ===========================
// UTILITY FUNCTIONS
// ===========================

/**
 * Format timestamp to readable time
 */
function formatTime(isoString) {
  if (!isoString) return '--:-- --';
  try {
    const date = new Date(isoString);
    return new Intl.DateTimeFormat(CONFIG.TIMEZONE, CONFIG.TIME_FORMAT).format(date);
  } catch {
    return '--:-- --';
  }
}

/**
 * Format timestamp to relative time (e.g., "2 minutes ago")
 */
function formatRelativeTime(isoString) {
  if (!isoString) return 'unknown';
  
  try {
    const date = new Date(isoString);
    const now = new Date();
    const seconds = Math.floor((now - date) / 1000);
    
    if (seconds < 60) return `${seconds}s ago`;
    if (seconds < 3600) return `${Math.floor(seconds / 60)}m ago`;
    if (seconds < 86400) return `${Math.floor(seconds / 3600)}h ago`;
    return `${Math.floor(seconds / 86400)}d ago`;
  } catch {
    return 'unknown';
  }
}

/**
 * Show toast notification
 */
function showToast(message, type = 'info') {
  const toast = elements.toast;
  toast.textContent = message;
  toast.className = `toast show ${type}`;
  
  setTimeout(() => {
    toast.classList.remove('show');
  }, 3000);
}

/**
 * Hide loading overlay
 */
function hideLoadingOverlay() {
  elements.loadingOverlay.classList.add('hidden');
}

/**
 * Show loading overlay
 */
function showLoadingOverlay() {
  elements.loadingOverlay.classList.remove('hidden');
}

/**
 * Parse war data and update UI
 */
function updateWarStats(data) {
  if (!data) return;

  warData = data;

  // Clan Stats
  elements.clanName.textContent = data.clan?.name || 'Unknown';
  elements.clanTag.textContent = data.clan?.tag || '--';
  elements.clanStars.textContent = data.clan?.stars || 0;
  elements.clanDestruction.textContent = `${data.clan?.destruction || 0}%`;
  elements.clanLevel.textContent = data.clan?.level || 0;
  elements.clanMembers.textContent = data.clan?.memberCount || 0;

  // Enemy Stats
  const enemyName = data.opponent?.name || 'Unknown';
  const enemyTag = data.opponent?.tag || 'N/A';
  
  // Update enemy name - use Indonesian for preparation phase
  if (data.state === 'notInWar' || enemyTag === 'N/A') {
    elements.enemyName.textContent = 'Akan muncul saat perang dimulai';
    elements.enemyTag.parentElement.style.display = 'none'; // Hide tag for preparation
  } else {
    elements.enemyName.textContent = enemyName;
    elements.enemyTag.textContent = enemyTag;
    elements.enemyTag.parentElement.style.display = 'block'; // Show tag during war
  }
  
  elements.enemyStars.textContent = data.opponent?.stars || 0;
  elements.enemyDestruction.textContent = `${data.opponent?.destruction || 0}%`;
  elements.enemyLevel.textContent = data.opponent?.level || 0;
  elements.enemyMembers.textContent = data.teamSize || 0;

  // Progress Bars
  const clanProgress = data.clan?.destruction || 0;
  const enemyProgress = data.opponent?.destruction || 0;
  elements.clanProgressBar.style.width = `${clanProgress}%`;
  elements.enemyProgressBar.style.width = `${enemyProgress}%`;

  // Attack Stats - Real data from API
  const totalAttacks = data.totalAttacks || 0;
  const maxAttacks = data.remainingAttacks?.max || (data.teamSize * 2) || 0;
  const percentage = maxAttacks > 0 ? Math.round((totalAttacks / maxAttacks) * 100) : 0;
  
  elements.totalAttacks.textContent = totalAttacks;
  elements.attackPercentage.textContent = `${percentage}% Complete`;
  elements.remainingAttacks.textContent = data.remainingAttacks?.remaining || 0;
  elements.remainingDesc.textContent = `of ${maxAttacks} attacks left`;

  // War Status
  const statusText = data.state === 'inWar' ? 'In Battle' : 
                     data.state === 'preparation' ? 'Preparation' :
                     data.state === 'notInWar' ? 'Preparation' :
                     data.state === 'warEnded' ? 'Ended' : 'Unknown';
  elements.warStatus.textContent = statusText;
  elements.warTime.textContent = data.state === 'inWar' ? formatTime(data.startTime) : 'Pending';

  // Update timestamp
  const now = new Date().toLocaleTimeString(CONFIG.TIMEZONE, CONFIG.TIME_FORMAT);
  elements.lastUpdated.textContent = now;
  elements.footerTime.textContent = now;
}

/**
 * Update members not attacked list
 */
function updateMembersNotAttacked(data) {
  // Get members not attacked or all clan members during preparation
  let members = data?.membersNotAttacked || [];
  
  // During preparation phase, show all clan members since no attacks yet
  if (data?.state === 'notInWar' && members.length === 0 && data?.clan?.members) {
    members = data.clan.members.map(m => ({
      name: m.name,
      tag: m.tag,
      townHallLevel: m.townHallLevel || m.expLevel || '--',
      mapPosition: m.mapPosition || '--'
    })).slice(0, 10); // Show first 10 members
  }
  
  const container = elements.membersGrid;
  const emptyState = elements.emptyMembers;

  // Clear container
  container.innerHTML = '';

  if (members.length === 0) {
    emptyState.style.display = 'block';
    elements.memberCount.textContent = '0';
    return;
  }

  emptyState.style.display = 'none';
  elements.memberCount.textContent = members.length;

  // Create member cards
  members.forEach(member => {
    const card = document.createElement('div');
    card.className = 'member-card';
    card.innerHTML = `
      <div class="member-name">
        <span>${member.name || 'Unknown'}</span>
        <span class="member-level">TH${member.townHallLevel || '--'}</span>
      </div>
      <div class="member-details">
        <p><strong>Tag:</strong> ${member.tag || '--'}</p>
        <p><strong>Position:</strong> ${member.mapPosition || '--'}</p>
      </div>
    `;
    container.appendChild(card);
  });
}

/**
 * Update activity feed
 */
function updateActivityFeed(data) {
  const activities = data?.activities || [];
  const container = elements.activityFeed;

  // Clear container
  container.innerHTML = '';

  if (activities.length === 0) {
    // Check if clan is in preparation phase
    const warState = warData?.state;
    let emptyMessage = 'Waiting for war activity...';
    
    if (warState === 'notInWar') {
      emptyMessage = 'Belum ada aktivitas penyerangan (Masih dalam hari persiapan)';
    } else if (warState === 'inWar') {
      emptyMessage = 'Belum ada penyerangan. Anggota clan sedang mencari lawan...';
    }
    
    container.innerHTML = `<div class="empty-feed"><p>${emptyMessage}</p></div>`;
    elements.activityCount.textContent = '0';
    return;
  }

  elements.activityCount.textContent = Math.min(activities.length, 99);

  // Display activities (max 20)
  activities.slice(0, 20).forEach(activity => {
    const item = document.createElement('div');
    item.className = `activity-item ${activity.status}`;

    let statusIcon = '⚔️';
    let statusText = 'Attacked';

    if (activity.type === 'update') {
      statusIcon = '🔄';
      statusText = `Updated: ${activity.oldStars} → ${activity.stars} stars`;
    }

    const destructionText = activity.destruction !== undefined ? 
      `${activity.destruction}% destruction` : 'No data';

    item.innerHTML = `
      <div class="activity-header">
        <span class="activity-attacker">${statusIcon} ${activity.attacker}</span>
        <span class="activity-time">${formatRelativeTime(activity.timestamp)}</span>
      </div>
      <div class="activity-detail">
        <strong>Target:</strong> ${activity.defender}
      </div>
      <div class="activity-stats">
        <div class="activity-stat">
          <span>⭐</span>
          <strong>${activity.stars} stars</strong>
        </div>
        <div class="activity-stat">
          <span>💥</span>
          <strong>${destructionText}</strong>
        </div>
        ${activity.duration ? `<div class="activity-stat"><span>⏱️</span><strong>${activity.duration}s</strong></div>` : ''}
      </div>
    `;

    container.appendChild(item);
  });
}

/**
 * Fetch war data from API
 */
async function fetchWarData() {
  try {
    const response = await fetch(CONFIG.DATA_URL_WAR);
    if (!response.ok) throw new Error(`HTTP error! status: ${response.status}`);
    const data = await response.json();
    return data;
  } catch (error) {
    console.error('Error fetching war data:', error);
    showToast('Failed to fetch war data', 'error');
    return null;
  }
}

/**
 * Fetch activity data from API
 */
async function fetchActivityData() {
  try {
    const response = await fetch(CONFIG.DATA_URL_ACTIVITY);
    if (!response.ok) throw new Error(`HTTP error! status: ${response.status}`);
    const data = await response.json();
    return data;
  } catch (error) {
    console.error('Error fetching activity data:', error);
    return { activities: [], lastUpdated: new Date().toISOString() };
  }
}

/**
 * Update all data and UI
 */
async function updateAllData() {
  console.log('🔄 Fetching data...');

  const [warData, activityData] = await Promise.all([
    fetchWarData(),
    fetchActivityData()
  ]);

  if (warData) {
    updateWarStats(warData);
    updateMembersNotAttacked(warData);
  }

  if (activityData) {
    updateActivityFeed(activityData);
  }

  hideLoadingOverlay();

  if (warData || activityData) {
    showToast('✅ Data updated successfully', 'success');
  }

  lastFetch = new Date();
}

/**
 * Setup auto-refresh
 */
function setupAutoRefresh() {
  // Initial update
  updateAllData();

  // Setup interval
  refreshTimer = setInterval(updateAllData, CONFIG.REFRESH_INTERVAL);
  console.log(`✅ Auto-refresh enabled (every ${CONFIG.REFRESH_INTERVAL / 1000}s)`);
}

/**
 * Stop auto-refresh
 */
function stopAutoRefresh() {
  if (refreshTimer) {
    clearInterval(refreshTimer);
    refreshTimer = null;
    console.log('⛔ Auto-refresh stopped');
  }
}

// ===========================
// DARK MODE
// ===========================

function initDarkMode() {
  const isDarkMode = localStorage.getItem('darkMode') !== 'false';
  setDarkMode(isDarkMode);
}

function setDarkMode(enabled) {
  if (enabled) {
    document.body.classList.remove('light-mode');
    localStorage.setItem('darkMode', 'true');
  } else {
    document.body.classList.add('light-mode');
    localStorage.setItem('darkMode', 'false');
  }
}

function toggleDarkMode() {
  const isDarkMode = !document.body.classList.contains('light-mode');
  setDarkMode(!isDarkMode);
  showToast(isDarkMode ? '☀️ Light mode enabled' : '🌙 Dark mode enabled');
}

// ===========================
// EVENT LISTENERS
// ===========================

function setupEventListeners() {
  // Refresh button
  elements.refreshBtn.addEventListener('click', () => {
    showLoadingOverlay();
    updateAllData();
  });

  // Dark mode toggle
  elements.darkModeToggle.addEventListener('click', toggleDarkMode);

  // Keyboard shortcuts
  document.addEventListener('keydown', (e) => {
    if (e.ctrlKey && e.key === 'r') {
      e.preventDefault();
      elements.refreshBtn.click();
    }
    if (e.key === 'd' && e.ctrlKey) {
      e.preventDefault();
      elements.darkModeToggle.click();
    }
  });

  console.log('✅ Event listeners setup complete');
}

// ===========================
// INITIALIZATION
// ===========================

document.addEventListener('DOMContentLoaded', () => {
  console.log('🚀 Initializing Clash of Clans War Activity Dashboard...');

  // Setup theme
  initDarkMode();

  // Setup event listeners
  setupEventListeners();

  // Setup auto-refresh
  setupAutoRefresh();

  console.log('✅ Dashboard initialized successfully');
});

// Cleanup on page unload
window.addEventListener('beforeunload', () => {
  stopAutoRefresh();
});

// ===========================
// EXPORTS (for testing)
// ===========================
if (typeof module !== 'undefined' && module.exports) {
  module.exports = {
    formatTime,
    formatRelativeTime,
    updateWarStats,
    updateActivityFeed,
    fetchWarData,
    fetchActivityData
  };
}
