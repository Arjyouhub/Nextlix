import React, { useState, useEffect } from 'react';

const LogoText = () => {
  const targetText = 'NEXTLIX';
  const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789@#$%&*';
  const [displayText, setDisplayText] = useState(targetText);
  const [isScrambling, setIsScrambling] = useState(false);

  const startScramble = () => {
    if (isScrambling) return;
    setIsScrambling(true);

    let iteration = 0;
    const interval = setInterval(() => {
      setDisplayText(prev => 
        targetText
          .split('')
          .map((char, index) => {
            if (index < iteration) {
              return targetText[index];
            }
            return chars[Math.floor(Math.random() * chars.length)];
          })
          .join('')
      );

      if (iteration >= targetText.length) {
        clearInterval(interval);
        setIsScrambling(false);
      }
      iteration += 1 / 3; // speed factor
    }, 30);
  };

  useEffect(() => {
    startScramble();
  }, []);

  return (
    <span 
      className="logo-text gradient-text"
      onMouseEnter={startScramble}
    >
      {displayText}
    </span>
  );
};

export default LogoText;
