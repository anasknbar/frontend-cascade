// Load content from chrome.storage
export const loadEditorContent = async () => {
  if (typeof chrome !== "undefined" && chrome.storage) {
    return new Promise((resolve) => {
      chrome.storage.local.get(["editorContent"], (result) => {
        // Log the retrieved result for verification
        console.log("Retrieved result from chrome.storage:", result);
        // Check if the content was retrieved successfully
        if (chrome.runtime.lastError) {
          console.error("Error retrieving content:", chrome.runtime.lastError);
          resolve(""); // Resolve with an empty string in case of error
        } else {
          console.log("Retrieved editorContent:", result.editorContent);
          resolve(result.editorContent || ""); // Resolve with editorContent or empty string
        }
      });
    });
  }
};

// Save content to chrome.storage, his function is called whenever the editor content changes
export const saveEditorContent = (data) => {
  if (typeof chrome !== "undefined" && chrome.storage) {
    chrome.storage.local.set({ editorContent: data }, () => {
      if (chrome.runtime.lastError) {
        console.error("Error saving content:", chrome.runtime.lastError);
      } else {
        console.log("Content successfully saved to chrome.storage.");
      }
    });
  }
};