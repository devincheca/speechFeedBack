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
    console.log('res: ', res);
    //update state
    renderVotes();
    setTimeout(() => pollLink(link), 500);
  } catch(error) {
    console.trace(error);
    setTimeout(() => pollLink(link), 500);
  }
}
