"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import CountdownTimer from "./CountdownTimer"
import { Wallet, Gem, ArrowRight } from "lucide-react"

export default function BuySection() {
  const [inputAmount, setInputAmount] = useState("")
  const [isHovered, setIsHovered] = useState(false)

  const BLAST_PRICE = 0.004
  const SOL_PRICE = 100

  const calculateOutput = () => {
    if (!inputAmount) return ""
    return ((Number.parseFloat(inputAmount) * SOL_PRICE) / BLAST_PRICE).toFixed(2)
  }

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

            <div className="mt-2 md:mt-3 text-base md:text-lg font-semibold flex items-center justify-center gap-2">
              <span className="text-white/80">1 $BLAST =</span>
              <span className="text-white font-bold">${BLAST_PRICE}</span>
            </div>
            <div className="mt-1 text-sm text-white/60">1 SOL = ${SOL_PRICE}</div>
          </div>

          <div className="space-y-3 md:space-y-4 flex-1 min-h-0">
            <div className="flex items-center justify-center space-x-2 mb-3 bg-white/5 rounded-full py-2 px-4">
              <img
                src="https://cryptologos.cc/logos/solana-sol-logo.png"
                alt="Solana"
                className="w-5 h-5 md:w-6 md:h-6"
              />
              <span className="text-sm md:text-base font-semibold text-white">Solana</span>
            </div>
            <div className="space-y-1">
              <div className="flex justify-between text-xs md:text-sm text-white/60">
                <label>Amount in SOL:</label>
                <span>Balance: 0.00</span>
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
                value={calculateOutput()}
                className="h-10 md:h-12 text-sm md:text-base bg-white/5 border-white/10"
                placeholder="0.0"
              />
            </div>

            <Button
              className="w-full h-10 md:h-12 text-sm md:text-base font-bold relative overflow-hidden group"
              onMouseEnter={() => setIsHovered(true)}
              onMouseLeave={() => setIsHovered(false)}
            >
              <div className="absolute inset-0 bg-gradient-to-r from-blue-400 to-cyan-500 transition-transform duration-300 group-hover:scale-105" />
              <div className="relative flex items-center justify-center gap-2">
                <Wallet
                  className={`w-4 h-4 md:w-5 md:h-5 transition-transform duration-300 ${isHovered ? "scale-110" : "scale-100"}`}
                />
                <span className="tracking-wide">Buy $BLAST</span>
              </div>
            </Button>
          </div>
        </div>
      </div>
    </div>
  )
}

