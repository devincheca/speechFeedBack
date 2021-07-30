var state = {};
async function castVote() {
  if (!this.state.vote) {
    return errorMessage('Please enter someone to vote for');
  }
  if (isAlreadyVoted()) {
    return errorMessage('You cannot vote twice.');
  }
  toggleLoaderButton();
  const linkToken = getToken();
  const res = await req({
    data: {
      vote: this.state.vote,
      link: linkToken
    },
    endpoint: '/saveVote'
  });
  toggleLoaderButton();
  if (res.isSaved) {
    successMessage('Your vote was successfully cast');
    setCastVote();
  } else {
    errorMessage('Oops. Something went wrong. Refresh the page and try again.');
  }
}
function setCastVote() {
  try {
    const linkToken = getToken();
    const { votesCast } = localStorage;
    const votesCastArray = votesCast ? JSON.parse(votesCast) : [];
    if (votesCastArray) {
      if (Array.isArray(votesCastArray)) {
        votesCastArray.push(linkToken);
        localStorage.votesCast = JSON.stringify(votesCastArray);
      } else {
        localStorage.votesCast = JSON.stringify([linkToken]);
      }
    }
  } catch(error) { console.trace(error); }
}
function isAlreadyVoted() {
  try {
    const linkToken = getToken();
    const { votesCast } = localStorage;
    if (!votesCast) {
      return false;
    }
    const votesCastArray = JSON.parse(votesCast);
    if (votesCastArray) {
      return Array.isArray(votesCastArray)
        ? votesCastArray.includes(linkToken)
        : votesCastArray.toString() === linkToken;
    } else {
      return false;
    }
  } catch(error) {
    console.trace(error);
    return false;
  }
}
function toggleLoaderButton() {
  const feedbackButton = document.getElementById('feedbackButton');
  const loaderButton = document.getElementById('loaderButton');
  if (loaderButton.style.display === 'none') {
    feedbackButton.style.display = 'none';
    feedbackButton.disabled = true;
    loaderButton.style.display = 'initial';
  } else {
    feedbackButton.style.display = 'initial';
    loaderButton.style.display = 'none';
  }
}
function getToken() {
  return document.getElementById('tokenDiv').innerHTML.toString();
}
