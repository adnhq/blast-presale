import React from "react";
import { Twitter, MessageCircle, Send } from "lucide-react";
import Link from "next/link";

export default function Footer() {
  return (
    <footer className="py-20 px-8 relative z-10 border-t">
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-8 gap-12">
          <div className="lg:col-span-3 flex flex-col space-y-4">
            <Link href="/" className="flex items-center space-x-2">
              <span className="text-blue-400 text-4xl font-bold">
                BLAST
              </span>
            </Link>
            <p className="text-sm text-muted-foreground leading-relaxed">
              Don't miss out on the biggest opportunity of 2025!
            </p>
          </div>

          <div className="lg:col-span-2 flex flex-col space-y-4">
            <h2 className="font-semibold text-xl">
              Quick Links
            </h2>

            <a
              href="#buy"
              className="text-sm text-muted-foreground hover:text-blue-400 transition-colors duration-300 ease-in-out"
            >
              Buy
            </a>

            <a
              href="#tokenomics"
              className="text-sm text-muted-foreground hover:text-blue-400 transition-colors duration-300 ease-in-out"
            >
              Tokenomics
            </a>

            <a
              href="#roadmap"
              className="text-sm text-muted-foreground hover:text-blue-400 transition-colors duration-300 ease-in-out"
            >
              Roadmap
            </a>

            <a
              href="#faq"
              className="text-sm text-muted-foreground hover:text-blue-400 transition-colors duration-300 ease-in-out"
            >
              FAQ
            </a>
          </div>

          <div className="lg:col-span-3 flex flex-col space-y-5">
            <h2 className="font-semibold text-xl">
              Join Our Community
            </h2>
            <div className="flex flex-wrap gap-2">
              {[
                { icon: Twitter, label: "Twitter", href: "#" },
                { icon: MessageCircle, label: "Discord", href: "#" },
                { icon: Send, label: "Telegram", href: "#" },
              ].map((item, index) => (
                <a
                  key={index}
                  href={item.href}
                  className="group flex items-center justify-center w-12 h-12 rounded-full bg-muted hover:bg-blue-400 transition-colors duration-300 ease-in-out"
                >
                  <item.icon className="w-5 h-5 text-muted-foreground group-hover:text-background transition-colors duration-300 ease-in-out" />
                  <span className="sr-only">{item.label}</span>
                </a>
              ))}
            </div>
          </div>
        </div>

        <div className="mt-16 pt-8 border-t border-border flex flex-col md:flex-row justify-between items-center">
          <p className="text-sm text-muted-foreground">
            &copy; {new Date().getFullYear()} BLAST Token. All rights reserved.
          </p>
          <p className="text-sm font-semibold text-blue-400 mt-2 md:mt-0">
            Get ahead of the curve
          </p>
        </div>
      </div>
    </footer>
  );
}