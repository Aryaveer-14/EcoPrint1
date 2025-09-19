import React, { useState } from 'react';
import { Calculator, Leaf, Car, Home, Utensils, Plane, BarChart3 } from 'lucide-react';
import Header from './Header';
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
        { key: 'carMiles', label: 'Car Miles per Month', unit: 'miles', factor: 0.4 },
        { key: 'publicTransport', label: 'Public Transport Hours/Month', unit: 'hours', factor: 0.2 },
        { key: 'flights', label: 'Flight Hours per Year', unit: 'hours', factor: 2.5 }
      ]
    },
    {
      id: 'energy' as keyof CarbonData,
      title: 'Home Energy',
      icon: Home,
      color: 'from-gray-700 to-gray-800 border-green-500/20',
      fields: [
        { key: 'electricity', label: 'Monthly Electricity Usage', unit: 'kWh', factor: 0.5 },
        { key: 'gas', label: 'Monthly Gas Usage', unit: 'therms', factor: 5.3 },
        { key: 'heating', label: 'Heating Oil/Month', unit: 'gallons', factor: 22.4 }
      ]
    },
    {
      id: 'food' as keyof CarbonData,
      title: 'Food & Diet',
      icon: Utensils,
      color: 'from-gray-700 to-gray-800 border-green-500/20',
      fields: [
        { key: 'meat', label: 'Meat Meals per Week', unit: 'meals', factor: 3.2 },
        { key: 'dairy', label: 'Dairy Servings per Week', unit: 'servings', factor: 1.1 },
        { key: 'localFood', label: 'Local Food Percentage', unit: '%', factor: -0.02 }
      ]
    },
    {
      id: 'lifestyle' as keyof CarbonData,
      title: 'Lifestyle',
      icon: BarChart3,
      color: 'from-gray-700 to-gray-800 border-green-500/20',
      fields: [
        { key: 'shopping', label: 'Monthly Shopping Spend', unit: '$', factor: 0.01 },
        { key: 'waste', label: 'Trash Bags per Week', unit: 'bags', factor: 2.5 },
        { key: 'recycling', label: 'Recycling Percentage', unit: '%', factor: -0.05 }
      ]
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-black to-gray-800">
      <Header showBackButton={true} onNavigateToHome={onNavigateToHome} />
      
      <main className="container mx-auto px-4 py-8">
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

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          <ResultsPanel carbonData={carbonData} categories={categories} />
          <RecommendationsPanel carbonData={carbonData} categories={categories} />
        </div>
      </main>
    </div>
  );
};

export default CalculatorPage;