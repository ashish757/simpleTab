const form = document.getElementById('searchForm');
const searchInput = document.getElementById('searchInput').value;
const searchEngine = document.getElementById('searchEngine').value;


form.addEventListener('submit', (e) => {
    e.preventDefault();
    let searchUrl = '';

    if (searchEngine === 'google') {
        searchUrl = `https://www.google.com/search?q=${searchInput}`;
    } else if (searchEngine === 'bing') {
        searchUrl = `https://www.bing.com/search?q=${searchInput}`;
    } else if (searchEngine === 'duckduckgo') {
        searchUrl = `https://duckduckgo.com/?q=${searchInput}`;
    }

    window.open(searchUrl, '_blank');
});