# 📅 Personal Conference Deadlines

<div align="center">

[![Build Status](https://img.shields.io/github/actions/workflow/status/YOUR_USERNAME/conference-deadlines/.github/workflows/deploy.yml?branch=main)](https://github.com/YOUR_USERNAME/conference-deadlines/actions)
[![License](https://img.shields.io/github/license/YOUR_USERNAME/conference-deadlines)](LICENSE)
[![Stars](https://img.shields.io/github/stars/YOUR_USERNAME/conference-deadlines?style=social)](https://github.com/YOUR_USERNAME/conference-deadlines/stargazers)
[![Forks](https://img.shields.io/github/forks/YOUR_USERNAME/conference-deadlines?style=social)](https://github.com/YOUR_USERNAME/conference-deadlines/network/members)

**A beautiful, modern personal conference deadline tracker for academics and researchers**

[🎯 Live Demo](#) • [🚀 Quick Start](#-quick-start) • [📖 Documentation](#-conference-data-format) • [🤝 Contributing](#-contributing)

*Never miss another conference deadline again! ⭐ Star this repo to show your support!*

![Conference Deadlines Preview](https://via.placeholder.com/800x400/667eea/ffffff?text=Your+Conference+Deadlines+Preview)

</div>

---

## 🎯 Why Use This Tracker?

Are you tired of:
- ❌ Missing important conference deadlines?
- ❌ Juggling multiple calendar apps and sticky notes?
- ❌ Forgetting abstract vs. full paper deadlines?
- ❌ Losing track of timezone differences?

**This tracker solves all of these problems!** ✨

### 🌟 Key Features

- 🎨 **Beautiful Modern UI** - Clean gradient design with glassmorphism effects that's easy on the eyes
- ⏰ **Real-time Countdown** - Live countdown timers showing days, hours, minutes, and seconds remaining
- 🚦 **Smart Status Indicators** - Color-coded urgency levels (🟢 safe, 🟡 warning, 🔴 urgent, ⚫ overdue)
- 📅 **Calendar Integration** - One-click export to Google Calendar and download .ics files
- 🔍 **Advanced Search & Filter** - Quick search by conference name and tag-based filtering
- 📱 **Mobile Responsive** - Perfect experience on desktop, tablet, and mobile devices
- ⚙️ **Easy Customization** - Simple JSON configuration for adding your conferences
- 🌐 **Timezone Aware** - Supports multiple timezones (AoE, UTC, PST, EST, etc.)
- 🎯 **Multiple Deadline Types** - Track abstract, full paper, and registration deadlines separately
- 🏷️ **Tag System** - Organize conferences by research areas (AI, ML, NLP, CV, etc.)

## 📸 Screenshots

### Desktop View
![Desktop View](https://via.placeholder.com/800x500/667eea/ffffff?text=Desktop+View+-+Beautiful+Cards+Layout)

### Mobile View
![Mobile View](https://via.placeholder.com/400x600/764ba2/ffffff?text=Mobile+View+-+Responsive+Design)

## 🚀 Quick Start

### Option 1: One-Click Deploy (Recommended)

1. **⭐ Star this repository** (it really helps!)
2. **Fork** this repository to your GitHub account
3. **Enable GitHub Pages** in your repository settings
4. **Customize** your conferences by editing the data
5. **Deploy** automatically with GitHub Actions

### Option 2: Local Development

```bash
# 1. Clone your forked repository
git clone https://github.com/YOUR_USERNAME/conference-deadlines.git
cd conference-deadlines

# 2. Install dependencies
npm install

# 3. Start development server
npm run serve

# 4. Open http://localhost:8080 in your browser
```

## 📝 Adding Your Conferences

Edit `src/components/ConferenceTracker.vue` and add your conferences to the `conferences` array:

```javascript
conferences: [
  {
    title: "ICML 2025",
    description: "International Conference on Machine Learning",
    website: "https://icml.cc/2025",
    deadlines: [
      { 
        type: "abstract", 
        date: "2025-02-01 23:59:59", 
        timezone: "AoE" 
      },
      { 
        type: "full_paper", 
        date: "2025-02-08 23:59:59", 
        timezone: "AoE" 
      }
    ],
    conference_date: "July 21-27, 2025",
    location: "Vienna, Austria",
    tags: ["AI", "ML", "Top-Tier"]
  },
  {
    title: "NeurIPS 2025",
    description: "Neural Information Processing Systems",
    website: "https://neurips.cc/",
    deadlines: [
      { 
        type: "paper", 
        date: "2025-05-15 13:00:00", 
        timezone: "PDT" 
      }
    ],
    conference_date: "December 8-14, 2025",
    location: "New Orleans, USA",
    tags: ["AI", "ML", "Deep Learning", "Top-Tier"]
  }
]
```

## 📊 Conference Data Reference

### Required Fields

| Field | Type | Description | Example |
|-------|------|-------------|---------|
| `title` | String | Conference name/acronym | `"ICML 2025"` |
| `description` | String | Full conference name | `"International Conference on Machine Learning"` |
| `website` | String | Official conference website | `"https://icml.cc/2025"` |
| `deadlines` | Array | List of important deadlines | See deadline format below |
| `conference_date` | String | When the conference occurs | `"July 21-27, 2025"` |
| `location` | String | Conference venue | `"Vienna, Austria"` |
| `tags` | Array | Research area tags | `["AI", "ML", "Top-Tier"]` |

### Deadline Object Format

```javascript
{
  type: "abstract",           // Options: "abstract", "full_paper", "paper", "registration"
  date: "2025-02-01 23:59:59", // Format: YYYY-MM-DD HH:MM:SS
  timezone: "AoE"             // Options: "AoE", "UTC", "PST", "EST", "PDT", etc.
}
```

### Supported Deadline Types

- 📄 **abstract** - Abstract submission deadline
- 📑 **full_paper** - Full paper submission deadline  
- 📋 **paper** - General paper deadline
- 🎫 **registration** - Registration deadline

### Supported Timezones

- 🌍 **AoE** - Anywhere on Earth (most common for conferences)
- 🌐 **UTC** - Coordinated Universal Time
- 🇺🇸 **PST/PDT** - Pacific Standard/Daylight Time
- 🇺🇸 **EST/EDT** - Eastern Standard/Daylight Time
- 🇪🇺 **CET/CEST** - Central European Time

## 🎨 Customization Guide

### 🎯 Color Themes

Customize the visual appearance by editing `src/App.vue`:

```css
/* Main gradient background */
background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);

/* Alternative color schemes */
/* Blue Ocean: linear-gradient(135deg, #74b9ff 0%, #0984e3 100%); */
/* Sunset: linear-gradient(135deg, #fd79a8 0%, #fdcb6e 100%); */
/* Forest: linear-gradient(135deg, #00b894 0%, #00cec9 100%); */
```

### 🚦 Status Colors

Modify urgency indicators in `src/components/ConferenceCard.vue`:

```css
.countdown.safe { background: #c6f6d5; color: #22543d; }    /* > 30 days */
.countdown.warning { background: #fed7d7; color: #822727; } /* 7-30 days */
.countdown.urgent { background: #feb2b2; color: #742a2a; }  /* 1-7 days */
.countdown.overdue { background: #fc8181; color: #742a2a; } /* Past due */
```

### 🏷️ Popular Tag Examples

Organize your conferences with relevant tags:

- **AI Research**: `["AI", "ML", "Deep Learning", "Neural Networks"]`
- **Computer Vision**: `["CV", "Image Processing", "Computer Vision"]`  
- **Natural Language**: `["NLP", "Text Mining", "Language Models"]`
- **Conference Tiers**: `["Top-Tier", "Core", "Regional"]`
- **Venues**: `["Journal", "Conference", "Workshop"]`

## 🌐 Deployment Options

### GitHub Pages (Free & Easy)

1. Fork this repository
2. Go to Settings → Pages
3. Set source to "Deploy from a branch"
4. Select `gh-pages` branch
5. Your site will be available at `https://YOUR_USERNAME.github.io/conference-deadlines/`

### Custom Domain

Add a `CNAME` file to your repository root:
```
your-domain.com
```

Or modify `.github/workflows/deploy.yml`:
```yaml
- name: Deploy to GitHub Pages
  uses: peaceiris/actions-gh-pages@v3
  with:
    github_token: ${{ secrets.GITHUB_TOKEN }}
    publish_dir: ./dist
    cname: your-domain.com
```

## 🛠️ Development Guide

### Project Structure

```
conference-deadlines/
├── public/
│   ├── index.html          # Main HTML template
│   └── favicon.ico         # Site icon
├── src/
│   ├── App.vue            # Root component with global styles
│   ├── main.js            # Vue.js entry point
│   └── components/
│       ├── ConferenceTracker.vue  # Main tracker logic & data
│       └── ConferenceCard.vue     # Individual conference cards
├── .github/workflows/
│   └── deploy.yml         # GitHub Actions deployment
└── vue.config.js          # Vue CLI configuration
```

### Available Commands

```bash
npm run serve              # Start development server (http://localhost:8080)
npm run build              # Build for production
npm run lint               # Lint and fix code style issues
```

### Technologies Used

- **Vue.js 2** - Progressive JavaScript framework
- **Moment.js** - Date/time manipulation and timezone handling
- **CSS3** - Modern styling with gradients and animations
- **GitHub Actions** - Automated deployment pipeline

## 📱 Mobile Experience

The tracker is fully optimized for mobile devices:

- 📱 **Touch-friendly** interface with proper tap targets
- 🎯 **Responsive design** that adapts to all screen sizes
- ⚡ **Fast loading** with optimized assets
- 🎨 **Smooth animations** that work well on mobile
- 🔄 **Auto-refresh** counters without page reload

## 🤝 Contributing

We welcome contributions! Here's how you can help:

### 🐛 Report Bugs
Found a bug? [Open an issue](https://github.com/YOUR_USERNAME/conference-deadlines/issues) with:
- Clear description of the problem
- Steps to reproduce
- Expected vs actual behavior
- Screenshots if applicable

### 💡 Suggest Features
Have an idea? [Create a feature request](https://github.com/YOUR_USERNAME/conference-deadlines/issues) and tell us:
- What problem it solves
- How it should work
- Why it would be useful

### 🔧 Submit Pull Requests
1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

### 🎯 Good First Issues

Looking for ways to contribute? Check out issues labeled:
- `good first issue` - Perfect for newcomers
- `help wanted` - We'd love your assistance
- `enhancement` - New features to implement

## 🌟 Show Your Support

If this project helped you, please consider:

- ⭐ **Starring this repository** - it really motivates us!
- 🍴 **Forking and customizing** for your own needs
- 📢 **Sharing with colleagues** who might find it useful
- 🐛 **Reporting bugs** to help us improve
- 💡 **Suggesting features** for future versions

### 📈 Project Stats

![GitHub stars](https://img.shields.io/github/stars/YOUR_USERNAME/conference-deadlines?style=social)
![GitHub forks](https://img.shields.io/github/forks/YOUR_USERNAME/conference-deadlines?style=social)
![GitHub watchers](https://img.shields.io/github/watchers/YOUR_USERNAME/conference-deadlines?style=social)

## 🔗 Related Projects

- [CCF-Deadlines](https://github.com/ccfddl/ccf-deadlines) - Inspiration for this project
- [AI Conference Deadlines](https://aideadlin.es/) - Comprehensive AI conference tracking
- [ML Conferences](https://github.com/paperswithcode/ai-deadlines) - Another great deadline tracker

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🙏 Acknowledgments

- 💡 **Inspired by** [CCF-Deadlines](https://github.com/ccfddl/ccf-deadlines) and the academic community's need for better deadline tracking
- 🛠️ **Built with** [Vue.js](https://vuejs.org/), [Moment.js](https://momentjs.com/), and lots of ☕
- 🎨 **Design inspiration** from modern web applications and Material Design principles
- 👥 **Community feedback** from researchers and academics worldwide

---

<div align="center">

**Made with ❤️ for the academic community**

*Help others discover this tool - ⭐ star this repository!*

[⬆ Back to Top](#-personal-conference-deadlines)

</div>
