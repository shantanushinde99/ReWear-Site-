import React, { useState } from 'react';
import { Search, Filter, Grid, List, SlidersHorizontal, MapPin, ChevronDown, Star } from 'lucide-react';
import { mockItems, mockCategories } from '../data/mockData';
import ItemCard from '../components/Common/ItemCard';
import Sidebar from '../components/Layout/Sidebar';
import { useTheme } from '../contexts/ThemeContext';

interface BrowseItemsPageProps {
  setCurrentPage: (page: string) => void;
  setSelectedItem: (item: any) => void;
  selectedCategory?: string;
}

const BrowseItemsPage: React.FC<BrowseItemsPageProps> = ({ setCurrentPage, setSelectedItem, selectedCategory = 'all' }) => {
  const { isDarkMode } = useTheme();
  const [searchTerm, setSearchTerm] = useState('');
  const [activeCategory, setActiveCategory] = useState(selectedCategory);
  const [selectedType, setSelectedType] = useState('all');
  const [selectedCondition, setSelectedCondition] = useState('all');
  const [sortBy, setSortBy] = useState('newest');
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');
  const [showSidebar, setShowSidebar] = useState(false);
  const [showSortDropdown, setShowSortDropdown] = useState(false);
  const [pointsRange, setPointsRange] = useState<[number, number]>([0, 1000]);

  const availableItems = mockItems.filter(item => item.status === 'available');

  const filteredItems = availableItems.filter(item => {
    const matchesSearch = item.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         item.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         item.tags.some(tag => tag.toLowerCase().includes(searchTerm.toLowerCase()));
    const matchesCategory = activeCategory === 'all' || item.category === activeCategory;
    const matchesType = selectedType === 'all' || item.type === selectedType;
    const matchesCondition = selectedCondition === 'all' || item.condition === selectedCondition;
    const matchesPoints = item.pointsValue >= pointsRange[0] && item.pointsValue <= pointsRange[1];

    return matchesSearch && matchesCategory && matchesType && matchesCondition && matchesPoints;
  });

  const sortedItems = [...filteredItems].sort((a, b) => {
    switch (sortBy) {
      case 'newest':
        return new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime();
      case 'oldest':
        return new Date(a.createdAt).getTime() - new Date(b.createdAt).getTime();
      case 'points-low':
        return a.pointsValue - b.pointsValue;
      case 'points-high':
        return b.pointsValue - a.pointsValue;
      case 'popular':
        return b.featured ? 1 : -1;
      default:
        return 0;
    }
  });

  const handleItemClick = (item: any) => {
    setSelectedItem(item);
    setCurrentPage('item-detail');
  };

  const sortOptions = [
    { value: 'newest', label: 'Newest First' },
    { value: 'oldest', label: 'Oldest First' },
    { value: 'points-low', label: 'Points: Low to High' },
    { value: 'points-high', label: 'Points: High to Low' },
    { value: 'popular', label: 'Most Popular' }
  ];

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      <div className="flex">
        {/* Sidebar */}
        <Sidebar 
          isOpen={showSidebar} 
          onClose={() => setShowSidebar(false)}
          pointsRange={pointsRange}
          setPointsRange={setPointsRange}
        />

        {/* Main Content */}
        <div className="flex-1 lg:ml-0">
          {/* Header */}
          <div className="bg-white dark:bg-gray-800 border-b border-gray-200 dark:border-gray-700 p-6">
            <div className="max-w-7xl mx-auto">
              <div className="flex items-center justify-between mb-6">
                <div>
                  <h1 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">Browse Items</h1>
                  <p className="text-gray-600 dark:text-gray-400">Discover amazing clothing from our community</p>
                </div>
                
                <button
                  onClick={() => setShowSidebar(true)}
                  className="lg:hidden flex items-center space-x-2 px-4 py-2 bg-emerald-600 text-white rounded-lg hover:bg-emerald-700 transition-colors"
                >
                  <SlidersHorizontal className="h-4 w-4" />
                  <span>Filters</span>
                </button>
              </div>

              {/* Category Pills */}
              <div className="flex items-center space-x-4 mb-6 overflow-x-auto pb-2">
                {mockCategories.map(category => (
                  <button
                    key={category.value}
                    onClick={() => setActiveCategory(category.value)}
                    className={`flex-shrink-0 px-4 py-2 rounded-full text-sm font-medium transition-colors ${
                      activeCategory === category.value
                        ? 'bg-emerald-600 text-white'
                        : 'bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-600'
                    }`}
                  >
                    {category.icon} {category.name} ({category.count})
                  </button>
                ))}
              </div>

              {/* Search and Controls */}
              <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between space-y-4 lg:space-y-0">
                {/* Search */}
                <div className="flex-1 max-w-md">
                  <div className="relative">
                    <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
                    <input
                      type="text"
                      placeholder="Search items..."
                      value={searchTerm}
                      onChange={(e) => setSearchTerm(e.target.value)}
                      className="w-full pl-10 pr-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 bg-white dark:bg-gray-700 text-gray-900 dark:text-white placeholder-gray-500 dark:placeholder-gray-400"
                    />
                  </div>
                </div>

                {/* Controls */}
                <div className="flex items-center space-x-4">
                  {/* Sort Dropdown */}
                  <div className="relative">
                    <button
                      onClick={() => setShowSortDropdown(!showSortDropdown)}
                      className="flex items-center space-x-2 px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors bg-white dark:bg-gray-800 text-gray-700 dark:text-gray-300"
                    >
                      <span>Sort: {sortOptions.find(opt => opt.value === sortBy)?.label}</span>
                      <ChevronDown className="h-4 w-4" />
                    </button>

                    {showSortDropdown && (
                      <div className="absolute top-full right-0 mt-1 w-48 bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg shadow-lg z-50">
                        {sortOptions.map(option => (
                          <button
                            key={option.value}
                            onClick={() => {
                              setSortBy(option.value);
                              setShowSortDropdown(false);
                            }}
                            className="w-full text-left px-4 py-2 hover:bg-gray-50 dark:hover:bg-gray-700 text-gray-700 dark:text-gray-300 first:rounded-t-lg last:rounded-b-lg"
                          >
                            {option.label}
                          </button>
                        ))}
                      </div>
                    )}
                  </div>

                  {/* View Mode Toggle */}
                  <div className="flex items-center space-x-1 bg-gray-100 dark:bg-gray-700 rounded-lg p-1">
                    <button
                      onClick={() => setViewMode('grid')}
                      className={`p-2 rounded-md transition-colors ${
                        viewMode === 'grid'
                          ? 'bg-white dark:bg-gray-600 text-emerald-600 dark:text-emerald-400 shadow-sm'
                          : 'text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-300'
                      }`}
                    >
                      <Grid className="h-4 w-4" />
                    </button>
                    <button
                      onClick={() => setViewMode('list')}
                      className={`p-2 rounded-md transition-colors ${
                        viewMode === 'list'
                          ? 'bg-white dark:bg-gray-600 text-emerald-600 dark:text-emerald-400 shadow-sm'
                          : 'text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-300'
                      }`}
                    >
                      <List className="h-4 w-4" />
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Results */}
          <div className="p-6">
            <div className="max-w-7xl mx-auto">
              {/* Results Header */}
              <div className="flex items-center justify-between mb-6">
                <div>
                  <p className="text-gray-600 dark:text-gray-400">
                    Showing {sortedItems.length} of {availableItems.length} items
                  </p>
                  {pointsRange[0] > 0 || pointsRange[1] < 1000 ? (
                    <p className="text-sm text-emerald-600 dark:text-emerald-400">
                      Filtered by points: {pointsRange[0]} - {pointsRange[1]}
                    </p>
                  ) : null}
                </div>
                <div className="flex items-center space-x-2 text-sm text-gray-500 dark:text-gray-400">
                  <MapPin className="h-4 w-4" />
                  <span>Mumbai, Maharashtra</span>
                </div>
              </div>

              {/* Items Grid/List */}
              {sortedItems.length > 0 ? (
                <div className={
                  viewMode === 'grid' 
                    ? 'grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6' 
                    : 'space-y-4'
                }>
                  {sortedItems.map((item) => (
                    <ItemCard
                      key={item.id}
                      item={item}
                      onClick={() => handleItemClick(item)}
                      layout={viewMode}
                    />
                  ))}
                </div>
              ) : (
                <div className="text-center py-12">
                  <Filter className="h-12 w-12 text-gray-400 mx-auto mb-4" />
                  <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-2">No items found</h3>
                  <p className="text-gray-600 dark:text-gray-400">Try adjusting your search or filter criteria</p>
                </div>
              )}

              {/* Load More */}
              {sortedItems.length > 0 && (
                <div className="text-center mt-12">
                  <button className="bg-emerald-600 text-white px-8 py-3 rounded-lg font-medium hover:bg-emerald-700 transition-colors">
                    Load More Items
                  </button>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BrowseItemsPage;