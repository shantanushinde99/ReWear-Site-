import { supabase } from '../lib/supabase';
import { Chat, ChatMessage } from '../types';
import type { Database } from '../types/database';

type ChatRow = Database['public']['Tables']['chats']['Row'];
type ChatInsert = Database['public']['Tables']['chats']['Insert'];
type MessageRow = Database['public']['Tables']['chat_messages']['Row'];
type MessageInsert = Database['public']['Tables']['chat_messages']['Insert'];

// Convert database chat to app chat type
const convertDbChatToChat = (dbChat: ChatRow, itemTitle?: string, itemImage?: string, lastMessage?: string, lastMessageTime?: string): Chat => ({
  id: dbChat.id,
  itemId: dbChat.item_id,
  itemTitle: itemTitle || 'Unknown Item',
  itemImage: itemImage || '',
  sellerId: dbChat.seller_id,
  sellerName: 'Unknown', // Will be populated separately
  buyerId: dbChat.buyer_id,
  buyerName: 'Unknown', // Will be populated separately
  lastMessage,
  lastMessageTime,
  unreadCount: 0, // Will be calculated separately
  createdAt: dbChat.created_at
});

// Convert database message to app message type
const convertDbMessageToMessage = (dbMessage: MessageRow, senderName?: string): ChatMessage => ({
  id: dbMessage.id,
  chatId: dbMessage.chat_id,
  senderId: dbMessage.sender_id,
  senderName: senderName || 'Unknown',
  message: dbMessage.message,
  timestamp: dbMessage.created_at,
  type: dbMessage.type as ChatMessage['type']
});

export const chatService = {
  // Create or get existing chat
  async createOrGetChat(itemId: string, sellerId: string, buyerId: string): Promise<string | null> {
    try {
      // First, try to find existing chat
      const { data: existingChat, error: findError } = await supabase
        .from('chats')
        .select('id')
        .eq('item_id', itemId)
        .eq('seller_id', sellerId)
        .eq('buyer_id', buyerId)
        .single();

      if (findError && findError.code !== 'PGRST116') { // PGRST116 is "not found"
        console.error('Error finding existing chat:', findError);
        return null;
      }

      if (existingChat) {
        return existingChat.id;
      }

      // Create new chat
      const { data: newChat, error: createError } = await supabase
        .from('chats')
        .insert({
          item_id: itemId,
          seller_id: sellerId,
          buyer_id: buyerId
        })
        .select('id')
        .single();

      if (createError) {
        console.error('Error creating chat:', createError);
        return null;
      }

      return newChat.id;
    } catch (error) {
      console.error('Error creating/getting chat:', error);
      return null;
    }
  },

  // Get chats for a user
  async getChatsForUser(userId: string): Promise<Chat[]> {
    try {
      const { data, error } = await supabase
        .from('chats')
        .select(`
          *,
          clothing_items!chats_item_id_fkey(title, images),
          seller:users!chats_seller_id_fkey(name),
          buyer:users!chats_buyer_id_fkey(name)
        `)
        .or(`seller_id.eq.${userId},buyer_id.eq.${userId}`)
        .order('updated_at', { ascending: false });

      if (error) {
        console.error('Error fetching chats:', error);
        return [];
      }

      // Get last message for each chat
      const chatsWithMessages = await Promise.all(
        data.map(async (chat) => {
          const { data: lastMessage } = await supabase
            .from('chat_messages')
            .select('message, created_at')
            .eq('chat_id', chat.id)
            .order('created_at', { ascending: false })
            .limit(1)
            .single();

          const itemImage = chat.clothing_items?.images?.[0] || '';
          const itemTitle = chat.clothing_items?.title || 'Unknown Item';
          const sellerName = chat.seller?.name || 'Unknown';
          const buyerName = chat.buyer?.name || 'Unknown';

          const convertedChat = convertDbChatToChat(
            chat,
            itemTitle,
            itemImage,
            lastMessage?.message,
            lastMessage?.created_at
          );

          convertedChat.sellerName = sellerName;
          convertedChat.buyerName = buyerName;

          return convertedChat;
        })
      );

      return chatsWithMessages;
    } catch (error) {
      console.error('Error fetching chats:', error);
      return [];
    }
  },

  // Get chat by ID
  async getChatById(chatId: string): Promise<Chat | null> {
    try {
      const { data, error } = await supabase
        .from('chats')
        .select(`
          *,
          clothing_items!chats_item_id_fkey(title, images),
          seller:users!chats_seller_id_fkey(name),
          buyer:users!chats_buyer_id_fkey(name)
        `)
        .eq('id', chatId)
        .single();

      if (error) {
        console.error('Error fetching chat:', error);
        return null;
      }

      const itemImage = data.clothing_items?.images?.[0] || '';
      const itemTitle = data.clothing_items?.title || 'Unknown Item';
      const sellerName = data.seller?.name || 'Unknown';
      const buyerName = data.buyer?.name || 'Unknown';

      const chat = convertDbChatToChat(data, itemTitle, itemImage);
      chat.sellerName = sellerName;
      chat.buyerName = buyerName;

      return chat;
    } catch (error) {
      console.error('Error fetching chat:', error);
      return null;
    }
  },

  // Send message
  async sendMessage(chatId: string, senderId: string, message: string, type: ChatMessage['type'] = 'text'): Promise<boolean> {
    try {
      const { error } = await supabase
        .from('chat_messages')
        .insert({
          chat_id: chatId,
          sender_id: senderId,
          message,
          type
        });

      if (error) {
        console.error('Error sending message:', error);
        return false;
      }

      // Update chat's updated_at timestamp
      await supabase
        .from('chats')
        .update({ updated_at: new Date().toISOString() })
        .eq('id', chatId);

      return true;
    } catch (error) {
      console.error('Error sending message:', error);
      return false;
    }
  },

  // Get messages for a chat
  async getMessagesForChat(chatId: string): Promise<ChatMessage[]> {
    try {
      const { data, error } = await supabase
        .from('chat_messages')
        .select(`
          *,
          users!chat_messages_sender_id_fkey(name)
        `)
        .eq('chat_id', chatId)
        .order('created_at', { ascending: true });

      if (error) {
        console.error('Error fetching messages:', error);
        return [];
      }

      return data.map(message => 
        convertDbMessageToMessage(message, message.users?.name)
      );
    } catch (error) {
      console.error('Error fetching messages:', error);
      return [];
    }
  },

  // Subscribe to new messages in a chat
  subscribeToMessages(chatId: string, callback: (message: ChatMessage) => void) {
    const subscription = supabase
      .channel(`chat_${chatId}`)
      .on(
        'postgres_changes',
        {
          event: 'INSERT',
          schema: 'public',
          table: 'chat_messages',
          filter: `chat_id=eq.${chatId}`
        },
        async (payload) => {
          // Fetch the complete message with sender name
          const { data: messageWithSender } = await supabase
            .from('chat_messages')
            .select(`
              *,
              users!chat_messages_sender_id_fkey(name)
            `)
            .eq('id', payload.new.id)
            .single();

          if (messageWithSender) {
            const message = convertDbMessageToMessage(
              messageWithSender,
              messageWithSender.users?.name
            );
            callback(message);
          }
        }
      )
      .subscribe();

    return subscription;
  },

  // Unsubscribe from messages
  unsubscribeFromMessages(subscription: any) {
    supabase.removeChannel(subscription);
  }
};
