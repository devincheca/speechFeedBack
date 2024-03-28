export const generateTimeStamp: () => string = () => {
  const offset = 10000;
  const hoursInDay = 24;
  const minutesInHour = 60;
  const secondsInMinute = 60;

  return (Math.floor(Date.now() / 1000) + (hoursInDay*minutesInHour*secondsInMinute) + offset).toString();
};
