# Troubleshooting Guide

Panduan untuk mengatasi berbagai masalah yang mungkin terjadi.

## GitHub Actions Issues

### Workflow tidak jalan

**Problem:** Workflow "Update War Data" tidak jalan sesuai jadwal

**Solutions:**

1. **Check workflow file exists**
   ```
   .github/workflows/update-war-data.yml
   ```

2. **Verify workflow syntax**
   - Cek indentation YAML
   - Gunakan YAML validator online
   - Check di Actions tab untuk error

3. **Enable Actions**
   - Settings → Actions → General
   - Actions permissions: "Allow all actions and reusable workflows"

4. **Check schedule**
   - Cron syntax: `*/5 * * * *` (every 5 minutes)
   - Test dengan `workflow_dispatch`

### Workflow failed: "404 Not Found"

**Problem:** Workflow error mencari file yang tidak ditemukan

**Solutions:**

1. **Check file paths** di workflow file
   ```yaml
   run: node scripts/update-war-data.js
   ```

2. **Verify files exist**
   - scripts/update-war-data.js
   - package.json

3. **Check working directory**
   - Default: repository root
   - Add `working-directory` jika needed

### Workflow failed: "401 Unauthorized"

**Problem:** API key tidak valid atau secret tidak diset

**Solutions:**

1. **Verify secret exists**
   - Settings → Secrets and variables → Actions
   - Check `COC_KEY` ada di list

2. **Check API key valid**
   - Login ke developer.clashofclans.com
   - Generate new key jika expired
   - Update secret

3. **Verify secret format**
   - Should be just the key, no extra spaces
   - Edit secret untuk update

### Workflow failed: "Network error"

**Problem:** Cannot connect to Clash of Clans API

**Solutions:**

1. **Check API endpoint**
   - URL: `https://api.clashofclans.com/v1`
   - Should be accessible globally

2. **Check IP whitelist**
   - Login to developer portal
   - Check API key settings
   - Whitelist: `0.0.0.0/0` untuk GitHub Actions

3. **Check rate limits**
   - API calls every 5 minutes = 288/day
   - Limit: 20,000/day
   - Should be OK

4. **Test manually**
   ```bash
   curl -H "Authorization: Bearer YOUR_API_KEY" \
     https://api.clashofclans.com/v1/clans/%232PQ2QQUL2/currentwar
   ```

## GitHub Pages Issues

### Website showing 404

**Problem:** Website tidak ditemukan

**Solutions:**

1. **Check Pages settings**
   - Settings → Pages
   - Branch: `main`
   - Folder: `/docs`
   - Click Save

2. **Verify index.html exists**
   ```
   docs/index.html
   ```

3. **Wait for deployment**
   - Initial deploy: ~2 menit
   - Subsequent: ~1 menit
   - Check "Deployments" tab

4. **Check DNS**
   - For custom domain: verify CNAME record
   - For default: should work automatically

### Website showing file not found

**Problem:** CSS/JS files tidak loading

**Solutions:**

1. **Check file paths in HTML**
   ```html
   <link rel="stylesheet" href="style.css">
   <script src="script.js"></script>
   ```

2. **Verify files exist**
   - docs/style.css
   - docs/script.js

3. **Check file permissions**
   - Should be readable by public
   - Repository must be public

4. **Clear browser cache**
   - Ctrl+Shift+Delete
   - Or use Incognito mode

### CORS errors

**Problem:** "Access to XMLHttpRequest blocked by CORS policy"

**Solutions:**

1. **Should not happen** since files are in same repo
2. **Check fetch URLs** in script.js
   ```javascript
   DATA_URL_WAR: '../data/war-data.json'
   ```

3. **Verify file location**
   - data/war-data.json
   - data/activity.json

## Frontend Issues

### Dashboard shows "Loading" forever

**Problem:** Loading overlay tidak hilang

**Solutions:**

1. **Check console** (F12 → Console)
   - Look untuk error messages
   - Check network tab untuk failed requests

2. **Verify JSON files exist**
   - data/war-data.json
   - data/activity.json

3. **Check JSON format**
   - Must be valid JSON
   - Use JSON validator online
   - Check for syntax errors

4. **Manual test**
   ```javascript
   // Di console
   fetch('../data/war-data.json').then(r => r.json()).then(console.log)
   ```

### Data shows placeholder values

**Problem:** Data menampilkan "Loading...", "0", atau "--"

**Solutions:**

1. **Check GitHub Actions ran**
   - Actions tab → workflow runs
   - Should have recent successful run

2. **Verify data updated**
   - Check data/war-data.json
   - Should have actual data, not placeholder

3. **Manual trigger workflow**
   - Actions → Update War Data
   - Run workflow → Run

4. **Check API permissions**
   - Verify clan tag correct
   - Verify API key has war permission

