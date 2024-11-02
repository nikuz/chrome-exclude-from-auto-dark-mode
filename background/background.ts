import { setIcon, isDarkModeEnabled } from 'utils';

chrome.tabs.onActivated.addListener(async (event) => {
    const tab = await chrome.tabs.get(event.tabId);
    if (!tab || !tab.url) {
        return;
    }
    const tabUrl = new URL(tab.url);
    const host = tabUrl.host;
    const hostWithPathname = `${host}${tabUrl.pathname}`;
    const darkModeEnabled = await isDarkModeEnabled(host) && await isDarkModeEnabled(hostWithPathname);

    setIcon(darkModeEnabled ? 'moon' : 'sun');
});