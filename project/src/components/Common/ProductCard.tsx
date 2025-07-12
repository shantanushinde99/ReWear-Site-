import React from 'react';

interface ProductCardProps {
  image: string;
  title: string;
  price: string;
  originalPrice?: string;
}

const ProductCard: React.FC<ProductCardProps> = ({ image, title, price, originalPrice }) => {
  return (
    <div className="bg-white rounded-xl overflow-hidden group cursor-pointer">
      <div className="aspect-w-3 aspect-h-4 bg-gray-100 overflow-hidden">
        <img
          src={image}
          alt={title}
          className="w-full h-64 object-cover group-hover:scale-105 transition-transform duration-300"
        />
      </div>
      <div className="p-4">
        <h3 className="font-medium text-gray-900 mb-2">{title}</h3>
        <div className="flex items-center space-x-2">
          <span className="text-lg font-bold text-red-500">{price}</span>
          {originalPrice && (
            <span className="text-sm text-gray-400 line-through">{originalPrice}</span>
          )}
        </div>
      </div>
    </div>
  );
};

export default ProductCard;