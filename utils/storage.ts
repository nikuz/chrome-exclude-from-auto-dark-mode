export async function storageSet(key: string, value: any) {
    if (import.meta.env.DEV) {
        return;
    }

    return await chrome.storage.local.set({
        [key]: value,
    });
}

export async function storageGet(key: string) {
    if (import.meta.env.DEV) {
        return;
    }

    const data = await chrome.storage.local.get(key);
    return data[key]
}

export async function storageClear() {
    if (import.meta.env.DEV) {
        return;
    }

    await chrome.storage.local.clear();
}