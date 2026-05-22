#!/bin/bash
# START_HERE.md - Read this first!

# 🎮 CLASH OF CLANS WAR LIVE ACTIVITY DASHBOARD
# Complete Setup Guide - Start Here!

echo "
╔════════════════════════════════════════════════════════════════╗
║                                                                ║
║   ⚔️  CLASH OF CLANS WAR LIVE ACTIVITY DASHBOARD  ⚔️          ║
║                                                                ║
║   Powered by GitHub Pages + GitHub Actions                   ║
║   No Firebase • No VPS • Fully Automated                      ║
║                                                                ║
╚════════════════════════════════════════════════════════════════╝
"

## 📋 PROJECT STRUCTURE

echo "✅ PROJECT STRUCTURE:"
echo "
├── 🎨 FRONTEND (GitHub Pages)
│   └── docs/
│       ├── index.html (main dashboard)
│       ├── style.css (modern dark theme)
│       ├── script.js (frontend logic)
│       └── README.md (frontend docs)
│
├── ⚙️  BACKEND AUTOMATION (GitHub Actions)
│   ├── .github/workflows/update-war-data.yml (scheduler)
│   ├── scripts/update-war-data.js (API script)
│   └── package.json (dependencies)
│
├── 📊 DATA FILES (Auto-updated)
│   └── data/
│       ├── war-data.json (war statistics)
│       └── activity.json (activity feed)
│
└── 📚 DOCUMENTATION
    ├── README.md (main guide)
    ├── SETUP.md (github setup)
    ├── DEPLOYMENT.md (deploy guide)
    ├── API.md (api reference)
    ├── TROUBLESHOOTING.md (help)
    ├── QUICK_REFERENCE.md (quick lookup)
    └── PROJECT_SUMMARY.md (file list)
"

## 🚀 QUICK START (5 STEPS)

echo "
╔═══════════════════════════════════════════════════════════════╗
║              🚀 QUICK START - 5 STEPS ONLY 🚀                ║
╚═══════════════════════════════════════════════════════════════╝
"

echo "STEP 1️⃣  - GET API KEY"
echo "────────────────────────────────────────────"
echo "1. Go to: https://developer.clashofclans.com"
echo "2. Create New Application"
echo "3. Get API Key (save it!)"
echo "4. Whitelist IP: 0.0.0.0/0 (for GitHub Actions)"
echo ""

echo "STEP 2️⃣  - CREATE GITHUB REPO"
echo "────────────────────────────────────────────"
echo "1. Go to: https://github.com/new"
echo "2. Name: clash-coc-war-activity"
echo "3. Public repository"
echo "4. Create repository"
echo ""

echo "STEP 3️⃣  - CLONE & UPLOAD FILES"
echo "────────────────────────────────────────────"
echo "$ git clone https://github.com/YOUR_USERNAME/clash-coc-war-activity.git"
echo "$ cd clash-coc-war-activity"
echo ""
echo "Copy ALL project files to this folder"
echo ""

echo "STEP 4️⃣  - UPDATE CLAN TAG"
echo "────────────────────────────────────────────"
echo "1. Open: scripts/update-war-data.js"
echo "2. Find: const CLAN_TAG = '#XXXXXXXX'"
echo "3. Replace XXXXXXXX with your clan tag"
echo "   (Find in game: Clan Info → tag format #XXXXXXXX)"
echo ""

echo "STEP 5️⃣  - SETUP & DEPLOY"
echo "────────────────────────────────────────────"
echo "$ git add ."
echo "$ git commit -m 'Initial commit'"
echo "$ git push -u origin main"
echo ""
echo "Then:"
echo "1. GitHub: Settings → Secrets and variables → Actions"
echo "2. New secret: COC_KEY = (your api key)"
echo "3. Settings → Pages → Branch: main, Folder: /docs"
echo ""

## 📝 IMPORTANT FILES TO CHECK

echo "
╔═══════════════════════════════════════════════════════════════╗
║          📝 MUST-READ DOCUMENTATION FILES                    ║
╚═══════════════════════════════════════════════════════════════╝
"

echo "1️⃣  README.md"
echo "   → Main project documentation"
echo "   → Features & architecture overview"
echo "   → 10 minutes read"
echo ""

