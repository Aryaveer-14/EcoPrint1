import React from 'react';
import { Calculator, Leaf, Globe, ArrowLeft, RotateCcw } from 'lucide-react';
import { CarbonData } from './CalculatorPage';
import ResultsPanel from './ResultsPanel';
import RecommendationsPanel from './RecommendationsPanel';

interface ResultsPageProps {
  carbonData: CarbonData;
  onNavigateToHome: () => void;
  onNavigateToCalculator: () => void;
}

const ResultsPage: React.FC<ResultsPageProps> = ({ 
  carbonData, 
  onNavigateToHome, 
  onNavigateToCalculator 
}) => {
  const categories = [
    {
      id: 'transport' as keyof CarbonData,
      title: 'Transportation',
      fields: [
        { key: 'carMiles', factor: 0.4 },
        { key: 'publicTransport', factor: 0.2 },
        { key: 'flights', factor: 2.5 }
      ]
    },
    {
      id: 'energy' as keyof CarbonData,
      title: 'Home Energy',
      fields: [
        { key: 'electricity', factor: 0.5 },
        { key: 'gas', factor: 5.3 },
        { key: 'heating', factor: 22.4 }
      ]
    },
    {
      id: 'food' as keyof CarbonData,
      title: 'Food & Diet',
      fields: [
        { key: 'meat', factor: 3.2 },
        { key: 'dairy', factor: 1.1 },
        { key: 'localFood', factor: -0.02 }
      ]
    },
    {
      id: 'lifestyle' as keyof CarbonData,
      title: 'Lifestyle',
      fields: [
        { key: 'shopping', factor: 0.01 },
        { key: 'waste', factor: 2.5 },
        { key: 'recycling', factor: -0.05 }
      ]
    }
  ];

  const hasData = () => {
    return Object.values(carbonData).some(category =>
      Object.values(category).some(value => value > 0)
    );
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-black to-gray-800">
      {/* Floating Header */}
      <div className="fixed top-0 left-0 right-0 z-50 bg-black/80 backdrop-blur-sm border-b border-gray-800">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <button
                onClick={onNavigateToHome}
                className="flex items-center justify-center w-10 h-10 bg-gradient-to-r from-green-400 to-green-500 rounded-lg shadow-lg shadow-green-500/25 hover:from-green-300 hover:to-green-400 transition-all duration-200"
              >
                <Leaf className="w-6 h-6 text-white" />
              </button>
              <div>
                <h1 className="text-xl font-bold text-white">EcoTracker</h1>
                <p className="text-sm text-gray-400">Your Carbon Footprint Results</p>
              </div>
            </div>
            
            <div className="flex items-center space-x-4">
              <button
                onClick={onNavigateToHome}
                className="flex items-center space-x-2 px-4 py-2 text-gray-300 hover:text-white transition-colors duration-200"
              >
                <ArrowLeft className="w-4 h-4" />
                <span>Home</span>
              </button>
              <button
                onClick={onNavigateToCalculator}
                className="flex items-center space-x-2 px-4 py-2 bg-gray-800 hover:bg-gray-700 text-white rounded-lg transition-colors duration-200"
              >
                <RotateCcw className="w-4 h-4" />
                <span>Recalculate</span>
              </button>
            </div>
          </div>
        </div>
      </div>
      
      <main className="container mx-auto px-4 py-8 pt-24">
        <div className="text-center mb-12">
          <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-r from-green-400 to-green-500 rounded-full mb-6 shadow-lg shadow-green-500/25">
            <Calculator className="w-8 h-8 text-white" />
          </div>
          <h1 className="text-4xl font-bold text-white mb-4">
            Your Carbon Footprint Results
          </h1>
          <p className="text-xl text-gray-300 max-w-2xl mx-auto">
            Here's your environmental impact analysis with personalized recommendations to reduce your carbon footprint.
          </p>
        </div>

        {hasData() ? (
          <div className="space-y-8">
            <ResultsPanel carbonData={carbonData} categories={categories} />
            <RecommendationsPanel carbonData={carbonData} categories={categories} />
          </div>
        ) : (
          <div className="text-center py-12">
            <div className="bg-gray-900 rounded-xl p-8 border border-gray-800 max-w-md mx-auto">
              <Calculator className="w-12 h-12 text-gray-500 mx-auto mb-4" />
              <h3 className="text-xl font-semibold text-white mb-2">No Data Available</h3>
              <p className="text-gray-300 mb-6">
                It looks like no data was provided. Please go back to the calculator and fill out the form.
              </p>
              <button
                onClick={onNavigateToCalculator}
                className="inline-flex items-center px-6 py-3 bg-gradient-to-r from-green-400 to-green-500 text-white font-semibold rounded-lg hover:from-green-300 hover:to-green-400 transition-all duration-300"
              >
                <Calculator className="w-4 h-4 mr-2" />
                Go to Calculator
              </button>
            </div>
          </div>
        )}
      </main>
    </div>
  );
};

export default ResultsPage;