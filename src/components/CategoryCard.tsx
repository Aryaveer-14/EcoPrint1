import React from 'react';
import { DivideIcon as LucideIcon } from 'lucide-react';

interface Field {
  key: string;
  label: string;
  unit: string;
  factor: number;
}

interface Category {
  id: string;
  title: string;
  icon: LucideIcon;
  color: string;
  fields: Field[];
}

interface CategoryCardProps {
  category: Category;
  data: Record<string, number>;
  onUpdate: (field: string, value: number) => void;
}

const CategoryCard: React.FC<CategoryCardProps> = ({ category, data, onUpdate }) => {
  const Icon = category.icon;

  return (
    <div className="bg-gray-900 rounded-xl shadow-xl hover:shadow-2xl transition-all duration-300 overflow-hidden border border-gray-800 hover:border-green-500/30">
      <div className={`bg-gradient-to-r ${category.color} p-6 border-b`}>
        <div className="flex items-center space-x-3">
          <div className="flex items-center justify-center w-12 h-12 bg-green-500 bg-opacity-20 rounded-lg border border-green-500/30">
            <Icon className="w-6 h-6 text-green-400" />
          </div>
          <div>
            <h3 className="text-xl font-semibold text-white">{category.title}</h3>
            <p className="text-gray-300 text-sm">Track your impact</p>
          </div>
        </div>
      </div>
      
      <div className="p-6 space-y-6">
        {category.fields.map((field) => (
          <div key={field.key} className="space-y-2">
            <label className="block text-sm font-medium text-gray-300">
              {field.label}
            </label>
            <div className="relative">
              <input
                type="number"
                min="0"
                step="0.1"
                value={data[field.key] || 0}
                onChange={(e) => onUpdate(field.key, parseFloat(e.target.value) || 0)}
                className="w-full px-4 py-3 bg-gray-800 border border-gray-700 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500 transition-colors duration-200 text-white placeholder-gray-500"
                placeholder="0"
              />
              <span className="absolute right-3 top-1/2 transform -translate-y-1/2 text-sm text-gray-400">
                {field.unit}
              </span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default CategoryCard;