echo "2️⃣  SETUP.md"
echo "   → Step-by-step GitHub setup"
echo "   → GitHub Actions configuration"
echo "   → GitHub Secrets setup"
echo "   → MUST READ for first-time setup"
echo ""

echo "3️⃣  QUICK_REFERENCE.md"
echo "   → Fast lookup for configs"
echo "   → Key configurations"
echo "   → Keyboard shortcuts"
echo "   → Common commands"
echo ""

echo "4️⃣  API.md"
echo "   → Clash of Clans API documentation"
echo "   → How to get API key"
echo "   → Rate limits & best practices"
echo ""

echo "5️⃣  TROUBLESHOOTING.md"
echo "   → Solve common problems"
echo "   → GitHub Actions issues"
echo "   → Frontend errors"
echo "   → Data issues"
echo ""

echo "6️⃣  DEPLOYMENT.md"
echo "   → Production deployment"
echo "   → Custom domains"
echo "   → Optimization tips"
echo ""

## 🔧 KEY CONFIGURATIONS

echo "
╔═══════════════════════════════════════════════════════════════╗
║              🔧 KEY CONFIGURATIONS TO UPDATE                 ║
╚═══════════════════════════════════════════════════════════════╝
"

echo "1. CLAN TAG (REQUIRED)"
echo "   File: scripts/update-war-data.js"
echo "   Line: const CLAN_TAG = '#XXXXXXXX';"
echo "   Action: Replace with your clan tag"
echo ""

echo "2. API KEY (REQUIRED)"
echo "   GitHub: Settings → Secrets and variables → Actions"
echo "   Secret: COC_KEY = (your api key from developer.clashofclans.com)"
echo ""

echo "3. WORKFLOW SCHEDULE (OPTIONAL)"
echo "   File: .github/workflows/update-war-data.yml"
echo "   Default: Every 5 minutes (recommended)"
echo "   Change: Modify cron expression if needed"
echo ""

echo "4. REFRESH INTERVAL (OPTIONAL)"
echo "   File: docs/script.js"
echo "   Default: 30 seconds"
echo "   Change: Modify REFRESH_INTERVAL value"
echo ""

## ✨ FEATURES INCLUDED

echo "
╔═══════════════════════════════════════════════════════════════╗
║                  ✨ FEATURES INCLUDED                        ║
╚═══════════════════════════════════════════════════════════════╝
"

echo "✅ DASHBOARD"
echo "   • Modern dark mode UI"
echo "   • Real-time war statistics"
echo "   • Clan vs enemy comparison"
echo "   • Live activity feed"
echo "   • Members not attacked list"
echo "   • Destruction percentage tracking"
echo "   • Stars counter"
echo ""

echo "✅ AUTOMATION"
echo "   • Auto-fetch every 5 minutes"
echo "   • Auto-detect new attacks"
echo "   • Auto-update JSON data"
echo "   • Auto-commit to GitHub"
echo "   • Auto-deploy to GitHub Pages"
echo ""

echo "✅ UI/UX"
echo "   • Responsive mobile design"
echo "   • Smooth animations"
echo "   • Dark/light mode toggle"
echo "   • Loading states"
echo "   • Toast notifications"
echo "   • Keyboard shortcuts"
echo ""

echo "✅ DEVELOPER-FRIENDLY"
echo "   • Clean vanilla JavaScript (no frameworks)"
echo "   • Well-commented code"
echo "   • Easy to customize"
echo "   • Comprehensive documentation"
echo "   • Troubleshooting guide included"
echo ""

## 🎯 GETTING YOUR CLAN TAG

echo "
╔═══════════════════════════════════════════════════════════════╗
║            🎯 HOW TO GET YOUR CLAN TAG                       ║
╚═══════════════════════════════════════════════════════════════╝
"

echo "Method 1: In-Game"
echo "1. Open Clash of Clans app"
echo "2. Open your clan"
echo "3. Look below the clan name"
echo "4. Format: #XXXXXXXX (8 characters, starts with #)"
echo "Example: #2PQ2QQUL2"
echo ""

echo "Method 2: From Website"
echo "1. Search your clan on: clashofclans.com"
echo "2. Clan tag shown in profile"
echo ""

## 🌐 AFTER DEPLOYMENT

echo "
╔═══════════════════════════════════════════════════════════════╗
║            🌐 AFTER DEPLOYMENT - NEXT STEPS                 ║
╚═══════════════════════════════════════════════════════════════╝
"

