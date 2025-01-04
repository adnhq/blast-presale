import React from 'react';

const WaterBackground = () => {
  return (
    <>
      {/* Wave animations */}
      <div className="fixed inset-0 pointer-events-none" style={{ zIndex: 0 }}>
        {/* First wave layer */}
        <div className="absolute bottom-0 w-full opacity-20">
          <svg viewBox="0 0 1440 320" className="w-full h-full animate-wave-slow" preserveAspectRatio="none">
            <path 
              fill="rgb(96, 165, 250)" 
              fillOpacity="1" 
              d="M0,32L48,37.3C96,43,192,53,288,80C384,107,480,149,576,154.7C672,160,768,128,864,112C960,96,1056,96,1152,106.7C1248,117,1344,139,1392,149.3L1440,160L1440,320L1392,320C1344,320,1248,320,1152,320C1056,320,960,320,864,320C768,320,672,320,576,320C480,320,384,320,288,320C192,320,96,320,48,320L0,320Z"
            />
          </svg>
        </div>
        
        {/* Second wave layer */}
        <div className="absolute bottom-0 w-full opacity-20">
          <svg viewBox="0 0 1440 320" className="w-full h-full animate-wave-normal" preserveAspectRatio="none">
            <path 
              fill="rgb(56, 189, 248)" 
              fillOpacity="1" 
              d="M0,160L48,170.7C96,181,192,203,288,213.3C384,224,480,224,576,213.3C672,203,768,181,864,181.3C960,181,1056,203,1152,213.3C1248,224,1344,224,1392,224L1440,224L1440,320L1392,320C1344,320,1248,320,1152,320C1056,320,960,320,864,320C768,320,672,320,576,320C480,320,384,320,288,320C192,320,96,320,48,320L0,320Z"
            />
          </svg>
        </div>

        {/* Third wave layer */}
        <div className="absolute bottom-0 w-full opacity-20">
          <svg viewBox="0 0 1440 320" className="w-full h-full animate-wave-fast" preserveAspectRatio="none">
            <path 
              fill="rgb(34, 211, 238)" 
              fillOpacity="1" 
              d="M0,256L48,261.3C96,267,192,277,288,261.3C384,245,480,203,576,202.7C672,203,768,245,864,261.3C960,277,1056,267,1152,245.3C1248,224,1344,192,1392,176L1440,160L1440,320L1392,320C1344,320,1248,320,1152,320C1056,320,960,320,864,320C768,320,672,320,576,320C480,320,384,320,288,320C192,320,96,320,48,320L0,320Z"
            />
          </svg>
        </div>
      </div>

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