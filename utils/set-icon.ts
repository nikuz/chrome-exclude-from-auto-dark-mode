export function setIcon(iconName: string) {
    if (import.meta.env.DEV) {
        return;
    }

    chrome.action.setIcon({
        path: {
            48: `/images/${iconName}/${iconName}-48.png`,
            128: `/images/${iconName}/${iconName}-48.png`,
        },
    });
}