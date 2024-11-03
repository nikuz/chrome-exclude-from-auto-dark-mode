import {
    setIcon,
    isDarkModeDisabled,
    getCurrentTabUrl,
    storageGet,
} from 'utils';

async function iconChangeHandler() {
    const tabUrl = await getCurrentTabUrl();
    if (!tabUrl) {
        return;
    }

    const host = tabUrl.host;
    const path = tabUrl.pathname;
    let darkModeDisabled = await isDarkModeDisabled(host);

    if (path !== '/') {
        const hostWithPath = `${host}${path}`;
        const hostPathStoreData = await storageGet(hostWithPath);
        if (hostPathStoreData !== undefined) {
            darkModeDisabled = !hostPathStoreData;
        }
    }

    setIcon(darkModeDisabled ? 'sun' : 'moon');
}

chrome.tabs.onActivated.addListener(() => {
    iconChangeHandler();
});

chrome.storage.onChanged.addListener(() => {
    iconChangeHandler();
});