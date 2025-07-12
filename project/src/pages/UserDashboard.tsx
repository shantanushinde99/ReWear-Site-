import React from 'react';
import { User, Package, ArrowRightLeft, History, MapPin, Calendar, Heart } from 'lucide-react';
import { useAuth } from '../contexts/AuthContext';
import { useUserItems } from '../hooks/useItems';
import { useSwapRequests } from '../hooks/useSwaps';
import ItemCard from '../components/Common/ItemCard';
import LoadingSpinner from '../components/Common/LoadingSpinner';

interface UserDashboardProps {
  setCurrentPage: (page: string) => void;
  setSelectedItem: (item: any) => void;
}

const UserDashboard: React.FC<UserDashboardProps> = ({ setCurrentPage, setSelectedItem }) => {
  const { user } = useAuth();

  if (!user) {
    setCurrentPage('auth');
    return null;
  }

  // Use hooks for data fetching
  const { items: userItems, loading: itemsLoading, error: itemsError } = useUserItems(user.id);
  const { swaps: userSwaps, loading: swapsLoading, error: swapsError } = useSwapRequests(user.id);

  const pendingSwaps = userSwaps.filter(swap => swap.status === 'pending');
  const completedSwaps = userSwaps.filter(swap => swap.status === 'completed');

  const handleItemClick = (item: any) => {
    setSelectedItem(item);
    setCurrentPage('item-detail');
  };

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="bg-white rounded-lg shadow-sm p-6 mb-8">
          <div className="flex items-center space-x-4">
            <div className="w-20 h-20 bg-gradient-to-br from-emerald-400 to-emerald-600 rounded-full flex items-center justify-center">
              {user.avatar ? (
                <img src={user.avatar} alt={user.name} className="w-20 h-20 rounded-full object-cover" />
              ) : (
                <span className="text-2xl font-bold text-white">
                  {user.name.split(' ').map(n => n[0]).join('')}
                </span>
              )}
            </div>
            <div className="flex-1">
              <h1 className="text-3xl font-bold text-gray-900">{user.name}</h1>
              <div className="flex items-center space-x-4 mt-2 text-gray-600">
                <div className="flex items-center space-x-1">
                  <MapPin className="h-4 w-4" />
                  <span>{user.location}</span>
                </div>
                <div className="flex items-center space-x-1">
                  <Calendar className="h-4 w-4" />
                  <span>Joined {new Date(user.joinDate).toLocaleDateString()}</span>
                </div>
              </div>
            </div>
            <div className="text-right">
              <div className="flex items-center space-x-2 bg-emerald-50 px-4 py-2 rounded-lg">
                <Heart className="h-5 w-5 text-emerald-600" />
                <span className="text-2xl font-bold text-emerald-600">{user.points}</span>
                <span className="text-emerald-600">points</span>
              </div>
              <p className="text-sm text-gray-500 mt-1">Available for redemption</p>
            </div>
          </div>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          <div className="bg-white rounded-lg shadow-sm p-6">
            <div className="flex items-center">
              <Package className="h-8 w-8 text-blue-600" />
              <div className="ml-4">
                <p className="text-2xl font-bold text-gray-900">{userItems.length}</p>
                <p className="text-gray-600">Items Listed</p>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-lg shadow-sm p-6">
            <div className="flex items-center">
              <ArrowRightLeft className="h-8 w-8 text-yellow-600" />
              <div className="ml-4">
                <p className="text-2xl font-bold text-gray-900">{pendingSwaps.length}</p>
                <p className="text-gray-600">Pending Swaps</p>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-lg shadow-sm p-6">
            <div className="flex items-center">
              <History className="h-8 w-8 text-green-600" />
              <div className="ml-4">
                <p className="text-2xl font-bold text-gray-900">{completedSwaps.length}</p>
                <p className="text-gray-600">Completed</p>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-lg shadow-sm p-6">
            <div className="flex items-center">
              <Heart className="h-8 w-8 text-emerald-600" />
              <div className="ml-4">
                <p className="text-2xl font-bold text-gray-900">{user.points}</p>
                <p className="text-gray-600">Points Balance</p>
              </div>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* My Items */}
          <div className="bg-white rounded-lg shadow-sm p-6">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-xl font-bold text-gray-900">My Items</h2>
              <button
                onClick={() => setCurrentPage('add-item')}
                className="bg-emerald-600 text-white px-4 py-2 rounded-md text-sm hover:bg-emerald-700 transition-colors"
              >
                Add Item
              </button>
            </div>

            {itemsLoading ? (
              <div className="flex justify-center py-8">
                <LoadingSpinner />
              </div>
            ) : itemsError ? (
              <p className="text-red-600 text-center py-8">{itemsError}</p>
            ) : userItems.length > 0 ? (
              <div className="space-y-4">
                {userItems.slice(0, 3).map((item) => (
                  <div key={item.id} className="flex items-center space-x-4 p-3 border border-gray-200 rounded-lg hover:bg-gray-50 cursor-pointer" onClick={() => handleItemClick(item)}>
                    <img src={item.images[0]} alt={item.title} className="w-16 h-16 object-cover rounded-md" />
                    <div className="flex-1">
                      <h3 className="font-medium text-gray-900">{item.title}</h3>
                      <p className="text-sm text-gray-600">Status: {item.status}</p>
                    </div>
                    <div className="text-right">
                      <p className="font-medium text-emerald-600">{item.pointsValue} pts</p>
                    </div>
                  </div>
                ))}
                {userItems.length > 3 && (
                  <button className="w-full text-center text-emerald-600 hover:text-emerald-700 font-medium py-2">
                    View all {userItems.length} items
                  </button>
                )}
              </div>
            ) : (
              <div className="text-center py-8">
                <Package className="h-12 w-12 text-gray-400 mx-auto mb-4" />
                <p className="text-gray-600">No items listed yet</p>
                <button
                  onClick={() => setCurrentPage('add-item')}
                  className="mt-2 text-emerald-600 hover:text-emerald-700 font-medium"
                >
                  List your first item
                </button>
              </div>
            )}
          </div>

          {/* Recent Activity */}
          <div className="bg-white rounded-lg shadow-sm p-6">
            <h2 className="text-xl font-bold text-gray-900 mb-6">Recent Activity</h2>

            {userSwaps.length > 0 ? (
              <div className="space-y-4">
                {userSwaps.slice(0, 4).map((swap) => {
                  const item = mockItems.find(i => i.id === swap.itemId);
                  const isRequester = swap.requesterId === user.id;
                  
                  return (
                    <div key={swap.id} className="flex items-center space-x-4 p-3 border border-gray-200 rounded-lg">
                      <div className={`w-3 h-3 rounded-full ${
                        swap.status === 'pending' ? 'bg-yellow-400' :
                        swap.status === 'approved' ? 'bg-green-400' :
                        swap.status === 'rejected' ? 'bg-red-400' : 'bg-gray-400'
                      }`} />
                      <div className="flex-1">
                        <p className="font-medium text-gray-900">
                          {isRequester ? 'Swap request sent' : 'Swap request received'}
                        </p>
                        <p className="text-sm text-gray-600">{item?.title}</p>
                        <p className="text-xs text-gray-500">{new Date(swap.createdAt).toLocaleDateString()}</p>
                      </div>
                      <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                        swap.status === 'pending' ? 'bg-yellow-100 text-yellow-800' :
                        swap.status === 'approved' ? 'bg-green-100 text-green-800' :
                        swap.status === 'rejected' ? 'bg-red-100 text-red-800' : 'bg-gray-100 text-gray-800'
                      }`}>
                        {swap.status}
                      </span>
                    </div>
                  );
                })}
              </div>
            ) : (
              <div className="text-center py-8">
                <ArrowRightLeft className="h-12 w-12 text-gray-400 mx-auto mb-4" />
                <p className="text-gray-600">No swap activity yet</p>
                <button
                  onClick={() => setCurrentPage('browse')}
                  className="mt-2 text-emerald-600 hover:text-emerald-700 font-medium"
                >
                  Browse items to start swapping
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default UserDashboard;