import React from 'react';
import { Search, Calendar, Heart, Bell } from 'lucide-react';

const TopBar: React.FC = () => {
  return (
    <div className="bg-white border-b border-gray-100 px-8 py-4">
      <div className="flex items-center justify-between">
        {/* Logo */}
        <div className="flex items-center space-x-8">
          <h1 className="text-2xl font-bold text-gray-900 italic">Pishon</h1>
          
          {/* Search Bar */}
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
            <input
              type="text"
              placeholder="Search..."
              className="pl-10 pr-4 py-2 w-80 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            />
          </div>
        </div>

        {/* Right Side Icons */}
        <div className="flex items-center space-x-4">
          <div className="bg-yellow-400 text-black px-4 py-2 rounded-lg font-bold text-sm">
            FREEBIE ✨
          </div>
          <button className="p-2 text-gray-600 hover:text-gray-900">
            <Calendar className="w-5 h-5" />
          </button>
          <button className="p-2 text-gray-600 hover:text-gray-900">
            <Heart className="w-5 h-5" />
          </button>
          <button className="p-2 text-gray-600 hover:text-gray-900">
            <Bell className="w-5 h-5" />
          </button>
          <div className="w-10 h-10 bg-gradient-to-br from-purple-400 to-pink-400 rounded-full flex items-center justify-center">
            <span className="text-white font-bold text-sm">U</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TopBar;