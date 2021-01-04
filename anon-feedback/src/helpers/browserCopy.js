export function copyToClipboard(text, callback) {
  let isCopied = true;
  if (window.clipboardData && window.clipboardData.setData) {
    callback();
    return window.clipboardData.setData("Text", text);
  }
  else if (document.queryCommandSupported && document.queryCommandSupported("copy")) {
    const textarea = document.createElement("textarea");
    textarea.textContent = text;
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
      if (isCopied) { callback(); }
      document.body.removeChild(textarea);
    }
  }
}
