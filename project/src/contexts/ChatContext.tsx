import React, { createContext, useContext, useState, useEffect } from 'react';
import { Chat, ChatMessage } from '../types';
import { mockChats, mockChatMessages } from '../data/mockData';

interface ChatContextType {
  chats: Chat[];
  messages: { [chatId: string]: ChatMessage[] };
  activeChat: Chat | null;
  setActiveChat: (chat: Chat | null) => void;
  sendMessage: (chatId: string, message: string, senderId: string, senderName: string) => void;
  createChat: (itemId: string, itemTitle: string, itemImage: string, sellerId: string, sellerName: string, buyerId: string, buyerName: string) => Chat;
  markAsRead: (chatId: string) => void;
}

const ChatContext = createContext<ChatContextType | undefined>(undefined);

export const useChat = () => {
  const context = useContext(ChatContext);
  if (context === undefined) {
    throw new Error('useChat must be used within a ChatProvider');
  }
  return context;
};

interface ChatProviderProps {
  children: React.ReactNode;
}

export const ChatProvider: React.FC<ChatProviderProps> = ({ children }) => {
  const [chats, setChats] = useState<Chat[]>(mockChats);
  const [messages, setMessages] = useState<{ [chatId: string]: ChatMessage[] }>({
    '1': mockChatMessages
  });
  const [activeChat, setActiveChat] = useState<Chat | null>(null);

  const sendMessage = (chatId: string, message: string, senderId: string, senderName: string) => {
    const newMessage: ChatMessage = {
      id: Date.now().toString(),
      chatId,
      senderId,
      senderName,
      message,
      timestamp: new Date().toISOString(),
      type: 'text'
    };

    setMessages(prev => ({
      ...prev,
      [chatId]: [...(prev[chatId] || []), newMessage]
    }));

    // Update last message in chat
    setChats(prev => prev.map(chat => 
      chat.id === chatId 
        ? { ...chat, lastMessage: message, lastMessageTime: newMessage.timestamp }
        : chat
    ));
  };

  const createChat = (itemId: string, itemTitle: string, itemImage: string, sellerId: string, sellerName: string, buyerId: string, buyerName: string): Chat => {
    const newChat: Chat = {
      id: Date.now().toString(),
      itemId,
      itemTitle,
      itemImage,
      sellerId,
      sellerName,
      buyerId,
      buyerName,
      unreadCount: 0,
      createdAt: new Date().toISOString()
    };

    // Add system message
    const systemMessage: ChatMessage = {
      id: Date.now().toString() + '_system',
      chatId: newChat.id,
      senderId: 'system',
      senderName: 'System',
      message: `Chat started for ${itemTitle}`,
      timestamp: new Date().toISOString(),
      type: 'system'
    };

    setChats(prev => [newChat, ...prev]);
    setMessages(prev => ({
      ...prev,
      [newChat.id]: [systemMessage]
    }));

    return newChat;
  };

  const markAsRead = (chatId: string) => {
    setChats(prev => prev.map(chat => 
      chat.id === chatId ? { ...chat, unreadCount: 0 } : chat
    ));
  };

  const value: ChatContextType = {
    chats,
    messages,
    activeChat,
    setActiveChat,
    sendMessage,
    createChat,
    markAsRead
  };

  return <ChatContext.Provider value={value}>{children}</ChatContext.Provider>;
};