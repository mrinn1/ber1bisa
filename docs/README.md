# Frontend Documentation

## Overview

Dashboard frontend untuk Clash of Clans War Live Activity menggunakan vanilla JavaScript, HTML5, dan CSS3 modern.

## Features

### UI Components

#### Header
- Title dengan gradient effect
- Live indicator (animated pulse)
- Refresh button dengan animasi
- Dark mode toggle
- Last updated timestamp

#### War Status Cards
- Clan statistics (stars, destruction, level, members)
- Enemy statistics
- Progress bars dengan animasi
- Real-time updates

#### Attack Statistics
- Total attacks performed
- Remaining attacks
- War status indicator
- Time remaining

#### Members Not Attacked
- Grid layout responsive
- Member name dan level
- Town Hall display
- Map position

#### Activity Feed
- Real-time attack notifications
- Activity type icons
- Timestamp (relative time)
- Stars dan destruction display
- Smooth slide-in animation

### Features

- 🎨 Dark mode dengan localStorage persistence
- 📱 Fully responsive design
- ⚡ Auto-refresh setiap 30 detik
- 🔄 Manual refresh button
- 🎯 Smooth animations
- ♿ Accessibility support
- ⌨️ Keyboard shortcuts

## File Structure

```
docs/
├── index.html      # Main HTML structure
├── style.css       # All styling
├── script.js       # Frontend logic
└── README.md       # This file
```

## HTML Structure

### Main Sections

1. **Loading Overlay** - Ditampilkan saat initial load
2. **Header** - Title, controls, last update info
3. **Main Content**
   - War Status Section (Clan vs Enemy)
   - Attack Statistics
   - Members Not Attacked
   - Activity Feed
4. **Footer** - Auto-refresh info
5. **Toast** - Notification container

## Styling

### CSS Architecture

- **Variables** - Color, spacing, shadows
- **Global Styles** - Base elements
- **Component Styles** - Cards, buttons, etc
- **Responsive** - Mobile-first approach
- **Animations** - Smooth transitions

### Dark Mode

Implemented menggunakan CSS custom properties dan body class:

```javascript
body.light-mode {
  --bg-primary: var(--bg-primary-light);
  // ...
}
```

Toggle dengan localStorage:
```javascript
localStorage.setItem('darkMode', 'true');
```

## JavaScript

### Main Functions

- `formatTime(isoString)` - Format ISO to readable time
- `formatRelativeTime(isoString)` - Format "2m ago" style
- `showToast(message, type)` - Show notifications
- `updateWarStats(data)` - Update war statistics
- `updateActivityFeed(data)` - Render activities
- `updateMembersNotAttacked(data)` - Render members
- `fetchWarData()` - Fetch war-data.json
- `fetchActivityData()` - Fetch activity.json
- `updateAllData()` - Update all UI
- `setupAutoRefresh()` - Start auto-refresh

### Auto-Refresh System

```javascript
// Initial update
updateAllData();

// Setup interval
refreshTimer = setInterval(updateAllData, 30000);
```

Data di-fetch setiap 30 detik dari JSON files di `/data/` folder.

### Event Listeners

- Refresh button click
- Dark mode toggle click
- Keyboard shortcuts (Ctrl+R, Ctrl+D)
- Window beforeunload (cleanup)

## Data Format

Data diambil dari 2 JSON files:

### war-data.json
```json
{
  "warId": "...",
  "state": "inWar|preparation|warEnded",
  "clan": {
    "name": "...",
    "tag": "#XXXXXXXX",
    "stars": 0,
    "destruction": 0,
    "level": 0,
    "memberCount": 0,
    "attacks": 0
  },
  "opponent": { ... },
  "totalAttacks": 0,
  "remainingAttacks": {
    "used": 0,
    "max": 0,
    "remaining": 0,
    "percentage": 0
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
      "type": "attack|update",
      "attacker": "Player Name",
      "defender": "#12345",
      "stars": 3,
      "destruction": 100,
      "duration": 148,
      "timestamp": "2024-01-01T18:29:45.000Z",
      "status": "new|updated"
    }
  ],
  "lastUpdated": "2024-01-01T18:30:00.000Z"
}
```

## Customization

### Colors

Edit `:root` di `style.css`:

```css
:root {
  --primary: #FF6B35;
  --secondary: #004E89;
  --accent: #00D9FF;
  // ...
}
```

### Refresh Interval

Edit `CONFIG.REFRESH_INTERVAL` di `script.js`:

```javascript
REFRESH_INTERVAL: 30000, // 30 detik
```

### Timezone

Edit `CONFIG.TIMEZONE` di `script.js`:

```javascript
TIMEZONE: 'en-US', // Ubah sesuai kebutuhan
```

### Font

Edit `body` font-family di `style.css`:

```css
body {
  font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
}
```

## Performance

### Optimizations

- CSS variables untuk cepat theme switching
- Efficient DOM queries dengan caching
- Minimal reflows/repaints
- Lazy animation dengan CSS transforms
- Event delegation dimana possible
- JSON fetch dengan parallel Promise.all()

### Load Time

- Inline CSS (no external stylesheets)
- Vanilla JS (no frameworks)
- Optimized images/icons (text-based)
- Minify-ready code

## Browser Support

- Chrome/Edge 90+
- Firefox 88+
- Safari 14+
- Mobile browsers (iOS Safari, Chrome Mobile)

## Accessibility

- Semantic HTML5
- ARIA labels di buttons
- Color contrast compliant
- Keyboard navigation support
- Screen reader friendly

## Testing

### Manual Testing

1. **Visual Test**
   - Check semua sections render correctly
   - Verify dark mode toggle
   - Test responsive pada berbagai ukuran

2. **Functional Test**
   - Click refresh button
   - Trigger auto-refresh
   - Test keyboard shortcuts
   - Check notifications

3. **Data Test**
   - Verify data parsing
   - Check number formatting
   - Validate date/time display

### Browser DevTools

Gunakan Chrome DevTools untuk:
- Check network requests
- Inspect console errors
- Performance profiling
- Mobile emulation

## Common Issues

### Data tidak update
- Cek fetch URL path
- Verify JSON file exists
- Check browser console untuk errors

### Styling tidak apply
- Clear cache (Ctrl+Shift+Delete)
- Check CSS file link
- Verify no syntax errors

### Dark mode tidak work
- Check localStorage permissions
- Verify body class toggling
- Inspect CSS variables

## Browser Console API

Debug di console:

```javascript
// Fetch data manually
fetchWarData().then(data => console.log(data));

// Update UI
updateAllData();

// Check config
console.log(CONFIG);

// View current data
console.log(warData, activityData);
```

## Future Enhancements

- [ ] Chart untuk statistics trend
- [ ] Search/filter di activity feed
- [ ] Export data ke CSV
- [ ] Push notifications
- [ ] Multiple clans tracking
- [ ] Attack recommendations
- [ ] War history archive
- [ ] Member statistics

---

**Last Updated:** 2024
