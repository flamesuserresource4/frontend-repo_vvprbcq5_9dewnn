# AIRecruiter

A futuristic, dark-themed mock interview studio built with React + Vite. Includes webcam, screen share, recording, Monaco code editor, and AI-mocked interview questions. Fully responsive with mobile-friendly editor and bottom controls.

## Features
- Login (admin/admin) and demo signup using localStorage
- Dashboard with target role input and quick start
- Resume upload and PDF preview
- Interview room with webcam, mic/cam toggles, screen share, recording, Monaco editor, AI questions, and notes
- Interview history with metadata and recording download
- Neon/glassmorphism styling, Framer Motion animations, Spline 3D hero

## Getting Started
1. npm install
2. npm run dev

## Environment Variables (.env)
- VITE_AI_API_URL: Set to your AI backend base URL
- VITE_ENABLE_AI: "true" to enable real AI calls; otherwise mock questions are used

## Replace Mock AI
Update `VITE_AI_API_URL` and set `VITE_ENABLE_AI=true`. Edit functions in `src/utils/aiClient.js` to fit your API schema.

## Replace Demo Auth
Swap the logic in the auth context to call your backend. Replace the `login` function and the signup storage block. Ensure tokens are stored securely instead of localStorage for production.

## Notes
- If camera permission is denied, the video panel shows a helpful message.
- Screen share button auto-hides if unsupported.
- Resume uploads >10MB are rejected with a validation error.
- Keyboard shortcut: Ctrl/Cmd+E opens the editor on mobile.
