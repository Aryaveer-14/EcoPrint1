import React, { useState } from 'react';
import { Calculator, Leaf, Car, Home, Utensils, BarChart3, Globe, ArrowRight } from 'lucide-react';
import CategoryCard from './CategoryCard';
import ResultsPanel from './ResultsPanel';
import RecommendationsPanel from './RecommendationsPanel';

export interface CarbonData {
  transport: {
    carMiles: number;
    publicTransport: number;
    flights: number;
  };
  energy: {
    electricity: number;
    gas: number;
    heating: number;
  };
  food: {
    meat: number;
    dairy: number;
    localFood: number;
  };
  lifestyle: {
    shopping: number;
    waste: number;
    recycling: number;
  };
}

interface CalculatorPageProps {
  onNavigateToHome: () => void;
}

const CalculatorPage: React.FC<CalculatorPageProps> = ({ onNavigateToHome }) => {
  const [carbonData, setCarbonData] = useState<CarbonData>({
    transport: { carMiles: 0, publicTransport: 0, flights: 0 },
    energy: { electricity: 0, gas: 0, heating: 0 },
    food: { meat: 0, dairy: 0, localFood: 0 },
    lifestyle: { shopping: 0, waste: 0, recycling: 0 }
  });
  const [isSubmitted, setIsSubmitted] = useState(false);

  const updateCarbonData = (category: keyof CarbonData, field: string, value: number) => {
    setCarbonData(prev => ({
      ...prev,
      [category]: {
        ...prev[category],
        [field]: value
      }
    }));
  };

  const categories = [
    {
      id: 'transport' as keyof CarbonData,
      title: 'Transportation',
      icon: Car,
      color: 'from-gray-700 to-gray-800 border-green-500/20',
      fields: [
        { key: 'carMiles', label: 'Car Miles per Month', unit: 'miles', factor: 0.4, type: 'input' },
        { key: 'publicTransport', label: 'Public Transport Usage', unit: '', factor: 0.2, type: 'select', options: ['Never', 'Rarely (1-2 times/month)', 'Sometimes (1-2 times/week)', 'Often (3-4 times/week)', 'Daily'] },
        { key: 'flights', label: 'Flight Frequency', unit: '', factor: 2.5, type: 'select', options: ['Never', '1-2 flights/year', '3-5 flights/year', '6-10 flights/year', 'More than 10 flights/year'] }
      ]
    },
    {
      id: 'energy' as keyof CarbonData,
      title: 'Home Energy',
      icon: Home,
      color: 'from-gray-700 to-gray-800 border-green-500/20',
      fields: [
        { key: 'electricity', label: 'Monthly Electricity Usage', unit: 'kWh', factor: 0.5, type: 'input' },
        { key: 'gas', label: 'Home Size', unit: '', factor: 5.3, type: 'select', options: ['Studio/1BR', '2BR Apartment', '3BR House', '4BR House', '5+ BR House'] },
        { key: 'heating', label: 'Primary Heating Source', unit: '', factor: 22.4, type: 'select', options: ['Electric', 'Natural Gas', 'Oil', 'Solar/Renewable', 'Wood/Biomass'] }
      ]
    },
    {
      id: 'food' as keyof CarbonData,
      title: 'Food & Diet',
      icon: Utensils,
      color: 'from-gray-700 to-gray-800 border-green-500/20',
      fields: [
        { key: 'meat', label: 'Meat Consumption', unit: '', factor: 3.2, type: 'select', options: ['Vegetarian/Vegan', 'Rarely (1-2 times/week)', 'Moderate (3-5 times/week)', 'High (6-10 times/week)', 'Very High (11+ times/week)'] },
        { key: 'dairy', label: 'Dairy Consumption', unit: '', factor: 1.1, type: 'select', options: ['None', 'Low (1-3 servings/week)', 'Moderate (4-7 servings/week)', 'High (8-14 servings/week)', 'Very High (15+ servings/week)'] },
        { key: 'localFood', label: 'Local/Organic Food Preference', unit: '', factor: -0.02, type: 'select', options: ['Never', 'Rarely (10-25%)', 'Sometimes (25-50%)', 'Often (50-75%)', 'Always (75-100%)'] }
      ]
    },
    {
      id: 'lifestyle' as keyof CarbonData,
      title: 'Lifestyle',
      icon: BarChart3,
      color: 'from-gray-700 to-gray-800 border-green-500/20',
      fields: [
        { key: 'shopping', label: 'Monthly Shopping Spend', unit: '$', factor: 0.01, type: 'input' },
        { key: 'waste', label: 'Waste Generation', unit: '', factor: 2.5, type: 'select', options: ['Very Low (minimal waste)', 'Low (1-2 bags/week)', 'Moderate (3-4 bags/week)', 'High (5-6 bags/week)', 'Very High (7+ bags/week)'] },
        { key: 'recycling', label: 'Recycling Habits', unit: '', factor: -0.05, type: 'select', options: ['Never recycle', 'Rarely (25%)', 'Sometimes (50%)', 'Often (75%)', 'Always (90-100%)'] }
      ]
    }
  ];

  const hasData = () => {
    return Object.values(carbonData).some(category =>
      Object.values(category).some(value => value > 0)
    );
  };

  const handleSubmit = () => {
    setIsSubmitted(true);
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
                <p className="text-sm text-gray-400">Carbon Footprint Calculator</p>
              </div>
            </div>
            
            <div className="flex items-center space-x-2 text-sm text-gray-300">
              <Globe className="w-4 h-4 text-green-400" />
              <span>Making a difference, one calculation at a time</span>
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
            Calculate Your Carbon Footprint
          </h1>
          <p className="text-xl text-gray-300 max-w-2xl mx-auto">
            Track your environmental impact across transportation, energy, food, and lifestyle choices. 
            Get personalized recommendations to reduce your carbon footprint.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-12">
          {categories.map((category) => (
            <CategoryCard
              key={category.id}
              category={category}
              data={carbonData[category.id]}
              onUpdate={(field, value) => updateCarbonData(category.id, field, value)}
            />
          ))}
        </div>

        <div className="text-center mb-12">
          <button
            onClick={handleSubmit}
            className="inline-flex items-center px-8 py-4 bg-gradient-to-r from-green-400 to-green-500 text-white font-semibold rounded-lg hover:from-green-300 hover:to-green-400 transition-all duration-300 shadow-lg shadow-green-500/25 hover:shadow-green-500/40 transform hover:scale-105"
          >
            <Calculator className="w-5 h-5 mr-2" />
            {isSubmitted ? 'Results Generated' : 'Calculate My Impact'}
            <ArrowRight className="w-5 h-5 ml-2" />
          </button>
        </div>

        {isSubmitted && hasData() && (
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            <ResultsPanel carbonData={carbonData} categories={categories} />
            <RecommendationsPanel carbonData={carbonData} categories={categories} />
          </div>
        )}

        {isSubmitted && !hasData() && (
          <div className="text-center py-12">
            <div className="bg-gray-900 rounded-xl p-8 border border-gray-800 max-w-md mx-auto">
              <Calculator className="w-12 h-12 text-gray-500 mx-auto mb-4" />
              <h3 className="text-xl font-semibold text-white mb-2">No Data Entered</h3>
              <p className="text-gray-300">
                Please fill out at least one field in the categories above to calculate your carbon footprint.
              </p>
            </div>
          </div>
        )}
      </main>
    </div>
  );
};

export default CalculatorPage;