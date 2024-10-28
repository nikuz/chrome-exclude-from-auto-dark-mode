export function setIcon(iconName: string) {
    chrome.action.setIcon({
        path: {
            48: `/images/${iconName}/${iconName}-48.png`,
            128: `/images/${iconName}/${iconName}-48.png`,
        },
    });
}