import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { ArrowRight, Gem, Loader2, Wallet } from "lucide-react";
import Link from "next/link";
import { useEffect, useState } from "react";
import { toast } from "react-toastify";
import CountdownTimer from "./CountdownTimer";
import useContractFuncs from "./useContractFuncs";

export default function BuySection() {
  const [inputAmount, setInputAmount] = useState("");
  const [tokenAmount, setTokenAmount] = useState<string>("0");
  const [isHovered, setIsHovered] = useState(false);
  const {
    getRemainingTokens,
    claimYourTokens,
    isConnected,
    buyToken,
    getCalculatedToken,
    getBlastTokenPrice,
    getBlastTokenPriceInUSD,
    getPurchasedAmount,
    getTimeRemaining,
    getBlastAddress,
  } = useContractFuncs();
  const [isLoading, setIsLoading] = useState(false);
  const [isClaimLoading, setIsClaimLoading] = useState(false);
  const [isBlastPriceLoading, setIsBlastPriceLoading] = useState(true);
  const [blastPrice, setBlastPrice] = useState<string | null>(null);
  const [blastPriceInUsd, setBlastPriceInUsd] = useState<string | null>(null);
  const [blastBalance, setBlastBalance] = useState<string | null>(null);
  const [claimable, setClaimable] = useState(false);
  const [remainingTokens, setRemainingTokens] = useState<string | null>(null);
  const [blastAddress, setBlastAddress] = useState<string | null>(null);

  useEffect(() => {
    async function fetchPrice() {
      const price = await getBlastTokenPrice();
      const priceInUsd = await getBlastTokenPriceInUSD();
      const remTokens = await getRemainingTokens();
      const bAddress = await getBlastAddress();

      setBlastAddress(bAddress);
      setRemainingTokens(remTokens);
      setBlastPrice(price);
      setBlastPriceInUsd(priceInUsd);
      setIsBlastPriceLoading(false);
    }
    fetchPrice();
  }, []);

  useEffect(() => {
    async function fetchBalance() {
      try {
        const remainingTime = await getTimeRemaining();
        if (
          remainingTime.days === 0 &&
          remainingTime.hours === 0 &&
          remainingTime.minutes === 0 &&
          remainingTime.seconds === 0
        ) {
          setClaimable(true);
        }
        if (isConnected) {
          const balance = await getPurchasedAmount();
          setBlastBalance(balance);
        }
      } catch (error) {
        console.log(error);
        toast.error((error as Error).message);
      }
    }
    fetchBalance();
  }, [isConnected]);

  useEffect(() => {
    const delayDebounceFn = setTimeout(async () => {
      if (!inputAmount || Number(inputAmount) < 0) {
        setTokenAmount("0");
        return;
      }
      const expTokenAmount = await getCalculatedToken(inputAmount);
      setTokenAmount(expTokenAmount.toString());
    }, 300);
    return () => clearTimeout(delayDebounceFn);
  }, [inputAmount, isConnected, getCalculatedToken]);

  const handleBuy = async () => {
    try {
      setIsLoading(true);
      await buyToken(inputAmount);
      const price = await getBlastTokenPrice();
      const priceInUsd = await getBlastTokenPriceInUSD();
      const remTokens = await getRemainingTokens();

      setRemainingTokens(remTokens);
      setBlastPrice(price);
      setBlastPriceInUsd(priceInUsd);
      setIsBlastPriceLoading(false);

      const balance = await getPurchasedAmount();
      setBlastBalance(balance);
      toast.success(
        `Transaction successful! You have bought ${tokenAmount} $BLAST tokens.`
      );
    } catch (error) {
      console.log(error);
      toast.error((error as Error).message);
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
      await claimYourTokens();
      const balance = await getPurchasedAmount();
      setBlastBalance(balance);
      toast.success(
        `Transaction successful! You have claimed ${balance} $BLAST tokens.`
      );
    } catch (error) {
      console.log(error);
      toast.error((error as Error).message);
    } finally {
      setIsClaimLoading(false);
    }
  };

  return (
    <div className="flex flex-col h-full relative group">
      {/* <div className="absolute -inset-[20px] bg-gradient-to-r from-blue-500 to-cyan-500 rounded-sm opacity-75 group-hover:opacity-100 blur transition duration-1000 animate-pulse" />
      <div className="absolute -inset-[20px] bg-gradient-to-r from-cyan-400 to-blue-400 rounded-sm opacity-50 group-hover:opacity-75 blur-md transition duration-1000 animate-pulse-slow" /> */}
      <div className="relative h-full bg-gradient-to-b from-black/25 to-black/40 backdrop-blur-sm flex flex-col">
        <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-blue-400 to-cyan-500" />
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

            {!claimable && (
              <div className="w-full overflow-hidden">
                <CountdownTimer />
              </div>
            )}
          </div>

          {!claimable ? (
            <>
              <div className="mt-2 md:mt-3 text-lg md:text-lg font-semibold flex flex-col 2xl:flex-row items-center justify-center mb-4 2xl:gap-1">
                <span className="text-white/80">Remaining Tokens: </span>
                {isBlastPriceLoading ? (
                  <span className="text-white font-bold">
                    <Loader2 className="w-4 h-4 animate-spin" />
                  </span>
                ) : (
                  remainingTokens
                )}
                {" BLAST"}
              </div>

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

              <div className="mt-1 text-sm text-white/80 flex items-center justify-center gap-2">
                1 $BLAST = $
                {isBlastPriceLoading ? (
                  <span className="text-white">
                    <Loader2 className="w-4 h-4 animate-spin" />
                  </span>
                ) : (
                  blastPriceInUsd
                )}
              </div>
            </>
          ) : (
            <h2 className="text-center text-xl font-bold mb-8">
              PRESALE HAS ENDED
            </h2>
          )}

          <div className="space-y-3 md:space-y-4 flex-1 min-h-0">
            <div className="flex items-center justify-center space-x-2 mb-3 bg-white/20 rounded-xl border py-2 mt-2 px-4">
              <div className="text-MD md:text-sm font-semibold text-white">
                CLAIMABLE BALANCE:{" "}
                <span className="font-medium">
                  {blastBalance !== null ? blastBalance : 0} $BLAST
                </span>
              </div>
            </div>

            {isConnected && claimable && (
              <Button
                className="w-full h-10 md:h-12 text-sm md:text-base font-bold relative overflow-hidden group mb-8 mt-6"
                disabled={isLoading || isClaimLoading || !claimable}
                onClick={claimTokens}
              >
                <div className="absolute inset-0 bg-gradient-to-r from-blue-400 to-cyan-500 disabled:from-blue-300 disabled:to-cyan-400 disabled:cursor-not-allowed transition-transform duration-300 group-hover:scale-105" />
                <div className="relative flex items-center justify-center gap-2">
                  <Wallet className="w-4 h-4 md:w-5 md:h-5 transition-transform duration-300" />
                  <span className="tracking-wide">
                    {isClaimLoading ? "Claiming..." : "Claim"}
                  </span>
                </div>
              </Button>
            )}

            {!claimable && (
              <>
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

                <div className="w-full h-10 md:h-12 text-sm md:text-base font-bold relative overflow-hidden group">
                  {isConnected ? (
                    <Button
                      className="w-full h-full"
                      onMouseEnter={() => setIsHovered(true)}
                      onMouseLeave={() => setIsHovered(false)}
                      onClick={handleBuy}
                      disabled={isLoading}
                    >
                      <div className="absolute inset-0 bg-gradient-to-r from-blue-400 to-cyan-500 disabled:from-blue-300 disabled:to-cyan-400 disabled:cursor-not-allowed transition-transform duration-300 group-hover:scale-105" />
                      <div className="relative flex items-center justify-center gap-2">
                        <Wallet
                          className={`w-4 h-4 md:w-5 md:h-5 transition-transform duration-300 ${
                            isHovered ? "scale-110" : "scale-100"
                          }`}
                        />
                        <span className="tracking-wide">
                          {isLoading ? "Buying blast..." : "Buy $BLAST"}
                        </span>
                      </div>
                    </Button>
                  ) : (
                    <div className="flex justify-center">
                      <appkit-button />
                    </div>
                  )}
                </div>
              </>
            )}
          </div>
        </div>
        <Link
          target="_blank"
          href={`https://testnet.bscscan.com/address/${blastAddress}`}
          className="mt-auto mb-4 flex flex-col items-center justify-center gap-2 hover:text-sky-500 hover:underline text-sm"
        >
          <p>$BLAST Token:</p>
          {isBlastPriceLoading ? (
            <span className="text-white">
              <Loader2 className="w-4 h-4 animate-spin" />
            </span>
          ) : (
            blastAddress
          )}
        </Link>
      </div>
    </div>
  );
}