### Dark mode not working

**Problem:** Dark mode toggle tidak berpengaruh

**Solutions:**

1. **Check localStorage**
   ```javascript
   // Di console
   localStorage.getItem('darkMode')
   ```

2. **Clear localStorage**
   ```javascript
   localStorage.clear()
   ```

3. **Check CSS variables**
   - Inspect element (F12)
   - Check if --bg-primary value changes

4. **Verify JavaScript running**
   - Console: no JavaScript errors
   - Check network tab untuk script.js

### Mobile layout broken

**Problem:** Website tidak responsive pada mobile

**Solutions:**

1. **Check viewport meta tag**
   ```html
   <meta name="viewport" content="width=device-width, initial-scale=1.0">
   ```

2. **Test responsive**
   - Chrome DevTools → Toggle device toolbar
   - Test di actual mobile device

3. **Check CSS media queries**
   - style.css should have responsive rules
   - Check @media (max-width: 768px)

4. **Check console**
   - Mungkin ada JavaScript error
   - Check network tab

### Keyboard shortcuts not working

**Problem:** Ctrl+R atau Ctrl+D tidak bekerja

**Solutions:**

1. **Check focus**
   - Click pada page first
   - Some browser/OS might intercept

2. **Verify JavaScript loaded**
   - Check script.js di network tab
   - Check console untuk errors

3. **Test in different browser**
   - Might be browser-specific

## Data Issues

### Activity feed empty

**Problem:** Activity feed tidak menampilkan activities

**Solutions:**

1. **First run expected**
   - Initial runs mungkin tidak ada activities
   - Wait untuk war progress
   - Trigger workflow manual untuk test

2. **Check activity.json**
   - Should be populated oleh workflow
   - Check if workflow ran successfully

3. **Verify data format**
   - activities array harus ada
   - Check JSON structure

### Members list wrong

**Problem:** Members not attacked list tidak akurat

**Solutions:**

1. **Check war state**
   - Only shows di in-war state
   - Check data/war-data.json state value

2. **Verify API data**
   - Test API call manually
   - Check members list accuracy

3. **Check clan tag**
   - Verify correct clan tag di script
   - Format: #XXXXXXXX

### Timestamps incorrect

**Problem:** Waktu menampilkan salah

**Solutions:**

1. **Check timezone setting**
   ```javascript
   TIMEZONE: 'en-US'
   ```

2. **Verify system time**
   - Server system time should be UTC
   - GitHub Actions use UTC

3. **Check time format**
   - ISO format harus correct
   - Should be: YYYY-MM-DDTHH:mm:ss.SSSZ

## Development/Testing

### Test workflow locally

```bash
# Install dependencies
npm install

# Run script
COC_KEY=your_key node scripts/update-war-data.js
```

### Debug frontend

```javascript
// Di browser console

// Check config
console.log(CONFIG)

// Fetch data manually
fetchWarData().then(d => console.log(d))

// Update UI manually
updateAllData()

// Check stored data
console.log(warData)
console.log(activityData)
```

### Check API manually

```bash
# Get clan war data
curl -H "Authorization: Bearer YOUR_KEY" \
  https://api.clashofclans.com/v1/clans/%23CLAN_TAG/currentwar

# Replace:
# %23 = URL encoded #
# CLAN_TAG = your clan tag (without #)
```

## Performance Issues

### Website slow

**Problem:** Website load/response slow

**Solutions:**

1. **Check network tab**
   - F12 → Network
   - Check request times
   - Large files loading slow?

2. **Check file sizes**
   - style.css should be <50KB
   - script.js should be <20KB
   - index.html should be <10KB

3. **Browser dev tools**
   - Performance tab
   - Record trace
   - Check what taking long

### Dashboard updates slow

**Problem:** Data refresh lambat

**Solutions:**

1. **Check refresh interval**
   - Frontend: 30 seconds
   - Actions: 5 minutes
   - Adjust if needed

2. **Check API response**
   - API call might be slow
   - Check rate limits

3. **Check network**
   - Your internet connection
   - GitHub server availability

## Getting Help

### Check Logs

1. **GitHub Actions logs**
   - Actions tab → workflow run
   - Click job
   - Expand failed step

2. **Browser console**
   - F12 → Console tab
   - Look untuk error messages
   - Red = error, Yellow = warning

3. **Network tab**
   - F12 → Network tab
   - Check request status
   - 200 = success, 404 = not found, 500 = error

### Ask for Help

1. **GitHub Issues**
   - Create issue dengan deskripsi
   - Include error message
   - Include steps to reproduce

2. **Documentation**
   - Check README.md
   - Check SETUP.md
   - Check inline comments in code

3. **Test Files**
   - Include package.json
   - Include relevant error logs
   - Include console screenshot

---

**Still stuck?** Check error message carefully - usually contains the solution!