echo "✅ YOUR WEBSITE URL"
echo "   https://YOUR_USERNAME.github.io/clash-coc-war-activity"
echo ""

echo "✅ SHARE WITH CLAN"
echo "   1. Copy website URL"
echo "   2. Share in clan Discord/chat"
echo "   3. Members can view live war tracking"
echo ""

echo "✅ MONITOR WORKFLOW"
echo "   1. Go to: GitHub repo → Actions tab"
echo "   2. Watch 'Update War Data' runs"
echo "   3. Check logs for any errors"
echo ""

echo "✅ CUSTOMIZE (OPTIONAL)"
echo "   • Edit colors in docs/style.css"
echo "   • Change refresh intervals"
echo "   • Modify UI layout in docs/index.html"
echo ""

## 🐛 TROUBLESHOOTING

echo "
╔═══════════════════════════════════════════════════════════════╗
║            🐛 COMMON ISSUES & QUICK FIXES                   ║
╚═══════════════════════════════════════════════════════════════╝
"

echo "❌ WEBSITE SHOWING 404"
echo "✅ Solution: Check GitHub Pages settings (Settings → Pages)"
echo "   → Branch: main"
echo "   → Folder: /docs"
echo ""

echo "❌ DATA NOT UPDATING"
echo "✅ Solution: Check API key in GitHub Secrets"
echo "   → Settings → Secrets and variables → Actions"
echo "   → Verify COC_KEY secret exists"
echo ""

echo "❌ WORKFLOW NOT RUNNING"
echo "✅ Solution: Check workflow file permissions"
echo "   → Actions tab → Enable workflows"
echo "   → Check .github/workflows/update-war-data.yml exists"
echo ""

echo "❌ STILL STUCK?"
echo "✅ Read: TROUBLESHOOTING.md (comprehensive help guide)"
echo ""

## 📞 SUPPORT RESOURCES

echo "
╔═══════════════════════════════════════════════════════════════╗
║             📞 SUPPORT & RESOURCES                           ║
╚═══════════════════════════════════════════════════════════════╝
"

echo "📚 DOCUMENTATION"
echo "   • README.md - Main guide"
echo "   • SETUP.md - GitHub setup"
echo "   • TROUBLESHOOTING.md - Error solutions"
echo "   • API.md - API reference"
echo ""

echo "🔗 EXTERNAL LINKS"
echo "   • Clash API Docs: https://developer.clashofclans.com/api-docs"
echo "   • GitHub Pages: https://docs.github.com/pages"
echo "   • GitHub Actions: https://docs.github.com/actions"
echo ""

echo "💡 TIPS"
echo "   1. Start with SETUP.md"
echo "   2. Use QUICK_REFERENCE.md for fast lookup"
echo "   3. Check TROUBLESHOOTING.md if you get errors"
echo "   4. Read inline code comments for understanding"
echo ""

## ✅ VERIFICATION CHECKLIST

echo "
╔═══════════════════════════════════════════════════════════════╗
║          ✅ VERIFICATION CHECKLIST - RUN THIS                ║
╚═══════════════════════════════════════════════════════════════╝
"

echo "Project files:"
echo "  ✅ .github/workflows/update-war-data.yml"
echo "  ✅ scripts/update-war-data.js"
echo "  ✅ docs/index.html"
echo "  ✅ docs/style.css"
echo "  ✅ docs/script.js"
echo "  ✅ data/war-data.json"
echo "  ✅ data/activity.json"
echo "  ✅ package.json"
echo ""

echo "Documentation:"
echo "  ✅ README.md"
echo "  ✅ SETUP.md"
echo "  ✅ DEPLOYMENT.md"
echo "  ✅ API.md"
echo "  ✅ TROUBLESHOOTING.md"
echo "  ✅ QUICK_REFERENCE.md"
echo ""

## 🎉 READY?

echo "
╔═══════════════════════════════════════════════════════════════╗
║                    🎉 YOU'RE READY! 🎉                      ║
╚═══════════════════════════════════════════════════════════════╝
"

echo "Next steps:"
echo "1. Read SETUP.md (20 minutes)"
echo "2. Follow the 5-step quick start"
echo "3. Deploy to GitHub Pages"
echo "4. Share with your clan!"
echo ""
echo "Happy clan tracking! ⚔️"
echo ""
