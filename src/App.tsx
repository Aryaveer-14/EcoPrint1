import React, { useState, useEffect } from 'react';
import LoadingScreen from './components/LoadingScreen';
import HomePage from './components/HomePage';
import CalculatorPage from './components/CalculatorPage';

function App() {
  const [isLoading, setIsLoading] = useState(true);
  const [currentPage, setCurrentPage] = useState<'home' | 'calculator'>('home');

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 3000);

    return () => clearTimeout(timer);
  }, []);

  const navigateToCalculator = () => {
    setCurrentPage('calculator');
  };

  const navigateToHome = () => {
    setCurrentPage('home');
  };

  if (isLoading) {
    return <LoadingScreen />;
  }

  return (
    <div className="min-h-screen bg-black">
      {currentPage === 'home' ? (
        <HomePage onNavigateToCalculator={navigateToCalculator} />
      ) : (
        <CalculatorPage onNavigateToHome={navigateToHome} />
      )}
    </div>
  );
}

export default App;