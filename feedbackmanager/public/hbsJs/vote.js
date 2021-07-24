var state = {
  initDate: null,
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
      state.votes = res.votes;
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
  console.log('render votes here');
}
function isPollable() {
  if (this.state.initDate) {
    const { currentDate } = this.state;
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
  } else {
    this.state.initDate = new Date();
    return true;
  }
}
