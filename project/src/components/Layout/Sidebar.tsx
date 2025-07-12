import React from 'react';
import { Filter, Star, MapPin, Calendar, Shirt, Footprints, Watch, Crown, Tag } from 'lucide-react';
import { useTheme } from '../../contexts/ThemeContext';

interface SidebarProps {
  isOpen: boolean;
  onClose: () => void;
  pointsRange: [number, number];
  setPointsRange: (range: [number, number]) => void;
}

const Sidebar: React.FC<SidebarProps> = ({ isOpen, onClose, pointsRange, setPointsRange }) => {
  const { isDarkMode } = useTheme();

  const categories = [
    { icon: Shirt, label: 'Clothing', count: 1234 },
    { icon: Footprints, label: 'Shoes', count: 567 },
    { icon: Watch, label: 'Accessories', count: 890 },
    { icon: Crown, label: 'Luxury Items', count: 123 },
    { icon: Tag, label: 'Sale Items', count: 456 }
  ];

  const conditions = [
    { label: 'New with tags', count: 234 },
    { label: 'Like new', count: 567 },
    { label: 'Gently used', count: 890 },
    { label: 'Well worn', count: 123 }
  ];

  const handlePointsChange = (type: 'min' | 'max', value: string) => {
    const numValue = parseInt(value) || 0;
    if (type === 'min') {
      setPointsRange([numValue, pointsRange[1]]);
    } else {
      setPointsRange([pointsRange[0], numValue]);
    }
  };

  return (
    <>
      {/* Overlay */}
      {isOpen && (
        <div
          className="fixed inset-0 bg-black bg-opacity-50 z-40 lg:hidden"
          onClick={onClose}
        />
      )}

      {/* Sidebar */}
      <div
        className={`fixed lg:static inset-y-0 left-0 z-50 w-80 bg-white dark:bg-gray-900 border-r border-gray-200 dark:border-gray-700 transform transition-transform duration-300 ease-in-out ${
          isOpen ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'
        }`}
      >
        <div className="h-full overflow-y-auto p-6">
          {/* Header */}
          <div className="flex items-center justify-between mb-6">
            <div className="flex items-center space-x-2">
              <Filter className="h-5 w-5 text-emerald-600 dark:text-emerald-400" />
              <h2 className="text-lg font-semibold text-gray-900 dark:text-white">Filters</h2>
            </div>
            <button
              onClick={onClose}
              className="lg:hidden text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-300"
            >
              ×
            </button>
          </div>

          {/* Categories */}
          <div className="mb-8">
            <h3 className="text-sm font-medium text-gray-900 dark:text-white mb-4">Categories</h3>
            <div className="space-y-2">
              {categories.map((category) => {
                const Icon = category.icon;
                return (
                  <label key={category.label} className="flex items-center space-x-3 cursor-pointer group">
                    <input
                      type="checkbox"
                      className="w-4 h-4 text-emerald-600 border-gray-300 dark:border-gray-600 rounded focus:ring-emerald-500"
                    />
                    <Icon className="h-4 w-4 text-gray-500 dark:text-gray-400 group-hover:text-emerald-600 dark:group-hover:text-emerald-400" />
                    <span className="text-sm text-gray-700 dark:text-gray-300 group-hover:text-emerald-600 dark:group-hover:text-emerald-400">
                      {category.label}
                    </span>
                    <span className="text-xs text-gray-500 dark:text-gray-400 ml-auto">
                      ({category.count})
                    </span>
                  </label>
                );
              })}
            </div>
          </div>

          {/* Condition */}
          <div className="mb-8">
            <h3 className="text-sm font-medium text-gray-900 dark:text-white mb-4">Condition</h3>
            <div className="space-y-2">
              {conditions.map((condition) => (
                <label key={condition.label} className="flex items-center space-x-3 cursor-pointer group">
                  <input
                    type="checkbox"
                    className="w-4 h-4 text-emerald-600 border-gray-300 dark:border-gray-600 rounded focus:ring-emerald-500"
                  />
                  <span className="text-sm text-gray-700 dark:text-gray-300 group-hover:text-emerald-600 dark:group-hover:text-emerald-400">
                    {condition.label}
                  </span>
                  <span className="text-xs text-gray-500 dark:text-gray-400 ml-auto">
                    ({condition.count})
                  </span>
                </label>
              ))}
            </div>
          </div>

          {/* Points Range */}
          <div className="mb-8">
            <h3 className="text-sm font-medium text-gray-900 dark:text-white mb-4">Points Range</h3>
            <div className="space-y-4">
              <div className="flex space-x-2">
                <div className="flex-1">
                  <label className="block text-xs text-gray-500 dark:text-gray-400 mb-1">Min</label>
                  <input
                    type="number"
                    min="0"
                    max="1000"
                    value={pointsRange[0]}
                    onChange={(e) => handlePointsChange('min', e.target.value)}
                    className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 bg-white dark:bg-gray-700 text-gray-900 dark:text-white text-sm"
                    placeholder="0"
                  />
                </div>
                <div className="flex-1">
                  <label className="block text-xs text-gray-500 dark:text-gray-400 mb-1">Max</label>
                  <input
                    type="number"
                    min="0"
                    max="1000"
                    value={pointsRange[1]}
                    onChange={(e) => handlePointsChange('max', e.target.value)}
                    className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 bg-white dark:bg-gray-700 text-gray-900 dark:text-white text-sm"
                    placeholder="1000"
                  />
                </div>
              </div>
              <div className="text-xs text-gray-500 dark:text-gray-400">
                Range: {pointsRange[0]} - {pointsRange[1]} points
              </div>
            </div>
          </div>

          {/* Location */}
          <div className="mb-8">
            <h3 className="text-sm font-medium text-gray-900 dark:text-white mb-4">Location</h3>
            <div className="relative">
              <MapPin className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
              <input
                type="text"
                placeholder="Enter location"
                className="w-full pl-10 pr-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 bg-white dark:bg-gray-800 text-gray-900 dark:text-white placeholder-gray-500 dark:placeholder-gray-400"
              />
            </div>
          </div>

          {/* Posted Date */}
          <div className="mb-8">
            <h3 className="text-sm font-medium text-gray-900 dark:text-white mb-4">Posted</h3>
            <div className="space-y-2">
              {['Today', 'Yesterday', 'Last 7 days', 'Last 30 days'].map((period) => (
                <label key={period} className="flex items-center space-x-3 cursor-pointer group">
                  <input
                    type="radio"
                    name="posted"
                    className="w-4 h-4 text-emerald-600 border-gray-300 dark:border-gray-600 focus:ring-emerald-500"
                  />
                  <span className="text-sm text-gray-700 dark:text-gray-300 group-hover:text-emerald-600 dark:group-hover:text-emerald-400">
                    {period}
                  </span>
                </label>
              ))}
            </div>
          </div>

          {/* Clear Filters */}
          <button className="w-full bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-300 py-2 px-4 rounded-lg hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors">
            Clear All Filters
          </button>
        </div>
      </div>
    </>
  );
};

export default Sidebar;