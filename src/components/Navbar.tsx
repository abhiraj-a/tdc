import { Sparkles, Users, MessageSquare, Database, LogOut, HeartHandshake, ShieldCheck, Send } from 'lucide-react';
import { User } from '../types';

interface NavbarProps {
  currentTab: 'clients' | 'sent-matches' | 'pool' | 'chat';
  onSelectTab: (tab: 'clients' | 'sent-matches' | 'pool' | 'chat') => void;
  currentUser: User | null;
  onLogout: () => void;
  isSupabaseConnected: boolean;
  sentMatchesCount?: number;
}

export const Navbar: React.FC<NavbarProps> = ({
  currentTab,
  onSelectTab,
  currentUser,
  onLogout,
  isSupabaseConnected,
  sentMatchesCount
}) => {
  return (
    <header className="app-header">
      <div className="brand-badge">
        <div className="brand-icon">
          <HeartHandshake size={22} />
        </div>
        <div>
          <div className="brand-title">The Date Crew</div>
          <div className="brand-subtitle">Matchmaker OS & Algo MVP</div>
        </div>
      </div>

      <nav className="nav-tabs">
        <button
          className={`nav-tab-btn ${currentTab === 'clients' ? 'active' : ''}`}
          onClick={() => onSelectTab('clients')}
          id="nav-tab-clients"
        >
          <Users size={16} />
          <span>Client Roster</span>
        </button>

        <button
          className={`nav-tab-btn ${currentTab === 'sent-matches' ? 'active' : ''}`}
          onClick={() => onSelectTab('sent-matches')}
          id="nav-tab-sent-matches"
        >
          <Send size={15} />
          <span>Matches Sent {sentMatchesCount ? `(${sentMatchesCount})` : ''}</span>
        </button>

        <button
          className={`nav-tab-btn ${currentTab === 'pool' ? 'active' : ''}`}
          onClick={() => onSelectTab('pool')}
          id="nav-tab-pool"
        >
          <Database size={16} />
          <span>Candidate Pool (110+)</span>
        </button>

        <button
          className={`nav-tab-btn ${currentTab === 'chat' ? 'active' : ''}`}
          onClick={() => onSelectTab('chat')}
          id="nav-tab-chat"
        >
          <MessageSquare size={16} />
          <span>Live 2-User Chat</span>
        </button>
      </nav>

      <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
        <div 
          style={{ 
            display: 'flex', 
            alignItems: 'center', 
            gap: '0.4rem', 
            fontSize: '0.75rem',
            padding: '0.35rem 0.75rem',
            borderRadius: '9999px',
            background: isSupabaseConnected ? 'rgba(16, 185, 129, 0.12)' : 'rgba(245, 158, 11, 0.12)',
            border: isSupabaseConnected ? '1px solid rgba(16, 185, 129, 0.3)' : '1px solid rgba(245, 158, 11, 0.3)',
            color: isSupabaseConnected ? '#34d399' : '#fbbf24'
          }}
          title={isSupabaseConnected ? 'Connected to live Supabase database' : 'Running in Local Storage / Mock Mode. Add Supabase keys to connect live.'}
        >
          <span className={isSupabaseConnected ? 'pulse-badge' : ''} style={!isSupabaseConnected ? { width: 8, height: 8, borderRadius: '50%', background: '#fbbf24', display: 'inline-block' } : {}} />
          <span>{isSupabaseConnected ? 'Supabase Live' : 'Local / Demo Mode'}</span>
        </div>

        {currentUser && (
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
            <img
              src={currentUser.avatar_url || 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=100&auto=format&fit=crop&q=80'}
              alt={currentUser.first_name}
              style={{ width: 34, height: 34, borderRadius: '50%', objectFit: 'cover', border: '2px solid rgba(244, 63, 94, 0.5)' }}
            />
            <div style={{ textAlign: 'left', lineHeight: 1.2 }}>
              <div style={{ fontSize: '0.85rem', fontWeight: 600 }}>{`${currentUser.first_name || 'admintdc'}${currentUser.last_name ? ' ' + currentUser.last_name : ''}`}</div>
              <div style={{ fontSize: '0.7rem', color: 'var(--text-muted)' }}>Lead Matchmaker</div>
            </div>
            <button
              onClick={onLogout}
              style={{
                background: 'rgba(255, 255, 255, 0.05)',
                border: '1px solid var(--border-subtle)',
                color: 'var(--text-muted)',
                padding: '0.45rem',
                borderRadius: '8px',
                cursor: 'pointer',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                transition: 'all 0.2s'
              }}
              title="Logout"
            >
              <LogOut size={16} />
            </button>
          </div>
        )}
      </div>
    </header>
  );
};
