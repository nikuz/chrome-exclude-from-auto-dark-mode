import {
    isDarkModeDisabled,
    storageGet,
    // storageClear,
} from 'utils';

const location = window.location;
const host = location.host;
const path = location.pathname;
const hostWithPath = path !== '/' ? `${host}${path}` : '';

async function darkModeCheckHandler() {
    const hostDarkModeDisabled = await isDarkModeDisabled(host);

    if (path !== '/') {
        const hostPathStoreData = await storageGet(hostWithPath);
        if (hostPathStoreData === false || (hostPathStoreData === undefined && hostDarkModeDisabled)) {
            disableDarkMode();
        }
    } else if (hostDarkModeDisabled) {
        disableDarkMode();
    }
}

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
    if (changes[host] || (hostWithPath && changes[hostWithPath])) {
        window.location.reload();
    }
});

(async () => {
    // await storageClear();
    darkModeCheckHandler();
})();