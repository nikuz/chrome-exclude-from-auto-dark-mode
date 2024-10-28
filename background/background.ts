import { setIcon, isDarkModeDisabled } from 'utils';

chrome.tabs.onActivated.addListener(async (event) => {
    const tab = await chrome.tabs.get(event.tabId);
    if (!tab || !tab.url) {
        return;
    }
    const tabUrl = new URL(tab.url);
    const disabled = await isDarkModeDisabled(tabUrl.host);

    setIcon(disabled ? 'sun' : 'moon');
});