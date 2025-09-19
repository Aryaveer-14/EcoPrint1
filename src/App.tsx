import React, { useState, useEffect } from 'react';
import LoadingScreen from './components/LoadingScreen';
import HomePage from './components/HomePage';
import CalculatorPage from './components/CalculatorPage';
import ResultsPage from './components/ResultsPage';
import { CarbonData } from './components/CalculatorPage';

function App() {
  const [isLoading, setIsLoading] = useState(true);
  const [currentPage, setCurrentPage] = useState<'home' | 'calculator' | 'results'>('home');
  const [carbonData, setCarbonData] = useState<CarbonData | null>(null);

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

  const navigateToResults = (data: CarbonData) => {
    setCarbonData(data);
    setCurrentPage('results');
  };
  if (isLoading) {
    return <LoadingScreen />;
  }

  return (
    <div className="min-h-screen bg-black">
      {currentPage === 'home' && (
        <HomePage onNavigateToCalculator={navigateToCalculator} />
      )}
      {currentPage === 'calculator' && (
        <CalculatorPage 
          onNavigateToHome={navigateToHome} 
          onNavigateToResults={navigateToResults}
        />
      )}
      {currentPage === 'results' && carbonData && (
        <ResultsPage 
          carbonData={carbonData}
          onNavigateToHome={navigateToHome}
          onNavigateToCalculator={navigateToCalculator}
        />
      )}
    </div>
  );
}

export default App;