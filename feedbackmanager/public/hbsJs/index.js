var state = {};
async function getLink() {
  if (!this.state.phoneNumber) {
    return errorMessage('Input a phone number above to receive feedback');
  }
  toggleLoaderButton();
  const res = await req({
    data: { phoneNumber: this.state.phoneNumber },
    endpoint: '/getLink'
  });
  toggleLoaderButton();
  document.getElementById('feedbackButtonDiv').style.display = 'none';
  document.getElementById('linkDiv').style.display = 'initial';
  document.getElementById('copyButtonDiv').style.display = 'initial';
  const linkInput = document.getElementById('linkInput');
  linkInput.value = window.localStorage.domain + '/feedback/' + res.token;
  copyToClipboard(linkInput.value);
}
function toggleLoaderButton() {
  const feedbackButton = document.getElementById('feedbackButton');
  const loaderButton = document.getElementById('loaderButton');
  if (loaderButton.style.display === 'none') {
    feedbackButton.style.display = 'none';
    loaderButton.style.display = 'initial';
  } else {
    feedbackButton.style.display = 'initial';
    loaderButton.style.display = 'none';
  }
}
function copyToClipboard(text) {
  if (window.clipboardData && window.clipboardData.setData) {
    return clipboardData.setData("Text", text);
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
      console.warn("Copy to clipboard failed.", ex);
      return false;
    }
    finally {
      document.body.removeChild(textarea);
    }
  }
  const copyStatus = document.getElementById('copyStatus');
  copyStatus.innerHTML = 'Copied!';
  setTimeout(() => { copyStatus.innerHTML = ''; }, 4000);
}