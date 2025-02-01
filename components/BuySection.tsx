import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { ArrowRight, Gem, Loader2, Wallet } from "lucide-react";
import { useEffect, useState } from "react";
import { toast } from "react-toastify";
import CountdownTimer from "./CountdownTimer";
import useContractFuncs from "./useContractFuncs";

export default function BuySection() {
  const [inputAmount, setInputAmount] = useState("");
  const [tokenAmount, setTokenAmount] = useState<string>("0");
  const [isHovered, setIsHovered] = useState(false);
  const {
    isConnected,
    buyToken,
    getCalculatedToken,
    getBlastTokenPrice,
    getPurchasedAmount,
    getTimeRemaining,
  } = useContractFuncs();
  const [isLoading, setIsLoading] = useState(false);
  const [isClaimLoading, setIsClaimLoading] = useState(false);
  const [isBlastPriceLoading, setIsBlastPriceLoading] = useState(false);
  const [blastPrice, setBlastPrice] = useState<string | null>(null);
  const [blastBalance, setBlastBalance] = useState<string | null>(null);
  const [claimable, setClaimable] = useState(false);

  useEffect(() => {
    async function fetchPrice() {
      setIsBlastPriceLoading(true);
      const price = await getBlastTokenPrice();

      if (isConnected) {
        const remainingTime = await getTimeRemaining();
        if (
          remainingTime.days === 0 &&
          remainingTime.hours === 0 &&
          remainingTime.minutes === 0 &&
          remainingTime.seconds === 0
        ) {
          setClaimable(true);
        }
      }

      setBlastPrice(price);
      setIsBlastPriceLoading(false);
    }

    fetchPrice();
  }, []);

  useEffect(() => {
    async function fetchBalance() {
      if (isConnected) {
        const balance = await getPurchasedAmount();
        setBlastBalance(balance);
      }
    }

    fetchBalance();
  }, [isConnected]);

  // Debounce logic
  useEffect(() => {
    const delayDebounceFn = setTimeout(async () => {
      if (!inputAmount || Number(inputAmount) < 0) {
        setTokenAmount("0");
        return;
      }

      const expTokenAmount = await getCalculatedToken(inputAmount);
      const formattedTokenAmount = expTokenAmount.toString();
      setTokenAmount(formattedTokenAmount);
    }, 300); // 300ms delay

    return () => clearTimeout(delayDebounceFn);
  }, [inputAmount, isConnected, getCalculatedToken]);

  const handleBuy = async () => {
    if (!isConnected) {
      toast.error("Please connect your wallet to buy $BLAST tokens.");
      return;
    }

    try {
      setIsLoading(true);
      await buyToken(inputAmount);
      const balance = await getPurchasedAmount();
      setBlastBalance(balance);
      toast.success(
        `Transaction successful! You have bought ${tokenAmount} $BLAST tokens.`
      );
    } catch (error) {
      console.error(error);
      toast.error("Transaction failed. Please try again!");
    } finally {
      setInputAmount("");
      setTokenAmount("0");
      setIsLoading(false);
    }
  };

  const claimTokens = async () => {
    if (!isConnected) {
      toast.error("Please connect your wallet to claim $BLAST tokens.");
      return;
    }

    try {
      setIsClaimLoading(true);
      const balance = await getPurchasedAmount();
      await claimTokens();
      setBlastBalance(balance);
      toast.success(
        `Transaction successful! You have claimed ${balance} $BLAST tokens.`
      );
    } catch (error) {
      console.error(error);
      toast.error((error as Error).message);
    } finally {
      setIsClaimLoading(false);
    }
  };

  return (
    <div className="h-full relative group">
      {/* Animated border container */}
      <div className="absolute -inset-[20px] bg-gradient-to-r from-blue-500 to-cyan-500 rounded-sm opacity-75 group-hover:opacity-100 blur transition duration-1000 animate-pulse" />

      {/* Secondary glow for extra effect */}
      <div className="absolute -inset-[20px] bg-gradient-to-r from-cyan-400 to-blue-400 rounded-sm opacity-50 group-hover:opacity-75 blur-md transition duration-1000 animate-pulse-slow" />

      {/* Main content container */}
      <div className="relative h-full bg-gradient-to-b from-black/95 to-black/90 backdrop-blur-xl flex flex-col">
        {/* Top accent line */}
        <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-blue-400 to-cyan-500" />

        {/* Main content */}
        <div className="relative flex flex-col p-4 md:p-6 h-full">
          <div className="text-center mb-4 md:mb-6 flex-shrink-0">
            <div className="relative inline-block">
              <div className="flex items-center justify-center gap-2 mb-4 relative">
                <Gem className="w-5 h-5 md:w-6 md:h-6 text-blue-400 animate-twinkle" />
                <h2 className="text-xl md:text-2xl font-bold bg-gradient-to-r from-blue-400 to-cyan-500 text-transparent bg-clip-text animate-gradient">
                  BLAST Presale
                </h2>
                <Gem className="w-5 h-5 md:w-6 md:h-6 text-cyan-500 animate-twinkle-delayed" />
              </div>
            </div>

            <div className="h-24 sm:h-28 md:h-32 w-full overflow-hidden">
              <CountdownTimer />
            </div>
            {
              !isConnected && isLoading && isClaimLoading && !claimable &&
              <Button
                className="w-full h-10 md:h-12 text-sm md:text-base font-bold relative overflow-hidden group mb-8 mt-6"
                disabled = {
                  !isConnected || isLoading || isClaimLoading || !claimable 
                }
                onClick={claimTokens}
              >
                <div className="absolute inset-0 bg-gradient-to-r from-blue-400 to-cyan-500 disabled:from-blue-300 disabled:to-cyan-400 disabled:cursor-not-allowed transition-transform duration-300 group-hover:scale-105" />
                <div className="relative flex items-center justify-center gap-2">
                  <Wallet
                    className={`w-4 h-4 md:w-5 md:h-5 transition-transform duration-300 
                    `}
                  />
                  <span className="tracking-wide">
                    {isClaimLoading ? "Claiming..." : "Claim"}
                  </span>
                </div>
              </Button>
            }

            <div className="mt-2 md:mt-3 text-sm md:text-base font-semibold flex items-center justify-center gap-2">
              <span className="text-white/80">1 $BLAST = </span>

              {isBlastPriceLoading ? (
                <span className="text-white font-bold">
                  <Loader2 className="w-4 h-4 animate-spin" />
                </span>
              ) : (
                blastPrice
              )}
              {" BNB"}
            </div>
            {/* <div className="mt-1 text-sm text-white/60">
              1 BNB = ${BNB_PRICE}
            </div> */}
          </div>

          <div className="space-y-3 md:space-y-4 flex-1 min-h-0">
            <div className="flex items-center justify-center space-x-2 mb-3 bg-white/5 rounded-full py-2 px-4">
              <div className="text-MD md:text-sm font-normal text-white">
                CLAIMABLE BALANCE:{" "}
                <span className="font-medium">
                  {blastBalance !== null ? blastBalance : 0} $BLAST
                </span>
              </div>
            </div>
            <div className="space-y-1">
              <div className="flex justify-between text-xs md:text-sm text-white/60">
                <label>Amount in BNB:</label>
              </div>
              <Input
                type="number"
                value={inputAmount}
                onChange={(e) => setInputAmount(e.target.value)}
                className="h-10 md:h-12 text-sm md:text-base bg-white/5 border-white/10 focus:border-blue-400 transition-colors duration-300"
                placeholder="0.0"
              />
            </div>

            <div className="relative py-2 md:py-3">
              <div className="absolute inset-y-0 left-1/2 w-0.5 bg-gradient-to-b from-transparent via-blue-400/50 to-transparent transform -translate-x-1/2" />
              <ArrowRight className="absolute left-1/2 top-1/2 transform -translate-x-1/2 -translate-y-1/2 text-blue-400/50" />
            </div>

            <div className="space-y-1">
              <div className="flex justify-between text-xs md:text-sm text-white/60">
                <label>You will receive:</label>
                <span>$BLAST</span>
              </div>
              <Input
                readOnly
                value={tokenAmount}
                className="h-10 md:h-12 text-sm md:text-base bg-white/5 border-white/10"
                placeholder="0.0"
              />
            </div>

            <Button
              className="w-full h-10 md:h-12 text-sm md:text-base font-bold relative overflow-hidden group"
              onMouseEnter={() => setIsHovered(true)}
              onMouseLeave={() => setIsHovered(false)}
              onClick={handleBuy}
              disabled={!isConnected || isLoading}
            >
              <div className="absolute inset-0 bg-gradient-to-r from-blue-400 to-cyan-500 disabled:from-blue-300 disabled:to-cyan-400 disabled:cursor-not-allowed transition-transform duration-300 group-hover:scale-105" />
              <div className="relative flex items-center justify-center gap-2">
                <Wallet
                  className={`w-4 h-4 md:w-5 md:h-5 transition-transform duration-300 ${
                    isHovered ? "scale-110" : "scale-100"
                  }`}
                />
                <span className="tracking-wide">
                  {isConnected
                    ? isLoading
                      ? "Buying blast..."
                      : "Buy $BLAST"
                    : "Connect Wallet"}
                </span>
              </div>
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}
