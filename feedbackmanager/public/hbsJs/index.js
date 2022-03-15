var state = {};
window.onload = () => {
  if (isTutorial()) {
    Array.from(document.getElementsByClassName('inputPhoneHeader'))
      .map(div => div.innerHTML += '</br> (pretend you just gave a speech to your club)');
  }
};
async function getLink() {
  if (!this.state.phoneNumber) {
    return errorMessage('Input a phone number above to receive feedback');
  }
  toggleLoaderButton();
  const { token, url } = await req({
    data: { phoneNumber: this.state.phoneNumber },
    endpoint: '/getLink'
  });
  toggleLoaderButton();
  document.getElementById('feedbackButtonDiv').style.display = 'none';
  document.getElementById('linkDiv').style.display = 'initial';
  document.getElementById('copyButtonDiv').style.display = 'initial';
  document.getElementById('linkInstructions').style.display = 'flex';
  const linkInput = document.getElementById('linkInput');
  linkInput.value = window.localStorage.domain + '/feedback/' + token;
  this.state.token = token;
  showQrCode(url);
  copyToClipboard(linkInput.value);
  if (isTutorial()) {
    document.getElementById('linkInstructions').innerHTML += '</br> (you can paste the link below into another tab on your browser to try it for yourself, or click the "Send Test Message" button below)'
  }
}
function showQrCode(url) {
  const img = document.createElement('img');
  img.src = url;
  const imgDiv = document.getElementById('qrCodeImage');
  imgDiv.appendChild(img);
  imgDiv.style.display = 'block';
  const testMessageDiv = document.getElementById('sendTestMessageDiv');
  testMessageDiv.style.display = 'block';
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
function toggleTestLoaderButton() {
  const feedbackButton = document.getElementById('testFeedbackButton');
  const loaderButton = document.getElementById('testFeedbackLoaderButton');
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
async function sendTestFeedback() {
  toggleTestLoaderButton();
  const res = await req({
    data: {
      feedback: 'This message is a test. If you receive this message then the link and QR code are ready for you to send so fellow club members can provide you with their feedback.',
      token: this.state.token
    },
    endpoint: '/sendFeedback'
  });
  toggleTestLoaderButton();
  if (res.isSent) {
    successMessage('Your test message was successfully sent');
  } else {
    errorMessage('Oops. Something went wrong. Refresh the page and try again.');
  }
}
function isTutorial() {
  return location.href.includes('isTutorial=true');
}
