var state = {
  initDate: new Date(),
  votes: []
};
window.onload = () => {
  document.getElementById('linkDiv').style.display = 'initial';
  document.getElementById('copyButtonDiv').style.display = 'initial';
  document.getElementById('linkInstructions').style.display = 'flex';
  const linkInput = document.getElementById('linkInput');
  linkInput.value = window.localStorage.domain + '/feedback/' + document.getElementById('linkDivId').innerHTML;
  copyToClipboard(linkInput.value);
  localStorage.originator = document.getElementById('originatorValueDiv').innerHTML.toString();
  pollLink(linkInput.value);
};
async function pollLink(link) {
  try {
    const res = await req({
      data: {
        link,
        originator: window.localStorage.originator
      },
      endpoint: '/getFeedback'
    });
    if (!res) {
      alert('Something went wrong, either you are not the person that initiated the vote, or the system is down.');
    }
    if (res.votes) {
      renderVotes(JSON.parse(res.votes));
    }
    if (isPollable()) {
      setTimeout(() => pollLink(link), 500);
    }
  } catch(error) {
    console.trace(error);
    setTimeout(() => pollLink(link), 500);
  }
}
function renderVotes(votes) {
  const div = document.getElementById('voteTallyDiv');
  div.innerHTML = '';
  const titleDiv = document.createElement('div');
  titleDiv.style.marginBottom = '.25em';
  titleDiv.innerHTML = 'The feedback will come in as a live feed below:';
  div.appendChild(titleDiv);
  for (let i = 0; i < votes.length; i++) {
    div.appendChild(getVoteDiv(votes[i]));
  }
  function getVoteDiv(vote) {
    const div = document.createElement('div');
    div.style.textAlign = 'center';
    div.innerHTML = vote;
    return div;
  }
}
function isPollable() {
  const { initDate: currentDate } = this.state;
  const timeNow = new Date();
  if (
    currentDate.getFullYear() === timeNow.getFullYear()
    && currentDate.getMonth() === timeNow.getMonth()
    && currentDate.getDate() === timeNow.getDate()
  ) {
    const totalMinutesSinceStart = 60*(timeNow.getHours() - currentDate.getHours()) + (timeNow.getMinutes() - currentDate.getMinutes());
    return totalMinutesSinceStart <= 60;
  } else {
    return false;
  }
}
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
