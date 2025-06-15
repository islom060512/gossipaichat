import { createClient } from '@supabase/supabase-js';
import { ConversationData, AnalysisResult } from '../types';

// Initialize Supabase client
const supabaseUrl = import.meta.env.VITE_SUPABASE_URL as string;
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY as string;

export const supabase = createClient(supabaseUrl, supabaseAnonKey);

export const saveConversationToSupabase = async (conversation: ConversationData, analysis: AnalysisResult) => {
  try {
    // Combine conversation and analysis into a single data object to store in the 'data' JSONB column
    const dataToStore = {
      conversation: {
        id: conversation.id,
        text: conversation.text,
        context: conversation.context || null,
        imageUrl: conversation.imageUrl || null,
        audioUrl: conversation.audioUrl || null,
        createdAt: conversation.createdAt || new Date().toISOString(),
      },
      analysis: analysis,
    };

    const { data, error } = await supabase
      .from('conversations')
      .insert([ { id: conversation.id, created_at: dataToStore.conversation.createdAt, data: dataToStore } ]);

    if (error) {
      console.error('Error saving conversation to Supabase:', error);
      throw error;
    }
    console.log('Conversation saved to Supabase:', data);
    return data;
  } catch (error) {
    console.error('Supabase save operation failed:', error);
    throw error;
  }
};

export const loadConversationsFromSupabase = async (): Promise<(ConversationData & { analysis: AnalysisResult })[]> => {
  try {
    const { data, error } = await supabase
      .from('conversations')
      .select('id, created_at, data')
      .order('created_at', { ascending: false });

    if (error) {
      console.error('Error loading conversations from Supabase:', error);
      throw error;
    }
    
    console.log('Conversations loaded from Supabase:', data);

    // Map the Supabase data back to our ConversationData and AnalysisResult types
    return data.map((item: any) => ({
      id: item.data.conversation.id,
      text: item.data.conversation.text,
      context: item.data.conversation.context,
      imageUrl: item.data.conversation.imageUrl,
      audioUrl: item.data.conversation.audioUrl,
      createdAt: item.data.conversation.createdAt,
      analysis: item.data.analysis,
    }));
  } catch (error) {
    console.error('Supabase load operation failed:', error);
    return []; // Return empty array on error
  }
}; 