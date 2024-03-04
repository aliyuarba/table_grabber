chrome.runtime.onInstalled.addListener(() => {
    chrome.action.setBadgeText({
      text: 'OFF'
    });
    chrome.action.setTitle({
        title: 'Table Grabber has not been activated yet.\nClick to activate it.'
    })
});

let isEnabled = false; // Initial state (can be false for default off behavior)
chrome.action.onClicked.addListener(async (tab) => {
  // Toggle the extension state
  isEnabled = !isEnabled;
  console.log(isEnabled);

  // Set the badge text based on the extension state
  const badgeText = isEnabled ? 'ON' : 'OFF';
  await chrome.action.setBadgeText({
    tabId: tab.id,
    text: badgeText,
  });

  // Set the badge text based on the extension state
  const badgeTitle = isEnabled ? 'Table Grabber successfully activated.\nClick to deactivate it.' : 'Table Grabber has  been deactived.\nClick to activate it.';
  await chrome.action.setTitle({
    title: badgeTitle,
  });

  // Send a message to the content script to inform about the state change
  chrome.tabs.query({ active: true, currentWindow: true }, function(tabs) {
    const activeTab = tabs[0];
    chrome.tabs.sendMessage(activeTab.id, { action: "toggle", enabled: isEnabled });
  });
});