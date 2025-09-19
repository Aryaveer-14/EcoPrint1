import React from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, ReferenceLine } from 'recharts';

interface CarbonHistogramProps {
  userFootprint: number;
}

const CarbonHistogram: React.FC<CarbonHistogramProps> = ({ userFootprint }) => {
  const standardData = [
    {
      name: 'UN Target\n2030',
      value: 2.3,
      color: '#10b981',
      description: 'Required to limit warming to 1.5°C'
    },
    {
      name: 'Global\nAverage',
      value: 4.8,
      color: '#3b82f6',
      description: 'World average carbon footprint'
    },
    {
      name: 'EU\nAverage',
      value: 8.2,
      color: '#f59e0b',
      description: 'European Union average'
    },
    {
      name: 'US\nAverage',
      value: 16.0,
      color: '#ef4444',
      description: 'United States average'
    },
    {
      name: 'Your\nFootprint',
      value: userFootprint,
      color: '#8b5cf6',
      description: 'Your calculated carbon footprint'
    }
  ];

  const CustomTooltip = ({ active, payload, label }: any) => {
    if (active && payload && payload.length) {
      const data = payload[0].payload;
      return (
        <div className="bg-gray-800 border border-gray-700 rounded-lg p-4 shadow-lg max-w-xs">
          <p className="text-white font-medium mb-2">{label.replace('\n', ' ')}</p>
          <p className="text-green-400 font-semibold">
            {data.value.toFixed(2)} tons CO₂/year
          </p>
          <p className="text-gray-300 text-sm mt-1">
            {data.description}
          </p>
        </div>
      );
    }
    return null;
  };

  const getImpactAnalysis = () => {
    if (userFootprint <= 2.3) {
      return {
        level: 'Excellent',
        message: 'You\'re meeting the UN 2030 target! Keep up the great work.',
        color: 'text-green-400'
      };
    } else if (userFootprint <= 4.8) {
      return {
        level: 'Good',
        message: 'Below global average but room for improvement to meet UN targets.',
        color: 'text-blue-400'
      };
    } else if (userFootprint <= 8.2) {
      return {
        level: 'Moderate',
        message: 'Similar to EU average. Significant reduction needed for climate goals.',
        color: 'text-yellow-400'
      };
    } else if (userFootprint <= 16.0) {
      return {
        level: 'High',
        message: 'Above EU average. Major lifestyle changes recommended.',
        color: 'text-orange-400'
      };
    } else {
      return {
        level: 'Very High',
        message: 'Well above US average. Urgent action needed to reduce impact.',
        color: 'text-red-400'
      };
    }
  };

  const analysis = getImpactAnalysis();

  return (
    <div className="bg-gray-800 rounded-lg p-6 border border-gray-700">
      <h4 className="text-lg font-semibold text-white mb-4 text-center">
        Carbon Footprint Comparison
      </h4>
      
      <div className="h-80 mb-6">
        <ResponsiveContainer width="100%" height="100%">
          <BarChart
            data={standardData}
            margin={{
              top: 20,
              right: 30,
              left: 20,
              bottom: 60,
            }}
          >
            <CartesianGrid strokeDasharray="3 3" stroke="#374151" />
            <XAxis 
              dataKey="name" 
              stroke="#9ca3af"
              fontSize={12}
              interval={0}
              angle={0}
              textAnchor="middle"
              height={60}
            />
            <YAxis 
              stroke="#9ca3af"
              fontSize={12}
              label={{ 
                value: 'tons CO₂/year', 
                angle: -90, 
                position: 'insideLeft',
                style: { textAnchor: 'middle', fill: '#9ca3af' }
              }}
            />
            <Tooltip content={<CustomTooltip />} />
            <ReferenceLine 
              y={2.3} 
              stroke="#10b981" 
              strokeDasharray="5 5" 
              label={{ value: "UN Target", position: "topRight", fill: "#10b981" }}
            />
            <Bar dataKey="value" radius={[4, 4, 0, 0]}>
              {standardData.map((entry, index) => (
                <Cell key={`cell-${index}`} fill={entry.color} />
              ))}
            </Bar>
          </BarChart>
        </ResponsiveContainer>
      </div>

      <div className="bg-gray-900 rounded-lg p-4 border border-gray-600">
        <div className="flex items-center justify-between mb-2">
          <span className="text-gray-300 font-medium">Impact Level:</span>
          <span className={`font-semibold ${analysis.color}`}>
            {analysis.level}
          </span>
        </div>
        <p className="text-gray-300 text-sm">
          {analysis.message}
        </p>
      </div>

      <div className="mt-4 grid grid-cols-2 gap-4 text-sm">
        <div className="bg-gray-900 rounded p-3 border border-gray-600">
          <div className="text-gray-400 mb-1">Reduction Needed</div>
          <div className="text-white font-semibold">
            {userFootprint > 2.3 ? 
              `${(userFootprint - 2.3).toFixed(1)} tons` : 
              'Target Met!'
            }
          </div>
        </div>
        <div className="bg-gray-900 rounded p-3 border border-gray-600">
          <div className="text-gray-400 mb-1">vs Global Average</div>
          <div className={`font-semibold ${userFootprint > 4.8 ? 'text-red-400' : 'text-green-400'}`}>
            {userFootprint > 4.8 ? '+' : ''}{((userFootprint - 4.8) / 4.8 * 100).toFixed(0)}%
          </div>
        </div>
      </div>
    </div>
  );
};

export default CarbonHistogram;