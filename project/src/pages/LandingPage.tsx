import React from 'react';
import { ArrowRight, Recycle, Users, ShoppingBag, Heart, Star } from 'lucide-react';
import { useAuth } from '../contexts/AuthContext';
import { mockItems } from '../data/mockData';
import ItemCard from '../components/Common/ItemCard';

interface LandingPageProps {
  setCurrentPage: (page: string) => void;
  setSelectedItem: (item: any) => void;
}

const LandingPage: React.FC<LandingPageProps> = ({ setCurrentPage, setSelectedItem }) => {
  const { user } = useAuth();
  const featuredItems = mockItems.filter(item => item.featured && item.status === 'available');

  const handleItemClick = (item: any) => {
    setSelectedItem(item);
    setCurrentPage('item-detail');
  };

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="bg-gradient-to-br from-emerald-50 to-teal-50 py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h1 className="text-4xl md:text-6xl font-bold text-gray-900 mb-6">
              Sustainable Fashion Through
              <span className="text-emerald-600 block">Community Exchange</span>
            </h1>
            <p className="text-xl text-gray-600 mb-8 max-w-3xl mx-auto">
              Join ReWear's community to swap, share, and redeem quality clothing. 
              Reduce textile waste while discovering your next favorite outfit.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <button
                onClick={() => user ? setCurrentPage('browse') : setCurrentPage('auth')}
                className="bg-emerald-600 text-white px-8 py-3 rounded-lg font-semibold hover:bg-emerald-700 transition-colors flex items-center justify-center space-x-2"
              >
                <span>Start Swapping</span>
                <ArrowRight className="h-5 w-5" />
              </button>
              <button
                onClick={() => setCurrentPage('browse')}
                className="border-2 border-emerald-600 text-emerald-600 px-8 py-3 rounded-lg font-semibold hover:bg-emerald-50 transition-colors"
              >
                Browse Items
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">How ReWear Works</h2>
            <p className="text-gray-600 max-w-2xl mx-auto">
              Our platform makes sustainable fashion accessible through direct swaps and point-based redemptions
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="text-center group">
              <div className="bg-emerald-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4 group-hover:bg-emerald-200 transition-colors">
                <ShoppingBag className="h-8 w-8 text-emerald-600" />
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-2">List Your Items</h3>
              <p className="text-gray-600">
                Upload photos and details of clothing you no longer wear. Every listing earns you points.
              </p>
            </div>

            <div className="text-center group">
              <div className="bg-emerald-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4 group-hover:bg-emerald-200 transition-colors">
                <Users className="h-8 w-8 text-emerald-600" />
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-2">Connect & Swap</h3>
              <p className="text-gray-600">
                Browse the community marketplace and request swaps or use points to redeem items you love.
              </p>
            </div>

            <div className="text-center group">
              <div className="bg-emerald-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4 group-hover:bg-emerald-200 transition-colors">
                <Recycle className="h-8 w-8 text-emerald-600" />
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-2">Reduce Waste</h3>
              <p className="text-gray-600">
                Give clothes a second life while reducing textile waste and building a sustainable wardrobe.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Featured Items */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between mb-8">
            <div>
              <h2 className="text-3xl font-bold text-gray-900 mb-2">Featured Items</h2>
              <p className="text-gray-600">Discover popular and recently added items from our community</p>
            </div>
            <button
              onClick={() => setCurrentPage('browse')}
              className="text-emerald-600 hover:text-emerald-700 font-medium flex items-center space-x-1"
            >
              <span>View All</span>
              <ArrowRight className="h-4 w-4" />
            </button>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {featuredItems.map((item) => (
              <ItemCard
                key={item.id}
                item={item}
                onClick={() => handleItemClick(item)}
              />
            ))}
          </div>
        </div>
      </section>

      {/* Impact Stats */}
      <section className="py-20 bg-emerald-600">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-white mb-4">Community Impact</h2>
            <p className="text-emerald-100 max-w-2xl mx-auto">
              Together, we're making a real difference in reducing fashion waste
            </p>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            <div className="text-center">
              <div className="text-4xl font-bold text-white mb-2">2,847</div>
              <div className="text-emerald-100">Items Exchanged</div>
            </div>
            <div className="text-center">
              <div className="text-4xl font-bold text-white mb-2">1,203</div>
              <div className="text-emerald-100">Active Members</div>
            </div>
            <div className="text-center">
              <div className="text-4xl font-bold text-white mb-2">89%</div>
              <div className="text-emerald-100">Satisfaction Rate</div>
            </div>
            <div className="text-center">
              <div className="text-4xl font-bold text-white mb-2">45 lbs</div>
              <div className="text-emerald-100">Waste Diverted</div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <Heart className="h-16 w-16 text-emerald-600 mx-auto mb-6" />
          <h2 className="text-3xl font-bold text-gray-900 mb-4">
            Ready to Join the Sustainable Fashion Movement?
          </h2>
          <p className="text-xl text-gray-600 mb-8">
            Start your journey with ReWear today and help build a more sustainable future, one swap at a time.
          </p>
          <button
            onClick={() => user ? setCurrentPage('add-item') : setCurrentPage('auth')}
            className="bg-emerald-600 text-white px-8 py-3 rounded-lg font-semibold hover:bg-emerald-700 transition-colors inline-flex items-center space-x-2"
          >
            <span>{user ? 'List Your First Item' : 'Join ReWear Today'}</span>
            <ArrowRight className="h-5 w-5" />
          </button>
        </div>
      </section>
    </div>
  );
};

export default LandingPage;