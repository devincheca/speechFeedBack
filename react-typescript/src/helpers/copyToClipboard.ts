
export const copyToClipboard = (inputRef: HTMLInputElement) => {
  const inputText = inputRef.value;
  let isCopied = true;

  // if (window.clipboardData && window.clipboardData.setData) {
    // updateCopyStatus();
    // return clipboardData.setData("Text", text);
  // }
  // else if (document.queryCommandSupported && document.queryCommandSupported("copy")) {
    const textarea = document.createElement("textarea");
    textarea.textContent = inputText;
    textarea.style.position = "fixed";  // Prevent scrolling to bottom of page in Microsoft Edge.
    document.body.appendChild(textarea);
    textarea.select();
    try {
      return document.execCommand("copy");  // Security exception may be thrown by some browsers.
    }
    catch (ex) {
      isCopied = false;
      console.warn("Copy to clipboard failed.", ex);
      return false;
    }
    finally {
      // if (isCopied) { updateCopyStatus(); }
      document.body.removeChild(textarea);
    }
  // }
}
