const form = document.getElementById('searchForm');
const searchInput = document.getElementById('searchInput');
const searchEngine = document.getElementById('searchEngine');

let shortcuts = [
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
    const storageShotcuts = JSON.parse(localStorage.getItem('shortcuts'));

    const currentTimeElement = document.getElementById('currentTime');
    if(storageShotcuts && storageShotcuts.length > 0) {
        shortcuts= storageShotcuts
        populateShortcuts();

    }


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
    placeholderText += ' (press / to focus)';

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

    const shortcutElement = document.createElement('div');
    shortcutElement.className = 'shortcut';

    const svg = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 640 640"><!--!Font Awesome Free v7.3.1 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license/free Copyright 2026 Fonticons, Inc.--><path d="M352 128C352 110.3 337.7 96 320 96C302.3 96 288 110.3 288 128L288 288L128 288C110.3 288 96 302.3 96 320C96 337.7 110.3 352 128 352L288 352L288 512C288 529.7 302.3 544 320 544C337.7 544 352 529.7 352 512L352 352L512 352C529.7 352 544 337.7 544 320C544 302.3 529.7 288 512 288L352 288L352 128z"/></svg>`;
    const blob = new Blob([svg], { type: 'image/svg+xml' });
    const blobURL = URL.createObjectURL(blob);

    const img = document.createElement('img');
    img.src = blobURL;
    shortcutElement.appendChild(img);   

        
        const span = document.createElement('span');
        span.textContent = "Add New";
        shortcutElement.appendChild(span);

        shortcutElement.addEventListener('click', () => {
            document.getElementById("modal").classList.add("active");
            overlay.classList.add("active");
        });

        shortcutsContainer.appendChild(shortcutElement);
}

populateShortcuts();


const searchWrapper = document.getElementById('searchWrapper');
const overlay = document.getElementById('overlay');

searchInput.addEventListener('focus', () => {
    searchWrapper.classList.add('focused');
    overlay.classList.add('active');
})

searchInput.addEventListener('blur', () => {
    searchWrapper.classList.remove('focused');
    overlay.classList.remove('active');
})

document.addEventListener('keydown', (e) => {
    if (e.key === '/') {
        e.preventDefault();
        searchInput.focus();
    }
})



document.getElementById('closeModal').addEventListener('click', () => {
    document.getElementById("modal").classList.remove("active");
    overlay.classList.remove("active");
});

document.getElementById('overlay').addEventListener('click', () => {
    document.getElementById("modal").classList.remove("active");
    overlay.classList.remove("active");
});

document.getElementById('addShortcutBtn').addEventListener('click', (e) => {
    e.preventDefault();
    const name = document.getElementById('shortcutName').value;
    const url = document.getElementById('shortcutURL').value;

    console.log("Pressed");
    
    if (name && url) {
        const newShortcut = {
            id: shortcuts.length + 1,
            name: name,
            url: url
        };
        shortcuts.push(newShortcut);
        populateShortcuts();
        document.getElementById("modal").classList.remove("active");
        overlay.classList.remove("active");
        localStorage.setItem('shortcuts', JSON.stringify(shortcuts));
         console.log("sved");
          console.log(shortcuts);
    }
});