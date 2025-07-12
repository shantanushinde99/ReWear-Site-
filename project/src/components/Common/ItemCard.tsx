import React from 'react';
import { Heart, MapPin, Star } from 'lucide-react';
import { ClothingItem } from '../../types';

interface ItemCardProps {
  item: ClothingItem;
  onClick: () => void;
  showUploader?: boolean;
}

const ItemCard: React.FC<ItemCardProps> = ({ item, onClick, showUploader = true }) => {
  const getConditionColor = (condition: string) => {
    switch (condition) {
      case 'new': return 'bg-green-100 text-green-800';
      case 'like-new': return 'bg-blue-100 text-blue-800';
      case 'gently-used': return 'bg-yellow-100 text-yellow-800';
      case 'well-worn': return 'bg-orange-100 text-orange-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getStatusBadge = () => {
    switch (item.status) {
      case 'available':
        return <span className="bg-green-100 text-green-800 text-xs px-2 py-1 rounded-full">Available</span>;
      case 'in-swap':
        return <span className="bg-yellow-100 text-yellow-800 text-xs px-2 py-1 rounded-full">In Swap</span>;
      case 'redeemed':
        return <span className="bg-gray-100 text-gray-800 text-xs px-2 py-1 rounded-full">Redeemed</span>;
      case 'pending-approval':
        return <span className="bg-orange-100 text-orange-800 text-xs px-2 py-1 rounded-full">Pending</span>;
      default:
        return null;
    }
  };

  return (
    <div 
      onClick={onClick}
      className="bg-white rounded-lg shadow-md hover:shadow-lg transition-all duration-300 cursor-pointer group overflow-hidden"
    >
      <div className="relative overflow-hidden">
        <img
          src={item.images[0]}
          alt={item.title}
          className="w-full h-48 object-cover group-hover:scale-105 transition-transform duration-300"
        />
        {item.featured && (
          <div className="absolute top-2 left-2">
            <Star className="h-5 w-5 text-yellow-500 fill-current" />
          </div>
        )}
        <div className="absolute top-2 right-2">
          {getStatusBadge()}
        </div>
        <div className="absolute bottom-2 right-2 bg-emerald-600 text-white px-2 py-1 rounded-full text-sm font-medium">
          {item.pointsValue} pts
        </div>
      </div>

      <div className="p-4">
        <h3 className="font-semibold text-gray-900 mb-2 group-hover:text-emerald-600 transition-colors">
          {item.title}
        </h3>
        
        <p className="text-gray-600 text-sm mb-3 line-clamp-2">
          {item.description}
        </p>

        <div className="flex items-center justify-between mb-3">
          <div className="flex items-center space-x-2">
            <span className={`px-2 py-1 rounded-full text-xs font-medium ${getConditionColor(item.condition)}`}>
              {item.condition.replace('-', ' ')}
            </span>
            <span className="text-gray-500 text-sm">Size {item.size}</span>
          </div>
        </div>

        {showUploader && (
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-2">
              <div className="w-6 h-6 bg-emerald-100 rounded-full flex items-center justify-center">
                <span className="text-xs font-medium text-emerald-600">
                  {item.uploaderName.split(' ').map(n => n[0]).join('')}
                </span>
              </div>
              <span className="text-sm text-gray-600">{item.uploaderName}</span>
            </div>
            <button className="text-gray-400 hover:text-emerald-600 transition-colors">
              <Heart className="h-4 w-4" />
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default ItemCard;