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



document.addEventListener('DOMContentLoaded', () => {
    const currentTimeElement = document.getElementById('currentTime');

    function updateTime() {
        const now = new Date();
        const hours = now.getHours().toString().padStart(2, '0');
        const minutes = now.getMinutes().toString().padStart(2, '0');
        const seconds = now.getSeconds().toString().padStart(2, '0');
        currentTimeElement.textContent = `${hours}:${minutes}:${seconds}`;
    }

    updateTime(); 
    setInterval(updateTime, 1000);
});