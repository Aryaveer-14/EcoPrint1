import React from 'react';
import { Leaf, Globe, ArrowLeft } from 'lucide-react';

interface HeaderProps {
  showBackButton: boolean;
  onNavigateToHome: () => void;
}

const Header: React.FC<HeaderProps> = ({ showBackButton, onNavigateToHome }) => {
  return (
    <header className="bg-black shadow-xl border-b border-gray-800">
      <div className="container mx-auto px-4 py-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-3">
            {showBackButton && (
              <button
                onClick={onNavigateToHome}
                className="flex items-center justify-center w-10 h-10 bg-gray-800 hover:bg-gray-700 rounded-lg transition-colors duration-200 mr-2"
              >
                <ArrowLeft className="w-5 h-5 text-green-400" />
              </button>
            )}
            <div className="flex items-center justify-center w-10 h-10 bg-gradient-to-r from-green-400 to-green-500 rounded-lg shadow-lg shadow-green-500/25">
              <Leaf className="w-6 h-6 text-white" />
            </div>
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
    </header>
  );
};

export default Header;