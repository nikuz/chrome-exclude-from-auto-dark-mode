import { isDarkModeEnabled } from 'utils';

const location = window.location;
const host = location.host;
const hostWithPathname = `${host}${location.pathname}`;

(async () => {
    if (!await isDarkModeEnabled(host) && !await isDarkModeEnabled(hostWithPathname)) {
        disableDarkMode();
    }
})();

function disableDarkMode() {
    const existingMetaTag = document.head.querySelector('meta[name="color-scheme"]');
    if (existingMetaTag) {
        document.head.removeChild(existingMetaTag);
    }
    
    const newMetaTag = document.createElement('meta');
    newMetaTag.name = 'color-scheme';
    newMetaTag.content = 'only light';
    document.head.appendChild(newMetaTag);

    const newStyleTag = document.createElement('style');
    newStyleTag.appendChild(document.createTextNode(':root { color-scheme: only light; }'));
    document.head.appendChild(newStyleTag);
}

chrome.storage.onChanged.addListener((changes) => {
    if (changes[host] || changes[hostWithPathname]) {
        window.location.reload();
    }
});