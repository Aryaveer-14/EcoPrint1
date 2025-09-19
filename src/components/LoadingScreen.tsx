import React from 'react';
import { Leaf } from 'lucide-react';

const LoadingScreen: React.FC = () => {
  return (
    <div className="min-h-screen bg-black flex items-center justify-center">
      <div className="text-center">
        <div className="relative mb-8">
          <div className="animate-pulse">
            <Leaf className="w-24 h-24 text-green-400 mx-auto animate-bounce" />
          </div>
          <div className="absolute inset-0 animate-ping">
            <Leaf className="w-24 h-24 text-green-400 opacity-20 mx-auto" />
          </div>
        </div>
        
        <div className="space-y-4">
          <h1 className="text-2xl font-bold text-white animate-fade-in">
            EcoTracker
          </h1>
          <div className="flex items-center justify-center space-x-1">
            <div className="w-2 h-2 bg-green-400 rounded-full animate-bounce" style={{ animationDelay: '0ms' }}></div>
            <div className="w-2 h-2 bg-green-400 rounded-full animate-bounce" style={{ animationDelay: '150ms' }}></div>
            <div className="w-2 h-2 bg-green-400 rounded-full animate-bounce" style={{ animationDelay: '300ms' }}></div>
          </div>
          <p className="text-gray-400 text-sm animate-fade-in-delay">
            Loading your carbon footprint journey...
          </p>
        </div>
      </div>
    </div>
  );
};

export default LoadingScreen;