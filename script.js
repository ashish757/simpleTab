const form = document.getElementById('searchForm');
const searchInput = document.getElementById('searchInput');
const searchEngine = document.getElementById('searchEngine');

const shortcuts = [
    {id: 1, name: 'GitHub', url: 'https://github.com'},
    {id: 2, name: 'Stack Overflow', url: 'https://stackoverflow.com'},
    {id: 3, name: 'Reddit', url: 'https://www.reddit.com'},
    {id: 4, name: 'News', url: 'https://news.ycombinator.com'},
    {id: 5, name: 'Twitter', url: 'https://twitter.com'},
    {id: 6, name: 'Slack', url: 'https://www.slack.com'},
    {id: 7, name: 'YouTube', url: 'https://www.youtube.com'},
    {id: 8, name: 'Pixl', url: 'https://pixl.hackclub.org'},
    {id: 9, name: 'Hackclub', url: 'https://hackclub.com'},
]


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

    const selectedEngine = localStorage.getItem('selectedEngine') || 'google';
    searchEngine.value = selectedEngine;
    updatePlaceholder();

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

function updatePlaceholder() {
    const selectedEngine = searchEngine.value;
    let placeholderText = '';

    if (selectedEngine === 'google') {
        placeholderText = 'Search Google...';
    } else if (selectedEngine === 'bing') {
        placeholderText = 'Search Bing...';
    } else if (selectedEngine === 'duckduckgo') {
        placeholderText = 'Search DuckDuckGo...';
    }

    searchInput.placeholder = placeholderText;
}




searchEngine.addEventListener('change', () => {
    const selectedEngine = searchEngine.value;
    localStorage.setItem('selectedEngine', selectedEngine);
    updatePlaceholder();
});


function populateShortcuts() {
    const shortcutsContainer = document.getElementById('shortcutsContainer');
    shortcutsContainer.innerHTML = '';

    shortcuts.forEach(shortcut => {
        const shortcutElement = document.createElement('div');
        shortcutElement.className = 'shortcut';

        const img = document.createElement('img');
        img.src = `https://www.google.com/s2/favicons?domain=${shortcut.url}&sz=64`;
        shortcutElement.appendChild(img);   

        const span = document.createElement('span');
        span.textContent = shortcut.name;
        shortcutElement.appendChild(span);

        shortcutElement.addEventListener('click', () => {
            window.open(shortcut.url, "_self");
        });
        shortcutsContainer.appendChild(shortcutElement);
    });
}

populateShortcuts();