export function isOnProduction() {
    return !!chrome.tabs;
}