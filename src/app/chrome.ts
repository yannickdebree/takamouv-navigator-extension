export const getTabId = async () => {
    const tabs = await chrome.tabs.query({ active: true, currentWindow: true });
    const tab = tabs[0];

    const tabId = tab.id;
    if (!tabId) {
        throw new Error("Current tab is not available");
    }
    return tabId;
}