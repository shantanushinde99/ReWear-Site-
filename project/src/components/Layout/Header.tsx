import React from 'react';
import { User, ShoppingBag, Heart, LogOut } from 'lucide-react';
import { useAuth } from '../../contexts/AuthContext';

interface HeaderProps {
  currentPage: string;
  setCurrentPage: (page: string) => void;
}

const Header: React.FC<HeaderProps> = ({ currentPage, setCurrentPage }) => {
  const { user, logout } = useAuth();

  return (
    <header className="bg-white shadow-sm border-b border-gray-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          <div className="flex items-center">
            <button
              onClick={() => setCurrentPage('landing')}
              className="flex items-center space-x-2 text-emerald-600 hover:text-emerald-700 transition-colors"
            >
              <ShoppingBag className="h-8 w-8" />
              <span className="text-xl font-bold">ReWear</span>
            </button>
          </div>

          <nav className="hidden md:flex items-center space-x-8">
            <button
              onClick={() => setCurrentPage('browse')}
              className={`text-sm font-medium transition-colors ${
                currentPage === 'browse'
                  ? 'text-emerald-600'
                  : 'text-gray-700 hover:text-emerald-600'
              }`}
            >
              Browse Items
            </button>
            <button
              onClick={() => setCurrentPage('add-item')}
              className={`text-sm font-medium transition-colors ${
                currentPage === 'add-item'
                  ? 'text-emerald-600'
                  : 'text-gray-700 hover:text-emerald-600'
              }`}
            >
              List an Item
            </button>
            {user?.email === 'admin@rewear.com' && (
              <button
                onClick={() => setCurrentPage('admin')}
                className={`text-sm font-medium transition-colors ${
                  currentPage === 'admin'
                    ? 'text-emerald-600'
                    : 'text-gray-700 hover:text-emerald-600'
                }`}
              >
                Admin Panel
              </button>
            )}
          </nav>

          <div className="flex items-center space-x-4">
            {user ? (
              <>
                <div className="flex items-center space-x-2">
                  <Heart className="h-5 w-5 text-emerald-600" />
                  <span className="text-sm font-medium text-gray-900">{user.points} pts</span>
                </div>
                <button
                  onClick={() => setCurrentPage('dashboard')}
                  className={`flex items-center space-x-2 px-3 py-2 rounded-md text-sm font-medium transition-colors ${
                    currentPage === 'dashboard'
                      ? 'bg-emerald-100 text-emerald-700'
                      : 'text-gray-700 hover:bg-gray-100'
                  }`}
                >
                  <User className="h-4 w-4" />
                  <span className="hidden sm:inline">{user.name}</span>
                </button>
                <button
                  onClick={logout}
                  className="flex items-center space-x-1 px-3 py-2 rounded-md text-sm font-medium text-gray-700 hover:bg-gray-100 transition-colors"
                >
                  <LogOut className="h-4 w-4" />
                  <span className="hidden sm:inline">Logout</span>
                </button>
              </>
            ) : (
              <button
                onClick={() => setCurrentPage('auth')}
                className="bg-emerald-600 text-white px-4 py-2 rounded-md text-sm font-medium hover:bg-emerald-700 transition-colors"
              >
                Sign In
              </button>
            )}
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;