import React, { createContext, useContext, useState } from 'react';

const StealthModeContext = createContext();

export const StealthModeProvider = ({ children }) => {
  const [isStealthMode, setIsStealthMode] = useState(false);
  
  const toggleStealthMode = () => {
    setIsStealthMode(!isStealthMode);
  };

  return (
    <StealthModeContext.Provider value={{ isStealthMode, toggleStealthMode }}>
      {children}
    </StealthModeContext.Provider>
  );
};

export const useStealthMode = () => useContext(StealthModeContext);
