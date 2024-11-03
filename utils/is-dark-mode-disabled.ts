import { storageGet } from './storage';

export async function isDarkModeDisabled(host: string) {
    const storageValue = await storageGet(host);
    return storageValue === false;
}