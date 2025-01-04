"use client";

import BuySection from "@/components/BuySection";
import TokenomicsChart from "@/components/TokenomicsChart";
import Roadmap from "@/components/Roadmap";
import Footer from "@/components/Footer";
import FAQ from "@/components/FAQ";
import Image from 'next/image';
import { Droplets, Menu, X } from 'lucide-react';
import { useState } from "react";
import blastoise from "../public/pixelcut-export.jpeg";
import tokenomicsBlastoise from "../public/blastoise-1.png";
import WaterBackground from "../components/WaterBackground";

export default function Home() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  return (
    <div className="space-bg min-h-screen text-white overflow-x-hidden">
      <WaterBackground />

      <nav className="border-b border-white/10 relative z-50">
        <div className="container mx-auto px-4 py-4 flex justify-between items-center">
          <div className="flex items-center gap-2 text-2xl font-bold">
            <Droplets className="h-8 w-8" />
            <span className="bg-gradient-to-r from-blue-400 to-cyan-500 text-transparent bg-clip-text">
              BLAST
            </span>
          </div>
          
          {/* Desktop Navigation */}
          <div className="hidden md:flex gap-6">
            <a href="#buy" className="hover:text-blue-400 transition-colors">Buy</a>
            <a href="#tokenomics" className="hover:text-blue-400 transition-colors">Tokenomics</a>
            <a href="#roadmap" className="hover:text-blue-400 transition-colors">Roadmap</a>
            <a href="#faq" className="hover:text-blue-400 transition-colors">FAQ</a>
          </div>

          {/* Mobile Menu Button */}
          <button 
            className="md:hidden p-2"
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          >
            {isMobileMenuOpen ? <X /> : <Menu />}
          </button>
        </div>

        {/* Mobile Navigation */}
        {isMobileMenuOpen && (
          <div className="md:hidden absolute top-full left-0 right-0 bg-black/95 border-b border-white/10">
            <div className="container mx-auto px-4 py-4 flex flex-col gap-4">
              <a 
                href="#buy" 
                className="hover:text-blue-400 transition-colors"
                onClick={() => setIsMobileMenuOpen(false)}
              >
                Buy
              </a>
              <a 
                href="#tokenomics" 
                className="hover:text-blue-400 transition-colors"
                onClick={() => setIsMobileMenuOpen(false)}
              >
                Tokenomics
              </a>
              <a 
                href="#roadmap" 
                className="hover:text-blue-400 transition-colors"
                onClick={() => setIsMobileMenuOpen(false)}
              >
                Roadmap
              </a>
              <a 
                href="#faq" 
                className="hover:text-blue-400 transition-colors"
                onClick={() => setIsMobileMenuOpen(false)}
              >
                FAQ
              </a>
            </div>
          </div>
        )}
      </nav>

      {/* Hero Section with BuySection */}
      <div className="relative h-screen md:h-[90vh]" style={{ zIndex: 10 }}>
        <div className="absolute inset-0">
          <Image
            src={blastoise}
            alt="Blastoise background"
            fill
            className="object-cover"
            priority
          />
          <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-[#000814] pointer-events-none" />
        </div>
        <div className="absolute inset-0 flex flex-col md:flex-row">
          {/* Left side - empty space for Blastoise */}
          <div className="hidden md:block md:flex-1" />
          
          {/* Right side - Buy Section */}
          <div className="w-full md:w-1/4 min-w-[320px] md:min-w-[380px] z-20">
            <BuySection />
          </div>
        </div>
      </div>

      {/* Rest of the sections */}
      <section id="tokenomics" className="container mx-auto px-4 py-16 md:py-24">
        <h2 className="text-3xl md:text-4xl font-bold text-center mb-8 md:mb-12 bg-gradient-to-r from-blue-400 to-cyan-500 text-transparent bg-clip-text">
          Tokenomics
        </h2>
        <div className="flex flex-col md:flex-row gap-8 items-center">
          <div className="w-full md:w-1/2 relative h-[400px] md:h-[600px]">
            <Image
              src={tokenomicsBlastoise}
              alt="Blastoise Tokenomics"
              fill
              className="object-contain"
            />
          </div>
          <div className="w-full md:w-1/2">
            <TokenomicsChart />
          </div>
        </div>
      </section>
      <section id="roadmap" className="container mx-auto px-4 py-16 md:py-24">
        <h2 className="text-3xl md:text-4xl font-bold text-center mb-12 md:mb-16 bg-gradient-to-r from-blue-400 to-cyan-500 text-transparent bg-clip-text">
          Roadmap
        </h2>
        <Roadmap />
      </section>

      <section id="faq" className="container mx-auto px-4 py-16 md:py-24">
        <h2 className="text-3xl md:text-4xl font-bold text-center mb-8 md:mb-12 bg-gradient-to-r from-blue-400 to-cyan-500 text-transparent bg-clip-text">
          FAQ
        </h2>
        <FAQ />
      </section>
      <Footer></Footer>
    </div>
  );
}

