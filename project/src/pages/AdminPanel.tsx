import React, { useState } from 'react';
import { Shield, Eye, Check, X, AlertTriangle, Users, Package, Activity } from 'lucide-react';
import { useAuth } from '../contexts/AuthContext';
import { mockItems, mockUsers, mockSwapRequests } from '../data/mockData';
import ItemCard from '../components/Common/ItemCard';

interface AdminPanelProps {
  setCurrentPage: (page: string) => void;
  setSelectedItem: (item: any) => void;
}

const AdminPanel: React.FC<AdminPanelProps> = ({ setCurrentPage, setSelectedItem }) => {
  const { user } = useAuth();
  const [activeTab, setActiveTab] = useState('pending');

  if (!user || user.email !== 'admin@rewear.com') {
    setCurrentPage('landing');
    return null;
  }

  const pendingItems = mockItems.filter(item => item.status === 'pending-approval');
  const allUsers = mockUsers.filter(u => u.email !== 'admin@rewear.com');
  const recentSwaps = mockSwapRequests.slice(0, 10);

  const handleApproveItem = (itemId: string) => {
    // In a real app, this would update the database
    alert(`Item ${itemId} approved and published to marketplace`);
  };

  const handleRejectItem = (itemId: string) => {
    // In a real app, this would update the database
    alert(`Item ${itemId} rejected. User will be notified.`);
  };

  const handleItemClick = (item: any) => {
    setSelectedItem(item);
    setCurrentPage('item-detail');
  };

  const tabs = [
    { id: 'pending', label: 'Pending Items', count: pendingItems.length },
    { id: 'users', label: 'Users', count: allUsers.length },
    { id: 'activity', label: 'Recent Activity', count: recentSwaps.length }
  ];

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="mb-8">
          <div className="flex items-center space-x-3 mb-4">
            <Shield className="h-8 w-8 text-emerald-600" />
            <h1 className="text-3xl font-bold text-gray-900">Admin Panel</h1>
          </div>
          <p className="text-gray-600">Manage items, users, and platform activity</p>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          <div className="bg-white rounded-lg shadow-sm p-6">
            <div className="flex items-center">
              <Package className="h-8 w-8 text-blue-600" />
              <div className="ml-4">
                <p className="text-2xl font-bold text-gray-900">{pendingItems.length}</p>
                <p className="text-gray-600">Pending Items</p>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-lg shadow-sm p-6">
            <div className="flex items-center">
              <Users className="h-8 w-8 text-green-600" />
              <div className="ml-4">
                <p className="text-2xl font-bold text-gray-900">{allUsers.length}</p>
                <p className="text-gray-600">Active Users</p>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-lg shadow-sm p-6">
            <div className="flex items-center">
              <Activity className="h-8 w-8 text-yellow-600" />
              <div className="ml-4">
                <p className="text-2xl font-bold text-gray-900">{mockItems.filter(i => i.status === 'available').length}</p>
                <p className="text-gray-600">Live Items</p>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-lg shadow-sm p-6">
            <div className="flex items-center">
              <AlertTriangle className="h-8 w-8 text-red-600" />
              <div className="ml-4">
                <p className="text-2xl font-bold text-gray-900">0</p>
                <p className="text-gray-600">Reports</p>
              </div>
            </div>
          </div>
        </div>

        {/* Tabs */}
        <div className="bg-white rounded-lg shadow-sm">
          <div className="border-b border-gray-200">
            <nav className="flex space-x-8 px-6">
              {tabs.map((tab) => (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`py-4 px-1 border-b-2 font-medium text-sm ${
                    activeTab === tab.id
                      ? 'border-emerald-500 text-emerald-600'
                      : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                  }`}
                >
                  {tab.label}
                  {tab.count > 0 && (
                    <span className="ml-2 bg-gray-100 text-gray-600 py-0.5 px-2 rounded-full text-xs">
                      {tab.count}
                    </span>
                  )}
                </button>
              ))}
            </nav>
          </div>

          <div className="p-6">
            {/* Pending Items Tab */}
            {activeTab === 'pending' && (
              <div>
                <h2 className="text-xl font-semibold text-gray-900 mb-6">Items Pending Approval</h2>
                
                {pendingItems.length > 0 ? (
                  <div className="space-y-6">
                    {pendingItems.map((item) => (
                      <div key={item.id} className="border border-gray-200 rounded-lg p-4">
                        <div className="grid grid-cols-1 lg:grid-cols-4 gap-4">
                          <div className="lg:col-span-3">
                            <ItemCard
                              item={item}
                              onClick={() => handleItemClick(item)}
                              showUploader={true}
                            />
                          </div>
                          
                          <div className="flex flex-col space-y-3">
                            <button
                              onClick={() => handleItemClick(item)}
                              className="flex items-center justify-center space-x-2 px-4 py-2 border border-gray-300 rounded-md hover:bg-gray-50 transition-colors"
                            >
                              <Eye className="h-4 w-4" />
                              <span>Review</span>
                            </button>
                            
                            <button
                              onClick={() => handleApproveItem(item.id)}
                              className="flex items-center justify-center space-x-2 px-4 py-2 bg-green-600 text-white rounded-md hover:bg-green-700 transition-colors"
                            >
                              <Check className="h-4 w-4" />
                              <span>Approve</span>
                            </button>
                            
                            <button
                              onClick={() => handleRejectItem(item.id)}
                              className="flex items-center justify-center space-x-2 px-4 py-2 bg-red-600 text-white rounded-md hover:bg-red-700 transition-colors"
                            >
                              <X className="h-4 w-4" />
                              <span>Reject</span>
                            </button>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                ) : (
                  <div className="text-center py-12">
                    <Package className="h-12 w-12 text-gray-400 mx-auto mb-4" />
                    <h3 className="text-lg font-medium text-gray-900 mb-2">No pending items</h3>
                    <p className="text-gray-600">All submissions have been reviewed</p>
                  </div>
                )}
              </div>
            )}

            {/* Users Tab */}
            {activeTab === 'users' && (
              <div>
                <h2 className="text-xl font-semibold text-gray-900 mb-6">User Management</h2>
                
                <div className="overflow-x-auto">
                  <table className="min-w-full divide-y divide-gray-200">
                    <thead className="bg-gray-50">
                      <tr>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                          User
                        </th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                          Location
                        </th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                          Points
                        </th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                          Join Date
                        </th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                          Items Listed
                        </th>
                      </tr>
                    </thead>
                    <tbody className="bg-white divide-y divide-gray-200">
                      {allUsers.map((user) => {
                        const userItemCount = mockItems.filter(item => item.uploaderId === user.id).length;
                        
                        return (
                          <tr key={user.id} className="hover:bg-gray-50">
                            <td className="px-6 py-4 whitespace-nowrap">
                              <div className="flex items-center">
                                <div className="w-10 h-10 bg-emerald-100 rounded-full flex items-center justify-center">
                                  <span className="text-sm font-medium text-emerald-600">
                                    {user.name.split(' ').map(n => n[0]).join('')}
                                  </span>
                                </div>
                                <div className="ml-4">
                                  <div className="text-sm font-medium text-gray-900">{user.name}</div>
                                  <div className="text-sm text-gray-500">{user.email}</div>
                                </div>
                              </div>
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                              {user.location}
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                              {user.points}
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                              {new Date(user.joinDate).toLocaleDateString()}
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                              {userItemCount}
                            </td>
                          </tr>
                        );
                      })}
                    </tbody>
                  </table>
                </div>
              </div>
            )}

            {/* Activity Tab */}
            {activeTab === 'activity' && (
              <div>
                <h2 className="text-xl font-semibold text-gray-900 mb-6">Recent Activity</h2>
                
                <div className="space-y-4">
                  {recentSwaps.map((swap) => {
                    const item = mockItems.find(i => i.id === swap.itemId);
                    const requester = mockUsers.find(u => u.id === swap.requesterId);
                    const owner = mockUsers.find(u => u.id === swap.ownerId);
                    
                    return (
                      <div key={swap.id} className="border border-gray-200 rounded-lg p-4">
                        <div className="flex items-center justify-between">
                          <div className="flex items-center space-x-4">
                            <div className={`w-3 h-3 rounded-full ${
                              swap.status === 'pending' ? 'bg-yellow-400' :
                              swap.status === 'approved' ? 'bg-green-400' :
                              swap.status === 'rejected' ? 'bg-red-400' : 'bg-gray-400'
                            }`} />
                            <div>
                              <p className="font-medium text-gray-900">
                                Swap Request: {item?.title}
                              </p>
                              <p className="text-sm text-gray-600">
                                {requester?.name} → {owner?.name}
                              </p>
                              <p className="text-xs text-gray-500">
                                {new Date(swap.createdAt).toLocaleDateString()} • {swap.type}
                              </p>
                            </div>
                          </div>
                          <span className={`px-3 py-1 rounded-full text-xs font-medium ${
                            swap.status === 'pending' ? 'bg-yellow-100 text-yellow-800' :
                            swap.status === 'approved' ? 'bg-green-100 text-green-800' :
                            swap.status === 'rejected' ? 'bg-red-100 text-red-800' : 'bg-gray-100 text-gray-800'
                          }`}>
                            {swap.status}
                          </span>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminPanel;