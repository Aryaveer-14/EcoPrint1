import React from 'react';
import { Lightbulb, ArrowRight, CheckCircle } from 'lucide-react';
import { CarbonData } from '../App';

interface Category {
  id: keyof CarbonData;
  title: string;
  fields: Array<{ key: string; factor: number; label: string }>;
}

interface RecommendationsPanelProps {
  carbonData: CarbonData;
  categories: Category[];
}

const RecommendationsPanel: React.FC<RecommendationsPanelProps> = ({ carbonData, categories }) => {
  const getRecommendations = () => {
    const recommendations: Array<{
      title: string;
      impact: string;
      difficulty: 'Easy' | 'Medium' | 'Hard';
      savings: number;
      description: string;
      category: string;
    }> = [];

    // Transport recommendations
    const carMiles = carbonData.transport.carMiles;
    if (carMiles > 500) {
      recommendations.push({
        title: 'Reduce driving by 25%',
        impact: 'High',
        difficulty: 'Medium',
        savings: carMiles * 0.25 * 0.4,
        description: 'Combine trips, work from home more, or use public transport',
        category: 'Transportation'
      });
    }
    
    if (carbonData.transport.flights > 10) {
      recommendations.push({
        title: 'Offset or reduce flights',
        impact: 'Very High',
        difficulty: 'Hard',
        savings: carbonData.transport.flights * 0.5 * 2.5,
        description: 'Consider domestic travel alternatives or carbon offset programs',
        category: 'Transportation'
      });
    }

    // Energy recommendations
    if (carbonData.energy.electricity > 800) {
      recommendations.push({
        title: 'Switch to LED bulbs & efficient appliances',
        impact: 'Medium',
        difficulty: 'Easy',
        savings: carbonData.energy.electricity * 0.2 * 0.5,
        description: 'Replace incandescent bulbs and upgrade old appliances',
        category: 'Energy'
      });
    }

    // Food recommendations
    if (carbonData.food.meat > 7) {
      recommendations.push({
        title: 'Try "Meatless Monday" or reduce meat intake',
        impact: 'High',
        difficulty: 'Easy',
        savings: 2 * 3.2 * 52 / 12, // 2 meals per month reduction
        description: 'Replace 2 meat meals per month with plant-based alternatives',
        category: 'Food'
      });
    }

    if (carbonData.food.localFood < 50) {
      recommendations.push({
        title: 'Buy more local and seasonal produce',
        impact: 'Medium',
        difficulty: 'Easy',
        savings: 2.4, // Estimated annual savings
        description: 'Shop at farmers markets or choose local options at grocery stores',
        category: 'Food'
      });
    }

    // Lifestyle recommendations
    if (carbonData.lifestyle.waste > 3) {
      recommendations.push({
        title: 'Reduce waste and increase recycling',
        impact: 'Medium',
        difficulty: 'Easy',
        savings: (carbonData.lifestyle.waste - 2) * 2.5 * 52,
        description: 'Focus on reducing single-use items and composting organic waste',
        category: 'Lifestyle'
      });
    }

    return recommendations.sort((a, b) => b.savings - a.savings).slice(0, 5);
  };

  const recommendations = getRecommendations();
  const totalPotentialSavings = recommendations.reduce((sum, rec) => sum + rec.savings, 0);

  const getDifficultyColor = (difficulty: string) => {
    switch (difficulty) {
      case 'Easy': return 'bg-green-100 text-green-800';
      case 'Medium': return 'bg-yellow-100 text-yellow-800';
      case 'Hard': return 'bg-red-100 text-red-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getImpactColor = (impact: string) => {
    switch (impact) {
      case 'Very High': return 'text-red-600';
      case 'High': return 'text-orange-600';
      case 'Medium': return 'text-yellow-600';
      default: return 'text-green-600';
    }
  };

  return (
    <div className="bg-gray-900 rounded-xl shadow-xl p-6 border border-gray-800">
      <div className="flex items-center space-x-3 mb-6">
        <div className="flex items-center justify-center w-10 h-10 bg-gradient-to-r from-green-400 to-green-500 rounded-lg shadow-lg shadow-green-500/25">
          <Lightbulb className="w-5 h-5 text-white" />
        </div>
        <h3 className="text-xl font-semibold text-white">Personalized Recommendations</h3>
      </div>

      {recommendations.length > 0 ? (
        <div className="space-y-4">
          {totalPotentialSavings > 0 && (
            <div className="p-4 bg-gradient-to-r from-gray-800 to-gray-700 rounded-lg mb-6 border border-green-500/20">
              <div className="text-center">
                <div className="text-2xl font-bold text-white mb-1">
                  -{totalPotentialSavings.toFixed(1)} tons CO₂/year
                </div>
                <p className="text-sm text-gray-300">Potential annual savings</p>
              </div>
            </div>
          )}

          {recommendations.map((rec, index) => (
            <div key={index} className="border border-gray-700 rounded-lg p-4 hover:shadow-lg hover:border-green-500/30 transition-all duration-200 bg-gray-800/50">
              <div className="flex items-start justify-between mb-3">
                <div className="flex-1">
                  <h4 className="font-semibold text-white mb-1">{rec.title}</h4>
                  <p className="text-sm text-gray-300">{rec.description}</p>
                </div>
                <ArrowRight className="w-4 h-4 text-green-400 mt-1 ml-2" />
              </div>
              
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-3">
                  <span className={`px-2 py-1 rounded-full text-xs font-medium ${getDifficultyColor(rec.difficulty)}`}>
                    {rec.difficulty}
                  </span>
                  <span className="text-xs text-gray-400">{rec.category}</span>
                </div>
                
                <div className="text-right">
                  <div className={`text-sm font-semibold ${getImpactColor(rec.impact)}`}>
                    -{rec.savings.toFixed(1)} tons/year
                  </div>
                  <div className="text-xs text-gray-400">{rec.impact} Impact</div>
                </div>
              </div>
            </div>
          ))}

          <div className="mt-6 p-4 bg-gray-800 rounded-lg border border-green-500/20">
            <div className="flex items-center space-x-2 mb-2">
              <CheckCircle className="w-5 h-5 text-green-400" />
              <span className="font-medium text-white">Quick Tips</span>
            </div>
            <ul className="text-sm text-gray-300 space-y-1">
              <li>• Small changes compound over time - start with easy wins</li>
              <li>• Track your progress monthly to stay motivated</li>
              <li>• Consider carbon offset programs for unavoidable emissions</li>
            </ul>
          </div>
        </div>
      ) : (
        <div className="text-center py-8">
          <Lightbulb className="w-12 h-12 text-gray-500 mx-auto mb-4" />
          <h4 className="text-lg font-medium text-white mb-2">Start Calculating</h4>
          <p className="text-gray-300">
            Enter your data above to get personalized recommendations for reducing your carbon footprint.
          </p>
        </div>
      )}
    </div>
  );
};

export default RecommendationsPanel;