import React from 'react';
import { ArrowRight, Recycle, Users, ShoppingBag, Heart, Star, TrendingUp, Award, Globe } from 'lucide-react';
import { useAuth } from '../contexts/AuthContext';
import { useTheme } from '../contexts/ThemeContext';
import { mockItems, mockCategories } from '../data/mockData';
import ItemCard from '../components/Common/ItemCard';

interface LandingPageProps {
  setCurrentPage: (page: string) => void;
  setSelectedItem: (item: any) => void;
  setSelectedCategory: (category: string) => void;
}

const LandingPage: React.FC<LandingPageProps> = ({ setCurrentPage, setSelectedItem, setSelectedCategory }) => {
  const { user } = useAuth();
  const { isDarkMode } = useTheme();
  const featuredItems = mockItems.filter(item => item.featured && item.status === 'available');

  const handleItemClick = (item: any) => {
    setSelectedItem(item);
    setCurrentPage('item-detail');
  };

  const handleCategoryClick = (categoryValue: string) => {
    setSelectedCategory(categoryValue);
    setCurrentPage('browse');
  };

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      {/* Hero Section */}
      <section className="relative bg-gradient-to-br from-emerald-600 via-emerald-700 to-teal-800 dark:from-emerald-800 dark:via-emerald-900 dark:to-teal-900 py-20 overflow-hidden">
        <div className="absolute inset-0 bg-black opacity-10"></div>
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div className="text-white">
              <h1 className="text-4xl md:text-6xl font-bold mb-6">
                India's Largest
                <span className="block text-yellow-400">Fashion Exchange</span>
              </h1>
              <p className="text-xl mb-8 text-emerald-100">
                Buy, sell, and swap pre-loved fashion using our points system. Join millions of users in creating a sustainable fashion ecosystem.
              </p>
              <div className="flex flex-col sm:flex-row gap-4">
                <button
                  onClick={() => user ? setCurrentPage('browse') : setCurrentPage('auth')}
                  className="bg-yellow-500 text-black px-8 py-4 rounded-lg font-bold text-lg hover:bg-yellow-400 transition-colors flex items-center justify-center space-x-2"
                >
                  <span>Start Shopping</span>
                  <ArrowRight className="h-5 w-5" />
                </button>
                <button
                  onClick={() => setCurrentPage('add-item')}
                  className="border-2 border-white text-white px-8 py-4 rounded-lg font-bold text-lg hover:bg-white hover:text-emerald-600 transition-colors"
                >
                  Sell Your Items
                </button>
              </div>
              
              <div className="flex items-center space-x-8 mt-8">
                <div className="text-center">
                  <div className="text-2xl font-bold">2.5M+</div>
                  <div className="text-emerald-200 text-sm">Happy Users</div>
                </div>
                <div className="text-center">
                  <div className="text-2xl font-bold">50k+</div>
                  <div className="text-emerald-200 text-sm">Items Listed</div>
                </div>
                <div className="text-center">
                  <div className="text-2xl font-bold">98%</div>
                  <div className="text-emerald-200 text-sm">Satisfaction</div>
                </div>
              </div>
            </div>

            <div className="relative">
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-4">
                  <img
                    src="https://images.pexels.com/photos/985635/pexels-photo-985635.jpeg"
                    alt="Fashion 1"
                    className="w-full h-48 object-cover rounded-lg shadow-lg"
                  />
                  <img
                    src="https://images.pexels.com/photos/1040945/pexels-photo-1040945.jpeg"
                    alt="Fashion 2"
                    className="w-full h-32 object-cover rounded-lg shadow-lg"
                  />
                </div>
                <div className="space-y-4 mt-8">
                  <img
                    src="https://images.pexels.com/photos/996329/pexels-photo-996329.jpeg"
                    alt="Fashion 3"
                    className="w-full h-32 object-cover rounded-lg shadow-lg"
                  />
                  <img
                    src="https://images.pexels.com/photos/794062/pexels-photo-794062.jpeg"
                    alt="Fashion 4"
                    className="w-full h-48 object-cover rounded-lg shadow-lg"
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Categories Section */}
      <section className="py-16 bg-white dark:bg-gray-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-4">Browse by Category</h2>
            <p className="text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
              Discover amazing fashion pieces across all categories
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {mockCategories.map((category) => (
              <button
                key={category.id}
                onClick={() => handleCategoryClick(category.value)}
                className="group bg-gray-50 dark:bg-gray-700 rounded-lg p-6 hover:bg-emerald-50 dark:hover:bg-emerald-900/20 transition-colors text-left"
              >
                <div className="flex items-center space-x-4">
                  <div className="text-3xl">{category.icon}</div>
                  <div>
                    <h3 className="font-semibold text-gray-900 dark:text-white group-hover:text-emerald-600 dark:group-hover:text-emerald-400 transition-colors">
                      {category.name}
                    </h3>
                    <p className="text-sm text-gray-500 dark:text-gray-400">{category.count} items</p>
                  </div>
                </div>
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* Featured Items */}
      <section className="py-16 bg-gray-50 dark:bg-gray-900">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between mb-8">
            <div>
              <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-2">Trending Items</h2>
              <p className="text-gray-600 dark:text-gray-400">Popular and recently added items from our community</p>
            </div>
            <button
              onClick={() => setCurrentPage('browse')}
              className="text-emerald-600 dark:text-emerald-400 hover:text-emerald-700 dark:hover:text-emerald-300 font-medium flex items-center space-x-1"
            >
              <span>View All</span>
              <ArrowRight className="h-4 w-4" />
            </button>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {featuredItems.slice(0, 8).map((item) => (
              <ItemCard
                key={item.id}
                item={item}
                onClick={() => handleItemClick(item)}
              />
            ))}
          </div>
        </div>
      </section>

      {/* How It Works */}
      <section className="py-16 bg-white dark:bg-gray-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-4">How ReWear Works</h2>
            <p className="text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
              Simple steps to start your sustainable fashion journey with our points system
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="text-center group">
              <div className="bg-emerald-100 dark:bg-emerald-900 w-20 h-20 rounded-full flex items-center justify-center mx-auto mb-6 group-hover:bg-emerald-200 dark:group-hover:bg-emerald-800 transition-colors">
                <ShoppingBag className="h-10 w-10 text-emerald-600 dark:text-emerald-400" />
              </div>
              <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-3">List Your Items</h3>
              <p className="text-gray-600 dark:text-gray-400">
                Upload photos and details of clothing you no longer wear. Set your own points value for each item.
              </p>
            </div>

            <div className="text-center group">
              <div className="bg-emerald-100 dark:bg-emerald-900 w-20 h-20 rounded-full flex items-center justify-center mx-auto mb-6 group-hover:bg-emerald-200 dark:group-hover:bg-emerald-800 transition-colors">
                <Users className="h-10 w-10 text-emerald-600 dark:text-emerald-400" />
              </div>
              <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-3">Connect & Trade</h3>
              <p className="text-gray-600 dark:text-gray-400">
                Browse items, chat with sellers, and arrange swaps or use points to purchase items you love.
              </p>
            </div>

            <div className="text-center group">
              <div className="bg-emerald-100 dark:bg-emerald-900 w-20 h-20 rounded-full flex items-center justify-center mx-auto mb-6 group-hover:bg-emerald-200 dark:group-hover:bg-emerald-800 transition-colors">
                <Recycle className="h-10 w-10 text-emerald-600 dark:text-emerald-400" />
              </div>
              <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-3">Earn & Redeem Points</h3>
              <p className="text-gray-600 dark:text-gray-400">
                Earn points by selling items and use them to get new pieces, creating a sustainable fashion cycle.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-16 bg-emerald-600 dark:bg-emerald-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-white mb-4">Our Impact</h2>
            <p className="text-emerald-100 max-w-2xl mx-auto">
              Together, we're making a real difference in sustainable fashion
            </p>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            <div className="text-center">
              <div className="flex items-center justify-center mb-2">
                <TrendingUp className="h-8 w-8 text-yellow-400 mr-2" />
                <div className="text-4xl font-bold text-white">2.5M</div>
              </div>
              <div className="text-emerald-100">Items Exchanged</div>
            </div>
            <div className="text-center">
              <div className="flex items-center justify-center mb-2">
                <Users className="h-8 w-8 text-yellow-400 mr-2" />
                <div className="text-4xl font-bold text-white">500K</div>
              </div>
              <div className="text-emerald-100">Active Members</div>
            </div>
            <div className="text-center">
              <div className="flex items-center justify-center mb-2">
                <Award className="h-8 w-8 text-yellow-400 mr-2" />
                <div className="text-4xl font-bold text-white">98%</div>
              </div>
              <div className="text-emerald-100">Satisfaction Rate</div>
            </div>
            <div className="text-center">
              <div className="flex items-center justify-center mb-2">
                <Globe className="h-8 w-8 text-yellow-400 mr-2" />
                <div className="text-4xl font-bold text-white">150</div>
              </div>
              <div className="text-emerald-100">Cities Covered</div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-white dark:bg-gray-800">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <Heart className="h-16 w-16 text-emerald-600 dark:text-emerald-400 mx-auto mb-6" />
          <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-4">
            Ready to Join the Sustainable Fashion Revolution?
          </h2>
          <p className="text-xl text-gray-600 dark:text-gray-400 mb-8">
            Start your journey with ReWear today and help build a more sustainable future, one swap at a time.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <button
              onClick={() => user ? setCurrentPage('add-item') : setCurrentPage('auth')}
              className="bg-emerald-600 text-white px-8 py-3 rounded-lg font-semibold hover:bg-emerald-700 transition-colors inline-flex items-center justify-center space-x-2"
            >
              <span>{user ? 'List Your First Item' : 'Join ReWear Today'}</span>
              <ArrowRight className="h-5 w-5" />
            </button>
            <button
              onClick={() => setCurrentPage('browse')}
              className="border-2 border-emerald-600 text-emerald-600 dark:text-emerald-400 px-8 py-3 rounded-lg font-semibold hover:bg-emerald-50 dark:hover:bg-emerald-900/20 transition-colors"
            >
              Browse Items
            </button>
          </div>
        </div>
      </section>
    </div>
  );
};

export default LandingPage;