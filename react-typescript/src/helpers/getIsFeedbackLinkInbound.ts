export const getInboundFeedbackLink: () => string | undefined = () => {
  const urlArray = window.location.href.split('?');

  if (!window.location.href.includes('feedbackId')) return;

  return urlArray.at(-1)?.split('=').at(-1);
};
