var state = {};
async function getLink() {
  if (!this.state.phoneNumber) {
    return errorMessage('Input a phone number above to receive feedback');
  }
  const res = await req({
    data: { phoneNumber: this.state.phoneNumber },
    endpoint: '/getLink'
  });
  document.getElementById('feedbackButtonDiv').style.display = 'none';
  document.getElementById('linkDiv').innerHTML = window.localStorage.domain + '/feedback/' + res.token;
}
