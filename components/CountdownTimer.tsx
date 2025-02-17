import { Loader2 } from "lucide-react";
import { useEffect, useState } from "react";
import useContractFuncs from "./useContractFuncs";

interface TimeLeft {
  days: number;
  hours: number;
  minutes: number;
  seconds: number;
}

export default function CountdownTimer() {
  const [timeLeft, setTimeLeft] = useState<TimeLeft>({
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0,
  });
  const [isTimeLoading, setIsTimeLoading] = useState(true);
  const [timerLabel, setTimerLabel] = useState("");
  const { getTimeRemaining, getTimeUntilNextPriceIncrease } = useContractFuncs();

  async function fetchTime() {
    setIsTimeLoading(true);
    // First try to get the time until next price increase.
    const nextPriceTime = await getTimeUntilNextPriceIncrease();
    const totalNextSeconds =
      nextPriceTime.days * 86400 +
      nextPriceTime.hours * 3600 +
      nextPriceTime.minutes * 60 +
      nextPriceTime.seconds;
    if (totalNextSeconds > 0) {
      setTimeLeft(nextPriceTime);
      setTimerLabel("Time Until Next Price Increase");
    } else {
      const saleTime = await getTimeRemaining();
      setTimeLeft(saleTime);
      setTimerLabel("Until Sale End");
    }
    setIsTimeLoading(false);
  }

  useEffect(() => {
    fetchTime();
    const timer = setInterval(() => {
      setTimeLeft((prev) => {
        if (
          prev.days === 0 &&
          prev.hours === 0 &&
          prev.minutes === 0 &&
          prev.seconds === 0
        ) {
          return prev;
        } else if (prev.seconds > 0) {
          return { ...prev, seconds: prev.seconds - 1 };
        } else if (prev.minutes > 0) {
          return { ...prev, minutes: prev.minutes - 1, seconds: 59 };
        } else if (prev.hours > 0) {
          return { ...prev, hours: prev.hours - 1, minutes: 59, seconds: 59 };
        } else if (prev.days > 0) {
          return {
            ...prev,
            days: prev.days - 1,
            hours: 23,
            minutes: 59,
            seconds: 59,
          };
        }
        return prev;
      });
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  // If we're in "Time Until Next Price Increase" mode and the timer reaches zero, re-fetch.
  useEffect(() => {
    if (
      timerLabel === "Time Until Next Price Increase" &&
      timeLeft.days === 0 &&
      timeLeft.hours === 0 &&
      timeLeft.minutes === 0 &&
      timeLeft.seconds === 0
    ) {
      fetchTime();
    }
  }, [timeLeft, timerLabel]);

  const getStrokeDasharray = (value: number, max: number) => {
    const percentage = (value / max) * 100;
    return `${percentage} ${100 - percentage}`;
  };

  if (isTimeLoading) {
    return (
      <div className="flex flex-col items-center">
        <Loader2 className="w-10 h-10 mb-2 animate-spin text-sky-500" />
        <span className="text-white">Loading timer</span>
      </div>
    );
  }

  return (
    <div className="mx-auto">
      {/* Timer label */}
      <p className="text-center text-lg font-bold text-white mb-2">{timerLabel}</p>
      <div className="flex items-center justify-center gap-2 sm:gap-3 md:gap-4 w-full max-w-full mx-auto px-2">
        {Object.entries(timeLeft).map(([label, value]) => {
          // Use max values similar to your original display.
          const max = label === "days" ? 7 : label === "hours" ? 24 : 60;
          return (
            <div key={label} className="flex flex-col items-center">
              <div className="relative w-14 h-14 sm:w-16 sm:h-16 md:w-20 md:h-20">
                <svg className="w-full h-full -rotate-90" viewBox="0 0 100 100">
                  <circle
                    className="text-white/10"
                    strokeWidth="4"
                    stroke="currentColor"
                    fill="transparent"
                    r="45"
                    cx="50"
                    cy="50"
                  />
                  <circle
                    className="text-blue-400 transition-all duration-1000 ease-in-out"
                    strokeWidth="4"
                    strokeLinecap="round"
                    stroke="currentColor"
                    fill="transparent"
                    r="45"
                    cx="50"
                    cy="50"
                    strokeDasharray={getStrokeDasharray(value, max)}
                    strokeDashoffset="0"
                  />
                </svg>
                <div className="absolute inset-0 flex flex-col items-center justify-center">
                  <span className="text-lg sm:text-xl md:text-2xl font-bold text-white">
                    {value.toString().padStart(2, "0")}
                  </span>
                </div>
              </div>
              <span className="text-[10px] sm:text-xs text-white/90 font-medium uppercase tracking-wider mt-1">
                {label}
              </span>
            </div>
          );
        })}
      </div>
    </div>
  );
}
