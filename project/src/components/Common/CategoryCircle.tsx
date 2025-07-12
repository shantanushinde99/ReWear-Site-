import React from 'react';

interface CategoryCircleProps {
  image: string;
  label: string;
  onClick: () => void;
}

const CategoryCircle: React.FC<CategoryCircleProps> = ({ image, label, onClick }) => {
  return (
    <button
      onClick={onClick}
      className="flex flex-col items-center space-y-2 group"
    >
      <div className="w-16 h-16 rounded-full overflow-hidden border-2 border-gray-200 group-hover:border-blue-400 transition-colors">
        <img
          src={image}
          alt={label}
          className="w-full h-full object-cover"
        />
      </div>
      <span className="text-sm font-medium text-gray-700 group-hover:text-blue-600 transition-colors">
        {label}
      </span>
    </button>
  );
};

export default CategoryCircle;