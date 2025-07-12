import React, { useState } from 'react';
import Sidebar from '../components/Layout/Sidebar';
import TopBar from '../components/Layout/TopBar';
import CategoryCircle from '../components/Common/CategoryCircle';
import ProductCard from '../components/Common/ProductCard';
import OrderRow from '../components/Common/OrderRow';
import { ArrowRight, Star } from 'lucide-react';

const MainDashboard: React.FC = () => {
  const [activeItem, setActiveItem] = useState('explore');

  const categories = [
    { image: 'https://images.pexels.com/photos/220453/pexels-photo-220453.jpeg', label: 'Men' },
    { image: 'https://images.pexels.com/photos/774909/pexels-photo-774909.jpeg', label: 'Women' },
    { image: 'https://images.pexels.com/photos/1040945/pexels-photo-1040945.jpeg', label: 'Sports' },
    { image: 'https://images.pexels.com/photos/1068205/pexels-photo-1068205.jpeg', label: 'Kids' },
    { image: 'https://images.pexels.com/photos/985635/pexels-photo-985635.jpeg', label: 'Beauty' },
  ];

  const products = [
    {
      image: 'https://images.pexels.com/photos/1040945/pexels-photo-1040945.jpeg',
      title: 'Black Print Blazer',
      price: '$10.00'
    },
    {
      image: 'https://images.pexels.com/photos/996329/pexels-photo-996329.jpeg',
      title: 'Black Print Blazer',
      price: '$10.00'
    },
    {
      image: 'https://images.pexels.com/photos/985635/pexels-photo-985635.jpeg',
      title: 'Black Print Blazer',
      price: '$10.00'
    }
  ];

  const orders = [
    { id: '#265 456', items: ['👔', '👕', '👖'], date: '06.11.2021', amount: '$350.25' },
    { id: '#265 456', items: ['👕', '🧥'], date: '06.11.2021', amount: '$350.25', highlighted: true },
    { id: '#265 456', items: ['👕', '👔'], date: '06.11.2021', amount: '$350.25' },
    { id: '#265 456', items: ['👕', '👖'], date: '06.11.2021', amount: '$350.25' },
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      <TopBar />
      
      <div className="flex">
        <Sidebar activeItem={activeItem} setActiveItem={setActiveItem} />
        
        <div className="flex-1 p-8">
          {/* Category Section */}
          <div className="mb-8">
            <h2 className="text-2xl font-bold text-gray-900 mb-6">Category</h2>
            <div className="flex items-center space-x-8">
              {categories.map((category, index) => (
                <CategoryCircle
                  key={index}
                  image={category.image}
                  label={category.label}
                  onClick={() => {}}
                />
              ))}
              <button className="w-16 h-16 border-2 border-dashed border-gray-300 rounded-full flex items-center justify-center text-gray-400 hover:border-gray-400 transition-colors">
                <span className="text-2xl">•••</span>
              </button>
            </div>
          </div>

          {/* Banner Section */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8">
            {/* Spring Break Sale Banner */}
            <div className="lg:col-span-2 bg-gradient-to-r from-pink-200 to-pink-300 rounded-2xl p-8 relative overflow-hidden">
              <div className="relative z-10">
                <h3 className="text-3xl font-bold text-gray-900 mb-2">SPRING BREAK SALE</h3>
                <h4 className="text-2xl font-bold text-gray-900 mb-4">GET UP TO 50% OFF</h4>
                <div className="flex items-center space-x-4 mb-6">
                  <span className="text-sm text-gray-600">PRICE AS MARKED</span>
                  <span className="text-sm text-gray-600">NO CODE NEEDED</span>
                </div>
                <button className="bg-black text-white px-6 py-3 rounded-lg font-medium hover:bg-gray-800 transition-colors flex items-center space-x-2">
                  <span>New Arrivals</span>
                  <ArrowRight className="w-4 h-4" />
                </button>
              </div>
              <div className="absolute right-0 top-0 h-full w-1/2">
                <img
                  src="https://images.pexels.com/photos/985635/pexels-photo-985635.jpeg"
                  alt="Model"
                  className="w-full h-full object-cover"
                />
              </div>
              <Star className="absolute top-8 right-8 w-8 h-8 text-black" />
            </div>

            {/* Season Sale Banner */}
            <div className="bg-gradient-to-br from-blue-300 to-blue-400 rounded-2xl p-8 text-white relative overflow-hidden">
              <div className="relative z-10">
                <h3 className="text-3xl font-bold mb-2">GET BIG</h3>
                <h4 className="text-3xl font-bold mb-4">SEASON</h4>
                <h4 className="text-3xl font-bold mb-6">SALE</h4>
                <div className="mb-4">
                  <span className="text-sm opacity-80">SAVE UP TO</span>
                </div>
                <div className="text-4xl font-bold">75%</div>
              </div>
              <div className="absolute inset-0 opacity-10">
                <div className="w-full h-full bg-gradient-to-br from-white to-transparent"></div>
              </div>
            </div>
          </div>

          {/* Content Grid */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {/* Top Collection */}
            <div>
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-2xl font-bold text-gray-900">Top Collection</h2>
                <button className="text-red-500 hover:text-red-600 font-medium flex items-center space-x-1">
                  <span>View All</span>
                  <ArrowRight className="w-4 h-4" />
                </button>
              </div>
              
              <div className="grid grid-cols-3 gap-4">
                {products.map((product, index) => (
                  <ProductCard
                    key={index}
                    image={product.image}
                    title={product.title}
                    price={product.price}
                  />
                ))}
              </div>
              
              <div className="mt-6">
                <button className="text-blue-600 hover:text-blue-700 font-medium underline">
                  Need Help?
                </button>
              </div>
            </div>

            {/* Recent Orders */}
            <div>
              <h2 className="text-2xl font-bold text-gray-900 mb-6">Recent Order</h2>
              
              <div className="bg-white rounded-xl overflow-hidden shadow-sm">
                <table className="min-w-full">
                  <thead className="bg-gray-50">
                    <tr>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        ID
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Items
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Date
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Amount
                      </th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-200">
                    {orders.map((order, index) => (
                      <OrderRow
                        key={index}
                        id={order.id}
                        items={order.items}
                        date={order.date}
                        amount={order.amount}
                        isHighlighted={order.highlighted}
                      />
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MainDashboard;