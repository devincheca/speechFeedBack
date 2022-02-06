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
  document.getElementById('linkInstructions').style.display = 'flex';
  const linkInput = document.getElementById('linkInput');
  linkInput.value = window.localStorage.domain + '/feedback/' + res.token;
  showQrCode(res.url);
  copyToClipboard(linkInput.value);
}
function showQrCode(url) {
  const img = document.createElement('img');
  img.src = url;
  const imgDiv = document.getElementById('qrCodeImage');
  imgDiv.appendChild(img);
  imgDiv.style.display = 'block';
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
function togglePasswordView() {
  const input = document.getElementById('phoneNumber');
  input.type = input.type === 'password' ? 'text' : 'password';
}
function copyToClipboard(text) {
  if (!text) {
    text = document.getElementById('linkInput').value;
  }
  let isCopied = true;
  if (window.clipboardData && window.clipboardData.setData) {
    updateCopyStatus();
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
      isCopied = false;
      console.warn("Copy to clipboard failed.", ex);
      return false;
    }
    finally {
      if (isCopied) { updateCopyStatus(); }
      document.body.removeChild(textarea);
    }
  }
}
function updateCopyStatus() {
  const copyStatus = document.getElementById('copyStatus');
  copyStatus.innerHTML = 'Copied!';
  setTimeout(() => { copyStatus.innerHTML = ''; }, 4000);
}
