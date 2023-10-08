export const secondsToMinutes = (seconds : number) => {
  var minutes  = Math.floor(seconds / 60);
  var remainingSeconds  = seconds % 60;

  return `${minutes }:${remainingSeconds }`;
}

export const formatTime = (timeInSeconds: number) => {
  const minutes = Math.floor(timeInSeconds / 60);
  const seconds = Math.floor(timeInSeconds % 60);
  return `${minutes}:${seconds < 10 ? "0" : ""}${seconds}`;
};