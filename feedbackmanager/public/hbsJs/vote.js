var state = {
  initDate: new Date(),
  votes: []
};
async function pollLink(link) {
  try {
    const res = await req({
      data: {
        link,
        originator: window.localStorage.originator
      },
      endpoint: '/getVotes'
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
  titleDiv.innerHTML = 'The votes will come in as a live feed below:';
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
