# API Integration Guide

## Clash of Clans API Overview

Panduan lengkap mengintegrasikan Clash of Clans API untuk war data.

## Getting API Key

### 1. Create Supercell Developer Account

1. Buka https://developer.clashofclans.com
2. Click **Sign Up**
3. Pilih **Clash of Clans**
4. Create Supercell ID atau login existing

### 2. Create API Key

1. Dashboard → **Create New API Key**
2. Fill form:
   - **Application name**: War Activity Dashboard
   - **Description**: Real-time war tracking
3. Select **IP range**:
   - Localhost testing: `127.0.0.1`
   - GitHub Actions: `0.0.0.0/0` (or specific GitHub IP)
4. Click **Create**
5. Copy API Key (save di tempat aman!)

### 3. Whitelist IP Addresses

**For Local Development:**
```
127.0.0.1/32
```

**For GitHub Actions:**
```
0.0.0.0/0  (allow all - less secure)
```

Or get specific GitHub IP ranges dari: https://api.github.com/meta

## API Endpoints

### Get Clan War Data

```
GET https://api.clashofclans.com/v1/clans/{clanTag}/currentwar
```

**Parameters:**
- `clanTag` - Clan identifier (URL encoded, e.g., %232PQ2QQUL2)

**Headers:**
```
Authorization: Bearer {API_KEY}
Content-Type: application/json
```

**Example Request:**
```bash
curl -X GET \
  "https://api.clashofclans.com/v1/clans/%232PQ2QQUL2/currentwar" \
  -H "Authorization: Bearer YOUR_API_KEY" \
  -H "Content-Type: application/json"
```

**Response (Success - 200):**
```json
{
  "state": "inWar",
  "warId": "1234567890",
  "teamSize": 50,
  "startTime": "20240101T120000.000Z",
  "endTime": "20240101T180000.000Z",
  "attacks": [
    {
      "attacker": {
        "tag": "#ATTACKER_TAG",
        "name": "Attacker Name",
        "level": 10,
        "townHallLevel": 13,
        "mapPosition": 1
      },
      "defender": {
        "tag": "#DEFENDER_TAG",
        "name": "Defender Name",
        "level": 10,
        "townHallLevel": 13,
        "mapPosition": 1
      },
      "stars": 3,
      "destructionPercentage": 100,
      "duration": 148
    }
  ],
  "clan": {
    "tag": "#CLAN_TAG",
    "clanLevel": 10,
    "name": "Clan Name",
    "attacks": 47,
    "stars": 245,
    "destructionPercentage": 89.5,
    "members": [
      {
        "tag": "#MEMBER_TAG",
        "name": "Member Name",
        "townHallLevel": 13,
        "mapPosition": 1
      }
    ]
  },
  "opponent": {
    "tag": "#OPPONENT_TAG",
    "clanLevel": 9,
    "name": "Enemy Clan",
    "attacks": 47,
    "stars": 198,
    "destructionPercentage": 78.3,
    "members": [
      {
        "tag": "#MEMBER_TAG",
        "name": "Member Name",
        "townHallLevel": 12,
        "mapPosition": 1
      }
    ]
  }
}
```

**Error Responses:**

```json
// 401 - Invalid API Key
{
  "reason": "unauthorized",
  "message": "Invalid API key"
}

// 403 - IP not whitelisted
{
  "reason": "forbidden",
  "message": "IP address not whitelisted"
}

// 404 - War not found
{
  "reason": "notFound",
  "message": "War information not available"
}

// 429 - Rate limited
{
  "reason": "rateLimitExceeded",
  "message": "Request rate limit exceeded"
}
```

## War States

- `notInWar` - Clan is not currently in war
- `preparation` - War preparation phase
- `inWar` - War is ongoing
- `warEnded` - War has ended

## Data Parsing

### Extract from API Response

```javascript
const warData = {
  warId: response.warId,
  state: response.state,
  teamSize: response.teamSize,
  
  // Clan info
  clanTag: response.clan.tag,
  clanName: response.clan.name,
  clanLevel: response.clan.clanLevel,
  clanStars: response.clan.stars,
  clanDestruction: response.clan.destructionPercentage,
  clanMembers: response.clan.members,
  clanAttackCount: response.clan.attacks,
  
  // Enemy info
  enemyTag: response.opponent.tag,
  enemyName: response.opponent.name,
  enemyLevel: response.opponent.clanLevel,
  enemyStars: response.opponent.stars,
  enemyDestruction: response.opponent.destructionPercentage,
  
  // Attacks
  allAttacks: response.attacks || [],
  totalAttacks: response.attacks ? response.attacks.length : 0,
  maxAttacks: response.teamSize * 2
};
```

### Detect New Attacks

```javascript
function detectNewAttacks(previousData, currentData) {
  const previousAttacks = new Set(
    previousData.attacks?.map(a => `${a.attacker.tag}-${a.defender.tag}`)
  );
  
  const newAttacks = currentData.attacks.filter(attack => {
    const key = `${attack.attacker.tag}-${attack.defender.tag}`;
    return !previousAttacks.has(key);
  });
  
  return newAttacks;
}
```

