# GitHub Setup Guide

Panduan lengkap setup project di GitHub Pages dan GitHub Actions.

## Prerequisites

- GitHub Account
- Git installed di local
- Clash of Clans API Key

## Step 1: Create GitHub Repository

### 1.1 Create New Repository

1. Go to https://github.com/new
2. Repository name: `clash-coc-war-activity` (atau nama lain)
3. Description: `Clash of Clans War Live Activity Dashboard`
4. Visibility: Public (agar bisa diakses)
5. Initialize with:
   - [ ] Add .gitignore
   - [ ] Add license (MIT recommended)
6. Click **Create repository**

### 1.2 Clone Repository

```bash
git clone https://github.com/YOUR_USERNAME/clash-coc-war-activity.git
cd clash-coc-war-activity
```

## Step 2: Setup Local Project

### 2.1 Copy Project Files

Copy semua file dari project ke local repository:

```
.github/
  └── workflows/
      └── update-war-data.yml
scripts/
  └── update-war-data.js
docs/
  ├── index.html
  ├── style.css
  ├── script.js
  └── README.md
data/
  ├── war-data.json
  └── activity.json
package.json
README.md
.gitignore
```

### 2.2 Create .gitignore

```bash
cat > .gitignore << 'EOF'
# Dependencies
node_modules/
package-lock.json
yarn.lock

# IDE
.vscode/
.idea/
*.swp
*.swo

# OS
.DS_Store
Thumbs.db

# Logs
*.log
npm-debug.log*

# Environment
.env
.env.local
EOF
```

## Step 3: Setup GitHub Actions Secret

### 3.1 Create API Key

1. Buka https://developer.clashofclans.com
2. Login dengan Supercell account
3. Create New Application
4. Dapatkan API Key
5. Whitelist untuk GitHub Actions: `0.0.0.0/0`

### 3.2 Add Secret ke GitHub

1. Go to repository: Settings
2. Navigate: Secrets and variables → Actions
3. Click **New repository secret**
4. Name: `COC_KEY`
5. Value: Paste API key
6. Click **Add secret**

## Step 4: Update Configuration

### 4.1 Update Clan Tag

Edit `scripts/update-war-data.js`:

```javascript
const CLAN_TAG = '#XXXXXXXX'; // Ganti dengan clan tag Anda
```

Contoh: `const CLAN_TAG = '#2PQ2QQUL2';`

**Cara mencari clan tag:**
1. Buka Clash of Clans
2. Buka clan
3. Lihat di bawah nama clan (format: #XXXXXXXX)

### 4.2 Verify package.json

Pastikan `package.json` ada dengan dependencies:

```json
{
  "dependencies": {
    "axios": "^1.6.0"
  }
}
```

## Step 5: Initial Commit & Push

### 5.1 Stage & Commit

```bash
git add .
git commit -m "Initial commit: Clash of Clans War Activity Dashboard"
```

### 5.2 Push to GitHub

```bash
git branch -M main
git push -u origin main
```

## Step 6: Setup GitHub Pages

### 6.1 Configure Pages

1. Go to repository: Settings
2. Navigate: Pages
3. Source:
   - Branch: `main`
   - Folder: `/docs`
4. Click **Save**

### 6.2 Get Your URL

Website akan tersedia di:

```
https://YOUR_USERNAME.github.io/clash-coc-war-activity
```

Tunggu ~1 menit untuk deployment.

## Step 7: Test Deployment

### 7.1 Check Website

1. Buka https://YOUR_USERNAME.github.io/clash-coc-war-activity
2. Lihat dashboard loading
3. Check console (F12) untuk errors

### 7.2 Manual Trigger Workflow

1. Go to repository: Actions
2. Find "Update War Data" workflow
3. Click "Run workflow"
4. Branch: `main`
5. Click **Run workflow**
6. Wait for completion

### 7.3 Check Generated Data

1. Go to `/data/war-data.json`
2. Check apakah data tersedia
3. Refresh website untuk melihat data

## Step 8: Monitor & Maintain

### 8.1 Workflow Runs

Monitor GitHub Actions:

```
Settings → Actions → Workflow permissions
```

Pastikan workflow punya write access ke repository.

### 8.2 Check Logs

1. Go to Actions tab
2. Click recent run
3. Expand steps untuk detail logs
4. Debug jika ada error

### 8.3 API Usage

Monitor Clash of Clans API:

1. Go to https://developer.clashofclans.com
2. Lihat API request count
3. Verify masih dalam rate limits

## Common Issues & Solutions

### Workflow Failed

**Error: "403 Forbidden"**
- Cek apakah workflow memiliki write access
- Check Settings → Actions → Workflow permissions

**Error: "401 Unauthorized"**
- Verify `COC_KEY` secret sudah diset
- Check API key masih valid

**Error: "Network error"**
- Cek API key whitelist
- Verify internet connection

### GitHub Pages Not Working

**Error: "404 Not Found"**
- Check Pages settings (branch: main, folder: /docs)
- Verify index.html ada di /docs folder
- Wait ~2 menit untuk deploy

**Error: "Permission denied"**
- Check repo visibility (Public)
- Verify Pages settings allow publishing

### Data Not Updating

**Dashboard shows "Loading"**
- Check browser console untuk errors
- Verify JSON files di /data/ folder
- Check CORS (shouldn't be issue since same repo)

**No activities in feed**
- First run mungkin tidak ada activities
- Wait untuk war progress
- Manual trigger workflow untuk test

## Custom Domain (Optional)

### Add Custom Domain

1. Settings → Pages
2. Custom domain: `your-domain.com`
3. Add DNS record:
   - Type: CNAME
   - Name: `www` (atau @ untuk root)
   - Value: `YOUR_USERNAME.github.io`
4. Wait untuk DNS propagation

## Environment Setup Summary

```bash
# 1. Clone repo
git clone https://github.com/YOUR_USERNAME/clash-coc-war-activity.git
cd clash-coc-war-activity

# 2. Add files (copy project files)

# 3. Create .gitignore

# 4. Update clan tag di scripts/update-war-data.js

# 5. Push to GitHub
git add .
git commit -m "Initial commit"
git push -u origin main

# 6. Add secret di GitHub
# Settings → Secrets and variables → Actions
# COC_KEY = YOUR_API_KEY

# 7. Enable Pages
# Settings → Pages
# Branch: main, Folder: /docs

# 8. Test
# Visit: https://YOUR_USERNAME.github.io/clash-coc-war-activity
```

## Troubleshooting Commands

```bash
# Check git status
git status

# View recent commits
git log --oneline -5

# Check remote
git remote -v

# Force push (hati-hati!)
git push --force

# Revert last commit
git reset HEAD~1

# Check branch
git branch
```

## Next Steps

1. Share website dengan clan members
2. Setup dashboard di clan discord
3. Monitor workflow runs
4. Customize UI sesuai kebutuhan
5. Add features sesuai feedback

---

**Congratulations!** Website sudah live! 🎉
