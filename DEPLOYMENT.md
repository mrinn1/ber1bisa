# Deployment Guide

Panduan lengkap deploy project ke production dengan GitHub Pages.

## Prerequisites

- ✅ GitHub Account (free)
- ✅ Git installed
- ✅ Clash of Clans API Key
- ✅ Repository created

## Step-by-Step Deployment

### 1. Clone Repository

```bash
git clone https://github.com/YOUR_USERNAME/YOUR_REPO.git
cd YOUR_REPO
```

### 2. Add Project Files

Copy semua project files ke local repository:

```
├── .github/workflows/update-war-data.yml
├── scripts/update-war-data.js
├── docs/
│   ├── index.html
│   ├── style.css
│   ├── script.js
│   └── README.md
├── data/
│   ├── war-data.json
│   └── activity.json
├── package.json
├── README.md
├── .gitignore
└── (other docs)
```

### 3. Configure Clan Tag

Edit `scripts/update-war-data.js`:

```javascript
const CLAN_TAG = '#XXXXXXXX'; // Your clan tag here
```

### 4. First Commit

```bash
git add .
git commit -m "Initial: Clash of Clans War Activity Dashboard"
git push -u origin main
```

### 5. Add GitHub Secret

1. Go to: **Repository → Settings → Secrets and variables → Actions**
2. Click: **New repository secret**
3. Name: `COC_KEY`
4. Value: Your Clash of Clans API Key
5. Click: **Add secret**

### 6. Enable GitHub Pages

1. Go to: **Settings → Pages**
2. Set Branch: `main`
3. Set Folder: `/docs`
4. Click: **Save**
5. Wait ~2 minutes for deployment

### 7. Verify Deployment

Visit: `https://YOUR_USERNAME.github.io/YOUR_REPO`

Check:
- ✅ Dashboard loads
- ✅ No JavaScript errors (F12 console)
- ✅ Dark mode works
- ✅ Responsive on mobile

### 8. Test GitHub Actions

1. Go to: **Actions tab**
2. Find: "Update War Data" workflow
3. Click: **Run workflow**
4. Branch: `main`
5. Click: **Run workflow**
6. Wait for completion

### 9. Verify Data Update

1. Refresh dashboard
2. Check data loads
3. Verify war stats displayed
4. Check activity feed

## Post-Deployment

### Monitor Workflow Runs

```
Actions → Update War Data → (recent run)
```

Check logs untuk:
- ✅ Successful API calls
- ✅ Data updates
- ✅ Auto-commits

### Setup CI/CD Monitoring (Optional)

Add status badge ke README.md:

```markdown
[![Update War Data](https://github.com/YOUR_USERNAME/YOUR_REPO/workflows/Update%20War%20Data/badge.svg)](https://github.com/YOUR_USERNAME/YOUR_REPO/actions)
```

### Customize Domain (Optional)

#### Using Custom Domain

1. Buy domain (e.g., war.example.com)
2. Add DNS CNAME record:
   ```
   Name: war
   Type: CNAME
   Value: YOUR_USERNAME.github.io
   ```
3. Settings → Pages → Custom domain
4. Enter: `war.example.com`
5. Check "Enforce HTTPS"

#### Using Subdomain

1. DNS A records:
   ```
   185.199.108.153
   185.199.109.153
   185.199.110.153
   185.199.111.153
   ```
2. CNAME for www:
   ```
   www CNAME YOUR_USERNAME.github.io
   ```

## Optimization

### Minimize Data Files

Keep JSON files compact:

```json
{"warId":"...","state":"..."}
```

Instead of:

```json
{
  "warId": "...",
  "state": "..."
}
```

### Schedule Optimization

Balance automation vs rate limits:

| Interval | Requests/day | Recommendation |
|----------|--------------|-----------------|
| 1 min | 1,440 | ⚠️ Many requests |
| 5 min | 288 | ✅ **Recommended** |
| 10 min | 144 | ✅ Good |
| 15 min | 96 | ⭐ Relaxed |

