"use client";

import { useState } from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import CountdownTimer from "./CountdownTimer";
import { Coins, Sparkles, ArrowRight } from "lucide-react";

export default function BuySection() {
  const [selectedCurrency, setSelectedCurrency] = useState("SOL");
  const [inputAmount, setInputAmount] = useState("");
  const [isHovered, setIsHovered] = useState(false);
  
  const BLAST_PRICE = 0.004;
  const SOL_PRICE = 100;
  const BNB_PRICE = 300;

  const calculateOutput = () => {
    if (!inputAmount) return "";
    const currentPrice = selectedCurrency === "SOL" ? SOL_PRICE : BNB_PRICE;
    return ((parseFloat(inputAmount) * currentPrice) / BLAST_PRICE).toFixed(2);
  };

  return (
    <div className="relative z-10 p-4">
      <div className="absolute inset-0 bg-gradient-to-b from-pink-500/10 to-purple-500/10 blur-3xl" />
      <Card className="backdrop-blur-xl bg-black/40 border border-white/10 p-8 max-w-md mx-auto shadow-2xl overflow-hidden">
        <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-pink-500 to-purple-500" />
        
        <div className="text-center mb-8 relative">
          <div className="flex items-center justify-center gap-2 mb-4">
            <Sparkles className="w-6 h-6 text-pink-500" />
            <h2 className="text-3xl font-bold bg-gradient-to-r from-pink-500 to-purple-500 text-transparent bg-clip-text">
              $BLAST Presale
            </h2>
            <Sparkles className="w-6 h-6 text-purple-500" />
          </div>
          <CountdownTimer />
          <div className="mt-6 text-xl font-semibold flex items-center justify-center gap-2">
            <span className="text-white/80">1 $BLAST =</span>
            <span className="text-white font-bold">${BLAST_PRICE}</span>
          </div>
        </div>

        <div className="space-y-6">
          <div className="grid grid-cols-2 gap-4">
            {["SOL", "BNB"].map((currency) => (
              <Button
                key={currency}
                variant={selectedCurrency === currency ? "default" : "secondary"}
                className={`h-16 relative overflow-hidden transition-all duration-300 ${
                  selectedCurrency === currency 
                  ? "bg-gradient-to-r from-pink-500 to-purple-500 hover:from-pink-600 hover:to-purple-600" 
                  : "bg-white/5 hover:bg-white/10 border border-white/10"
                }`}
                onClick={() => setSelectedCurrency(currency)}
              >
                <div className="absolute inset-0 bg-gradient-to-r from-pink-500/20 to-purple-500/20 opacity-0 hover:opacity-100 transition-opacity duration-300" />
                <img
                  src={currency === "SOL" 
                    ? "https://cryptologos.cc/logos/solana-sol-logo.png"
                    : "https://cryptologos.cc/logos/bnb-bnb-logo.png"
                  }
                  alt={currency}
                  className="w-6 h-6 mr-2"
                />
                <span className="font-semibold">{currency}</span>
              </Button>
            ))}
          </div>

          <div className="space-y-2">
            <div className="flex justify-between text-sm text-white/60">
              <label>Amount ({selectedCurrency}):</label>
              <span>Balance: 0.00</span>
            </div>
            <Input
              type="number"
              value={inputAmount}
              onChange={(e) => setInputAmount(e.target.value)}
              className="h-14 text-lg bg-white/5 border-white/10 focus:border-pink-500 transition-colors duration-300"
              placeholder="0.0"
            />
          </div>

          <div className="relative">
            <div className="absolute inset-y-0 left-1/2 w-0.5 bg-gradient-to-b from-transparent via-pink-500/50 to-transparent transform -translate-x-1/2" />
            <ArrowRight className="absolute left-1/2 top-1/2 transform -translate-x-1/2 -translate-y-1/2 text-pink-500/50" />
          </div>

          <div className="space-y-2">
            <div className="flex justify-between text-sm text-white/60">
              <label>You will receive:</label>
              <span>$BLAST</span>
            </div>
            <Input
              readOnly
              value={calculateOutput()}
              className="h-14 text-lg bg-white/5 border-white/10"
              placeholder="0.0"
            />
          </div>

          <Button
            className="w-full h-14 text-lg font-bold relative overflow-hidden group"
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={() => setIsHovered(false)}
          >
            <div className="absolute inset-0 bg-gradient-to-r from-pink-500 to-purple-500 transition-transform duration-300 group-hover:scale-105" />
            <div className="relative flex items-center justify-center gap-2">
              <Coins className={`transition-transform duration-300 ${isHovered ? 'scale-110' : 'scale-100'}`} />
              <span className="tracking-wide">Buy $BLAST</span>
            </div>
          </Button>
        </div>
      </Card>
    </div>
  );
}