### Filter Members Not Attacked

```javascript
function getMembersNotAttacked(warData) {
  const attackedMembers = new Set(
    warData.attacks.map(a => a.attacker.tag)
  );
  
  return warData.clan.members.filter(
    member => !attackedMembers.has(member.tag)
  );
}
```

## Rate Limits

### Current Limits (v1)

- **Requests per second:** 50
- **Requests per day:** 20,000
- **Window:** 24 hours (rolling)

### Usage Calculation

For 5-minute interval:
- Requests per day: 24 * 60 / 5 = 288 requests
- **Well within limits!**

For 1-minute interval:
- Requests per day: 24 * 60 = 1,440 requests
- **Still OK**

### Handle Rate Limiting

```javascript
async function fetchWithRetry(url, options, maxRetries = 3) {
  for (let i = 0; i < maxRetries; i++) {
    try {
      const response = await fetch(url, options);
      
      if (response.status === 429) {
        // Rate limited - wait and retry
        const retryAfter = response.headers.get('Retry-After') || 60;
        console.log(`Rate limited, retry after ${retryAfter}s`);
        await sleep(retryAfter * 1000);
        continue;
      }
      
      return response;
    } catch (error) {
      if (i === maxRetries - 1) throw error;
      await sleep(1000 * (i + 1)); // Exponential backoff
    }
  }
}
```

## Security Best Practices

### 1. Never Expose API Key

❌ **Wrong:**
```javascript
const API_KEY = "YOUR_API_KEY"; // Don't do this!
```

✅ **Right:**
```javascript
const API_KEY = process.env.COC_KEY; // Use environment variable
```

### 2. Use GitHub Secrets

```yaml
env:
  COC_KEY: ${{ secrets.COC_KEY }}
```

### 3. Rotate Keys Regularly

- Monthly key rotation recommended
- Delete old keys
- Monitor usage

### 4. IP Whitelisting

- Be specific if possible
- Don't whitelist `0.0.0.0/0` jika tidak perlu
- Use specific IP ranges

### 5. Logging

```javascript
// Log requests (no keys!)
console.log(`API call: GET /clans/${CLAN_TAG}/currentwar`);
console.log(`Response status: ${response.status}`);
console.log(`Next available war in: ${response.data.clan.name}`);
```

## Testing API

### Using cURL

```bash
# Test connection
curl -X GET \
  "https://api.clashofclans.com/v1/clans/%232PQ2QQUL2/currentwar" \
  -H "Authorization: Bearer YOUR_API_KEY"

# Save response to file
curl -X GET \
  "https://api.clashofclans.com/v1/clans/%232PQ2QQUL2/currentwar" \
  -H "Authorization: Bearer YOUR_API_KEY" \
  > response.json

# Pretty print
curl -X GET \
  "https://api.clashofclans.com/v1/clans/%232PQ2QQUL2/currentwar" \
  -H "Authorization: Bearer YOUR_API_KEY" | jq
```

### Using Node.js

```javascript
const axios = require('axios');

async function testAPI() {
  try {
    const response = await axios.get(
      'https://api.clashofclans.com/v1/clans/%232PQ2QQUL2/currentwar',
      {
        headers: {
          'Authorization': 'Bearer YOUR_API_KEY'
        }
      }
    );
    console.log(JSON.stringify(response.data, null, 2));
  } catch (error) {
    console.error('Error:', error.response?.status, error.message);
  }
}

testAPI();
```

## URL Encoding

Clan tags perlu URL encoded:

```
#2PQ2QQUL2 → %232PQ2QQUL2
```

Conversion table:
- `#` → `%23`
- `/` → `%2F`
- ` ` → `%20`

JavaScript:
```javascript
const encodedTag = encodeURIComponent('#2PQ2QQUL2');
// Result: %232PQ2QQUL2
```

## Troubleshooting API

### 401 Unauthorized

**Causes:**
- Invalid API key
- Key expired

**Solution:**
- Generate new key
- Update GitHub secret

### 403 Forbidden

**Causes:**
- IP not whitelisted
- Invalid permissions

**Solution:**
- Add IP to whitelist
- Check key permissions

### 404 Not Found

**Causes:**
- Clan not in war
- Invalid clan tag
- Wrong endpoint

**Solution:**
- Check war state first
- Verify clan tag format
- Check endpoint URL

### 429 Too Many Requests

**Causes:**
- Rate limit exceeded
- Too many parallel requests

**Solution:**
- Reduce refresh interval
- Implement retry with backoff
- Queue requests

## Resources

- [Official API Docs](https://developer.clashofclans.com/api-docs)
- [Developer Portal](https://developer.clashofclans.com)
- [API Status](https://clashofclans.status.io)
- [Community Forums](https://forum.supercell.com)

---

**Last Updated:** 2024
