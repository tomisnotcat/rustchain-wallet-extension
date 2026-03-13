# RustChain Wallet Balance Extension

Browser extension to display RTC wallet balance in Chrome/Firefox toolbar.

## Features

- Display RTC wallet balance in browser toolbar
- Save multiple wallet IDs
- Real-time balance updates
- Dark theme UI

## Installation

### Chrome
1. Open Chrome and navigate to `chrome://extensions/`
2. Enable "Developer mode" (toggle in top right)
3. Click "Load unpacked"
4. Select the `rustchain-extension` folder

### Firefox
1. Open Firefox and navigate to `about:debugging#/runtime/this-firefox`
2. Click "Load Temporary Add-on..."
3. Select any file in the `rustchain-extension` folder

## Usage

1. Click the extension icon in toolbar
2. Enter your wallet ID (e.g., `tomisnotcat`)
3. Click "Save Wallet" to view balance

## Files

- `manifest.json` - Extension manifest (MV3)
- `popup.html` - Extension popup UI
- `popup.js` - Popup logic
- `README.md` - This file

## API

Uses RustChain public API: `https://rustchain.org/wallet/balance?miner_id=YOUR_ID`

## Bounty

Created for [RustChain Bounty #1607](https://github.com/Scottcjn/rustchain-bounties/issues/1607)
