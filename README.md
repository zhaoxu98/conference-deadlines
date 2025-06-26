# Personal Conference Deadlines

[![Build Status](https://img.shields.io/github/actions/workflow/status/YOUR_USERNAME/personal-conference-deadlines/.github/workflows/deploy.yml?branch=main)](https://github.com/YOUR_USERNAME/personal-conference-deadlines/actions)
[![License](https://img.shields.io/github/license/YOUR_USERNAME/personal-conference-deadlines)](LICENSE)

A clean, modern personal conference deadline tracker for academics and researchers.

## 🌟 Features

- **Clean & Modern UI** - Beautiful gradient design with glassmorphism effects
- **Real-time Countdown** - Live countdown timers for all deadlines
- **Smart Status Indicators** - Color-coded urgency levels (safe, warning, urgent, overdue)
- **Calendar Integration** - One-click export to Google Calendar and .ics files
- **Search & Filter** - Quick search and tag-based filtering
- **Mobile Responsive** - Works perfectly on all devices
- **Easy Customization** - Simple YAML file for adding your conferences

## 🚀 Quick Start

### 1. Fork & Clone
```bash
git clone https://github.com/YOUR_USERNAME/personal-conference-deadlines.git
cd personal-conference-deadlines
```

### 2. Install Dependencies
```bash
npm install
```

### 3. Customize Your Conferences
Edit `src/components/ConferenceTracker.vue` to add your conferences:

```javascript
conferences: [
  {
    title: "ICML",
    description: "International Conference on Machine Learning",
    website: "https://icml.cc/2025",
    deadlines: [
      { type: "abstract", date: "2025-02-01 23:59:59", timezone: "AoE" },
      { type: "full_paper", date: "2025-02-08 23:59:59", timezone: "AoE" }
    ],
    conference_date: "July 21-27, 2025",
    location: "Vienna, Austria",
    tags: ["AI", "ML"]
  }
]
```

### 4. Run Development Server
(Skip this step if you just want to deploy to GitHub Pages)
```bash
npm run serve
```

### 5. Deploy to GitHub Pages
- Enable GitHub Pages in your repository settings
- Push to main branch - GitHub Actions will automatically build and deploy
- Open Settings > Pages, and set the source to `gh-pages` branch (you may also set a custom domain)

## 📝 Conference Data Format

Each conference entry should include:

| Field | Type | Required | Description |
|-------|------|----------|-------------|
| `title` | String | ✅ | Conference acronym (e.g., "ICML") |
| `description` | String | ✅ | Full conference name |
| `website` | String | ✅ | Conference website URL |
| `deadlines` | Array | ✅ | List of deadline objects |
| `conference_date` | String | ✅ | When the conference takes place |
| `location` | String | ✅ | Conference location |
| `tags` | Array | ✅ | Subject tags for filtering |

### Deadline Object Format:
```javascript
{
  type: "abstract",          // abstract, full_paper, paper, registration
  date: "2025-02-01 23:59:59",
  timezone: "AoE"           // AoE, UTC, PST, etc.
}
```

## 🎨 Customization

### Color Scheme
Edit the CSS variables in `src/App.vue` to change the color scheme:

```css
/* Background gradient */
background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);

/* Card colors in ConferenceCard.vue */
.countdown.safe { background: #c6f6d5; color: #22543d; }
.countdown.warning { background: #fed7d7; color: #822727; }
.countdown.urgent { background: #feb2b2; color: #742a2a; }
.countdown.overdue { background: #fc8181; color: #742a2a; }
```

### Adding Custom Domains
Update the `cname` field in `.github/workflows/deploy.yml`:

```yaml
- name: Deploy to GitHub Pages
  uses: peaceiris/actions-gh-pages@v3
  with:
    github_token: ${{ secrets.GITHUB_TOKEN }}
    publish_dir: ./dist
    cname: your-domain.com
```

## 📱 Mobile Support

The tracker is fully responsive and includes:
- Touch-friendly interface
- Optimized layouts for mobile screens
- Fast loading times
- Smooth animations

## 🛠️ Development

### Project Structure
```
src/
├── App.vue                 # Main app component
├── main.js                 # Vue entry point
├── components/
│   ├── ConferenceTracker.vue  # Main tracker component
│   └── ConferenceCard.vue     # Individual conference cards
└── data/
    └── conferences.yml     # Your conference data
```

### Available Scripts
```bash
npm run serve   # Development server
npm run build   # Production build
npm run lint    # Lint and fix files
```

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🙏 Acknowledgments

- Inspired by [CCF-Deadlines](https://github.com/ccfddl/ccf-deadlines)
- Built with [Cursor](https://www.cursor.com/)
- Icons from emoji set

---

**Made with ❤️ for the academic community**
