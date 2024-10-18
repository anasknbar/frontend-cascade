// ## Step 1: Create a Context Menu Item for Text and Images
// Remove any existing context menu items
chrome.contextMenus.removeAll(() => {
  // Create a context menu for text selection
  chrome.contextMenus.create({
    id: "copyText",
    title: "Copy Selected Text",
    contexts: ["selection"]
  });

  // Create a context menu for images
  chrome.contextMenus.create({
    id: "copyImage",
    title: "Copy Image",
    contexts: ["image"]
  });
});

// ## Step 2: Listen for the Context Menu Click Event
chrome.contextMenus.onClicked.addListener((info, tab) => {
  if (info.menuItemId === "copyText") {
    // Handle copying the selected text
    copySelectedText(info);
  } else if (info.menuItemId === "copyImage") {
    // Handle copying the image URL
    copyImageUrl(info);
  }
});

function showNotification(title, message) {
  chrome.notifications.create({
    type: "basic",
    iconUrl: "/icons/icon48.png",
    title: title,
    message: message,
    priority: 2,
    // buttons: [
    //   { title: "Open Extension" },
    //   { title: "Dismiss" }
    // ],
    // isClickable: true,
    // requireInteraction: true,
    // silent: false
  });
}

function showProgressNotification() {
  const notificationId = "progressNotification";

  // Step 1: Create the initial progress notification
  chrome.notifications.create(notificationId, {
    type: "progress",
    iconUrl: "/icons/icon48.png",
    title: "Task in Progress",
    message: "Processing your task...",
    progress: 0, // Initial progress value (0%)
    priority: 2
  });

  // Step 2: Simulate updating the progress
  let progress = 0;
  const interval = setInterval(() => {
    progress += 10; // Increment progress by 10%

    // Update the progress in the notification
    chrome.notifications.update(notificationId, {
      type: "progress",
      progress: progress,
      message: `Progress: ${progress}% complete`
    });

    // Step 3: Clear the notification when the progress reaches 100%
    if (progress >= 100) {
      clearInterval(interval);
      chrome.notifications.clear(notificationId, () => {
        console.log("Progress notification cleared.");
      });
    }
  }, 1000); // Update every 1 second
}


function getFirstAndLastWord(text) {
  // Split the text into an array of words
  const words = text.trim().split(/\s+/); // Split by spaces, handling multiple spaces

  // Check if there are any words
  if (words.length === 0) {
    return "";
  }

  // Get the first and last words
  const firstWord = words[0];
  const lastWord = words[words.length - 1];

  // Return the formatted result
  return `${firstWord} ... ${lastWord}`;
}


// ## Step 3: Copy the Selected Item (Text)
// Copy the selected text
function copySelectedText(info) {
  const selectedText = info.selectionText;
  const paragraphElement = `<p>${selectedText}<p>`
  chrome.storage.local.get(["editorContent"], (result) => {
    if (result.editorContent) {
      // Append the new selected text to the existing copied text
      chrome.storage.local.set({ editorContent: result.editorContent + paragraphElement }, () => {
        showNotification("Copy Successful", `🙶${getFirstAndLastWord(selectedText)}🙷. copied successfully!`);
        console.log("Text copied with previous text and stored:", `${result.editorContent}\n${selectedText}`);
        
      });
    } else {
      // Store the copied text using the Chrome storage API
      chrome.storage.local.set({ editorContent: paragraphElement }, () => {
        showNotification("Copy Successful", `🙶${getFirstAndLastWord(selectedText)}🙷. copied successfully!`);
        console.log("Text copied and stored:", selectedText);
        
      });
    }
  });
}


// Copy the image URL
function copyImageUrl(info) {
  const imageUrl =  info.srcUrl;
  const imageElement = `<img src="${imageUrl}" alt="Copied Image" />`;
  chrome.storage.local.get(["editorContent"], (result) => {
    if (result.editorContent) {
      // Append the new selected image to the existing copied images
      chrome.storage.local.set({editorContent: result.editorContent + imageElement},()=>{
        showNotification("Copy Successful", `Image copied successfully!`);
        console.log("image copied with previous image and stored:", `${result.editorContent}\n${imageUrl}`);
      })
    } else{
        // Store the copied image URL using the Chrome storage API
        chrome.storage.local.set({ editorContent: imageElement }, () => {
          showNotification("Copy Successful", `Image copied successfully!`);
          console.log("Image URL copied and stored:", imageUrl);
  });
    }
  })

}




















// // Listening for tab updates
// chrome.tabs.onUpdated.addListener((tabId, changeInfo, tab) => {
//   console.log('Tab updated:', tabId, changeInfo, tab);
// });

// // Listening for new tab creation
// chrome.tabs.onCreated.addListener((tab) => {
//   console.log('New tab created:', tab);
// });


// // Create a context menu item
// chrome.contextMenus.create({
//   id: "sampleMenuItem",   // A unique identifier for the item
//   title: "Sample Action", // The text displayed in the menu
//   contexts: ["all"]       // Contexts where this menu item will appear (e.g., "page", "selection", "link")
// });

// // Listening for browser action clicks
// chrome.action.onClicked.addListener((tab) => {
//   console.log('Browser action icon clicked:', tab);
// });
// // Listening for context menu item clicks
// chrome.contextMenus.onClicked.addListener((info, tab) => {
//   console.log('Context menu item clicked:', info, tab);
// });

// // Setting an alarm
// chrome.alarms.create('myAlarm', { delayInMinutes: 1 });

// // Listening for alarm events
// chrome.alarms.onAlarm.addListener((alarm) => {
//   console.log('Alarm triggered:', alarm);
// });

// // Listening for web requests
// chrome.webRequest.onBeforeRequest.addListener(
//   (details) => {
//     console.log('Web request intercepted:', details);
//   },
//   { urls: ["<all_urls>"] }
// );
