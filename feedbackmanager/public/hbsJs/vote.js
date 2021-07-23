var state = {
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
    setTimeout(() => pollLink(link), 500);
  } catch(error) {
    console.trace(error);
    setTimeout(() => pollLink(link), 500);
  }
}
function renderVotes() {
  console.log('render votes here');
}
