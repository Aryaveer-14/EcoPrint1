import React from 'react';
import { TrendingUp, TrendingDown, Target, Award } from 'lucide-react';
import { CarbonData } from '../App';

interface Category {
  id: keyof CarbonData;
  title: string;
  fields: Array<{ key: string; factor: number }>;
}

interface ResultsPanelProps {
  carbonData: CarbonData;
  categories: Category[];
}

const ResultsPanel: React.FC<ResultsPanelProps> = ({ carbonData, categories }) => {
  const calculateCategoryTotal = (categoryId: keyof CarbonData) => {
    const category = categories.find(c => c.id === categoryId);
    if (!category) return 0;
    
    return category.fields.reduce((total, field) => {
      const value = carbonData[categoryId][field.key as keyof typeof carbonData[categoryId]] || 0;
      return total + (value * Math.abs(field.factor));
    }, 0);
  };

  const totalCarbon = categories.reduce((total, category) => {
    return total + calculateCategoryTotal(category.id);
  }, 0);

  const averageCarbon = 16; // Average US carbon footprint in tons per year
  const isAboveAverage = totalCarbon > averageCarbon;

  const getImpactLevel = (carbon: number) => {
    if (carbon < 8) return { level: 'Low', color: 'text-green-600', bg: 'bg-green-100' };
    if (carbon < 16) return { level: 'Moderate', color: 'text-yellow-600', bg: 'bg-yellow-100' };
    return { level: 'High', color: 'text-red-600', bg: 'bg-red-100' };
  };

  const impact = getImpactLevel(totalCarbon);

  return (
    <div className="bg-gray-900 rounded-xl shadow-xl p-6 border border-gray-800">
      <div className="flex items-center space-x-3 mb-6">
        <div className="flex items-center justify-center w-10 h-10 bg-gradient-to-r from-green-400 to-green-500 rounded-lg shadow-lg shadow-green-500/25">
          <TrendingUp className="w-5 h-5 text-white" />
        </div>
        <h3 className="text-xl font-semibold text-white">Your Carbon Footprint</h3>
      </div>

      <div className="space-y-6">
        <div className="text-center p-6 bg-gradient-to-r from-gray-800 to-gray-700 rounded-lg border border-green-500/20">
          <div className="text-4xl font-bold text-white mb-2">
            {totalCarbon.toFixed(1)} <span className="text-lg font-normal text-gray-300">tons CO₂/year</span>
          </div>
          <div className={`inline-flex items-center px-3 py-1 rounded-full ${impact.bg} ${impact.color} text-sm font-medium`}>
            <span>{impact.level} Impact</span>
          </div>
        </div>

        <div className="space-y-4">
          <div className="flex items-center justify-between p-4 bg-gray-800 rounded-lg border border-gray-700">
            <div className="flex items-center space-x-3">
              <Target className="w-5 h-5 text-green-400" />
              <span className="font-medium text-white">vs. US Average</span>
            </div>
            <div className="flex items-center space-x-2">
              {isAboveAverage ? (
                <TrendingUp className="w-4 h-4 text-red-500" />
              ) : (
                <TrendingDown className="w-4 h-4 text-green-500" />
              )}
              <span className={`font-semibold ${isAboveAverage ? 'text-red-600' : 'text-green-600'}`}>
                {Math.abs(((totalCarbon - averageCarbon) / averageCarbon) * 100).toFixed(1)}%
                {isAboveAverage ? ' above' : ' below'}
              </span>
            </div>
          </div>

          <div className="space-y-3">
            <h4 className="font-medium text-white">Breakdown by Category</h4>
            {categories.map((category) => {
              const categoryTotal = calculateCategoryTotal(category.id);
              const percentage = totalCarbon > 0 ? (categoryTotal / totalCarbon) * 100 : 0;
              
              return (
                <div key={category.id} className="space-y-2">
                  <div className="flex justify-between text-sm">
                    <span className="text-gray-300">{category.title}</span>
                    <span className="font-medium text-white">
                      {categoryTotal.toFixed(1)} tons ({percentage.toFixed(1)}%)
                    </span>
                  </div>
                  <div className="w-full bg-gray-700 rounded-full h-2">
                    <div
                      className="bg-gradient-to-r from-green-400 to-green-500 h-2 rounded-full transition-all duration-500"
                      style={{ width: `${Math.min(percentage, 100)}%` }}
                    />
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {!isAboveAverage && totalCarbon > 0 && (
          <div className="flex items-center space-x-2 p-4 bg-green-900/20 rounded-lg border border-green-500/30">
            <Award className="w-5 h-5 text-green-400" />
            <span className="text-sm text-green-300 font-medium">
              Great job! You're below the national average.
            </span>
          </div>
        )}
      </div>
    </div>
  );
};

export default ResultsPanel;