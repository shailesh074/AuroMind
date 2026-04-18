# 🪷 AuroMind — Light on the Path

A spiritual AI companion webapp rooted entirely in the teachings of **Sri Aurobindo** and **The Mother**. Built with React, Firebase, and Google Gemini AI.

---

## ✨ Features

- 💬 AI chat powered by Google Gemini (free tier)
- 🔐 Auth via Google login or Email/Password (Firebase)
- 💾 Persistent conversation history (Firestore)
- 🧠 User memory — AI understands you better over time
- 🌌 Golden + Glass Black aesthetic with particle animations
- 📱 Fully responsive — 2K monitors to budget phones
- 🚀 Free deployment on Vercel

---

## 🛠️ Tech Stack

| Layer | Technology |
|-------|-----------|
| Frontend | React 18 + Vite |
| Animations | CSS animations + Canvas particles |
| AI | Google Gemini 1.5 Flash (free) |
| Auth | Firebase Authentication |
| Database | Firebase Firestore |
| Deployment | Vercel (free) |
| Code hosting | GitHub (free) |

---

## 🚀 Setup Guide (Step by Step)

### Step 1 — Clone or download this project

```bash
git init
git add .
git commit -m "Initial AuroMind"
```

Push to GitHub:
- Create a new repo on github.com
- Follow GitHub's instructions to push

---

### Step 2 — Set up Firebase

1. Go to → https://console.firebase.google.com
2. Click **"Add project"** → name it `auromind`
3. Disable Google Analytics (optional) → Create project

**Enable Authentication:**
- Go to **Authentication** → **Get started**
- Enable **Google** provider
- Enable **Email/Password** provider

**Enable Firestore:**
- Go to **Firestore Database** → **Create database**
- Choose **Start in test mode** → Select your region → Done

**Get Firebase config:**
- Go to **Project Settings** (gear icon) → **Your apps**
- Click **"</>  Web"** → Register app → name it `auromind-web`
- Copy the config object — you'll need it next

---

### Step 3 — Set up environment variables

Edit the `.env` file with your values:

```env
VITE_GEMINI_API_KEY=your_gemini_api_key_here

VITE_FIREBASE_API_KEY=your_value
VITE_FIREBASE_AUTH_DOMAIN=your_project.firebaseapp.com
VITE_FIREBASE_PROJECT_ID=your_project_id
VITE_FIREBASE_STORAGE_BUCKET=your_project.appspot.com
VITE_FIREBASE_MESSAGING_SENDER_ID=your_sender_id
VITE_FIREBASE_APP_ID=your_app_id
```

> ⚠️ NEVER commit `.env` to GitHub. It's already in `.gitignore`.

---

### Step 4 — Install and run locally

```bash
npm install
npm run dev
```

Open → http://localhost:5173

---

### Step 5 — Deploy to Vercel (free)

1. Go to → https://vercel.com → Sign in with GitHub
2. Click **"New Project"** → Import your GitHub repo
3. Framework preset: **Vite**
4. Add all environment variables from `.env` in Vercel's dashboard
5. Click **Deploy** 🚀

Your app will be live at `auromind.vercel.app` (or similar)!

---

### Step 6 — Add Firebase authorized domain

After deploying:
1. Go to Firebase → Authentication → Settings → **Authorized domains**
2. Add your Vercel domain (e.g. `auromind.vercel.app`)

---

## 📁 Project Structure

```
auromind/
├── public/
│   └── favicon.svg
├── src/
│   ├── components/
│   │   └── ParticleBackground.jsx   # Animated golden particles
│   ├── context/
│   │   └── AuthContext.jsx          # Firebase auth state
│   ├── firebase/
│   │   ├── config.js                # Firebase init
│   │   └── gemini.js                # Gemini AI service
│   ├── hooks/
│   │   └── useChat.js               # Chat + Firestore logic
│   ├── knowledge/
│   │   ├── sri_aurobindo.md         # Sri Aurobindo teachings
│   │   ├── the_mother.md            # The Mother teachings
│   │   └── system_prompt.md         # AI identity & instructions
│   ├── pages/
│   │   ├── AuthPage.jsx             # Login/signup page
│   │   ├── ChatPage.jsx             # Main chat interface
│   │   └── AboutPage.jsx            # About Sri Aurobindo & Mother
│   ├── App.jsx
│   ├── main.jsx
│   └── index.css
├── .env                             # Your API keys (never commit!)
├── .gitignore
├── index.html
├── package.json
├── vercel.json
└── vite.config.js
```

---

## 🙏 About

AuroMind is created with devotion to make the eternal wisdom of Sri Aurobindo and The Mother accessible to all seekers — anywhere, anytime.

*"The Divine loves you more than you can imagine."* — The Mother
