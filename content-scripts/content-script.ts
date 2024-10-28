import { isDarkModeDisabled } from 'utils';

const host = window.location.host;

(async () => {
    if (await isDarkModeDisabled(host)) {
        disableDarkMode();
    }
})();

function disableDarkMode() {
    const metaNode = document.createElement('meta');
    metaNode.name = 'color-scheme';
    metaNode.content = 'light only';

    document.head.appendChild(metaNode);
}

chrome.storage.onChanged.addListener((changes) => {
    if (changes[host]) {
        window.location.reload();
    }
});