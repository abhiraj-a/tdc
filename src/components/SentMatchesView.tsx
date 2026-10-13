import React, { useState } from 'react';
import { Send, Clock, User as UserIcon, MessageSquare, ChevronRight, Mail, Sparkles, CheckCircle2 } from 'lucide-react';
import { User, MatchAssignment } from '../types';
import { calculateAge, formatHeight, formatLPA } from '../services/matchEngine';

interface SentMatchesViewProps {
  assignments: MatchAssignment[];
  allUsers: User[];
  onSelectClient: (client: User) => void;
  onStartChat: (user1Id: string, user2Id: string) => void;
}

export const SentMatchesView: React.FC<SentMatchesViewProps> = ({
  assignments,
  allUsers,
  onSelectClient,
  onStartChat
}) => {
  const [expandedPitchId, setExpandedPitchId] = useState<string | null>(null);

  // Join client and suggested match objects
  const enrichedAssignments = assignments.map(a => {
    const client = allUsers.find(u => u.id === a.client_id);
    const candidate = allUsers.find(u => u.id === a.suggested_match_id);
    return {
      ...a,
      client,
      candidate
    };
  });

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
      {/* Banner */}
      <div 
        className="glass-panel" 
        style={{ 
          padding: '1.5rem', 
          display: 'flex', 
          alignItems: 'center', 
          justifyContent: 'space-between',
          flexWrap: 'wrap',
          gap: '1rem',
          border: '1px solid rgba(244, 63, 94, 0.25)',
          background: 'linear-gradient(135deg, rgba(244, 63, 94, 0.08) 0%, rgba(18, 24, 38, 0.7) 100%)'
        }}
      >
        <div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.6rem', marginBottom: '0.25rem' }}>
            <div style={{ width: 36, height: 36, borderRadius: '10px', background: 'linear-gradient(135deg, var(--primary), #e11d48)', display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'white' }}>
              <Send size={18} />
            </div>
            <h2 style={{ fontSize: '1.4rem' }}>Matches Sent Pipeline</h2>
          </div>
          <p style={{ color: 'var(--text-muted)', fontSize: '0.85rem' }}>
            Live record of all candidate matches dispatched to clients from Supabase database.
          </p>
        </div>

        <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
          <span style={{ fontSize: '0.8rem', padding: '0.4rem 0.85rem', borderRadius: '9999px', background: 'rgba(244, 63, 94, 0.15)', color: '#fb7185', fontWeight: 700, border: '1px solid rgba(244, 63, 94, 0.3)' }}>
            {assignments.length} Total Matches Dispatched
          </span>
        </div>
      </div>

      {/* Sent Matches Stream */}
      {enrichedAssignments.length === 0 ? (
        <div className="glass-panel" style={{ padding: '4rem 2rem', textAlign: 'center' }}>
          <Mail size={48} style={{ margin: '0 auto 1rem auto', color: 'var(--text-dim)', opacity: 0.5 }} />
          <h3 style={{ fontSize: '1.25rem', marginBottom: '0.5rem' }}>No Matches Sent Yet</h3>
          <p style={{ color: 'var(--text-muted)', fontSize: '0.9rem', maxWidth: '420px', margin: '0 auto' }}>
            When you select a client and click <strong>"Send Match to Client"</strong>, the dispatched candidate and pitch note will be recorded here in Supabase.
          </p>
        </div>
      ) : (
        <div style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
          {enrichedAssignments.map((item) => {
            const client = item.client;
            const candidate = item.candidate;
            const isPitchExpanded = expandedPitchId === item.id;
            const sentDate = new Date(item.created_at).toLocaleDateString('en-IN', {
              month: 'short',
              day: 'numeric',
              year: 'numeric',
              hour: '2-digit',
              minute: '2-digit'
            });

            return (
              <div 
                key={item.id} 
                className="glass-panel" 
                style={{ 
                  padding: '1.5rem',
                  border: '1px solid rgba(255, 255, 255, 0.1)'
                }}
              >
                {/* Header: Timestamp and Status */}
                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '1.25rem', paddingBottom: '0.75rem', borderBottom: '1px solid rgba(255, 255, 255, 0.06)' }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', fontSize: '0.8rem', color: 'var(--text-dim)' }}>
                    <Clock size={14} />
                    <span>Dispatched on <strong>{sentDate}</strong></span>
                  </div>

                  <span className="badge badge-sent" style={{ padding: '3px 10px', fontSize: '0.75rem' }}>
                    <CheckCircle2 size={12} /> {item.status || 'Sent to Client'}
                  </span>
                </div>

                {/* Pairing Showcase: Client -> Matched Candidate */}
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '1.25rem', marginBottom: '1.25rem' }}>
                  {/* Left: Client Card */}
                  <div style={{ background: 'rgba(255, 255, 255, 0.03)', borderRadius: '12px', padding: '1rem', border: '1px solid rgba(255, 255, 255, 0.06)' }}>
                    <div style={{ fontSize: '0.7rem', textTransform: 'uppercase', color: 'var(--text-dim)', fontWeight: 700, marginBottom: '0.5rem' }}>
                      Client (Recipient)
                    </div>
                    {client ? (
                      <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
                        <img
                          src={client.avatar_url || 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=100&auto=format&fit=crop&q=80'}
                          alt={client.first_name}
                          style={{ width: 50, height: 50, borderRadius: '12px', objectFit: 'cover' }}
                        />
                        <div style={{ flex: 1 }}>
                          <div style={{ fontSize: '1rem', fontWeight: 700, color: 'white' }}>
                            {client.first_name} {client.last_name}
                          </div>
                          <div style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>
                            {client.gender} • {calculateAge(client.dob)} yrs • {client.city}
                          </div>
                          <div style={{ fontSize: '0.75rem', color: '#34d399', fontWeight: 600 }}>
                            {formatLPA(client.income)} • {client.designation}
                          </div>
                        </div>
                      </div>
                    ) : (
                      <div style={{ color: 'var(--text-dim)', fontSize: '0.85rem' }}>Client ID: {item.client_id}</div>
                    )}
                  </div>

                  {/* Right: Candidate Card */}
                  <div style={{ background: 'rgba(244, 63, 94, 0.04)', borderRadius: '12px', padding: '1rem', border: '1px solid rgba(244, 63, 94, 0.2)' }}>
                    <div style={{ fontSize: '0.7rem', textTransform: 'uppercase', color: '#fda4af', fontWeight: 700, marginBottom: '0.5rem' }}>
                      Suggested Candidate (Dispatched)
                    </div>
                    {candidate ? (
                      <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
                        <img
                          src={candidate.avatar_url || 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=100&auto=format&fit=crop&q=80'}
                          alt={candidate.first_name}
                          style={{ width: 50, height: 50, borderRadius: '12px', objectFit: 'cover', border: '1.5px solid rgba(244, 63, 94, 0.4)' }}
                        />
                        <div style={{ flex: 1 }}>
                          <div style={{ fontSize: '1rem', fontWeight: 700, color: 'white' }}>
                            {candidate.first_name} {candidate.last_name}
                          </div>
                          <div style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>
                            {candidate.gender} • {calculateAge(candidate.dob)} yrs • {candidate.city} • {formatHeight(candidate.height_cm)}
                          </div>
                          <div style={{ fontSize: '0.75rem', color: '#34d399', fontWeight: 600 }}>
                            {formatLPA(candidate.income)} • {candidate.designation} at {candidate.company}
                          </div>
                        </div>
                      </div>
                    ) : (
                      <div style={{ color: 'var(--text-dim)', fontSize: '0.85rem' }}>Candidate ID: {item.suggested_match_id}</div>
                    )}
                  </div>
                </div>

                {/* Pitch Note Accordion */}
                {item.pitch_note && (
                  <div style={{ background: 'rgba(255, 255, 255, 0.02)', borderRadius: '10px', padding: '0.85rem 1rem', marginBottom: '1rem', border: '1px solid var(--border-subtle)' }}>
                    <div 
                      onClick={() => setExpandedPitchId(isPitchExpanded ? null : item.id)}
                      style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', cursor: 'pointer', fontSize: '0.8rem', fontWeight: 600, color: 'var(--text-muted)' }}
                    >
                      <span style={{ display: 'inline-flex', alignItems: 'center', gap: '6px' }}>
                        <Mail size={14} color="var(--primary)" />
                        <span>Dispatched Matchmaker Email Pitch Note</span>
                      </span>
                      <span style={{ fontSize: '0.75rem', color: 'var(--primary)' }}>
                        {isPitchExpanded ? 'Hide Pitch ▲' : 'View Full Email ▼'}
                      </span>
                    </div>

                    {isPitchExpanded && (
                      <div style={{ marginTop: '0.75rem', paddingTop: '0.75rem', borderTop: '1px solid rgba(255, 255, 255, 0.06)', whiteSpace: 'pre-wrap', fontSize: '0.825rem', color: 'var(--text-main)', lineHeight: 1.6 }}>
                        {item.pitch_note}
                      </div>
                    )}
                  </div>
                )}

                {/* Card Actions */}
                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'flex-end', gap: '0.75rem', paddingTop: '0.5rem' }}>
                  {client && candidate && (
                    <button
                      onClick={() => onStartChat(client.id, candidate.id)}
                      className="btn-secondary"
                      style={{ padding: '0.45rem 0.85rem', fontSize: '0.8rem' }}
                    >
                      <MessageSquare size={14} />
                      <span>Chat Between Both</span>
                    </button>
                  )}

                  {client && (
                    <button
                      onClick={() => onSelectClient(client)}
                      className="btn-primary"
                      style={{ padding: '0.45rem 1rem', fontSize: '0.8rem' }}
                    >
                      <span>View Client Dossier</span>
                      <ChevronRight size={14} />
                    </button>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
};
