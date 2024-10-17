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

// ## Step 3: Copy the Selected Item (Text)
// Copy the selected text
function copySelectedText(info) {
  const selectedText = info.selectionText;
  const paragraphElement = `<p>${selectedText}<p>`
  chrome.storage.local.get(["editorContent"], (result) => {
    if (result.editorContent) {
      // Append the new selected text to the existing copied text
      chrome.storage.local.set({ editorContent: result.editorContent + paragraphElement }, () => {
        console.log("Text copied with previous text and stored:", `${result.editorContent}\n${selectedText}`);
      });
    } else {
      // Store the copied text using the Chrome storage API
      chrome.storage.local.set({ editorContent: paragraphElement }, () => {
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
        console.log("image copied with previous image and stored:", `${result.editorContent}\n${imageUrl}`);
      })
    } else{
        // Store the copied image URL using the Chrome storage API
        chrome.storage.local.set({ editorContent: imageElement }, () => {
          console.log("Image URL copied and stored:", imageUrl);
  });
    }
  })

}

// // ## Optional: Step 4: Retrieve the Copied Content in the Popup
// // This part is not in background.js but in popup.js or wherever you want to access the copied content
// // Example to load copied text or image in popup
// document.addEventListener("DOMContentLoaded", () => {
//   // Get the stored copied text
//   chrome.storage.local.get(["copiedText", "copiedImage"], (result) => {
//     if (result.copiedText) {
//       document.getElementById("copiedText").textContent = result.copiedText;
//     }
//     if (result.copiedImage) {
//       const imgElement = document.getElementById("copiedImage");
//       imgElement.src = result.copiedImage;
//       imgElement.style.display = "block";
//     }
//   });
// });




















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