**Recommended: 5 minutes**

### Performance

Current performance:
- 📦 Page size: ~50KB
- ⚡ Load time: <2s
- 📊 Update time: ~1s
- 🔄 Auto-refresh: 30s

## Scaling

### Multiple Clans

Edit script untuk fetch multiple clans:

```javascript
const CLAN_TAGS = ['#TAG1', '#TAG2', '#TAG3'];

for (const tag of CLAN_TAGS) {
  const data = await getWarData(tag);
  // Process each clan
}
```

### Database (Future)

Untuk advanced usage:

1. Add simple backend
2. Use Firebase (free tier)
3. Use Supabase PostgreSQL
4. Self-hosted option

## Security Checklist

- [ ] API key in GitHub Secrets (never in code)
- [ ] Repository HTTPS enabled
- [ ] IP whitelist configured
- [ ] No sensitive data in commits
- [ ] .gitignore includes secrets
- [ ] Regular key rotation planned

## Backup & Recovery

### Backup Data

```bash
# Manual backup
git clone --mirror https://github.com/YOUR_USERNAME/YOUR_REPO.git repo.git

# Or use GitHub's built-in backup
```

### Recover from Mistakes

```bash
# Undo last commit (not pushed)
git reset --soft HEAD~1

# Revert pushed commit
git revert HEAD
git push

# Restore file
git checkout HEAD~1 -- filename
git commit -m "Restore file"
git push
```

## Troubleshooting Deployment

### Website showing 404

**Solution:**
1. Check Pages enabled
2. Verify branch: `main`
3. Verify folder: `/docs`
4. Ensure `docs/index.html` exists

### Actions not running

**Solution:**
1. Check workflow file exists
2. Verify correct path
3. Check syntax (YAML format)
4. Test with manual trigger

### Data not appearing

**Solution:**
1. Check API key valid
2. Verify clan tag correct
3. Check war exists
4. Manual trigger workflow

## Migration

### Move to Different Repository

```bash
# Clone current repo
git clone --mirror https://github.com/OLD_REPO.git

# Push to new repo
cd OLD_REPO.git
git push --mirror https://github.com/NEW_REPO.git

# Update GitHub Pages settings in new repo
```

### Move to Different GitHub Account

Same as migration process above.

## Maintenance Schedule

### Daily
- [ ] Check website loads
- [ ] Verify data updates

### Weekly
- [ ] Review workflow logs
- [ ] Check API usage

### Monthly
- [ ] Update dependencies
- [ ] Rotate API key
- [ ] Review performance
- [ ] Check for updates

## Auto-Deployment from Updates

Current: Manual updates (push changes)

### Enable Auto-Deploy

GitHub Pages automatically redeploys on push:

```bash
git commit -m "Update config"
git push origin main
# Website auto-updates in ~1 minute
```

## Rollback

### Revert to Previous Version

```bash
git log --oneline -n 10
git revert <commit-hash>
git push origin main
```

## Performance Metrics

Monitor via GitHub Actions logs:

- API response time: <1s
- Data processing time: <1s
- Commit time: <5s
- Total workflow: <15s

Target: Complete update every 5 minutes

## Success Indicators

✅ **Green indicators:**

- [ ] Website loads < 2s
- [ ] Dashboard displays war stats
- [ ] Activity feed shows attacks
- [ ] Dark mode toggles smoothly
- [ ] Mobile view responsive
- [ ] Workflow runs successfully
- [ ] No console errors
- [ ] Data updates every 5 min

## Support & Resources

- 📚 [GitHub Pages Docs](https://docs.github.com/pages)
- 🤖 [GitHub Actions Docs](https://docs.github.com/actions)
- 🔐 [Secrets Docs](https://docs.github.com/actions/security-guides/encrypted-secrets)
- 🎮 [Clash API Docs](https://developer.clashofclans.com/api-docs)

---

**Congratulations!** 🎉 Your war tracking dashboard is live!
