# Clash of Clans War Live Activity Dashboard

Website dashboard real-time Clash of Clans War Activity menggunakan GitHub Pages dan GitHub Actions tanpa Firebase atau Backend VPS.

## 🎯 Fitur Utama

### Dashboard
- 📊 War statistics real-time
- ⚔️ Activity feed live
- 🎯 Remaining attacks tracking
- 👥 Members not attacked list
- 📈 Destruction percentage tracking
- ⭐ Stars counter
- 🌙 Dark mode

### Automation
- 🤖 GitHub Actions every 5 minutes
- 🔄 Otomatis fetch Clash of Clans API
- 📝 Auto-commit & push data
- 🔔 Change detection
- 📊 Activity logging

### UI/UX
- 📱 Responsive mobile design
- ✨ Modern dark mode dashboard
- 🎨 Esports-style design
- 💫 Smooth animations
- 🌟 Glowing effects
- ⚡ Fast load time

## 🚀 Quick Start

### Prerequisites
- GitHub Account
- Clash of Clans API Key
- Git installed

### 1. Clone Repository

```bash
git clone https://github.com/YOUR_USERNAME/YOUR_REPO.git
cd YOUR_REPO
```

### 2. Dapatkan Clash of Clans API Key

1. Buka https://developer.clashofclans.com
2. Login dengan akun Supercell Anda
3. Create New Application
4. Dapatkan API Key
5. Whitelist IP address (untuk GitHub Actions gunakan `0.0.0.0/0`)

### 3. Setup GitHub Secret

1. Buka repository Anda
2. Pergi ke **Settings → Secrets and variables → Actions**
3. Click **New repository secret**
4. Name: `COC_KEY`
5. Value: Paste API key Anda
6. Click **Add secret**

```
Name: COC_KEY
Value: YOUR_API_KEY_HERE
```

### 4. Update Script dengan Clan Tag

Edit `scripts/update-war-data.js`:

```javascript
const CLAN_TAG = '#XXXXXXXXXX'; // Ganti dengan clan tag Anda
```

Contoh: `const CLAN_TAG = '#2PQ2QQUL2';`

