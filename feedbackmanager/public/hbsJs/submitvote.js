var state = {};
async function castVote() {
  if (!this.state.vote) {
    return errorMessage('Please enter someone to vote for');
  }
  toggleLoaderButton();
  const res = await req({
    data: {
      feedback: this.state.vote,
      link: getToken()
    },
    endpoint: '/saveVote'
  });
  toggleLoaderButton();
  if (res.isSent) {
    successMessage('Your vote was successfully cast');
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
