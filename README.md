# Evnity — Landing Website

A clean, professional single-page landing site for the **Evnity** event management app.

## Tech Stack
- **React 18** + **Vite**
- **Tailwind CSS** — design system tokens
- **Framer Motion** — hover & micro-interactions
- **GSAP + ScrollTrigger** — scroll animations
- **Lucide React** — icons
- **Fonts**: Plus Jakarta Sans (display) + DM Sans (body)

## Quick Start

```bash
# 1. Install dependencies
npm install

# 2. Run dev server
npm run dev

# 3. Open in browser
# http://localhost:5173
```

## Build for Production
```bash
npm run build
npm run preview
```

## Project Structure
```
src/
├── components/
│   ├── Navbar.jsx      # Sticky nav with glass effect
│   ├── Hero.jsx        # Full-screen hero + phone mockups
│   ├── About.jsx       # Two-column + app card
│   ├── Features.jsx    # 3×2 feature card grid
│   ├── Team.jsx        # Guide + member cards
│   ├── Download.jsx    # App store buttons
│   ├── Contact.jsx     # Contact form + socials
│   └── Footer.jsx      # Minimal footer
├── App.jsx             # Root component
├── main.jsx            # React entry
└── index.css           # Tailwind + CSS vars
```

## Design System
| Token | Value |
|-------|-------|
| Primary | `#1E40AF` |
| Primary Light | `#3B60D4` |
| Primary Surface | `#EFF4FF` |
| Background | `#F8FAFF` |
| Text Primary | `#0F172A` |
| Text Secondary | `#475569` |
| Divider | `#E2E8F0` |

## Contact
evnity.team@gmail.com
