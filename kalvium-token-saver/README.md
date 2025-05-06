# Kalvium Token Saver

Chrome extension that saves Kalvium authentication tokens to your database.

## Installation

1. Open Chrome and go to `chrome://extensions/`
2. Enable "Developer mode" in the top right
3. Click "Load unpacked"
4. Select the `kalvium-token-saver` folder

## Configuration

Before using, update the backend API URL in `background.js`:

```js
await fetch("YOUR_BACKEND_API/tokens", {
```

Replace `YOUR_BACKEND_API` with your actual backend URL.
