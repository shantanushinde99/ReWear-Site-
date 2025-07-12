import React from 'react';

interface OrderRowProps {
  id: string;
  items: string[];
  date: string;
  amount: string;
  isHighlighted?: boolean;
}

const OrderRow: React.FC<OrderRowProps> = ({ id, items, date, amount, isHighlighted = false }) => {
  return (
    <tr className={`${isHighlighted ? 'bg-gray-900 text-white' : 'bg-white hover:bg-gray-50'} transition-colors`}>
      <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
        {id}
      </td>
      <td className="px-6 py-4 whitespace-nowrap">
        <div className="flex space-x-1">
          {items.map((item, index) => (
            <span key={index} className="text-lg">
              {item}
            </span>
          ))}
        </div>
      </td>
      <td className="px-6 py-4 whitespace-nowrap text-sm">
        {date}
      </td>
      <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
        {amount}
      </td>
    </tr>
  );
};

export default OrderRow;