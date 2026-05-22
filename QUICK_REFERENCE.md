# Quick Reference

Ringkasan cepat konfigurasi dan penggunaan project.

## 📋 Checklist Setup

- [ ] Buat repository GitHub
- [ ] Clone ke local
- [ ] Copy project files
- [ ] Create API key di developer.clashofclans.com
- [ ] Add `COC_KEY` secret ke GitHub
- [ ] Update clan tag di `scripts/update-war-data.js`
- [ ] Push ke repository
- [ ] Enable GitHub Pages (`/docs` folder)
- [ ] Test workflow (Actions tab → Run workflow)
- [ ] Verify website bisa diakses

## 🔧 Important Configurations

### Clan Tag (scripts/update-war-data.js)
```javascript
const CLAN_TAG = '#XXXXXXXX'; // Ganti dengan clan tag Anda
```

### Refresh Interval (docs/script.js)
```javascript
REFRESH_INTERVAL: 30000, // milliseconds (30 detik)
```

### GitHub Actions Schedule (.github/workflows/update-war-data.yml)
```yaml
schedule:
  - cron: '*/5 * * * *'  # Tiap 5 menit
```

**Cron Reference:**
- `*/5 * * * *` → Every 5 minutes
- `0 * * * *` → Every hour
- `0 */6 * * *` → Every 6 hours
- `0 0 * * *` → Daily at 00:00

## 🎯 Key Features

| Feature | Location | Status |
|---------|----------|--------|
| Real-time war stats | `/docs` | ✅ |
| Activity feed | `/docs` | ✅ |
| Auto-refresh | GitHub Actions | ✅ |
| Dark mode | `/docs/script.js` | ✅ |
| Responsive design | `/docs/style.css` | ✅ |
| Mobile support | `/docs` | ✅ |

## 📂 File Structure

```
root/
├── .github/workflows/update-war-data.yml   ← GitHub Actions config
├── scripts/update-war-data.js              ← Fetch API script
├── docs/
│   ├── index.html                          ← Main page
│   ├── style.css                           ← Styling
│   ├── script.js                           ← Frontend logic
│   └── README.md                           ← Frontend docs
├── data/
│   ├── war-data.json                       ← War stats
│   └── activity.json                       ← Activity log
├── package.json                            ← Dependencies
├── README.md                               ← Main docs
├── SETUP.md                                ← Setup guide
├── API.md                                  ← API guide
├── TROUBLESHOOTING.md                      ← Help
└── .gitignore                              ← Git ignore
```

## 🚀 Commands

```bash
# Clone repo
git clone <repo-url>
cd <repo-name>

# Push changes
git add .
git commit -m "message"
git push origin main

# Test script locally
npm install
COC_KEY=your_key node scripts/update-war-data.js

# Check status
git status
git log --oneline
```

## 🔐 GitHub Secrets

Required secrets:
- `COC_KEY` - Clash of Clans API Key

Set via: Settings → Secrets and variables → Actions

## 🌐 URLs

**Website:** `https://YOUR_USERNAME.github.io/YOUR_REPO`

**Dashboard:** Auto-refresh every 30s

**GitHub Workflow:** Actions tab

## 📊 Data Files

### data/war-data.json
```json
{
  "state": "inWar|preparation|warEnded",
  "clan": { "name": "...", "stars": 0, ... },
  "opponent": { "name": "...", "stars": 0, ... },
  "totalAttacks": 0,
  "remainingAttacks": { "used": 0, "max": 0, ... },
  "membersNotAttacked": [...]
}
```

### data/activity.json
```json
{
  "activities": [
    {
      "type": "attack",
      "attacker": "Name",
      "stars": 3,
      "destruction": 100,
      ...
    }
  ]
}
```

## ⌨️ Shortcuts

- `Ctrl + R` - Refresh data manually
- `Ctrl + D` - Toggle dark mode

## 🎨 Colors

Change in `docs/style.css`:
```css
--primary: #FF6B35;      /* Orange */
--accent: #00D9FF;       /* Cyan */
--success: #00FF88;      /* Green */
--danger: #FF4444;       /* Red */
```

## 🛠️ Customization Examples

### Change refresh to 1 minute
```javascript
REFRESH_INTERVAL: 60000, // docs/script.js
```

### Change workflow to every 10 minutes
```yaml
schedule:
  - cron: '*/10 * * * *'  # .github/workflows/update-war-data.yml
```

### Change theme to light mode default
Edit `docs/script.js`:
```javascript
localStorage.setItem('darkMode', 'false');
```

## 🐛 Common Errors

| Error | Solution |
|-------|----------|
| 404 Not Found | Check Pages settings, verify `/docs` folder |
| 401 Unauthorized | Check `COC_KEY` secret, verify API key |
| Loading forever | Check JSON files exist in `/data` |
| No activities | Wait for war progress or manual trigger |
| Workflow not running | Check Actions enabled, verify file path |

## 📞 Support

- Check TROUBLESHOOTING.md
- Check README.md
- Check API.md for API issues
- Check GitHub Actions logs

## 🔄 Workflow Diagram

```
GitHub Actions (every 5 min)
    ↓
Fetch from Clash of Clans API
    ↓
Compare with previous data
    ↓
Detect changes & new attacks
    ↓
Update data/war-data.json
    ↓
Update data/activity.json
    ↓
Auto-commit & push
    ↓
Frontend (auto-refresh every 30s)
    ↓
Fetch data/war-data.json
    ↓
Update dashboard UI
```

## 📈 API Rate Limits

- 50 requests/second
- 20,000 requests/day
- **5-minute interval = 288/day** ✅

## 🎯 Performance

- Frontend load: < 2 seconds
- Data update: ~30 seconds
- Mobile optimized
- CSS animations smooth

## 🔔 Notifications

Toast notifications for:
- ✅ Data updated successfully
- ⚠️ Failed to fetch data
- 🌙 Dark mode toggled
- 💡 Other user actions

---

**Pro Tips:**
1. Set workflow to 5 min interval - optimal for war tracking
2. Use dark mode at night
3. Share website URL with clan members
4. Monitor GitHub Actions for errors
5. Rotate API key monthly

---

**Version:** 1.0.0 | **Last Updated:** 2024
