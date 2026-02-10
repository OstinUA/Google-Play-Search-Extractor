document.getElementById('run').addEventListener('click', async () => {
  const [tab] = await chrome.tabs.query({ active: true, currentWindow: true });

  chrome.scripting.executeScript({
    target: { tabId: tab.id },
    function: extractVisibleLinks,
  }, (results) => {
    if (results && results[0].result) {
      const links = results[0].result;
      document.getElementById('result').value = links.join('\n');
      document.getElementById('count').innerText = links.length;
    }
  });
});

function extractVisibleLinks() {
  // 1. Находим все ссылки на приложения
  const allLinks = Array.from(document.querySelectorAll('a[href*="details?id="]'));
  
  const uniqueIds = new Set();
  const resultLinks = [];

  allLinks.forEach(link => {
    // КЛЮЧЕВОЙ МОМЕНТ: 
    // offsetParent === null означает, что элемент скрыт от пользователя
    // Также проверяем, что ссылка находится внутри основного контента (не в футере)
    const isVisible = link.offsetParent !== null;
    const isInsideFooter = link.closest('footer');
    
    if (isVisible && !isInsideFooter) {
      try {
        const url = new URL(link.href);
        const appId = url.searchParams.get('id');

        if (appId && !uniqueIds.has(appId)) {
          uniqueIds.add(appId);
          // Формируем чистую ссылку без лишних параметров
          resultLinks.push(`https://play.google.com/store/apps/details?id=${appId}`);
        }
      } catch (e) {}
    }
  });

  return resultLinks;
}