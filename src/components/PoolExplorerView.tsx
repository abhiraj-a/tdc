import React, { useState } from 'react';
import { Search, Database, MapPin, Briefcase, Filter, ChevronRight, User as UserIcon } from 'lucide-react';
import { User } from '../types';
import { calculateAge, formatHeight, formatLPA } from '../services/matchEngine';

interface PoolExplorerViewProps {
  poolUsers: User[];
  onSelectCandidate: (candidate: User) => void;
}

export const PoolExplorerView: React.FC<PoolExplorerViewProps> = ({
  poolUsers,
  onSelectCandidate
}) => {
  const [search, setSearch] = useState('');
  const [genderFilter, setGenderFilter] = useState<'ALL' | 'Female' | 'Male'>('ALL');
  const [cityFilter, setCityFilter] = useState<string>('ALL');
  const [dietFilter, setDietFilter] = useState<string>('ALL');

  // Filter pool candidates (excluding matchmaker)
  const filtered = poolUsers.filter(u => {
    if (u.role === 'matchmaker') return false;

    const matchesSearch = 
      `${u.first_name} ${u.last_name}`.toLowerCase().includes(search.toLowerCase()) ||
      u.city.toLowerCase().includes(search.toLowerCase()) ||
      (u.company || '').toLowerCase().includes(search.toLowerCase()) ||
      (u.designation || '').toLowerCase().includes(search.toLowerCase());

    const matchesGender = genderFilter === 'ALL' || u.gender === genderFilter;
    const matchesCity = cityFilter === 'ALL' || u.city === cityFilter;
    const matchesDiet = dietFilter === 'ALL' || u.diet === dietFilter;

    return matchesSearch && matchesGender && matchesCity && matchesDiet;
  });

  const uniqueCities = Array.from(new Set(poolUsers.map(u => u.city).filter(Boolean)));

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
      {/* Banner */}
      <div 
        className="glass-panel" 
        style={{ 
          padding: '1.25rem 1.5rem', 
          display: 'flex', 
          alignItems: 'center', 
          justifyContent: 'space-between',
          flexWrap: 'wrap',
          gap: '1rem',
          border: '1px solid rgba(255, 255, 255, 0.1)'
        }}
      >
        <div>
          <h2 style={{ fontSize: '1.35rem', display: 'flex', alignItems: 'center', gap: '0.6rem' }}>
            <Database size={22} color="var(--primary)" />
            <span>Master Candidate Pool ({poolUsers.filter(u => u.role !== 'matchmaker').length}+ Verified Profiles)</span>
          </h2>
          <p style={{ fontSize: '0.825rem', color: 'var(--text-muted)', marginTop: '0.2rem' }}>
            Browse verified Indian matrimonial profiles across Mumbai, Bangalore, Delhi NCR, and global hubs.
          </p>
        </div>

        <div style={{ display: 'flex', gap: '0.75rem', alignItems: 'center' }}>
          <span style={{ fontSize: '0.8rem', color: 'var(--text-dim)' }}>Showing: <strong>{filtered.length}</strong> profiles</span>
        </div>
      </div>

      {/* Filter Bar */}
      <div className="glass-panel" style={{ padding: '1rem 1.25rem', display: 'flex', flexWrap: 'wrap', gap: '1rem', alignItems: 'center', justifyContent: 'space-between' }}>
        <div style={{ position: 'relative', flex: '1 1 280px' }}>
          <Search size={16} style={{ position: 'absolute', left: 12, top: '50%', transform: 'translateY(-50%)', color: 'var(--text-dim)' }} />
          <input
            type="text"
            placeholder="Search by candidate name, company, university, or city..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            style={{
              width: '100%',
              padding: '0.6rem 0.75rem 0.6rem 2.4rem',
              background: 'rgba(255, 255, 255, 0.05)',
              border: '1px solid var(--border-subtle)',
              borderRadius: '8px',
              color: 'white',
              fontSize: '0.85rem',
              outline: 'none'
            }}
          />
        </div>

        <div style={{ display: 'flex', alignItems: 'center', gap: '0.6rem', flexWrap: 'wrap' }}>
          {/* Gender Buttons */}
          <div style={{ display: 'flex', background: 'rgba(255,255,255,0.04)', padding: '2px', borderRadius: '8px', border: '1px solid var(--border-subtle)' }}>
            {(['ALL', 'Female', 'Male'] as const).map(g => (
              <button
                key={g}
                onClick={() => setGenderFilter(g)}
                style={{
                  padding: '0.35rem 0.75rem',
                  borderRadius: '6px',
                  border: 'none',
                  fontSize: '0.775rem',
                  fontWeight: 600,
                  cursor: 'pointer',
                  background: genderFilter === g ? 'var(--primary)' : 'transparent',
                  color: genderFilter === g ? 'white' : 'var(--text-muted)'
                }}
              >
                {g === 'ALL' ? 'All Genders' : `${g}s`}
              </button>
            ))}
          </div>

          {/* City Filter */}
          <select
            value={cityFilter}
            onChange={(e) => setCityFilter(e.target.value)}
            style={{
              padding: '0.45rem 0.75rem',
              borderRadius: '8px',
              background: 'rgba(255, 255, 255, 0.05)',
              border: '1px solid var(--border-subtle)',
              color: 'white',
              fontSize: '0.8rem',
              cursor: 'pointer'
            }}
          >
            <option value="ALL">All Cities ({uniqueCities.length})</option>
            {uniqueCities.map(c => (
              <option key={c} value={c}>{c}</option>
            ))}
          </select>

          {/* Diet Filter */}
          <select
            value={dietFilter}
            onChange={(e) => setDietFilter(e.target.value)}
            style={{
              padding: '0.45rem 0.75rem',
              borderRadius: '8px',
              background: 'rgba(255, 255, 255, 0.05)',
              border: '1px solid var(--border-subtle)',
              color: 'white',
              fontSize: '0.8rem',
              cursor: 'pointer'
            }}
          >
            <option value="ALL">All Diets</option>
            <option value="Vegetarian">Vegetarian</option>
            <option value="Non-Vegetarian">Non-Vegetarian</option>
            <option value="Jain">Jain</option>
            <option value="Eggetarian">Eggetarian</option>
          </select>
        </div>
      </div>

      {/* Candidates Grid */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(320px, 1fr))', gap: '1rem' }}>
        {filtered.map(cand => {
          const age = calculateAge(cand.dob);
          return (
            <div
              key={cand.id}
              className="glass-panel"
              onClick={() => onSelectCandidate(cand)}
              style={{
                padding: '1.25rem',
                cursor: 'pointer',
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'space-between',
                transition: 'all 0.2s ease'
              }}
            >
              <div>
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.85rem', marginBottom: '0.85rem' }}>
                  <img
                    src={cand.avatar_url || 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=160&auto=format&fit=crop&q=80'}
                    alt={cand.first_name}
                    style={{ width: 52, height: 52, borderRadius: '14px', objectFit: 'cover' }}
                  />
                  <div>
                    <h3 style={{ fontSize: '1.05rem', lineHeight: 1.2 }}>
                      {cand.first_name} {cand.last_name}
                    </h3>
                    <div style={{ fontSize: '0.8rem', color: 'var(--text-muted)', marginTop: '0.15rem' }}>
                      {cand.gender} • {age} yrs • {formatHeight(cand.height_cm)}
                    </div>
                  </div>
                </div>

                <div style={{ fontSize: '0.8rem', color: 'var(--text-muted)', display: 'flex', flexDirection: 'column', gap: '0.3rem', marginBottom: '0.85rem' }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                    <span style={{ color: 'white' }}>{cand.designation}</span>
                    <strong style={{ color: '#34d399' }}>{formatLPA(cand.income)}</strong>
                  </div>
                  <div style={{ color: 'var(--text-dim)' }}>{cand.company} • {cand.ug_college}</div>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '4px', color: 'var(--text-muted)' }}>
                    <MapPin size={12} color="var(--primary)" /> {cand.city}
                  </div>
                </div>
              </div>

              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', paddingTop: '0.65rem', borderTop: '1px solid rgba(255,255,255,0.06)', fontSize: '0.75rem' }}>
                <span style={{ color: 'var(--text-dim)' }}>
                  Diet: {cand.diet} | Kids: {cand.want_kids}
                </span>
                <span style={{ color: 'var(--primary)', fontWeight: 600, display: 'inline-flex', alignItems: 'center', gap: '2px' }}>
                  Inspect Biodata <ChevronRight size={14} />
                </span>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};
