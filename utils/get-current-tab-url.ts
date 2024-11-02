export async function getCurrentTabUrl() {
    if (import.meta.env.DEV) {
        return window.location;
    }
    
    const [tab] = await chrome.tabs.query({ active: true, lastFocusedWindow: true });
    if (!tab || !tab.url) {
        return;
    }

    return new URL(tab.url);
}