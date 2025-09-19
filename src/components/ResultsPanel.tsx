import React from 'react';
import { TrendingUp, TrendingDown, Target, Award, Leaf } from 'lucide-react';
import { CarbonData } from '../App';
import CarbonPieChart from './CarbonPieChart';
import CarbonHistogram from './CarbonHistogram';

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

  // Prepare data for charts
  const chartData = categories.map((category) => ({
    name: category.title,
    value: calculateCategoryTotal(category.id),
    color: getPieColor(category.id)
  })).filter(item => item.value > 0);

  function getPieColor(categoryId: keyof CarbonData) {
    const colors = {
      transport: '#10b981', // green-500
      energy: '#3b82f6',    // blue-500
      food: '#f59e0b',      // amber-500
      lifestyle: '#8b5cf6'  // violet-500
    };
    return colors[categoryId] || '#6b7280';
  }

  // Calculate eco score (0-100, lower is better)
  const ecoScore = Math.max(0, Math.min(100, Math.round((totalCarbon / 32) * 100))); // 32 tons = 100 score
  const getScoreLevel = (score: number) => {
    if (score < 30) return { level: 'Low Impact', color: 'text-green-400' };
    if (score < 60) return { level: 'Moderate', color: 'text-yellow-400' };
    return { level: 'High Impact', color: 'text-red-400' };
  };
  const scoreLevel = getScoreLevel(ecoScore);

  return (
    <div className="space-y-8">
      {/* Charts Section */}
      {totalCarbon > 0 && (
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          <CarbonPieChart data={chartData} />
          <CarbonHistogram userFootprint={totalCarbon} />
        </div>
      )}

      {/* Detailed Analysis Panel */}
      <div className="bg-gray-900 rounded-xl shadow-xl p-6 border border-gray-800 space-y-8">
        <div className="flex items-center space-x-3 mb-6">
          <div className="flex items-center justify-center w-10 h-10 bg-gradient-to-r from-green-400 to-green-500 rounded-lg shadow-lg shadow-green-500/25">
            <Leaf className="w-5 h-5 text-white" />
          </div>
          <h3 className="text-xl font-semibold text-white">Your Carbon Footprint Analysis</h3>
        </div>

        {totalCarbon > 0 ? (
          <>
            {/* Eco Score Circle */}
            <div className="text-center p-6 bg-gradient-to-r from-gray-800 to-gray-700 rounded-lg border border-green-500/20">
              <div className="relative w-32 h-32 mx-auto mb-4">
                <svg className="w-32 h-32 transform -rotate-90" viewBox="0 0 120 120">
                  {/* Background circle */}
                  <circle
                    cx="60"
                    cy="60"
                    r="50"
                    stroke="currentColor"
                    strokeWidth="8"
                    fill="transparent"
                    className="text-gray-700"
                  />
                  {/* Progress circle */}
                  <circle
                    cx="60"
                    cy="60"
                    r="50"
                    stroke="currentColor"
                    strokeWidth="8"
                    fill="transparent"
                    strokeDasharray={`${2 * Math.PI * 50}`}
                    strokeDashoffset={`${2 * Math.PI * 50 * (1 - ecoScore / 100)}`}
                    className={ecoScore < 30 ? 'text-green-400' : ecoScore < 60 ? 'text-yellow-400' : 'text-red-400'}
                    strokeLinecap="round"
                  />
                </svg>
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="text-center">
                    <div className="text-3xl font-bold text-white">{ecoScore}</div>
                    <div className="text-xs text-gray-400">out of 100</div>
                  </div>
                </div>
              </div>
              <div className={`text-lg font-semibold mb-2 ${scoreLevel.color}`}>
                {scoreLevel.level}
              </div>
              <p className="text-sm text-gray-400">
                Your annual carbon footprint: <span className="text-white font-semibold">{totalCarbon.toFixed(2)} tons CO₂</span>
              </p>
            </div>

            {/* Environmental Impact Level Bar */}
            <div className="p-4 bg-gray-800 rounded-lg border border-gray-700">
              <h4 className="text-white font-medium mb-3">Environmental Impact Level</h4>
              <div className="relative">
                <div className="w-full h-4 bg-gradient-to-r from-green-400 via-yellow-400 to-red-400 rounded-full"></div>
                <div 
                  className="absolute top-0 w-4 h-4 bg-white rounded-full border-2 border-gray-800 transform -translate-x-1/2"
                  style={{ left: `${ecoScore}%` }}
                ></div>
                <div className="flex justify-between text-xs text-gray-400 mt-2">
                  <span>Low Impact</span>
                  <span>Moderate</span>
                  <span>High Impact</span>
                </div>
              </div>
            </div>

            {/* Detailed Breakdown */}
            <div className="space-y-3">
              <h4 className="font-medium text-white">Detailed Breakdown</h4>
              {categories.map((category) => {
                const categoryTotal = calculateCategoryTotal(category.id);
                const categoryColor = getPieColor(category.id);
                
                if (categoryTotal === 0) return null;
                
                return (
                  <div key={category.id} className="flex items-center justify-between p-3 bg-gray-800 rounded-lg border border-gray-700">
                    <div className="flex items-center space-x-3">
                      <div 
                        className="w-4 h-4 rounded-full"
                        style={{ backgroundColor: categoryColor }}
                      ></div>
                      <span className="text-gray-300">{category.title}</span>
                    </div>
                    <div className="text-right">
                      <div className="font-medium text-white">
                        {categoryTotal.toFixed(1)}
                      </div>
                      <div className="text-xs text-gray-400">tons/year</div>
                    </div>
                  </div>
                );
              })}
            </div>

            {/* vs US Average */}
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
                <span className={`font-semibold ${isAboveAverage ? 'text-red-400' : 'text-green-400'}`}>
                  {Math.abs(((totalCarbon - averageCarbon) / averageCarbon) * 100).toFixed(1)}%
                  {isAboveAverage ? ' above' : ' below'}
                </span>
              </div>
            </div>

            {!isAboveAverage && (
              <div className="flex items-center space-x-2 p-4 bg-green-900/20 rounded-lg border border-green-500/30">
                <Award className="w-5 h-5 text-green-400" />
                <span className="text-sm text-green-300 font-medium">
                  Great job! You're below the national average.
                </span>
              </div>
            )}
          </>
        ) : (
          <div className="text-center py-8">
            <Leaf className="w-12 h-12 text-gray-500 mx-auto mb-4" />
            <h4 className="text-lg font-medium text-white mb-2">No Data Yet</h4>
            <p className="text-gray-300">
              Fill out the form above to see your carbon footprint analysis and charts.
            </p>
          </div>
        )}
      </div>
    </div>
  );
};

export default ResultsPanel;