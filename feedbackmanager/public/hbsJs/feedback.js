var state = {};
async function sendFeedback() {
  if (!this.state.feedback) {
    return errorMessage('Please enter some feedback for the speaker');
  }
  toggleLoaderButton();
  /*
  const res = await req({
    data: {
      feedback: this.state.feedback,
      token: getToken()
    },
    endpoint: '/sendFeedback'
  });
  */
  const res = await req({
    data: {
      feedback: this.state.feedback,
      token: getToken()
    },
    endpoint: '/sendSpeechFeedback'
  });
  toggleLoaderButton();
  if (res.isSent) {
    successMessage('Your feedback was successfully sent');
  } else {
    errorMessage('Oops. Something went wrong. Refresh the page and try again.');
  }
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
function getToken() {
  return document.getElementById('tokenDiv').innerHTML.toString();
}
