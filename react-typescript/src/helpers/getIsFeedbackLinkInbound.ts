export const getInboundFeedbackLink: () => string | undefined = () => {
  const urlArray = window.location.href.split('/');

  if (!window.location.href.includes('feedback')) return;

  return urlArray.at(-1);
};
