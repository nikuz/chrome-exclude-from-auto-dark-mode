import { storageGet } from './storage';

export async function isDarkModeEnabled(host: string) {
    const storageValue = await storageGet(host);
    return storageValue[host] === true || storageValue[host] === undefined;
}