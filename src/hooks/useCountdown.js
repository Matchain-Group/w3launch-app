import { useEffect, useState } from "react";

const pad = (value) => String(value).padStart(2, "0");

export const useCountdown = (launchDate) => {
  const [timeLeft, setTimeLeft] = useState(() => getTimeLeft(launchDate));

  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft(getTimeLeft(launchDate));
    }, 1000);
    return () => clearInterval(timer);
  }, [launchDate]);

  return {
    days: pad(timeLeft.days),
    hours: pad(timeLeft.hours),
    minutes: pad(timeLeft.minutes),
    seconds: pad(timeLeft.seconds),
    totalSeconds: timeLeft.totalSeconds
  };
};

const getTimeLeft = (launchDate) => {
  const now = new Date();
  const distance = Math.max(0, launchDate.getTime() - now.getTime());
  const totalSeconds = Math.floor(distance / 1000);
  const days = Math.floor(totalSeconds / (3600 * 24));
  const hours = Math.floor((totalSeconds % (3600 * 24)) / 3600);
  const minutes = Math.floor((totalSeconds % 3600) / 60);
  const seconds = totalSeconds % 60;
  return { days, hours, minutes, seconds, totalSeconds };
};
