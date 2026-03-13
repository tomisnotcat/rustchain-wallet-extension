// RustChain Wallet Balance Extension - Popup Script

const API_BASE = 'https://rustchain.org';

async function fetchBalance(walletId) {
  try {
    const response = await fetch(`${API_BASE}/wallet/balance?miner_id=${walletId}`);
    if (!response.ok) {
      throw new Error('Failed to fetch balance');
    }
    return await response.json();
  } catch (error) {
    console.error('Error fetching balance:', error);
    throw error;
  }
}

function formatBalance(amount) {
  return amount.toFixed(6);
}

function showLoading() {
  document.getElementById('loading').style.display = 'block';
  document.getElementById('balanceDisplay').style.display = 'none';
  document.getElementById('error').style.display = 'none';
}

function hideLoading() {
  document.getElementById('loading').style.display = 'none';
}

function showBalance(amount) {
  document.getElementById('balanceDisplay').style.display = 'block';
  document.getElementById('balanceAmount').textContent = formatBalance(amount);
  document.getElementById('error').style.display = 'none';
}

function showError(message) {
  document.getElementById('balanceDisplay').style.display = 'none';
  document.getElementById('error').textContent = message;
  document.getElementById('error').style.display = 'block';
}

function updateLastUpdated() {
  const now = new Date();
  document.getElementById('lastUpdated').textContent = `Last updated: ${now.toLocaleTimeString()}`;
  document.getElementById('lastUpdated').style.display = 'block';
}

async function loadBalance() {
  const walletId = document.getElementById('walletId').value.trim();
  
  if (!walletId) {
    showError('Please enter a wallet ID');
    return;
  }
  
  showLoading();
  
  try {
    const data = await fetchBalance(walletId);
    hideLoading();
    showBalance(data.amount_rtc);
    updateLastUpdated();
    
    // Save to storage
    chrome.storage.local.set({ walletId });
  } catch (error) {
    hideLoading();
    showError('Failed to load balance. Check wallet ID.');
  }
}

// Initialize
document.addEventListener('DOMContentLoaded', () => {
  const walletInput = document.getElementById('walletId');
  const saveBtn = document.getElementById('saveBtn');
  
  // Load saved wallet
  chrome.storage.local.get(['walletId'], (result) => {
    if (result.walletId) {
      walletInput.value = result.walletId;
      loadBalance();
    }
  });
  
  // Save button click
  saveBtn.addEventListener('click', loadBalance);
  
  // Enter key to load
  walletInput.addEventListener('keypress', (e) => {
    if (e.key === 'Enter') {
      loadBalance();
    }
  });
});
