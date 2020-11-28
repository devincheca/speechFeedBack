var state = {};
async function sendFeedback() {
  if (!this.state.feedback) {
    return errorMessage('Please enter some feedback for the speaker');
  }
  const res = await req({
    data: {
      feedback: this.state.feedback,
      token: getToken()
    },
    endpoint: '/sendFeedback'
  });
  if (res.isSent) {
    successMessage('Your feedback was successfully sent');
  } else {
    errorMessage('Oops. Something went wrong. Refresh the page and try again.');
  }
}
function getToken() {
  return document.getElementById('tokenDiv').innerHTML.toString();
}
