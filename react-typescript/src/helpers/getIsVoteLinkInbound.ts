export const getInboundVoteLink: () => string | undefined = () => {
  const urlArray = window.location.href.split('?');

  if (!window.location.href.includes('voteId')) return;

  return urlArray.at(-1)?.split('=').at(-1);
};
