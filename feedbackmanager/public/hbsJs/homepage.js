var state = {};
window.onload = () => {
  togglePage('feedback');
  console.log('start timeout here');
  // TODO: implement a typing animation to show and explain what each one is for
  // with a slide down panel sort of design
};
function togglePage(page) {
  const pages = {
    feedback: {
      nav: document.getElementById('feedbackNavLink'),
      div: document.getElementById('feedbackDiv'),
    },
    vote: {
      nav: document.getElementById('voteNavLink'),
      div: document.getElementById('voteDiv'),
    }
  };
  Object.keys(pages).map(page => {
    const { div, nav } = pages[page];
    div.style.display = 'none';
    nav.className = nav.className.replace(/home-nav-link-focus/g, '');
  });
  const { div, nav } = pages[page];
  div.style.display = 'initial';
  nav.className += ' home-nav-link-focus';
}
function showFeedbackPage() { togglePage('feedback'); }
function showVotePage() { togglePage('vote'); }
