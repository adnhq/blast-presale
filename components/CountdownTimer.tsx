import { Loader2 } from "lucide-react";
import { useEffect, useState } from "react";
import useContractFuncs from "./useContractFuncs";

export default function CountdownTimer() {
  const [timeLeft, setTimeLeft] = useState({
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0,
  });
  const [isTimeLoading, setIsTimeLoading] = useState(true);
  const { getTimeRemaining } = useContractFuncs();

  useEffect(() => {
    async function fetchRemainingTime() {
      setIsTimeLoading(true);
      const time = await getTimeRemaining();
      setTimeLeft(time);
      setIsTimeLoading(false);
    }

    fetchRemainingTime();

    const timer = setInterval(() => {
      setTimeLeft((prev) => {
        if (prev.seconds > 0) {
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

  const getStrokeDasharray = (value: number, max: number) => {
    const percentage = (value / max) * 100;
    return `${percentage} ${100 - percentage}`;
  };

  return (
    <>
      {isTimeLoading ? (
        <div className="flex flex-col items-center">
          <Loader2 className="w-10 h-10 mb-2 animate-spin text-sky-500" />
          <span className="text-white">Loading timer</span>
        </div>
      ) : (
        <div className="flex items-center justify-center gap-2 sm:gap-3 md:gap-4 w-full max-w-full mx-auto px-2">
          {Object.entries(timeLeft).map(([label, value]) => {
            const max = label === "days" ? 7 : label === "hours" ? 24 : 60;
            return (
              <div key={label} className="flex flex-col items-center">
                <div className="relative w-14 h-14 sm:w-16 sm:h-16 md:w-20 md:h-20">
                  <svg
                    className="w-full h-full -rotate-90"
                    viewBox="0 0 100 100"
                  >
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
                <span className="text-[10px] sm:text-xs text-white/60 font-medium uppercase tracking-wider mt-1">
                  {label}
                </span>
              </div>
            );
          })}
        </div>
      )}
    </>
  );
}