**Cara mencari Clan Tag:**
- Buka game Clash of Clans
- Buka clan Anda
- Clan tag ada di bawah nama clan (format: #XXXXXXXX)

### 5. Setup GitHub Pages

1. Pergi ke **Settings → Pages**
2. Source: Branch `main`, folder `/docs`
3. Save
4. Website akan tersedia di: `https://YOUR_USERNAME.github.io/YOUR_REPO`

### 6. Push ke GitHub

```bash
git add .
git commit -m "Initial commit: Clash of Clans War Activity"
git push origin main
```

## 📂 Struktur Project

```
your-repo/
├── .github/
│   └── workflows/
│       └── update-war-data.yml       # GitHub Actions workflow
├── scripts/
│   └── update-war-data.js            # Node.js script untuk fetch API
├── data/
│   ├── war-data.json                 # Current war data
│   └── activity.json                 # Activity log
├── docs/                             # GitHub Pages folder
│   ├── index.html                    # Main dashboard
│   ├── style.css                     # Styling
│   ├── script.js                     # Frontend JavaScript
│   └── README.md                     # Frontend docs
├── package.json                      # Node.js dependencies
└── README.md                         # This file
```

## 📊 Data Structure

### war-data.json
```json
{
  "warId": "1234567890",
  "state": "inWar",
  "clan": {
    "name": "Clan Name",
    "tag": "#XXXXXXXX",
    "stars": 150,
    "destruction": 85.5,
    "level": 10,
    "memberCount": 50,
    "attacks": 45
  },
  "opponent": {
    "name": "Enemy Clan",
    "stars": 120,
    "destruction": 75.3
  },
  "remainingAttacks": {
    "used": 85,
    "max": 100,
    "remaining": 15,
    "percentage": 85
  },
  "membersNotAttacked": [
    {
      "tag": "#XXXXXXXX",
      "name": "Player Name",
      "townHallLevel": 13,
      "mapPosition": 1
    }
  ]
}
```

### activity.json
```json
{
  "activities": [
    {
      "type": "attack",
      "attacker": "Player Name",
      "defender": "#12345",
      "stars": 3,
      "destruction": 100,
      "duration": 148,
      "timestamp": "2024-01-01T18:29:45.000Z",
      "status": "new"
    }
  ],
  "lastUpdated": "2024-01-01T18:30:00.000Z"
}
```

## 🔧 Konfigurasi

### GitHub Actions Workflow

File: `.github/workflows/update-war-data.yml`

Ubah schedule untuk mengubah interval:
```yaml
schedule:
  - cron: '*/5 * * * *'  # Setiap 5 menit
```

Cron format: `minute hour day month weekday`

**Contoh:**
- `*/5 * * * *` - Setiap 5 menit
- `0 * * * *` - Setiap jam
- `0 */6 * * *` - Setiap 6 jam
- `0 0 * * *` - Setiap hari jam 00:00

### Frontend Configuration

File: `docs/script.js`

```javascript
const CONFIG = {
  REFRESH_INTERVAL: 30000, // 30 detik
  DATA_URL_WAR: '../data/war-data.json',
  DATA_URL_ACTIVITY: '../data/activity.json',
  TIMEZONE: 'en-US',
  TIME_FORMAT: { hour: '2-digit', minute: '2-digit', second: '2-digit', hour12: true }
};
```

## 🎨 Customization

### Warna Theme

Edit `docs/style.css`:

```css
:root {
  --primary: #FF6B35;        /* Orange - main color */
  --secondary: #004E89;      /* Blue */
  --accent: #00D9FF;         /* Cyan */
  --success: #00FF88;        /* Green */
  --danger: #FF4444;         /* Red */
  --warning: #FFB800;        /* Yellow */
}
```

### Dark Mode Default

Edit `docs/script.js`:

```javascript
function initDarkMode() {
  const isDarkMode = localStorage.getItem('darkMode') !== 'false';
  // Change 'false' to 'true' untuk default light mode
  setDarkMode(isDarkMode);
}
```

### Refresh Interval

Edit `docs/script.js`:

```javascript
REFRESH_INTERVAL: 30000, // 30 detik - ubah sesuai kebutuhan
```

## 🔑 Environment Variables

### GitHub Secrets

Semua variabel disimpan di GitHub Secrets untuk keamanan:

- `COC_KEY` - Clash of Clans API Key

**Cara menambah secret:**
1. Settings → Secrets and variables → Actions
2. New repository secret
3. Isi nama dan value
4. Add secret

## ⚡ Keyboard Shortcuts

- `Ctrl + R` - Manual refresh data
- `Ctrl + D` - Toggle dark mode

## 📱 Responsive Breakpoints

- **Desktop**: 1200px+
- **Tablet**: 768px - 1200px
- **Mobile**: < 768px

## 🐛 Troubleshooting

### GitHub Actions tidak jalan

1. Cek apakah workflow file ada di `.github/workflows/`
2. Verify GitHub Secret `COC_KEY` sudah diset
3. Lihat Actions tab untuk error details

### Data tidak update

1. Cek apakah API key valid
2. Verify clan tag format: `#XXXXXXXX`
3. Cek IP whitelist di Clash of Clans Developer portal

### Frontend error

1. Clear browser cache
2. Cek console browser untuk error messages
3. Verify JSON files valid format
4. Cek GitHub Pages settings

### CORS Error

1. Pastikan data files ada di repository
2. Publish branch harus `main` dan folder `/docs`

## 📝 API Rate Limits

Clash of Clans API memiliki rate limits:
- 50 requests per second
- 20,000 requests per day

Jika menggunakan interval 5 menit (288 requests/day) - aman!

## 🔒 Security Best Practices

1. **Jangan hardcode API key** - gunakan GitHub Secrets
2. **IP Whitelist** - set dengan range yang diperlukan
3. **Regular rotation** - rotate API key secara berkala
4. **Monitor usage** - cek request count di developer portal

## 📊 Monitoring

Cek action runs:
1. GitHub repo → Actions tab
2. Lihat "Update War Data" workflow
3. Klik run untuk detail
4. Cek logs untuk troubleshooting

## 🤝 Contributing

Kontribusi welcome! Silakan:
1. Fork repository
2. Create feature branch
3. Commit changes
4. Push ke branch
5. Open pull request

## 📄 License

MIT License - Silakan gunakan dan modify sesuai kebutuhan.

## 🙋 Support

Jika ada pertanyaan:
1. Cek GitHub Issues
2. Buat issue baru dengan deskripsi jelas
3. Include error message dan steps to reproduce

## 🎮 About Clash of Clans

[Clash of Clans](https://supercell.com/en/games/clashofclans/) adalah game strategi real-time yang dibuat oleh Supercell.

- **Official Website**: https://supercell.com/en/games/clashofclans/
- **Developer Portal**: https://developer.clashofclans.com
- **Official Forums**: https://forum.supercell.com

## 📚 Resources

- [Clash of Clans API Documentation](https://developer.clashofclans.com/api-docs/)
- [GitHub Pages Documentation](https://docs.github.com/en/pages)
- [GitHub Actions Documentation](https://docs.github.com/en/actions)
- [GitHub Secrets Documentation](https://docs.github.com/en/actions/security-guides/encrypted-secrets)

## 📅 Changelog

### v1.0.0 (2024)
- Initial release
- Dashboard dengan war statistics
- Activity feed real-time
- GitHub Actions automation
- GitHub Pages deployment
- Dark mode support
- Responsive mobile design

---

**Made with ❤️ for Clash of Clans community**
