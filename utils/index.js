export const formatNumber = (num) => {
  return num < 10 ? `0${num}` : `${num}`;
};

export const convertSecondsToMinutes = (seconds) => {
  const minutes = Math.floor(seconds / 60);
  const remainingSeconds = seconds % 60;
  return { minutes, remainingSeconds };
};
