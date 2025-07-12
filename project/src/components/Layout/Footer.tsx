import React from 'react';
import { Heart, Recycle, Users } from 'lucide-react';

const Footer: React.FC = () => {
  return (
    <footer className="bg-gray-900 text-gray-300">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div className="col-span-1 md:col-span-2">
            <div className="flex items-center space-x-2 mb-4">
              <Recycle className="h-8 w-8 text-emerald-500" />
              <span className="text-xl font-bold text-white">ReWear</span>
            </div>
            <p className="text-gray-400 mb-4">
              Building a sustainable future through community-driven clothing exchange. 
              Reduce waste, share style, and connect with eco-conscious fashion lovers.
            </p>
            <div className="flex items-center space-x-6">
              <div className="flex items-center space-x-2">
                <Users className="h-5 w-5 text-emerald-500" />
                <span className="text-sm">Community Driven</span>
              </div>
              <div className="flex items-center space-x-2">
                <Heart className="h-5 w-5 text-emerald-500" />
                <span className="text-sm">Eco Friendly</span>
              </div>
            </div>
          </div>

          <div>
            <h3 className="text-white font-semibold mb-4">Platform</h3>
            <ul className="space-y-2">
              <li><a href="#" className="hover:text-emerald-400 transition-colors">How It Works</a></li>
              <li><a href="#" className="hover:text-emerald-400 transition-colors">Browse Items</a></li>
              <li><a href="#" className="hover:text-emerald-400 transition-colors">List Items</a></li>
              <li><a href="#" className="hover:text-emerald-400 transition-colors">Points System</a></li>
            </ul>
          </div>

          <div>
            <h3 className="text-white font-semibold mb-4">Support</h3>
            <ul className="space-y-2">
              <li><a href="#" className="hover:text-emerald-400 transition-colors">Help Center</a></li>
              <li><a href="#" className="hover:text-emerald-400 transition-colors">Community Guidelines</a></li>
              <li><a href="#" className="hover:text-emerald-400 transition-colors">Contact Us</a></li>
              <li><a href="#" className="hover:text-emerald-400 transition-colors">Safety Tips</a></li>
            </ul>
          </div>
        </div>

        <div className="border-t border-gray-800 mt-8 pt-8 text-center">
          <p className="text-gray-400">
            © 2024 ReWear. All rights reserved. Made with{' '}
            <Heart className="h-4 w-4 inline text-emerald-500" /> for a sustainable future.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;