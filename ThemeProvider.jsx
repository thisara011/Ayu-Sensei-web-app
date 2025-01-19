import React, { createContext, useContext, useState } from 'react';

const ThemeContext = createContext();

export function useTheme() {
  const context = useContext(ThemeContext);
  if (!context) {
    throw new Error('useTheme must be used within a ThemeProvider');
  }
  return context;
}

export function ThemeProvider({ children }) {
  const [darkMode, setDarkMode] = useState('default');
  const [colorMode, setColorMode] = useState(false);

  const toggleDarkMode = () => {
    setDarkMode(!darkMode);
  };

  const changeColorMode = (mode) => {
    setColorMode(mode);
  };

  return (
    <ThemeContext.Provider
      value={{
        darkMode,
        colorMode,
        toggleDarkMode,
        changeColorMode,
      }}
    >
      {children}
    </ThemeContext.Provider>
  );
}
