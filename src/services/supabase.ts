import { createClient, SupabaseClient } from '@supabase/supabase-js';
import { User, Message, MatchAssignment, StatusTag } from '../types';

const supabaseUrl = (import.meta.env.VITE_SUPABASE_URL || '').trim();
const supabaseAnonKey = (import.meta.env.VITE_SUPABASE_ANON_KEY || '').trim();

const isConfigured = 
  Boolean(supabaseUrl && supabaseAnonKey) && 
  !supabaseUrl.includes('your-project') &&
  supabaseUrl.startsWith('http');

export const supabase: SupabaseClient | null = isConfigured
  ? createClient(supabaseUrl, supabaseAnonKey)
  : null;

export class DataService {
  public static isConnectedToSupabase(): boolean {
    return Boolean(supabase);
  }

  /**
   * Fetch all users exclusively from Supabase `users` table
   */
  public static async fetchUsers(): Promise<User[]> {
    if (supabase) {
      try {
        const { data, error } = await supabase
          .from('users')
          .select('*')
          .order('first_name', { ascending: true });

        if (error) {
          console.error('Supabase query error:', error.message);
          return [];
        }
        return (data || []) as User[];
      } catch (err) {
        console.error('Supabase fetch exception:', err);
        return [];
      }
    }
    return [];
  }

  /**
   * Update Matchmaker internal notes directly in Supabase
   */
  public static async updateNotes(userId: string, notes: string): Promise<boolean> {
    if (supabase) {
      try {
        const { error } = await supabase
          .from('users')
          .update({ notes })
          .eq('id', userId);
        if (!error) return true;
        console.error('Supabase update notes error:', error.message);
      } catch (err) {
        console.error('Failed to update notes in Supabase:', err);
      }
    }
    return false;
  }

  /**
   * Update journey status tag directly in Supabase
   */
  public static async updateStatus(userId: string, status_tag: StatusTag): Promise<boolean> {
    if (supabase) {
      try {
        const { error } = await supabase
          .from('users')
          .update({ status_tag })
          .eq('id', userId);
        if (!error) return true;
        console.error('Supabase update status error:', error.message);
      } catch (err) {
        console.error('Failed to update status in Supabase:', err);
      }
    }
    return false;
  }

  /**
   * Fetch live 1-on-1 chat history between two users from Supabase `messages` table
   */
  public static async getMessages(user1Id: string, user2Id: string): Promise<Message[]> {
    if (supabase) {
      try {
        const { data, error } = await supabase
          .from('messages')
          .select('*')
          .or(`and(sender_id.eq.${user1Id},receiver_id.eq.${user2Id}),and(sender_id.eq.${user2Id},receiver_id.eq.${user1Id})`)
          .order('created_at', { ascending: true });

        if (!error && data) {
          return data as Message[];
        }
        if (error) console.warn('Supabase fetch messages error:', error.message);
      } catch (err) {
        console.warn('Error fetching messages from Supabase:', err);
      }
    }
    return [];
  }

  /**
   * Send a message between 2 users directly into Supabase `messages` table
   */
  public static async sendMessage(senderId: string, receiverId: string, text: string): Promise<Message> {
    if (!supabase) {
      throw new Error('Supabase client not connected');
    }

    const { data, error } = await supabase
      .from('messages')
      .insert([
        {
          sender_id: senderId,
          receiver_id: receiverId,
          message: text.trim(),
          is_read: false
        }
      ])
      .select()
      .single();

    if (error) {
      console.error('Supabase insert message error:', error.message);
      throw error;
    }

    return data as Message;
  }

  /**
   * Realtime subscription for live chat on Supabase WebSocket channel
   */
  public static subscribeToMessages(onNewMessage: (msg: Message) => void) {
    if (!supabase) return () => {};

    const channel = supabase
      .channel('realtime_messages')
      .on(
        'postgres_changes',
        { event: 'INSERT', schema: 'public', table: 'messages' },
        payload => {
          if (payload.new) {
            onNewMessage(payload.new as Message);
          }
        }
      )
      .subscribe();

    return () => {
      supabase.removeChannel(channel);
    };
  }

  /**
   * Record when a match is sent to a client in Supabase `match_assignments` table
   */
  public static async recordMatch(assignment: {
    client_id: string;
    suggested_match_id: string;
    matchmaker_id?: string;
    ai_score?: number;
    ai_reasoning?: string;
    pitch_note?: string;
  }): Promise<boolean> {
    if (!supabase) return false;

    try {
      const { error: assignErr } = await supabase
        .from('match_assignments')
        .insert([
          {
            ...assignment,
            status: 'Sent'
          }
        ]);

      if (assignErr) {
        console.warn('Error inserting match assignment:', assignErr.message);
      }

      // Also update client status in users table to 'Matches Sent'
      await supabase
        .from('users')
        .update({ status_tag: 'Matches Sent' })
        .eq('id', assignment.client_id);

      return true;
    } catch (e) {
      console.error('Exception recording match in Supabase:', e);
      return false;
    }
  }

  /**
   * Fetch all sent match assignments directly from Supabase
   */
  public static async fetchMatchAssignments(clientId?: string): Promise<MatchAssignment[]> {
    if (!supabase) return [];

    try {
      let query = supabase
        .from('match_assignments')
        .select('*')
        .order('created_at', { ascending: false });

      if (clientId) {
        query = query.eq('client_id', clientId);
      }

      const { data, error } = await query;
      if (error) {
        console.error('Error fetching match assignments:', error.message);
        return [];
      }
      return (data || []) as MatchAssignment[];
    } catch (err) {
      console.error('Exception fetching match assignments:', err);
      return [];
    }
  }
}
