import React, { useState } from 'react';
import { Search, Filter, Sparkles, MapPin, Briefcase, ChevronRight, UserCheck, Calendar, Send, Clock, UserPlus } from 'lucide-react';
import { User, StatusTag } from '../types';
import { calculateAge, formatLPA } from '../services/matchEngine';

interface CustomerListViewProps {
  clients: User[];
  onSelectClient: (client: User) => void;
  selectedClientId?: string;
}

export const CustomerListView: React.FC<CustomerListViewProps> = ({
  clients,
  onSelectClient,
  selectedClientId
}) => {
  const [search, setSearch] = useState('');
  const [statusFilter, setStatusFilter] = useState<string>('ALL');
  const [genderFilter, setGenderFilter] = useState<string>('ALL');

  const filteredClients = clients.filter(c => {
    // Only show clients, not matchmakers or general pool candidates here
    if (c.role === 'matchmaker') return false;

    const matchesSearch = 
      `${c.first_name} ${c.last_name}`.toLowerCase().includes(search.toLowerCase()) ||
      c.city.toLowerCase().includes(search.toLowerCase()) ||
      (c.company || '').toLowerCase().includes(search.toLowerCase()) ||
      (c.designation || '').toLowerCase().includes(search.toLowerCase());

    const matchesStatus = statusFilter === 'ALL' || c.status_tag === statusFilter;
    const matchesGender = genderFilter === 'ALL' || c.gender === genderFilter;

    return matchesSearch && matchesStatus && matchesGender;
  });

  const getStatusBadge = (status: StatusTag) => {
    switch (status) {
      case 'Active':
        return <span className="badge badge-active"><span className="pulse-badge" /> Active Search</span>;
      case 'Onboarding':
        return <span className="badge badge-onboarding">Onboarding</span>;
      case 'Matches Sent':
        return <span className="badge badge-sent"><Send size={11} /> Matches Sent</span>;
      case 'Meeting Scheduled':
        return <span className="badge badge-scheduled"><Calendar size={11} /> Meeting Set</span>;
      case 'On Hold':
        return <span className="badge badge-hold"><Clock size={11} /> On Hold</span>;
      default:
        return <span className="badge badge-hold">{status}</span>;
    }
  };

  // Metrics
  const totalActive = clients.filter(c => c.status_tag === 'Active').length;
  const totalMatchesSent = clients.filter(c => c.status_tag === 'Matches Sent').length;
  const totalScheduled = clients.filter(c => c.status_tag === 'Meeting Scheduled').length;

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
      {/* Top Roster Metrics Banner */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '1rem' }}>
        <div className="glass-panel" style={{ padding: '1.25rem' }}>
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', color: 'var(--text-muted)', marginBottom: '0.5rem' }}>
            <span style={{ fontSize: '0.8rem', fontWeight: 600, textTransform: 'uppercase', letterSpacing: '0.05em' }}>Assigned Clients</span>
            <UserCheck size={18} color="var(--primary)" />
          </div>
          <div style={{ fontSize: '1.85rem', fontWeight: 800, color: 'white' }}>{clients.length}</div>
          <div style={{ fontSize: '0.75rem', color: 'var(--text-dim)' }}>Managed by admintdc</div>
        </div>

        <div className="glass-panel" style={{ padding: '1.25rem' }}>
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', color: 'var(--text-muted)', marginBottom: '0.5rem' }}>
            <span style={{ fontSize: '0.8rem', fontWeight: 600, textTransform: 'uppercase', letterSpacing: '0.05em' }}>Active Pipelines</span>
            <Sparkles size={18} color="#34d399" />
          </div>
          <div style={{ fontSize: '1.85rem', fontWeight: 800, color: '#34d399' }}>{totalActive}</div>
          <div style={{ fontSize: '0.75rem', color: 'var(--text-dim)' }}>Ready for pairing</div>
        </div>

        <div className="glass-panel" style={{ padding: '1.25rem' }}>
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', color: 'var(--text-muted)', marginBottom: '0.5rem' }}>
            <span style={{ fontSize: '0.8rem', fontWeight: 600, textTransform: 'uppercase', letterSpacing: '0.05em' }}>Matches Sent</span>
            <Send size={18} color="#fb7185" />
          </div>
          <div style={{ fontSize: '1.85rem', fontWeight: 800, color: '#fb7185' }}>{totalMatchesSent}</div>
          <div style={{ fontSize: '0.75rem', color: 'var(--text-dim)' }}>Client review in progress</div>
        </div>

        <div className="glass-panel" style={{ padding: '1.25rem' }}>
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', color: 'var(--text-muted)', marginBottom: '0.5rem' }}>
            <span style={{ fontSize: '0.8rem', fontWeight: 600, textTransform: 'uppercase', letterSpacing: '0.05em' }}>Meetings Scheduled</span>
            <Calendar size={18} color="#fbbf24" />
          </div>
          <div style={{ fontSize: '1.85rem', fontWeight: 800, color: '#fbbf24' }}>{totalScheduled}</div>
          <div style={{ fontSize: '0.75rem', color: 'var(--text-dim)' }}>Calls locked in this week</div>
        </div>
      </div>

      {/* Filter and Search Bar */}
      <div 
        className="glass-panel" 
        style={{ 
          padding: '1rem 1.25rem', 
          display: 'flex', 
          flexWrap: 'wrap', 
          alignItems: 'center', 
          justifyContent: 'space-between', 
          gap: '1rem' 
        }}
      >
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', flex: '1 1 300px' }}>
          <div style={{ position: 'relative', width: '100%' }}>
            <Search size={16} style={{ position: 'absolute', left: 12, top: '50%', transform: 'translateY(-50%)', color: 'var(--text-dim)' }} />
            <input
              type="text"
              placeholder="Search by client name, city, company, or designation..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              style={{
                width: '100%',
                padding: '0.65rem 0.75rem 0.65rem 2.4rem',
                background: 'rgba(255, 255, 255, 0.04)',
                border: '1px solid var(--border-subtle)',
                borderRadius: '10px',
                color: 'white',
                fontSize: '0.875rem',
                outline: 'none'
              }}
            />
          </div>
        </div>

        <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', flexWrap: 'wrap' }}>
          <span style={{ fontSize: '0.8rem', color: 'var(--text-dim)', marginRight: '0.25rem' }}>Journey Stage:</span>
          {['ALL', 'Active', 'Onboarding', 'Matches Sent', 'Meeting Scheduled', 'On Hold'].map((st) => (
            <button
              key={st}
              onClick={() => setStatusFilter(st)}
              style={{
                padding: '0.35rem 0.75rem',
                borderRadius: '8px',
                fontSize: '0.8rem',
                fontWeight: 600,
                border: '1px solid',
                borderColor: statusFilter === st ? 'var(--primary)' : 'var(--border-subtle)',
                background: statusFilter === st ? 'rgba(244, 63, 94, 0.15)' : 'rgba(255, 255, 255, 0.03)',
                color: statusFilter === st ? '#fb7185' : 'var(--text-muted)',
                cursor: 'pointer',
                transition: 'all 0.15s ease'
              }}
            >
              {st}
            </button>
          ))}

          <select
            value={genderFilter}
            onChange={(e) => setGenderFilter(e.target.value)}
            style={{
              padding: '0.4rem 0.75rem',
              borderRadius: '8px',
              fontSize: '0.8rem',
              background: 'rgba(255, 255, 255, 0.05)',
              border: '1px solid var(--border-subtle)',
              color: 'var(--text-main)',
              cursor: 'pointer',
              marginLeft: '0.5rem'
            }}
          >
            <option value="ALL">All Genders</option>
            <option value="Male">Male Clients</option>
            <option value="Female">Female Clients</option>
          </select>
        </div>
      </div>

      {/* Customer Cards Grid / List */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(360px, 1fr))', gap: '1.25rem' }}>
        {filteredClients.map((client) => {
          const age = calculateAge(client.dob);
          const isSelected = selectedClientId === client.id;

          return (
            <div
              key={client.id}
              className="glass-panel"
              onClick={() => onSelectClient(client)}
              style={{
                padding: '1.5rem',
                cursor: 'pointer',
                border: isSelected ? '1.5px solid var(--primary)' : '1px solid var(--border-subtle)',
                background: isSelected ? 'rgba(244, 63, 94, 0.06)' : undefined,
                boxShadow: isSelected ? '0 0 25px rgba(244, 63, 94, 0.18)' : undefined,
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'space-between',
                transition: 'all 0.2s cubic-bezier(0.16, 1, 0.3, 1)'
              }}
            >
              <div>
                <div style={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between', marginBottom: '1rem' }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
                    <div style={{ position: 'relative' }}>
                      <img
                        src={client.avatar_url || 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=200&auto=format&fit=crop&q=80'}
                        alt={client.first_name}
                        style={{
                          width: 58,
                          height: 58,
                          borderRadius: '16px',
                          objectFit: 'cover',
                          border: '2px solid rgba(255, 255, 255, 0.12)'
                        }}
                      />
                      <span 
                        style={{
                          position: 'absolute',
                          bottom: -2,
                          right: -2,
                          padding: '2px 6px',
                          borderRadius: '6px',
                          fontSize: '0.65rem',
                          fontWeight: 700,
                          background: client.gender === 'Male' ? '#3b82f6' : '#ec4899',
                          color: 'white'
                        }}
                      >
                        {client.gender[0]}
                      </span>
                    </div>

                    <div>
                      <h3 style={{ fontSize: '1.15rem', lineHeight: 1.2, marginBottom: '0.2rem' }}>
                        {client.first_name} {client.last_name}
                      </h3>
                      <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', fontSize: '0.85rem', color: 'var(--text-muted)' }}>
                        <span style={{ fontWeight: 600, color: 'var(--text-main)' }}>{age} yrs</span>
                        <span>•</span>
                        <span style={{ display: 'inline-flex', alignItems: 'center', gap: '2px' }}>
                          <MapPin size={13} color="var(--primary)" />
                          {client.city}
                        </span>
                        <span>•</span>
                        <span>{client.marital_status}</span>
                      </div>
                    </div>
                  </div>

                  <div>
                    {getStatusBadge(client.status_tag)}
                  </div>
                </div>

                <div 
                  style={{ 
                    padding: '0.75rem', 
                    background: 'rgba(255, 255, 255, 0.03)', 
                    borderRadius: '10px', 
                    marginBottom: '1rem',
                    fontSize: '0.825rem',
                    display: 'flex',
                    flexDirection: 'column',
                    gap: '0.35rem'
                  }}
                >
                  <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                    <span style={{ color: 'var(--text-muted)', display: 'inline-flex', alignItems: 'center', gap: '4px' }}>
                      <Briefcase size={13} /> {client.designation}
                    </span>
                    <span style={{ fontWeight: 700, color: '#34d399' }}>{formatLPA(client.income)}</span>
                  </div>
                  <div style={{ color: 'var(--text-dim)', fontSize: '0.775rem' }}>
                    {client.company} • {client.ug_college}
                  </div>
                </div>

                {client.notes && (
                  <div style={{ 
                    fontSize: '0.775rem', 
                    color: 'var(--text-muted)', 
                    fontStyle: 'italic', 
                    marginBottom: '1rem',
                    display: '-webkit-box',
                    WebkitLineClamp: 2,
                    WebkitBoxOrient: 'vertical',
                    overflow: 'hidden'
                  }}>
                    "{client.notes}"
                  </div>
                )}
              </div>

              <div 
                style={{ 
                  display: 'flex', 
                  alignItems: 'center', 
                  justifyContent: 'space-between',
                  paddingTop: '0.75rem',
                  borderTop: '1px solid rgba(255, 255, 255, 0.06)'
                }}
              >
                <div style={{ display: 'flex', gap: '0.4rem', flexWrap: 'wrap' }}>
                  <span style={{ fontSize: '0.7rem', padding: '2px 8px', borderRadius: '4px', background: 'rgba(255,255,255,0.05)', color: 'var(--text-muted)' }}>
                    Kids: {client.want_kids}
                  </span>
                  <span style={{ fontSize: '0.7rem', padding: '2px 8px', borderRadius: '4px', background: 'rgba(255,255,255,0.05)', color: 'var(--text-muted)' }}>
                    Diet: {client.diet}
                  </span>
                </div>

                <div style={{ display: 'flex', alignItems: 'center', gap: '4px', color: 'var(--primary)', fontWeight: 600, fontSize: '0.825rem' }}>
                  <span>Matchmaking</span>
                  <ChevronRight size={16} />
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {filteredClients.length === 0 && (
        <div className="glass-panel" style={{ padding: '3rem', textAlign: 'center' }}>
          <p style={{ color: 'var(--text-muted)', fontSize: '1rem' }}>No clients match the selected filter criteria.</p>
        </div>
      )}
    </div>
  );
};
