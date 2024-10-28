import { setIcon, getCurrentTabUrl, isDarkModeDisabled } from 'utils';

const checkbox = document.getElementById('dark_mode_enabled') as HTMLInputElement | undefined;

checkbox?.addEventListener('change', async (event) => {
    const tabUrl = await getCurrentTabUrl();
    if (!tabUrl) {
        return;
    }

    const target = event.target as HTMLInputElement;
    const checked = target.checked;
    chrome.storage.local.set({
        [tabUrl.host]: checked,
    });

    setIcon(checked ? 'moon' : 'sun');
});

(async () => {
    const tabUrl = await getCurrentTabUrl();
    if (!tabUrl) {
        return;
    }
    const disabled = await isDarkModeDisabled(tabUrl.host);
    if (checkbox && disabled) {
        checkbox.checked = false;
    }
})();