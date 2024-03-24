export const generateTimeStamp: () => string = () => (
  Math.floor(Date.now() / 1000) + (24*60*60)
).toString();
