const axios = require('axios');
const fs = require('fs');
const path = require('path');

// Konfigurasi
const COC_API_KEY = process.env.COC_KEY;
const CLAN_TAG = '#GY09U9V2'; // Ganti dengan clan tag Anda - encode '#' sebagai '%23'
const API_BASE_URL = 'https://api.clashofclans.com/v1';

// Path untuk data files
const warDataPath = path.join(__dirname, '../data/war-data.json');
const activityPath = path.join(__dirname, '../data/activity.json');

const headers = {
  'Authorization': `Bearer ${COC_API_KEY}`,
  'Content-Type': 'application/json'
};

// Helper functions
function encodeTag(tag) {
  return encodeURIComponent(tag);
}

function getCurrentTimestamp() {
  return new Date().toISOString();
}

function loadJson(filePath) {
  try {
    if (fs.existsSync(filePath)) {
      return JSON.parse(fs.readFileSync(filePath, 'utf-8'));
    }
  } catch (error) {
    console.error(`Error reading ${filePath}:`, error.message);
  }
  return null;
}

function saveJson(filePath, data) {
  fs.writeFileSync(filePath, JSON.stringify(data, null, 2));
}

async function getWarData() {
  try {
    const response = await axios.get(
      `${API_BASE_URL}/clans/${encodeTag(CLAN_TAG)}/currentwar`,
      { headers }
    );
    return response.data;
  } catch (error) {
    console.error('Error fetching war data:', error.message);
    return null;
  }
}

async function detectAttackChanges(oldWar, newWar) {
  const activities = [];

  if (!oldWar || !oldWar.attacks) {
    return activities;
  }

  const oldAttacks = {};
  const newAttacks = {};

  // Create maps of attacks by member tag
  if (oldWar.attacks) {
    oldWar.attacks.forEach(attack => {
      oldAttacks[attack.attacker.tag] = attack;
    });
  }

  if (newWar.attacks) {
    newWar.attacks.forEach(attack => {
      newAttacks[attack.attacker.tag] = attack;
    });
  }

  // Detect new attacks
  newWar.attacks.forEach(attack => {
    const oldAttack = oldAttacks[attack.attacker.tag];
    
    if (!oldAttack) {
      // New attack detected
      activities.push({
        type: 'attack',
        attacker: attack.attacker.name,
        defender: attack.defender.name,
        stars: attack.stars,
        destruction: attack.destructionPercentage,
        duration: attack.duration,
        timestamp: getCurrentTimestamp(),
        status: 'new'
      });
    } else if (
      oldAttack.stars !== attack.stars ||
      oldAttack.destructionPercentage !== attack.destructionPercentage
    ) {
      // Attack result updated
      activities.push({
        type: 'update',
        attacker: attack.attacker.name,
        defender: attack.defender.name,
        stars: attack.stars,
        destruction: attack.destructionPercentage,
        oldStars: oldAttack.stars,
        oldDestruction: oldAttack.destructionPercentage,
        timestamp: getCurrentTimestamp(),
        status: 'updated'
      });
    }
  });

  return activities;
}

function getWarStats(war) {
  const allies = war.clan || {};
  const enemies = war.opponent || {};

  return {
    warId: war.id,
    state: war.state,
    startTime: war.startTime,
    endTime: war.endTime,
    teamSize: war.teamSize,
    clan: {
      tag: allies.tag,
      name: allies.name,
      level: allies.level,
      stars: allies.stars,
      destruction: allies.destructionPercentage,
      memberCount: allies.members ? allies.members.length : 0,
      attacks: war.attacks ? war.attacks.filter(a => a.attacker.tag.startsWith(allies.tag.substring(0, 4))).length : 0
    },
    opponent: {
      tag: enemies.tag,
      name: enemies.name,
      level: enemies.level,
      stars: enemies.stars,
      destruction: enemies.destructionPercentage
    },
    totalAttacks: (war.attacks || []).length,
    maxAttacks: war.teamSize * 2
  };
}

function getRemainingAttacks(war) {
  const attacks = war.attacks || [];
  const totalMembers = war.teamSize;
  const maxAttacks = totalMembers * 2;
  const totalAttacks = attacks.length;
  const remaining = maxAttacks - totalAttacks;

  return {
    used: totalAttacks,
    max: maxAttacks,
    remaining: Math.max(0, remaining),
    percentage: Math.round((totalAttacks / maxAttacks) * 100)
  };
}

function getMembersNotAttacked(war) {
  const clanMembers = war.clan.members || [];
  const attacks = war.attacks || [];
  
  const attackersSet = new Set(attacks.map(a => a.attacker.tag));
  
  return clanMembers
    .filter(member => !attackersSet.has(member.tag))
    .map(member => ({
      tag: member.tag,
      name: member.name,
      townHallLevel: member.townHallLevel,
      mapPosition: member.mapPosition
    }));
}

async function main() {
  console.log('🔄 Starting war data update...');
  console.log('Clan Tag:', CLAN_TAG);

  if (!COC_API_KEY) {
    console.error('❌ COC_KEY environment variable is not set');
    process.exit(1);
  }

  // Load old war data
  const oldWar = loadJson(warDataPath);
  const oldActivities = loadJson(activityPath) || { activities: [], lastUpdated: null };

  // Fetch new war data
  const newWar = await getWarData();

  if (!newWar) {
    console.error('❌ Failed to fetch war data from API');
    process.exit(1);
  }

  console.log('✅ War data fetched successfully');
  console.log('War State:', newWar.state);

  // Detect changes
  const newActivities = await detectAttackChanges(oldWar, newWar);
  
  if (newActivities.length > 0) {
    console.log(`🎯 Detected ${newActivities.length} new/updated activities`);
    
    // Merge with existing activities (keep last 100)
    const allActivities = [...newActivities, ...(oldActivities.activities || [])];
    oldActivities.activities = allActivities.slice(0, 100);
  }

  // Update timestamp
  oldActivities.lastUpdated = getCurrentTimestamp();

  // Prepare complete war data
  const warStats = getWarStats(newWar);
  const remainingAttacks = getRemainingAttacks(newWar);
  const membersNotAttacked = getMembersNotAttacked(newWar);

  const completeWarData = {
    ...warStats,
    remainingAttacks,
    membersNotAttacked,
    updates: {
      lastFetch: getCurrentTimestamp(),
      changeDetected: newActivities.length > 0
    }
  };

  // Save data
  saveJson(warDataPath, completeWarData);
  saveJson(activityPath, oldActivities);

  console.log('💾 Data saved successfully');
  console.log('Activity Count:', oldActivities.activities.length);
  console.log('New Activities:', newActivities.length);
  console.log(`✅ Update completed at ${getCurrentTimestamp()}`);
}

main().catch(error => {
  console.error('Fatal error:', error);
  process.exit(1);
});
