export async function getCurrentTabUrl() {
    const [tab] = await chrome.tabs.query({ active: true, lastFocusedWindow: true });
    if (!tab || !tab.url) {
        return;
    }

    return new URL(tab.url);
}