import { isDarkModeDisabled } from 'utils';

const host = window.location.host;

(async () => {
    if (await isDarkModeDisabled(host)) {
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
    if (changes[host]) {
        window.location.reload();
    }
});