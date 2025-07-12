import React, { useState } from 'react';
import { ArrowLeft, Heart, Share2, MapPin, Calendar, Star, ArrowRightLeft, ShoppingBag } from 'lucide-react';
import { useAuth } from '../contexts/AuthContext';

interface ItemDetailPageProps {
  item: any;
  setCurrentPage: (page: string) => void;
}

const ItemDetailPage: React.FC<ItemDetailPageProps> = ({ item, setCurrentPage }) => {
  const { user } = useAuth();
  const [selectedImage, setSelectedImage] = useState(0);
  const [showFullDescription, setShowFullDescription] = useState(false);

  if (!item) {
    setCurrentPage('browse');
    return null;
  }

  const isOwner = user?.id === item.uploaderId;
  const canRequest = user && !isOwner && item.status === 'available';
  const hasEnoughPoints = user && user.points >= item.pointsValue;

  const handleSwapRequest = () => {
    if (!user) {
      setCurrentPage('auth');
      return;
    }
    // In a real app, this would send a swap request
    alert('Swap request sent! The owner will be notified.');
  };

  const handlePointsRedemption = () => {
    if (!user) {
      setCurrentPage('auth');
      return;
    }
    if (!hasEnoughPoints) {
      alert('Not enough points for redemption.');
      return;
    }
    // In a real app, this would process the redemption
    alert('Item redeemed successfully! Points deducted from your account.');
  };

  const getConditionColor = (condition: string) => {
    switch (condition) {
      case 'new': return 'bg-green-100 text-green-800';
      case 'like-new': return 'bg-blue-100 text-blue-800';
      case 'gently-used': return 'bg-yellow-100 text-yellow-800';
      case 'well-worn': return 'bg-orange-100 text-orange-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Back Button */}
        <button
          onClick={() => setCurrentPage('browse')}
          className="flex items-center space-x-2 text-gray-600 hover:text-gray-900 mb-6 transition-colors"
        >
          <ArrowLeft className="h-5 w-5" />
          <span>Back to Browse</span>
        </button>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Image Gallery */}
          <div className="space-y-4">
            <div className="aspect-w-1 aspect-h-1 bg-gray-200 rounded-lg overflow-hidden">
              <img
                src={item.images[selectedImage]}
                alt={item.title}
                className="w-full h-96 object-cover"
              />
              {item.featured && (
                <div className="absolute top-4 left-4">
                  <Star className="h-6 w-6 text-yellow-500 fill-current" />
                </div>
              )}
            </div>
            
            {item.images.length > 1 && (
              <div className="grid grid-cols-4 gap-2">
                {item.images.map((image, index) => (
                  <button
                    key={index}
                    onClick={() => setSelectedImage(index)}
                    className={`aspect-w-1 aspect-h-1 bg-gray-200 rounded-md overflow-hidden ${
                      selectedImage === index ? 'ring-2 ring-emerald-500' : ''
                    }`}
                  >
                    <img
                      src={image}
                      alt={`${item.title} ${index + 1}`}
                      className="w-full h-20 object-cover"
                    />
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* Item Details */}
          <div className="space-y-6">
            {/* Header */}
            <div>
              <h1 className="text-3xl font-bold text-gray-900 mb-2">{item.title}</h1>
              <div className="flex items-center space-x-4 mb-4">
                <span className={`px-3 py-1 rounded-full text-sm font-medium ${getConditionColor(item.condition)}`}>
                  {item.condition.replace('-', ' ')}
                </span>
                <span className="text-gray-500">Size {item.size}</span>
                <span className="text-gray-500 capitalize">{item.type}</span>
              </div>
              <div className="flex items-center justify-between">
                <div className="bg-emerald-100 text-emerald-800 px-4 py-2 rounded-lg">
                  <span className="text-2xl font-bold">{item.pointsValue}</span>
                  <span className="text-sm ml-1">points</span>
                </div>
                <div className="flex items-center space-x-2">
                  <button className="p-2 text-gray-400 hover:text-red-500 transition-colors">
                    <Heart className="h-5 w-5" />
                  </button>
                  <button className="p-2 text-gray-400 hover:text-gray-600 transition-colors">
                    <Share2 className="h-5 w-5" />
                  </button>
                </div>
              </div>
            </div>

            {/* Uploader Info */}
            <div className="bg-white rounded-lg p-4 shadow-sm">
              <div className="flex items-center space-x-3">
                <div className="w-12 h-12 bg-emerald-100 rounded-full flex items-center justify-center">
                  <span className="text-lg font-medium text-emerald-600">
                    {item.uploaderName.split(' ').map((n: string) => n[0]).join('')}
                  </span>
                </div>
                <div>
                  <h3 className="font-medium text-gray-900">{item.uploaderName}</h3>
                  <div className="flex items-center space-x-4 text-sm text-gray-500">
                    <div className="flex items-center space-x-1">
                      <MapPin className="h-4 w-4" />
                      <span>San Francisco, CA</span>
                    </div>
                    <div className="flex items-center space-x-1">
                      <Calendar className="h-4 w-4" />
                      <span>Listed {new Date(item.createdAt).toLocaleDateString()}</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Description */}
            <div className="bg-white rounded-lg p-4 shadow-sm">
              <h3 className="font-medium text-gray-900 mb-2">Description</h3>
              <p className="text-gray-600 leading-relaxed">
                {showFullDescription || item.description.length <= 150 
                  ? item.description
                  : `${item.description.substring(0, 150)}...`
                }
              </p>
              {item.description.length > 150 && (
                <button
                  onClick={() => setShowFullDescription(!showFullDescription)}
                  className="text-emerald-600 hover:text-emerald-700 font-medium mt-2"
                >
                  {showFullDescription ? 'Show less' : 'Read more'}
                </button>
              )}
            </div>

            {/* Tags */}
            {item.tags && item.tags.length > 0 && (
              <div className="bg-white rounded-lg p-4 shadow-sm">
                <h3 className="font-medium text-gray-900 mb-2">Tags</h3>
                <div className="flex flex-wrap gap-2">
                  {item.tags.map((tag: string, index: number) => (
                    <span
                      key={index}
                      className="bg-gray-100 text-gray-700 px-3 py-1 rounded-full text-sm"
                    >
                      #{tag}
                    </span>
                  ))}
                </div>
              </div>
            )}

            {/* Action Buttons */}
            {canRequest && (
              <div className="space-y-3">
                <button
                  onClick={handleSwapRequest}
                  className="w-full bg-emerald-600 text-white py-3 px-4 rounded-lg font-medium hover:bg-emerald-700 transition-colors flex items-center justify-center space-x-2"
                >
                  <ArrowRightLeft className="h-5 w-5" />
                  <span>Request Swap</span>
                </button>
                
                <button
                  onClick={handlePointsRedemption}
                  disabled={!hasEnoughPoints}
                  className={`w-full py-3 px-4 rounded-lg font-medium transition-colors flex items-center justify-center space-x-2 ${
                    hasEnoughPoints
                      ? 'bg-blue-600 text-white hover:bg-blue-700'
                      : 'bg-gray-200 text-gray-500 cursor-not-allowed'
                  }`}
                >
                  <ShoppingBag className="h-5 w-5" />
                  <span>
                    {hasEnoughPoints 
                      ? `Redeem for ${item.pointsValue} points` 
                      : `Need ${item.pointsValue - (user?.points || 0)} more points`
                    }
                  </span>
                </button>
              </div>
            )}

            {isOwner && (
              <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
                <p className="text-blue-700 font-medium">This is your listing</p>
                <p className="text-blue-600 text-sm">You can edit or remove this item from your dashboard.</p>
              </div>
            )}

            {!user && (
              <div className="bg-gray-50 border border-gray-200 rounded-lg p-4">
                <p className="text-gray-700 font-medium mb-2">Sign in to interact with this item</p>
                <button
                  onClick={() => setCurrentPage('auth')}
                  className="bg-emerald-600 text-white px-4 py-2 rounded-md hover:bg-emerald-700 transition-colors"
                >
                  Sign In
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ItemDetailPage;