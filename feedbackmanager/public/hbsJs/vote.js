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
      state.votes = JSON.parse(res.votes);
      renderVotes();
    }
    if (isPollable()) {
      setTimeout(() => pollLink(link), 500);
    }
  } catch(error) {
    console.trace(error);
    setTimeout(() => pollLink(link), 500);
  }
}
function renderVotes() {
  const div = document.getElementById('voteTallyDiv');
  const { votes } = this.state;
  for (let i = votes; i < votes.length; i++) {
    div.appendChild(getVoteDiv(vote));
  }
  function getVoteDiv(vote) {
    const div = document.createElement('div');
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
