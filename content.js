function extractSearchLinks() {
  const items = document.querySelectorAll('[data-docid]');

  const links = [...items]
    .map(el => {
      const id = el.getAttribute('data-docid');
      return `https://play.google.com/store/apps/details?id=${id}`;
    })
    .filter((url, idx, arr) => arr.indexOf(url) === idx);

  window.searchLinks = links;
  console.log("Extracted links:", links);
}

extractSearchLinks();
