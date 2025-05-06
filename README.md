# Kalvium Worklog Automator

This project automates daily worklog submissions for Kalvium interns using GitHub Actions.

## Components

1. Chrome Extension: Captures and stores authentication tokens
2. Backend Service: Manages token storage in MongoDB
3. GitHub Action: Automates daily worklog submissions

## Setup Instructions

### Backend Setup

1. Install dependencies:

```bash
cd backend
npm install express mongoose cors dotenv
```

2. Create `.env` file:

```bash
cp .env.example .env
# Update MONGODB_URI with your MongoDB connection string
```

3. Start the server:

```bash
node server.js
```

### Chrome Extension Setup

1. Open Chrome and go to `chrome://extensions/`
2. Enable "Developer mode"
3. Click "Load unpacked" and select the extension directory
4. Visit kalvium.community and log in - the extension will automatically capture your token

### GitHub Actions Setup

1. Add these secrets to your repository:

   - `KALVIUM_USER_ID`: Your Kalvium user ID
   - `BACKEND_API`: URL of your backend API

2. The workflow will run automatically at 6:30 PM IST daily

## Security Notes

- Tokens are stored securely in MongoDB
- The backend API should be hosted with HTTPS
- Access to the backend API should be restricted to authorized users only
