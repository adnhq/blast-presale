import React from 'react';

const WaterBackground = () => {
  return (
    <>
      {/* Bubble animations */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none" style={{ zIndex: 15 }}>
        {/* Large bubbles */}
        {[...Array(20)].map((_, i) => (
          <div
            key={`large-${i}`}
            className="absolute rounded-full bg-blue-400/20 animate-bubble"
            style={{
              left: `${Math.random() * 100}%`,
              width: `${Math.random() * 40 + 20}px`,
              height: `${Math.random() * 40 + 20}px`,
              animationDelay: `${Math.random() * 8}s`,
              animationDuration: `${Math.random() * 4 + 6}s`
            }}
          />
        ))}
        {/* Medium bubbles */}
        {[...Array(30)].map((_, i) => (
          <div
            key={`medium-${i}`}
            className="absolute rounded-full bg-blue-400/15 animate-bubble"
            style={{
              left: `${Math.random() * 100}%`,
              width: `${Math.random() * 20 + 10}px`,
              height: `${Math.random() * 20 + 10}px`,
              animationDelay: `${Math.random() * 10}s`,
              animationDuration: `${Math.random() * 3 + 4}s`
            }}
          />
        ))}
        {/* Small bubbles */}
        {[...Array(25)].map((_, i) => (
          <div
            key={`small-${i}`}
            className="absolute rounded-full bg-blue-400/10 animate-bubble-fast"
            style={{
              left: `${Math.random() * 100}%`,
              width: `${Math.random() * 10 + 5}px`,
              height: `${Math.random() * 10 + 5}px`,
              animationDelay: `${Math.random() * 12}s`,
              animationDuration: `${Math.random() * 2 + 3}s`
            }}
          />
        ))}
      </div>
    </>
  );
};

export default WaterBackground;