import React, { useEffect, useRef } from 'react';
import { Calculator, Leaf, Globe, ArrowRight, TrendingUp, Shield, Recycle } from 'lucide-react';

interface HomePageProps {
  onNavigateToCalculator: () => void;
}

const HomePage: React.FC<HomePageProps> = ({ onNavigateToCalculator }) => {
  const observerRef = useRef<IntersectionObserver | null>(null);

  useEffect(() => {
    observerRef.current = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('animate-slide-in');
          }
        });
      },
      { threshold: 0.1 }
    );

    const elements = document.querySelectorAll('.scroll-animate');
    elements.forEach((el) => observerRef.current?.observe(el));

    return () => {
      if (observerRef.current) {
        observerRef.current.disconnect();
      }
    };
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-black to-gray-800">
      {/* Floating Header */}
      <div className="fixed top-0 left-0 right-0 z-50 bg-black/80 backdrop-blur-sm border-b border-gray-800">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
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
      </div>
      
      {/* Hero Section */}
      <section className="relative py-20 px-4 pt-32">
        <div className="container mx-auto text-center">
          <div className="inline-flex items-center justify-center w-20 h-20 bg-gradient-to-r from-green-400 to-green-500 rounded-full mb-8 shadow-lg shadow-green-500/25 animate-pulse">
            <Leaf className="w-10 h-10 text-white" />
          </div>
          
          <h1 className="text-5xl md:text-7xl font-bold text-white mb-6 animate-fade-in">
            Track Your
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-green-400 to-green-500"> Carbon Impact</span>
          </h1>
          
          <p className="text-xl text-gray-300 max-w-3xl mx-auto mb-12 animate-fade-in-delay">
            Take control of your environmental footprint with our comprehensive carbon calculator. 
            Get personalized insights and actionable recommendations to make a real difference.
          </p>
          
          <button
            onClick={onNavigateToCalculator}
            className="inline-flex items-center px-8 py-4 bg-gradient-to-r from-green-400 to-green-500 text-white font-semibold rounded-lg hover:from-green-300 hover:to-green-400 transition-all duration-300 shadow-lg shadow-green-500/25 hover:shadow-green-500/40 transform hover:scale-105"
          >
            <Calculator className="w-5 h-5 mr-2" />
            Calculate Your Footprint
            <ArrowRight className="w-5 h-5 ml-2" />
          </button>
        </div>
      </section>

      {/* Problems Faced Today Section */}
      <section className="py-20 px-4 bg-gray-900/50">
        <div className="container mx-auto">
          <div className="text-center mb-16 scroll-animate opacity-0 translate-y-8">
            <h2 className="text-4xl font-bold text-white mb-6">
              Environmental Challenges We Face Today
            </h2>
            <p className="text-xl text-gray-300 max-w-3xl mx-auto">
              Our planet is facing unprecedented environmental challenges that require immediate action.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            <div className="scroll-animate opacity-0 translate-x-[-50px] bg-gray-800 rounded-xl p-6 border border-gray-700 hover:border-green-500/30 transition-all duration-300">
              <div className="w-12 h-12 bg-red-500/20 rounded-lg flex items-center justify-center mb-4">
                <TrendingUp className="w-6 h-6 text-red-400" />
              </div>
              <h3 className="text-xl font-semibold text-white mb-3">Rising Global Temperatures</h3>
              <p className="text-gray-300 mb-4">
                Global average temperatures have risen by 1.1°C since pre-industrial times, leading to extreme weather events and ecosystem disruption.
              </p>
              <div className="w-full h-32 bg-gray-700 rounded-lg flex items-center justify-center">
                <span className="text-gray-500 text-sm">[Temperature Chart Placeholder]</span>
              </div>
            </div>

            <div className="scroll-animate opacity-0 translate-x-[-50px] bg-gray-800 rounded-xl p-6 border border-gray-700 hover:border-green-500/30 transition-all duration-300" style={{ animationDelay: '200ms' }}>
              <div className="w-12 h-12 bg-blue-500/20 rounded-lg flex items-center justify-center mb-4">
                <Globe className="w-6 h-6 text-blue-400" />
              </div>
              <h3 className="text-xl font-semibold text-white mb-3">Ocean Acidification</h3>
              <p className="text-gray-300 mb-4">
                Increased CO₂ absorption by oceans is causing acidification, threatening marine ecosystems and biodiversity worldwide.
              </p>
              <div className="w-full h-32 bg-gray-700 rounded-lg flex items-center justify-center">
                <span className="text-gray-500 text-sm">[Ocean pH Chart Placeholder]</span>
              </div>
            </div>

            <div className="scroll-animate opacity-0 translate-x-[-50px] bg-gray-800 rounded-xl p-6 border border-gray-700 hover:border-green-500/30 transition-all duration-300" style={{ animationDelay: '400ms' }}>
              <div className="w-12 h-12 bg-yellow-500/20 rounded-lg flex items-center justify-center mb-4">
                <Leaf className="w-6 h-6 text-yellow-400" />
              </div>
              <h3 className="text-xl font-semibold text-white mb-3">Deforestation Crisis</h3>
              <p className="text-gray-300 mb-4">
                We lose 10 million hectares of forest annually, reducing our planet's capacity to absorb CO₂ and destroying wildlife habitats.
              </p>
              <div className="w-full h-32 bg-gray-700 rounded-lg flex items-center justify-center">
                <span className="text-gray-500 text-sm">[Deforestation Data Placeholder]</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Why Calculate Carbon Footprint Section */}
      <section className="py-20 px-4">
        <div className="container mx-auto">
          <div className="text-center mb-16 scroll-animate opacity-0 translate-y-[-30px]">
            <h2 className="text-4xl font-bold text-white mb-6">
              Why Calculate Your Carbon Footprint?
            </h2>
            <p className="text-xl text-gray-300 max-w-3xl mx-auto">
              Understanding your environmental impact is the first step toward meaningful change.
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            <div className="scroll-animate opacity-0 translate-y-[-40px] text-center">
              <div className="w-16 h-16 bg-gradient-to-r from-green-400 to-green-500 rounded-full flex items-center justify-center mx-auto mb-6 shadow-lg shadow-green-500/25">
                <TrendingUp className="w-8 h-8 text-white" />
              </div>
              <h3 className="text-2xl font-semibold text-white mb-4">Awareness & Understanding</h3>
              <p className="text-gray-300 leading-relaxed">
                Gain clear insights into your daily activities' environmental impact. Knowledge empowers you to make informed decisions about your lifestyle choices and their consequences for the planet.
              </p>
            </div>

            <div className="scroll-animate opacity-0 translate-y-[-40px] text-center" style={{ animationDelay: '200ms' }}>
              <div className="w-16 h-16 bg-gradient-to-r from-green-400 to-green-500 rounded-full flex items-center justify-center mx-auto mb-6 shadow-lg shadow-green-500/25">
                <Shield className="w-8 h-8 text-white" />
              </div>
              <h3 className="text-2xl font-semibold text-white mb-4">Personal Accountability</h3>
              <p className="text-gray-300 leading-relaxed">
                Take ownership of your environmental impact and become part of the solution. Tracking your footprint creates accountability and motivates positive behavioral changes.
              </p>
            </div>

            <div className="scroll-animate opacity-0 translate-y-[-40px] text-center" style={{ animationDelay: '400ms' }}>
              <div className="w-16 h-16 bg-gradient-to-r from-green-400 to-green-500 rounded-full flex items-center justify-center mx-auto mb-6 shadow-lg shadow-green-500/25">
                <Recycle className="w-8 h-8 text-white" />
              </div>
              <h3 className="text-2xl font-semibold text-white mb-4">Actionable Insights</h3>
              <p className="text-gray-300 leading-relaxed">
                Receive personalized recommendations tailored to your lifestyle. Our calculator provides specific, achievable steps to reduce your environmental impact effectively.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Mitigation Strategies Section */}
      <section className="py-20 px-4 bg-gray-900/50">
        <div className="container mx-auto">
          <div className="text-center mb-16 scroll-animate opacity-0 translate-y-8">
            <h2 className="text-4xl font-bold text-white mb-6">
              Effective Mitigation Strategies
            </h2>
            <p className="text-xl text-gray-300 max-w-3xl mx-auto">
              Discover proven strategies to reduce your carbon footprint and contribute to a sustainable future.
            </p>
          </div>

          <div className="space-y-12">
            <div className="scroll-animate opacity-0 translate-x-[-50px] flex flex-col lg:flex-row items-center gap-8">
              <div className="lg:w-1/2">
                <h3 className="text-2xl font-semibold text-white mb-4">Sustainable Transportation</h3>
                <p className="text-gray-300 mb-4">
                  Transportation accounts for nearly 30% of greenhouse gas emissions. Switch to electric vehicles, use public transport, cycle, or walk when possible. Even carpooling can significantly reduce your carbon footprint.
                </p>
                <ul className="text-gray-300 space-y-2">
                  <li>• Electric or hybrid vehicles reduce emissions by 50-70%</li>
                  <li>• Public transport is 10x more efficient than private cars</li>
                  <li>• Cycling and walking have zero emissions</li>
                </ul>
              </div>
              <div className="lg:w-1/2 w-full h-64 bg-gray-700 rounded-lg flex items-center justify-center">
                <span className="text-gray-500 text-sm">[Transportation Impact Chart]</span>
              </div>
            </div>

            <div className="scroll-animate opacity-0 translate-x-[50px] flex flex-col lg:flex-row-reverse items-center gap-8">
              <div className="lg:w-1/2">
                <h3 className="text-2xl font-semibold text-white mb-4">Energy Efficiency at Home</h3>
                <p className="text-gray-300 mb-4">
                  Home energy consumption is a major contributor to carbon emissions. Implement energy-efficient practices, use renewable energy sources, and upgrade to smart appliances to dramatically reduce your footprint.
                </p>
                <ul className="text-gray-300 space-y-2">
                  <li>• LED bulbs use 75% less energy than incandescent</li>
                  <li>• Smart thermostats can reduce heating costs by 15%</li>
                  <li>• Solar panels can offset 100% of home energy use</li>
                </ul>
              </div>
              <div className="lg:w-1/2 w-full h-64 bg-gray-700 rounded-lg flex items-center justify-center">
                <span className="text-gray-500 text-sm">[Energy Savings Chart]</span>
              </div>
            </div>

            <div className="scroll-animate opacity-0 translate-x-[-50px] flex flex-col lg:flex-row items-center gap-8">
              <div className="lg:w-1/2">
                <h3 className="text-2xl font-semibold text-white mb-4">Sustainable Diet Choices</h3>
                <p className="text-gray-300 mb-4">
                  Food production contributes significantly to greenhouse gas emissions. Adopting a plant-based diet, reducing food waste, and choosing local, seasonal produce can make a substantial difference.
                </p>
                <ul className="text-gray-300 space-y-2">
                  <li>• Plant-based diets reduce food emissions by 50%</li>
                  <li>• Local food reduces transportation emissions</li>
                  <li>• Reducing food waste saves 3.3 gigatons of CO₂ annually</li>
                </ul>
              </div>
              <div className="lg:w-1/2 w-full h-64 bg-gray-700 rounded-lg flex items-center justify-center">
                <span className="text-gray-500 text-sm">[Diet Impact Comparison]</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Call to Action */}
      <section className="py-20 px-4">
        <div className="container mx-auto text-center">
          <div className="scroll-animate opacity-0 translate-y-8">
            <h2 className="text-4xl font-bold text-white mb-6">
              Ready to Make a Difference?
            </h2>
            <p className="text-xl text-gray-300 mb-8 max-w-2xl mx-auto">
              Start your journey toward a more sustainable lifestyle today. Calculate your carbon footprint and get personalized recommendations.
            </p>
            <button
              onClick={onNavigateToCalculator}
              className="inline-flex items-center px-8 py-4 bg-gradient-to-r from-green-400 to-green-500 text-white font-semibold rounded-lg hover:from-green-300 hover:to-green-400 transition-all duration-300 shadow-lg shadow-green-500/25 hover:shadow-green-500/40 transform hover:scale-105"
            >
              <Calculator className="w-5 h-5 mr-2" />
              Start Calculating Now
              <ArrowRight className="w-5 h-5 ml-2" />
            </button>
          </div>
        </div>
      </section>
    </div>
  );
};

export default HomePage;