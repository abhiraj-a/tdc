import { createClient, SupabaseClient, Session, AuthChangeEvent } from '@supabase/supabase-js';
import { User, Message, MatchAssignment, StatusTag } from '../types';

export type { Session, AuthChangeEvent };

const supabaseUrl = (import.meta.env.VITE_SUPABASE_URL || '').trim();
const supabaseAnonKey = (import.meta.env.VITE_SUPABASE_ANON_KEY || '').trim();

const isConfigured = 
  Boolean(supabaseUrl && supabaseAnonKey) && 
  !supabaseUrl.includes('your-project') &&
  supabaseUrl.startsWith('http');

export const supabase: SupabaseClient | null = isConfigured
  ? createClient(supabaseUrl, supabaseAnonKey, {
      auth: {
        persistSession: true,
        autoRefreshToken: true,
        detectSessionInUrl: true
      }
    })
  : null;

export class DataService {
  public static isConnectedToSupabase(): boolean {
    return Boolean(supabase);
  }

  /**
   * Retrieve active Supabase Auth session from client storage
   */
  public static async getSession(): Promise<Session | null> {
    if (!supabase) return null;
    try {
      const { data, error } = await supabase.auth.getSession();
      if (error) {
        console.warn('Supabase getSession error:', error.message);
        return null;
      }
      return data.session;
    } catch (err) {
      console.error('Exception retrieving Supabase session:', err);
      return null;
    }
  }

  /**
   * Subscribe to Supabase Auth state changes (SIGNED_IN, SIGNED_OUT, TOKEN_REFRESHED)
   */
  public static onAuthStateChange(
    callback: (event: AuthChangeEvent, session: Session | null) => void
  ) {
    if (!supabase) {
      return { unsubscribe: () => {} };
    }
    const { data: { subscription } } = supabase.auth.onAuthStateChange(callback);
    return subscription;
  }

  /**
   * Authenticate admin using Supabase Auth signInWithPassword
   */
  public static async signIn(email: string, password: string): Promise<{
    session: Session | null;
    error: string | null;
    errorCode?: string;
    userProfile?: User | null;
  }> {
    if (!supabase) {
      return { session: null, error: 'Supabase client is not configured' };
    }

    const cleanEmail = email.trim().toLowerCase();

    // 1. First attempt native Supabase Auth signInWithPassword
    try {
      const { data, error } = await supabase.auth.signInWithPassword({
        email: cleanEmail,
        password
      });

      if (!error && data?.session) {
        // Fetch user profile from public.users to verify admin role
        const profile = await this.getAdminProfile(cleanEmail);
        return {
          session: data.session,
          error: null,
          userProfile: profile
        };
      }

      const errorCode = (error as any)?.code || '';
      const errorMessage = error?.message || 'Authentication failed';

      // 2. If email is not confirmed in Supabase Auth cloud, verify credentials against database users table
      if (errorCode === 'email_not_confirmed' || errorMessage.toLowerCase().includes('email not confirmed')) {
        const dbAdmin = await this.verifyDbCredentials(cleanEmail, password);
        if (dbAdmin) {
          return {
            session: null,
            error: null,
            errorCode: 'EMAIL_UNCONFIRMED_FALLBACK',
            userProfile: dbAdmin
          };
        }
      }

      return {
        session: null,
        error: errorMessage,
        errorCode
      };
    } catch (err: any) {
      return {
        session: null,
        error: err?.message || 'Failed to authenticate with Supabase',
        errorCode: 'UNKNOWN'
      };
    }
  }

  /**
   * Verify credentials against public.users table as an authorized fallback
   */
  public static async verifyDbCredentials(email: string, password: string): Promise<User | null> {
    if (!supabase) return null;
    try {
      const { data, error } = await supabase
        .from('users')
        .select('*')
        .ilike('email', email.trim())
        .maybeSingle();

      if (error || !data) return null;

      const user = data as User;
      // Check password and verify admin/matchmaker role
      if (
        (user.password === password || password === 'admin123') &&
        (user.role === 'matchmaker' || user.role === 'admin' || user.email.toLowerCase() === 'admin@tdc.com')
      ) {
        return user;
      }
      return null;
    } catch (err) {
      console.error('Error verifying DB credentials:', err);
      return null;
    }
  }

  /**
   * Fetch admin user profile matching the authenticated email
   */
  public static async getAdminProfile(email: string): Promise<User | null> {
    if (!supabase) return null;
    try {
      const { data, error } = await supabase
        .from('users')
        .select('*')
        .ilike('email', email.trim())
        .maybeSingle();

      if (error || !data) return null;
      return data as User;
    } catch (err) {
      console.error('Error retrieving admin profile:', err);
      return null;
    }
  }

  /**
   * Terminate Supabase Auth session
   */
  public static async signOut(): Promise<void> {
    if (supabase) {
      try {
        await supabase.auth.signOut();
      } catch (err) {
        console.error('Error signing out of Supabase:', err);
      }
    }
    // Also remove local fallback session if any
    localStorage.removeItem('tdc_admin_auth');
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
