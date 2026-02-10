document.addEventListener('DOMContentLoaded', async () => {
  const [tab] = await chrome.tabs.query({ active: true, currentWindow: true });
  const btn = document.getElementById('run');
  const status = document.getElementById('status');
  const errorMsg = document.getElementById('error-msg');

  if (tab.url.includes('play.google.com')) {
    status.innerText = 'Google Play Store';
    btn.onclick = () => runScript(tab.id, extractGooglePlayLinks);
  } else if (tab.url.includes('apps.apple.com')) {
    status.innerText = 'Apple App Store';
    btn.onclick = () => runScript(tab.id, extractAppleStoreLinks);
  } else {
    status.innerText = 'Сайт не поддерживается';
    btn.disabled = true;
    errorMsg.classList.remove('hidden');
  }
});

function runScript(tabId, func) {
  chrome.scripting.executeScript({
    target: { tabId: tabId },
    function: func,
  }, (results) => {
    if (results && results[0].result) {
      const links = results[0].result;
      document.getElementById('result').value = links.join('\n');
      document.getElementById('count').innerText = links.length;
    }
  });
}

function extractGooglePlayLinks() {
  const allLinks = Array.from(document.querySelectorAll('a[href*="details?id="]'));
  const uniqueIds = new Set();
  const resultLinks = [];

  allLinks.forEach(link => {
    const isVisible = link.offsetParent !== null;
    const isInsideFooter = link.closest('footer');
    
    if (isVisible && !isInsideFooter) {
      try {
        const url = new URL(link.href);
        const appId = url.searchParams.get('id');
        if (appId && !uniqueIds.has(appId)) {
          uniqueIds.add(appId);
          resultLinks.push(`https://play.google.com/store/apps/details?id=${appId}`);
        }
      } catch (e) {}
    }
  });
  return resultLinks;
}

function extractAppleStoreLinks() {
  const allLinks = Array.from(document.querySelectorAll('a[href*="/app/"]'));
  const uniqueIds = new Set();
  const resultLinks = [];

  allLinks.forEach(link => {
    const isVisible = link.offsetParent !== null;
    const isInsideFooter = link.closest('footer') || link.closest('#globalnav');
    
    if (isVisible && !isInsideFooter) {
      try {
        const url = new URL(link.href);
        const match = url.pathname.match(/id\d+/);
        
        if (match) {
          const appId = match[0];
          if (!uniqueIds.has(appId)) {
            uniqueIds.add(appId);
            resultLinks.push(`https://apps.apple.com/app/${appId}`);
          }
        }
      } catch (e) {}
    }
  });
  return resultLinks;
}