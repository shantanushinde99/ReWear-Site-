import React from 'react';
import { MessageCircle, Package } from 'lucide-react';
import { useChat } from '../../contexts/ChatContext';
import { useAuth } from '../../contexts/AuthContext';

interface ChatListProps {
  isOpen: boolean;
  onClose: () => void;
  onChatSelect: (chat: any) => void;
}

const ChatList: React.FC<ChatListProps> = ({ isOpen, onClose, onChatSelect }) => {
  const { chats } = useChat();
  const { user } = useAuth();

  if (!isOpen) return null;

  return (
    <div className="fixed top-16 right-4 w-80 bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg shadow-xl z-50 max-h-96 overflow-hidden">
      <div className="p-4 border-b border-gray-200 dark:border-gray-700">
        <h3 className="font-semibold text-gray-900 dark:text-white flex items-center">
          <MessageCircle className="h-5 w-5 mr-2" />
          Messages
        </h3>
      </div>

      <div className="overflow-y-auto max-h-80">
        {chats.length > 0 ? (
          chats.map((chat) => {
            const otherUser = chat.sellerId === user?.id 
              ? { name: chat.buyerName }
              : { name: chat.sellerName };

            return (
              <button
                key={chat.id}
                onClick={() => {
                  onChatSelect(chat);
                  onClose();
                }}
                className="w-full p-4 hover:bg-gray-50 dark:hover:bg-gray-700 border-b border-gray-100 dark:border-gray-700 text-left"
              >
                <div className="flex items-center space-x-3">
                  <img
                    src={chat.itemImage}
                    alt={chat.itemTitle}
                    className="w-12 h-12 rounded-lg object-cover"
                  />
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center justify-between">
                      <p className="font-medium text-gray-900 dark:text-white text-sm truncate">
                        {otherUser.name}
                      </p>
                      {chat.unreadCount > 0 && (
                        <span className="bg-emerald-600 text-white text-xs rounded-full px-2 py-1 min-w-[20px] text-center">
                          {chat.unreadCount}
                        </span>
                      )}
                    </div>
                    <div className="flex items-center text-xs text-gray-500 dark:text-gray-400 mt-1">
                      <Package className="h-3 w-3 mr-1" />
                      <span className="truncate">{chat.itemTitle}</span>
                    </div>
                    {chat.lastMessage && (
                      <p className="text-sm text-gray-600 dark:text-gray-400 truncate mt-1">
                        {chat.lastMessage}
                      </p>
                    )}
                  </div>
                </div>
              </button>
            );
          })
        ) : (
          <div className="p-8 text-center">
            <MessageCircle className="h-12 w-12 text-gray-400 mx-auto mb-4" />
            <p className="text-gray-600 dark:text-gray-400">No messages yet</p>
            <p className="text-sm text-gray-500 dark:text-gray-500 mt-1">
              Start chatting with sellers about items you're interested in
            </p>
          </div>
        )}
      </div>
    </div>
  );
};

export default ChatList;