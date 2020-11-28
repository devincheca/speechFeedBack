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
  document.getElementById('feedbackButtonDiv').style.display = 'none';
  document.getElementById('linkDiv').innerHTML = window.localStorage.domain + '/feedback/' + res.token;
  toggleLoaderButton();
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
