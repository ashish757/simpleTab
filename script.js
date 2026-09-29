const form = document.getElementById('searchForm');
const searchInput = document.getElementById('searchInput');
const searchEngine = document.getElementById('searchEngine');

form.addEventListener('submit', (e) => {
    e.preventDefault();
    
    const query = encodeURIComponent(searchInput.value);
    const engine = searchEngine.value;
    let searchUrl = '';

    if (engine === 'google') {
        searchUrl = `https://www.google.com/search?q=${query}`;
    } else if (engine === 'bing') {
        searchUrl = `https://www.bing.com/search?q=${query}`;
    } else if (engine === 'duckduckgo') {
        searchUrl = `https://duckduckgo.com/?q=${query}`;
    }

    if (searchUrl) {
        window.open(searchUrl, "_self");
    }
});