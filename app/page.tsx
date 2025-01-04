"use client";

import BuySection from "@/components/BuySection";
import TokenomicsChart from "@/components/TokenomicsChart";
import Roadmap from "@/components/Roadmap";
import FAQ from "@/components/FAQ";
import Image from 'next/image';
import { Rocket } from "lucide-react";
import blastoise from "../public/blastoise-bg.jpeg";

export default function Home() {
  return (
    <div className="space-bg min-h-screen text-white">
      <nav className="border-b border-white/10">
          <div className="container mx-auto px-4 py-4 flex justify-between items-center">
            <div className="flex items-center gap-2 text-2xl font-bold">
              <Rocket className="h-8 w-8" />
              <span className="bg-gradient-to-r from-pink-500 to-purple-500 text-transparent bg-clip-text">
                $BLAST
              </span>
            </div>
            <div className="flex gap-6">
              <a href="#buy" className="hover:text-pink-500 transition-colors">Buy</a>
              <a href="#tokenomics" className="hover:text-pink-500 transition-colors">Tokenomics</a>
              <a href="#roadmap" className="hover:text-pink-500 transition-colors">Roadmap</a>
              <a href="#faq" className="hover:text-pink-500 transition-colors">FAQ</a>
            </div>
          </div>
        </nav>
      <div className="relative mb-32 h-[90vh]">
      <Image
        src={blastoise}
        alt="Descriptive text for screen readers"
        fill
        className="object-cover"
      />
      <div className="relative z-10">
        

        <section id="buy" className="container mx-auto px-4 py-24">
          <BuySection />
        </section>
        </div>
      </div>

      <section id="tokenomics" className="container mx-auto px-4 py-24">
        <h2 className="text-4xl font-bold text-center mb-12 bg-gradient-to-r from-pink-500 to-purple-500 text-transparent bg-clip-text">
          Tokenomics
        </h2>
        <TokenomicsChart />
      </section>

      <section id="roadmap" className="container mx-auto px-4 py-24">
        <h2 className="text-4xl font-bold text-center mb-16 bg-gradient-to-r from-pink-500 to-purple-500 text-transparent bg-clip-text">
          Roadmap
        </h2>
        <Roadmap />
      </section>

      <section id="faq" className="container mx-auto px-4 py-24">
        <h2 className="text-4xl font-bold text-center mb-12 bg-gradient-to-r from-pink-500 to-purple-500 text-transparent bg-clip-text">
          FAQ
        </h2>
        <FAQ />
      </section>

    </div>
  );
}