"use client";

import { AppKitProvider } from "@/components/AppKitProvider";
import BuySection from "@/components/BuySection";
import FAQ from "@/components/FAQ";
import Footer from "@/components/Footer";
import Roadmap from "@/components/Roadmap";
import TokenomicsChart from "@/components/TokenomicsChart";
import WaterBackground from "@/components/WaterBackground";
import { Droplets, Menu, X } from "lucide-react";
import Image from "next/image";
import { useEffect, useRef, useState } from "react";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import tokenomicsBlastoise from "../public/blastoise-1.png";
import blastoise from "../public/pixelcut-export.jpeg";

// toast.success("Transaction successful!", {
//   position: "top-right", // You can change the position of the toast
//   autoClose: 5000, // Automatically close after 5 seconds
//   hideProgressBar: false, // Show or hide the progress bar
//   closeOnClick: true, // Close on click
//   pauseOnHover: true, // Pause when hovered
// });
// Import the toast styles

export default function Home() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const videoRef = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    if (videoRef.current) {
      videoRef.current.playbackRate = 0.75; // Slow down the video playback

      const ensurePlayback = () => {
        if (videoRef.current && videoRef.current.paused) {
          videoRef.current
            .play()
            .catch((error) => console.error("Playback failed:", error));
        }
      };

      // Check every 5 seconds if the video is still playing
      const intervalId = setInterval(ensurePlayback, 5000);

      return () => clearInterval(intervalId);
    }
  }, []);

  return (
    <AppKitProvider>
      <div className="min-h-screen text-white overflow-x-hidden relative">
        {/* Nature Background Video */}
        <WaterBackground></WaterBackground>
        <div className="fixed inset-0 w-full h-full z-0">
          <video
            ref={videoRef}
            autoPlay
            loop
            muted
            playsInline
            className="object-cover w-full h-full"
            onEnded={(e) => {
              e.currentTarget.currentTime = 0;
              e.currentTarget.play();
            }}
          >
            <source src="/background.mp4" type="video/mp4" />
            Your browser does not support the video tag.
          </video>
          <div className="absolute inset-0 bg-gradient-to-b from-black/40 via-black/60 to-black/80" />
        </div>

        <nav className="border-b border-white/10 relative z-50 bg-black/50 backdrop-blur-sm">
          <div className="container mx-auto px-4 py-4 flex justify-between items-center">
            <div className="flex items-center gap-2 text-2xl font-bold">
              <Droplets className="h-8 w-8" />
              <span className="bg-gradient-to-r from-blue-400 to-cyan-500 text-transparent bg-clip-text">
                BLAST
              </span>
            </div>

            {/* Desktop Navigation */}
            <div className="hidden md:flex items-center gap-6">
              <a href="#buy" className="hover:text-blue-400 transition-colors">
                Buy
              </a>
              <a
                href="#tokenomics"
                className="hover:text-blue-400 transition-colors"
              >
                Tokenomics
              </a>
              <a
                href="#roadmap"
                className="hover:text-blue-400 transition-colors"
              >
                Roadmap
              </a>
              <a href="https://melusi.gitbook.io/blast-whitepaper" target="_blank" className="hover:text-blue-400 transition-colors">
                Whitepaper
              </a>
              <a href="#faq" className="hover:text-blue-400 transition-colors">
                FAQ
              </a>

              <appkit-button />
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
            <div className="md:hidden absolute top-full left-0 right-0 bg-black/95 backdrop-blur-sm border-b border-white/10">
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
                  target="_blank"
                  className="hover:text-blue-400 transition-colors"
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  Roadmap
                </a>
                <a
                  href="https://melusi.gitbook.io/blast-whitepaper"
                  className="hover:text-blue-400 transition-colors"
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  Whitepaper
                </a>
                <a
                  href="#faq"
                  className="hover:text-blue-400 transition-colors"
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  FAQ
                </a>
                <appkit-button />
              </div>
            </div>
          )}
        </nav>

        {/* Hero Section with BuySection */}
        <div className="relative h-[100vh] md:h-[90vh]" style={{ zIndex: 10 }}>
          <div className="absolute inset-0">
            <div className="relative h-[60vh] md:h-full">
              <Image
                src={blastoise}
                alt="Blastoise background"
                fill
                className="object-cover"
                priority
              />
              <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-black/90 pointer-events-none" />
            </div>
          </div>
          <div className="absolute inset-0 flex flex-col md:flex-row items-end md:items-stretch pt-[35vh] md:pt-0">
            {/* Left side - empty space for Blastoise */}
            <div className="hidden md:block md:flex-1" />

            {/* Right side - Buy Section */}
            <div className="w-full px-4 md:px-0 md:w-1/4 min-w-[320px] md:min-w-[380px] z-20">
              <BuySection />
            </div>
          </div>
        </div>

        {/* Content sections with glass morphism effect */}
        <div className="relative z-10 mt-20">
          <section
            id="tokenomics"
            className="container mx-auto px-4 py-16 md:py-24"
          >
            <div className="bg-black/40 backdrop-blur-sm rounded-2xl p-8 border border-white/10">
              <h2 className="text-3xl md:text-4xl font-bold text-center mb-8 md:mb-12 bg-gradient-to-r from-blue-400 to-cyan-500 text-transparent bg-clip-text">
                Tokenomics
              </h2>

              <div className="text-center mb-8 hidden md:block">
                <h3 className="text-2xl md:text-4xl font-bold mb-2">
                  Total Supply
                </h3>
                <p className="text-4xl md:text-6xl font-bold text-blue-400">
                  10,000,000,000
                </p>
                <p className="text-lg md:text-xl text-gray-400 mt-2">
                  $BLAST Tokens
                </p>
              </div>

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
            </div>
          </section>

          <section
            id="roadmap"
            className="container mx-auto px-4 py-16 md:py-24"
          >
            <div className="bg-black/40 backdrop-blur-sm rounded-2xl p-8 border border-white/10">
              <h2 className="text-3xl md:text-4xl font-bold text-center mb-12 md:mb-16 bg-gradient-to-r from-blue-400 to-cyan-500 text-transparent bg-clip-text">
                Roadmap
              </h2>
              <Roadmap />
            </div>
          </section>

          <section id="faq" className="container mx-auto px-4 py-16 md:py-24">
            <div className="bg-black/40 backdrop-blur-sm rounded-2xl p-8 border border-white/10">
              <h2 className="text-3xl md:text-4xl font-bold text-center mb-8 md:mb-12 bg-gradient-to-r from-blue-400 to-cyan-500 text-transparent bg-clip-text">
                FAQ
              </h2>
              <FAQ />
            </div>
          </section>
        </div>

        <Footer />
      </div>
      <ToastContainer />
    </AppKitProvider>
  );
}
