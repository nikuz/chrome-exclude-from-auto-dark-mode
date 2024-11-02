export async function isDarkModeDisabled(host: string) {
    const storageValue = await chrome.storage.local.get(host);
    return storageValue[host] === false;
}