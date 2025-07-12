import React from 'react';
import { Heart, MapPin, Clock, Star, Eye, MessageCircle } from 'lucide-react';
import { ClothingItem } from '../../types';
import { useTheme } from '../../contexts/ThemeContext';

interface ItemCardProps {
  item: ClothingItem;
  onClick: () => void;
  showUploader?: boolean;
  layout?: 'grid' | 'list';
}

const ItemCard: React.FC<ItemCardProps> = ({ 
  item, 
  onClick, 
  showUploader = true, 
  layout = 'grid' 
}) => {
  const { isDarkMode } = useTheme();

  const getConditionColor = (condition: string) => {
    switch (condition) {
      case 'new': return 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200';
      case 'like-new': return 'bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200';
      case 'gently-used': return 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-200';
      case 'well-worn': return 'bg-orange-100 text-orange-800 dark:bg-orange-900 dark:text-orange-200';
      default: return 'bg-gray-100 text-gray-800 dark:bg-gray-700 dark:text-gray-200';
    }
  };

  const getStatusBadge = () => {
    switch (item.status) {
      case 'available':
        return <span className="bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200 text-xs px-2 py-1 rounded-full">Available</span>;
      case 'in-swap':
        return <span className="bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-200 text-xs px-2 py-1 rounded-full">In Swap</span>;
      case 'redeemed':
        return <span className="bg-gray-100 text-gray-800 dark:bg-gray-700 dark:text-gray-200 text-xs px-2 py-1 rounded-full">Redeemed</span>;
      case 'pending-approval':
        return <span className="bg-orange-100 text-orange-800 dark:bg-orange-900 dark:text-orange-200 text-xs px-2 py-1 rounded-full">Pending</span>;
      default:
        return null;
    }
  };

  if (layout === 'list') {
    return (
      <div 
        onClick={onClick}
        className="bg-white dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700 hover:shadow-lg dark:hover:shadow-gray-900/20 transition-all duration-300 cursor-pointer p-4"
      >
        <div className="flex space-x-4">
          <div className="relative flex-shrink-0">
            <img
              src={item.images[0]}
              alt={item.title}
              className="w-32 h-32 object-cover rounded-lg"
            />
            {item.featured && (
              <div className="absolute top-2 left-2">
                <Star className="h-4 w-4 text-yellow-500 fill-current" />
              </div>
            )}
            <div className="absolute top-2 right-2">
              {getStatusBadge()}
            </div>
          </div>

          <div className="flex-1 min-w-0">
            <div className="flex items-start justify-between">
              <div className="flex-1">
                <h3 className="font-semibold text-lg text-gray-900 dark:text-white mb-2 truncate">
                  {item.title}
                </h3>
                
                <p className="text-gray-600 dark:text-gray-400 text-sm mb-3 line-clamp-2">
                  {item.description}
                </p>

                <div className="flex items-center space-x-4 mb-3">
                  <span className={`px-2 py-1 rounded-full text-xs font-medium ${getConditionColor(item.condition)}`}>
                    {item.condition.replace('-', ' ')}
                  </span>
                  <span className="text-gray-500 dark:text-gray-400 text-sm">Size {item.size}</span>
                  <span className="text-gray-500 dark:text-gray-400 text-sm capitalize">{item.type}</span>
                </div>

                {showUploader && (
                  <div className="flex items-center space-x-2 mb-2">
                    <div className="w-6 h-6 bg-emerald-100 dark:bg-emerald-900 rounded-full flex items-center justify-center">
                      <span className="text-xs font-medium text-emerald-600 dark:text-emerald-400">
                        {item.uploaderName.split(' ').map(n => n[0]).join('')}
                      </span>
                    </div>
                    <span className="text-sm text-gray-600 dark:text-gray-400">{item.uploaderName}</span>
                  </div>
                )}

                <div className="flex items-center space-x-4 text-xs text-gray-500 dark:text-gray-400">
                  <div className="flex items-center space-x-1">
                    <MapPin className="h-3 w-3" />
                    <span>Mumbai</span>
                  </div>
                  <div className="flex items-center space-x-1">
                    <Clock className="h-3 w-3" />
                    <span>2 days ago</span>
                  </div>
                  <div className="flex items-center space-x-1">
                    <Eye className="h-3 w-3" />
                    <span>124 views</span>
                  </div>
                </div>
              </div>

              <div className="flex flex-col items-end space-y-2">
                <div className="text-right">
                  <div className="text-2xl font-bold text-emerald-600 dark:text-emerald-400">
                    {item.pointsValue} pts
                  </div>
                </div>
                
                <div className="flex items-center space-x-2">
                  <button className="p-2 text-gray-400 hover:text-blue-500 dark:hover:text-blue-400 transition-colors">
                    <MessageCircle className="h-4 w-4" />
                  </button>
                  <button className="p-2 text-gray-400 hover:text-red-500 dark:hover:text-red-400 transition-colors">
                    <Heart className="h-5 w-5" />
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div 
      onClick={onClick}
      className="bg-white dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700 hover:shadow-lg dark:hover:shadow-gray-900/20 transition-all duration-300 cursor-pointer group overflow-hidden"
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
        <div className="absolute bottom-2 right-2 bg-emerald-600 dark:bg-emerald-500 text-white px-2 py-1 rounded-full text-sm font-medium">
          {item.pointsValue} pts
        </div>
        <div className="absolute top-2 left-2 opacity-0 group-hover:opacity-100 transition-opacity flex space-x-2">
          <button className="p-1.5 bg-white dark:bg-gray-800 rounded-full shadow-md hover:bg-gray-50 dark:hover:bg-gray-700">
            <MessageCircle className="h-4 w-4 text-blue-600 dark:text-blue-400" />
          </button>
          <button className="p-1.5 bg-white dark:bg-gray-800 rounded-full shadow-md hover:bg-gray-50 dark:hover:bg-gray-700">
            <Heart className="h-4 w-4 text-gray-600 dark:text-gray-400 hover:text-red-500 dark:hover:text-red-400" />
          </button>
        </div>
      </div>

      <div className="p-4">
        <h3 className="font-semibold text-gray-900 dark:text-white mb-2 group-hover:text-emerald-600 dark:group-hover:text-emerald-400 transition-colors line-clamp-1">
          {item.title}
        </h3>
        
        <p className="text-gray-600 dark:text-gray-400 text-sm mb-3 line-clamp-2">
          {item.description}
        </p>

        <div className="flex items-center justify-between mb-3">
          <div className="flex items-center space-x-2">
            <span className={`px-2 py-1 rounded-full text-xs font-medium ${getConditionColor(item.condition)}`}>
              {item.condition.replace('-', ' ')}
            </span>
            <span className="text-gray-500 dark:text-gray-400 text-sm">Size {item.size}</span>
          </div>
        </div>

        <div className="flex items-center space-x-3 text-xs text-gray-500 dark:text-gray-400 mb-3">
          <div className="flex items-center space-x-1">
            <MapPin className="h-3 w-3" />
            <span>Mumbai</span>
          </div>
          <div className="flex items-center space-x-1">
            <Clock className="h-3 w-3" />
            <span>2 days ago</span>
          </div>
        </div>

        {showUploader && (
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-2">
              <div className="w-6 h-6 bg-emerald-100 dark:bg-emerald-900 rounded-full flex items-center justify-center">
                <span className="text-xs font-medium text-emerald-600 dark:text-emerald-400">
                  {item.uploaderName.split(' ').map(n => n[0]).join('')}
                </span>
              </div>
              <span className="text-sm text-gray-600 dark:text-gray-400">{item.uploaderName}</span>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default ItemCard;