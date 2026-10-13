import React, { useState, useEffect } from 'react';
import { 
  ArrowLeft, Sparkles, Send, MessageSquare, Save, CheckCircle, 
  MapPin, Briefcase, GraduationCap, Heart, AlertCircle, 
  Clock, Calendar, UserCheck, Shield, ChevronDown, Award, Mail
} from 'lucide-react';
import { User, ScoredCandidate, StatusTag, MatchAssignment } from '../types';
import { calculateAge, formatHeight, formatLPA, getRankedMatches } from '../services/matchEngine';
import { GeminiService } from '../services/geminiService';
import { DataService } from '../services/supabase';

interface CustomerDetailViewProps {
  client: User;
  allUsers: User[];
  onBack: () => void;
  onSendMatchClick: (client: User, candidate: User, initialPitch?: string) => void;
  onStartChat: (user1Id: string, user2Id: string) => void;
  onUpdateClientStatus: (clientId: string, newStatus: StatusTag) => void;
  onUpdateClientNotes: (clientId: string, notes: string) => void;
  sentAssignments?: MatchAssignment[];
}

export const CustomerDetailView: React.FC<CustomerDetailViewProps> = ({
  client,
  allUsers,
  onBack,
  onSendMatchClick,
  onStartChat,
  onUpdateClientStatus,
  onUpdateClientNotes,
  sentAssignments = []
}) => {
  const [activeTab, setActiveTab] = useState<'matches' | 'sent' | 'biodata' | 'notes'>('matches');
  const clientSentMatches = sentAssignments.filter(a => a.client_id === client.id);
  const [notes, setNotes] = useState(client.notes || '');
  const [isSavingNotes, setIsSavingNotes] = useState(false);
  const [noteSavedToast, setNoteSavedToast] = useState(false);
  const [rankedMatches, setRankedMatches] = useState<ScoredCandidate[]>([]);
  const [analyzingCandidateId, setAnalyzingCandidateId] = useState<string | null>(null);
  const [aiAnalysisMap, setAiAnalysisMap] = useState<Record<string, { reasoning: string; strengths: string[]; discussionPoints: string[] }>>({});

  const clientAge = calculateAge(client.dob);

  // Compute gender-specific ranked matches from pool
  useEffect(() => {
    const matches = getRankedMatches(client, allUsers);
    setRankedMatches(matches);
  }, [client, allUsers]);

  // Handle autosave notes
  const handleSaveNotes = async () => {
    setIsSavingNotes(true);
    await onUpdateClientNotes(client.id, notes);
    setIsSavingNotes(false);
    setNoteSavedToast(true);
    setTimeout(() => setNoteSavedToast(false), 2500);
  };

  const handleRunAiAnalysis = async (candidate: User, score: number) => {
    setAnalyzingCandidateId(candidate.id);
    try {
      const result = await GeminiService.analyzeMatchFit(client, candidate, score);
      setAiAnalysisMap(prev => ({
        ...prev,
        [candidate.id]: result
      }));
    } finally {
      setAnalyzingCandidateId(null);
    }
  };

  const oppositeGenderLabel = client.gender === 'Male' ? 'Female' : 'Male';

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
      {/* Top Header Card */}
      <div className="glass-panel" style={{ padding: '1.5rem' }}>
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: '1rem', marginBottom: '1.5rem' }}>
          <button
            onClick={onBack}
            className="btn-secondary"
            style={{ padding: '0.45rem 0.9rem', fontSize: '0.8rem' }}
          >
            <ArrowLeft size={16} />
            <span>Back to Client Roster</span>
          </button>

          <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
            <span style={{ fontSize: '0.8rem', color: 'var(--text-muted)' }}>Journey Stage:</span>
            <select
              value={client.status_tag}
              onChange={(e) => onUpdateClientStatus(client.id, e.target.value as StatusTag)}
              style={{
                padding: '0.45rem 1rem',
                borderRadius: '8px',
                background: 'rgba(255, 255, 255, 0.08)',
                border: '1px solid var(--border-subtle)',
                color: 'white',
                fontWeight: 600,
                fontSize: '0.85rem',
                cursor: 'pointer'
              }}
            >
              <option value="Active">Active Search</option>
              <option value="Onboarding">Onboarding</option>
              <option value="Matches Sent">Matches Sent</option>
              <option value="Meeting Scheduled">Meeting Scheduled</option>
              <option value="On Hold">On Hold</option>
              <option value="Archived">Archived</option>
            </select>

            <button
              onClick={() => onStartChat('00000000-0000-0000-0000-000000000001', client.id)}
              className="btn-secondary"
              style={{ padding: '0.45rem 0.9rem', fontSize: '0.8rem' }}
              title="Chat with this client as matchmaker"
            >
              <MessageSquare size={15} color="var(--primary)" />
              <span>Message Client</span>
            </button>
          </div>
        </div>

        {/* Client Snapshot Hero Banner */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '1.5rem', flexWrap: 'wrap' }}>
          <img
            src={client.avatar_url || 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=300&auto=format&fit=crop&q=80'}
            alt={client.first_name}
            style={{
              width: 90,
              height: 90,
              borderRadius: '24px',
              objectFit: 'cover',
              border: '3px solid rgba(244, 63, 94, 0.4)',
              boxShadow: '0 8px 25px rgba(244, 63, 94, 0.25)'
            }}
          />

          <div style={{ flex: '1 1 300px' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', flexWrap: 'wrap', marginBottom: '0.25rem' }}>
              <h1 style={{ fontSize: '1.75rem' }}>
                {client.first_name} {client.last_name}
              </h1>
              <span style={{ 
                padding: '3px 10px', 
                borderRadius: '6px', 
                fontSize: '0.75rem', 
                fontWeight: 700, 
                background: client.gender === 'Male' ? 'rgba(59, 130, 246, 0.2)' : 'rgba(236, 72, 153, 0.2)',
                color: client.gender === 'Male' ? '#60a5fa' : '#f472b6',
                border: client.gender === 'Male' ? '1px solid rgba(59, 130, 246, 0.3)' : '1px solid rgba(236, 72, 153, 0.3)'
              }}>
                {client.gender} • {clientAge} yrs • {formatHeight(client.height_cm)}
              </span>
            </div>

            <div style={{ display: 'flex', alignItems: 'center', gap: '1.25rem', flexWrap: 'wrap', color: 'var(--text-muted)', fontSize: '0.875rem' }}>
              <span style={{ display: 'inline-flex', alignItems: 'center', gap: '5px' }}>
                <MapPin size={15} color="var(--primary)" /> {client.city}, {client.country}
              </span>
              <span style={{ display: 'inline-flex', alignItems: 'center', gap: '5px' }}>
                <Briefcase size={15} color="var(--primary)" /> {client.designation} at {client.company} ({formatLPA(client.income)})
              </span>
              <span style={{ display: 'inline-flex', alignItems: 'center', gap: '5px' }}>
                <GraduationCap size={15} color="var(--primary)" /> {client.ug_college} ({client.ug_degree})
              </span>
            </div>
          </div>
        </div>

        {/* Navigation Tabs Inside Customer View */}
        <div style={{ display: 'flex', gap: '0.5rem', marginTop: '1.5rem', borderTop: '1px solid rgba(255,255,255,0.06)', paddingTop: '1rem' }}>
          <button
            onClick={() => setActiveTab('matches')}
            className={`nav-tab-btn ${activeTab === 'matches' ? 'active' : ''}`}
            style={{ borderRadius: '10px' }}
          >
            <Sparkles size={16} />
            <span>AI Suggested Matches ({rankedMatches.length})</span>
          </button>

          <button
            onClick={() => setActiveTab('sent')}
            className={`nav-tab-btn ${activeTab === 'sent' ? 'active' : ''}`}
            style={{ borderRadius: '10px' }}
          >
            <Send size={15} />
            <span>Sent Matches ({clientSentMatches.length})</span>
          </button>

          <button
            onClick={() => setActiveTab('biodata')}
            className={`nav-tab-btn ${activeTab === 'biodata' ? 'active' : ''}`}
            style={{ borderRadius: '10px' }}
          >
            <UserCheck size={16} />
            <span>Full Matrimonial Biodata</span>
          </button>

          <button
            onClick={() => setActiveTab('notes')}
            className={`nav-tab-btn ${activeTab === 'notes' ? 'active' : ''}`}
            style={{ borderRadius: '10px' }}
          >
            <Calendar size={16} />
            <span>Matchmaker Notes & Log</span>
          </button>
        </div>
      </div>

      {/* TAB 1: SUGGESTED MATCHES WITH GENDER-SPECIFIC ALGO & GEMINI AI */}
      {activeTab === 'matches' && (
        <div style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
          {/* Algorithm Info Banner */}
          <div 
            style={{ 
              background: 'linear-gradient(90deg, rgba(244, 63, 94, 0.1) 0%, rgba(99, 102, 241, 0.1) 100%)',
              border: '1px solid rgba(244, 63, 94, 0.2)',
              borderRadius: '12px',
              padding: '1rem 1.25rem',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
              flexWrap: 'wrap',
              gap: '1rem'
            }}
          >
            <div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', fontWeight: 700, fontSize: '0.95rem', color: '#fda4af' }}>
                <Award size={18} />
                <span>Active Gender Matching Algorithm: {client.gender} Client Rules</span>
              </div>
              <div style={{ fontSize: '0.8rem', color: 'var(--text-muted)', marginTop: '0.2rem' }}>
                {client.gender === 'Male' 
                  ? 'Filtering candidate pool for younger women, lower/complementary income, shorter height, and matching views on children.'
                  : 'Ranking candidate pool by profession & educational synergy, relocation flexibility, lifestyle harmony, and maturity dynamic.'}
              </div>
            </div>

            <div style={{ fontSize: '0.8rem', color: 'var(--text-dim)', textAlign: 'right' }}>
              Simulated Pool: <strong style={{ color: 'white' }}>{rankedMatches.length}</strong> {oppositeGenderLabel} Profiles
            </div>
          </div>

          {/* Cards of Ranked Matches */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
            {rankedMatches.slice(0, 20).map((item, idx) => {
              const { candidate, score, ratingTier, criteriaBreakdown, summaryReasons, frictionPoints } = item;
              const candAge = calculateAge(candidate.dob);
              const aiAnalysis = aiAnalysisMap[candidate.id];
              const isAnalyzing = analyzingCandidateId === candidate.id;

              return (
                <div 
                  key={candidate.id} 
                  className="glass-panel" 
                  style={{ 
                    padding: '1.5rem',
                    border: idx === 0 ? '1.5px solid rgba(244, 63, 94, 0.45)' : '1px solid var(--border-subtle)',
                    boxShadow: idx === 0 ? '0 0 30px rgba(244, 63, 94, 0.15)' : undefined
                  }}
                >
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', flexWrap: 'wrap', gap: '1rem', marginBottom: '1.25rem' }}>
                    <div style={{ display: 'flex', gap: '1.25rem', alignItems: 'flex-start' }}>
                      <img
                        src={candidate.avatar_url || 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=200&auto=format&fit=crop&q=80'}
                        alt={candidate.first_name}
                        style={{
                          width: 72,
                          height: 72,
                          borderRadius: '18px',
                          objectFit: 'cover',
                          border: '2px solid rgba(255, 255, 255, 0.12)'
                        }}
                      />

                      <div>
                        <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', flexWrap: 'wrap', marginBottom: '0.2rem' }}>
                          <h3 style={{ fontSize: '1.25rem' }}>
                            {candidate.first_name} {candidate.last_name}
                          </h3>
                          <span style={{ fontSize: '0.8rem', color: 'var(--text-muted)' }}>
                            • {candAge} yrs • {formatHeight(candidate.height_cm)} • {candidate.marital_status}
                          </span>
                        </div>

                        <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', fontSize: '0.85rem', color: 'var(--text-muted)', marginBottom: '0.4rem', flexWrap: 'wrap' }}>
                          <span style={{ color: '#34d399', fontWeight: 600 }}>{formatLPA(candidate.income)}</span>
                          <span>•</span>
                          <span>{candidate.designation} at <strong>{candidate.company}</strong></span>
                          <span>•</span>
                          <span>{candidate.ug_college}</span>
                        </div>

                        <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', fontSize: '0.775rem', color: 'var(--text-dim)', flexWrap: 'wrap' }}>
                          <span style={{ display: 'inline-flex', alignItems: 'center', gap: '2px' }}><MapPin size={12} /> {candidate.city}</span>
                          <span>•</span>
                          <span>Diet: {candidate.diet}</span>
                          <span>•</span>
                          <span>Kids: {candidate.want_kids}</span>
                          <span>•</span>
                          <span>Relocate: {candidate.open_to_relocate}</span>
                          <span>•</span>
                          <span>Pets: {candidate.open_to_pets}</span>
                        </div>
                      </div>
                    </div>

                    {/* Compatibility Score Pillar */}
                    <div style={{ textAlign: 'right', display: 'flex', flexDirection: 'column', alignItems: 'flex-end', gap: '0.35rem' }}>
                      <div 
                        style={{ 
                          fontSize: '1.75rem', 
                          fontWeight: 800, 
                          color: score >= 88 ? '#34d399' : (score >= 76 ? '#60a5fa' : '#fbbf24'),
                          display: 'flex',
                          alignItems: 'baseline',
                          gap: '2px'
                        }}
                      >
                        <span>{score}</span>
                        <span style={{ fontSize: '1rem', color: 'var(--text-muted)' }}>%</span>
                      </div>
                      <span 
                        style={{ 
                          fontSize: '0.75rem', 
                          fontWeight: 700, 
                          padding: '3px 10px', 
                          borderRadius: '9999px',
                          background: score >= 88 ? 'rgba(16, 185, 129, 0.15)' : (score >= 76 ? 'rgba(59, 130, 246, 0.15)' : 'rgba(245, 158, 11, 0.15)'),
                          color: score >= 88 ? '#34d399' : (score >= 76 ? '#60a5fa' : '#fbbf24'),
                          border: '1px solid rgba(255, 255, 255, 0.1)'
                        }}
                      >
                        {ratingTier}
                      </span>
                    </div>
                  </div>

                  {/* Summary Alignment Badges */}
                  <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.5rem', marginBottom: '1rem' }}>
                    {summaryReasons.map((reason, i) => (
                      <span
                        key={i}
                        style={{
                          fontSize: '0.75rem',
                          padding: '3px 9px',
                          borderRadius: '6px',
                          background: 'rgba(16, 185, 129, 0.1)',
                          border: '1px solid rgba(16, 185, 129, 0.25)',
                          color: '#6ee7b7',
                          display: 'inline-flex',
                          alignItems: 'center',
                          gap: '4px'
                        }}
                      >
                        <CheckCircle size={11} /> {reason}
                      </span>
                    ))}
                    {frictionPoints.map((f, i) => (
                      <span
                        key={`f-${i}`}
                        style={{
                          fontSize: '0.75rem',
                          padding: '3px 9px',
                          borderRadius: '6px',
                          background: 'rgba(239, 68, 68, 0.1)',
                          border: '1px solid rgba(239, 68, 68, 0.25)',
                          color: '#fca5a5',
                          display: 'inline-flex',
                          alignItems: 'center',
                          gap: '4px'
                        }}
                      >
                        <AlertCircle size={11} /> {f}
                      </span>
                    ))}
                  </div>

                  {/* Gemini AI Breakdown Area */}
                  {aiAnalysis && (
                    <div 
                      style={{ 
                        background: 'linear-gradient(135deg, rgba(79, 70, 229, 0.12) 0%, rgba(147, 51, 234, 0.12) 100%)',
                        border: '1px solid rgba(147, 51, 234, 0.3)',
                        borderRadius: '12px',
                        padding: '1rem',
                        marginBottom: '1rem'
                      }}
                    >
                      <div style={{ display: 'flex', alignItems: 'center', gap: '6px', fontSize: '0.85rem', fontWeight: 700, color: '#c084fc', marginBottom: '0.4rem' }}>
                        <Sparkles size={16} />
                        <span>AI Matchmaker Reasoning</span>
                      </div>
                      <p style={{ fontSize: '0.825rem', color: 'var(--text-main)', lineHeight: 1.5, marginBottom: '0.6rem' }}>
                        {aiAnalysis.reasoning}
                      </p>
                      
                      <div style={{ display: 'flex', flexDirection: 'column', gap: '0.35rem' }}>
                        <div style={{ fontSize: '0.75rem', color: '#e9d5ff', fontWeight: 600 }}>Key Strengths to Highlight to Client:</div>
                        {aiAnalysis.strengths.map((str, sIdx) => (
                          <div key={sIdx} style={{ fontSize: '0.775rem', color: 'var(--text-muted)', display: 'flex', alignItems: 'center', gap: '6px' }}>
                            <span style={{ color: '#a855f7' }}>•</span> {str}
                          </div>
                        ))}
                      </div>
                    </div>
                  )}

                  {/* Actions Row */}
                  <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: '0.75rem', paddingTop: '0.75rem', borderTop: '1px solid rgba(255,255,255,0.06)' }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                      <button
                        onClick={() => handleRunAiAnalysis(candidate, score)}
                        disabled={isAnalyzing}
                        className="btn-gemini"
                      >
                        <Sparkles size={15} />
                        <span>{isAnalyzing ? 'Analyzing via AI...' : (aiAnalysis ? 'Re-Analyze via AI' : 'Analyze via AI')}</span>
                      </button>

                      <button
                        onClick={() => onStartChat(client.id, candidate.id)}
                        className="btn-secondary"
                        style={{ padding: '0.55rem 1rem', fontSize: '0.825rem' }}
                        title="Simulate / test real-time chat between these 2 users"
                      >
                        <MessageSquare size={14} />
                        <span>Open 2-User Chat</span>
                      </button>
                    </div>

                    <button
                      onClick={() => onSendMatchClick(client, candidate, aiAnalysis?.reasoning)}
                      className="btn-primary"
                    >
                      <Send size={15} />
                      <span>Send Match to Client</span>
                    </button>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      )}

      {/* TAB: SENT MATCHES (MATCHES ALREADY DISPATCHED TO THIS CLIENT) */}
      {activeTab === 'sent' && (
        <div style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
          {clientSentMatches.length === 0 ? (
            <div className="glass-panel" style={{ padding: '3.5rem 2rem', textAlign: 'center' }}>
              <Send size={44} style={{ margin: '0 auto 1rem auto', color: 'var(--text-dim)', opacity: 0.5 }} />
              <h3 style={{ fontSize: '1.25rem', marginBottom: '0.5rem' }}>No Matches Sent Yet for {client.first_name}</h3>
              <p style={{ color: 'var(--text-muted)', fontSize: '0.875rem', maxWidth: '440px', margin: '0 auto 1.5rem auto' }}>
                Review candidate recommendations in the <strong>"AI Suggested Matches"</strong> tab and click <strong>"Send Match to Client"</strong> to dispatch a curated candidate.
              </p>
              <button onClick={() => setActiveTab('matches')} className="btn-primary" style={{ padding: '0.55rem 1.25rem', fontSize: '0.85rem' }}>
                <Sparkles size={15} />
                <span>Browse AI Suggested Matches</span>
              </button>
            </div>
          ) : (
            <div style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
              {clientSentMatches.map((assignment) => {
                const cand = allUsers.find(u => u.id === assignment.suggested_match_id);
                const candAge = cand ? calculateAge(cand.dob) : 28;
                const sentTime = new Date(assignment.created_at).toLocaleDateString('en-IN', {
                  month: 'short',
                  day: 'numeric',
                  year: 'numeric',
                  hour: '2-digit',
                  minute: '2-digit'
                });

                return (
                  <div key={assignment.id} className="glass-panel" style={{ padding: '1.5rem', border: '1px solid rgba(244, 63, 94, 0.3)' }}>
                    <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '1rem', paddingBottom: '0.75rem', borderBottom: '1px solid rgba(255, 255, 255, 0.06)' }}>
                      <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', fontSize: '0.8rem', color: 'var(--text-dim)' }}>
                        <Clock size={14} />
                        <span>Dispatched on <strong>{sentTime}</strong></span>
                      </div>
                      <span className="badge badge-sent" style={{ padding: '3px 10px', fontSize: '0.75rem' }}>
                        <CheckCircle size={12} /> Dispatched to Client
                      </span>
                    </div>

                    {cand ? (
                      <div style={{ display: 'flex', gap: '1.25rem', alignItems: 'flex-start', marginBottom: '1.25rem', flexWrap: 'wrap' }}>
                        <img
                          src={cand.avatar_url || 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=200&auto=format&fit=crop&q=80'}
                          alt={cand.first_name}
                          style={{ width: 68, height: 68, borderRadius: '16px', objectFit: 'cover', border: '2px solid rgba(244, 63, 94, 0.4)' }}
                        />
                        <div style={{ flex: 1 }}>
                          <h3 style={{ fontSize: '1.2rem', marginBottom: '0.2rem' }}>
                            {cand.first_name} {cand.last_name}
                          </h3>
                          <div style={{ fontSize: '0.85rem', color: 'var(--text-muted)', marginBottom: '0.35rem' }}>
                            {cand.gender} • {candAge} yrs • {formatHeight(cand.height_cm)} • {cand.city}
                          </div>
                          <div style={{ fontSize: '0.8rem', color: '#34d399', fontWeight: 600 }}>
                            {formatLPA(cand.income)} • {cand.designation} at {cand.company}
                          </div>
                        </div>
                      </div>
                    ) : (
                      <div style={{ color: 'var(--text-dim)', fontSize: '0.85rem', marginBottom: '1rem' }}>
                        Candidate ID: {assignment.suggested_match_id}
                      </div>
                    )}

                    {assignment.pitch_note && (
                      <div style={{ background: 'rgba(255, 255, 255, 0.03)', borderRadius: '10px', padding: '1rem', border: '1px solid rgba(255, 255, 255, 0.08)', marginBottom: '1rem' }}>
                        <div style={{ fontSize: '0.75rem', fontWeight: 700, color: 'var(--text-dim)', textTransform: 'uppercase', marginBottom: '0.5rem', display: 'flex', alignItems: 'center', gap: '4px' }}>
                          <Mail size={13} color="var(--primary)" />
                          <span>Sent Pitch Email Note:</span>
                        </div>
                        <div style={{ fontSize: '0.825rem', color: 'var(--text-main)', lineHeight: 1.6, whiteSpace: 'pre-wrap' }}>
                          {assignment.pitch_note}
                        </div>
                      </div>
                    )}

                    <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'flex-end', gap: '0.75rem' }}>
                      {cand && (
                        <button
                          onClick={() => onStartChat(client.id, cand.id)}
                          className="btn-secondary"
                          style={{ padding: '0.45rem 1rem', fontSize: '0.8rem' }}
                        >
                          <MessageSquare size={14} />
                          <span>Chat Between Client & Candidate</span>
                        </button>
                      )}
                    </div>
                  </div>
                );
              })}
            </div>
          )}
        </div>
      )}

      {/* TAB 2: FULL MATRIMONIAL BIODATA DOSSIER */}
      {activeTab === 'biodata' && (
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))', gap: '1.25rem' }}>
          {/* Card 1: Personal & Contact */}
          <div className="glass-panel" style={{ padding: '1.5rem' }}>
            <h3 style={{ fontSize: '1.1rem', marginBottom: '1rem', color: '#fb7185', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
              <Heart size={18} />
              <span>Personal & Contact Info</span>
            </h3>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem', fontSize: '0.85rem' }}>
              <div><span style={{ color: 'var(--text-dim)' }}>Full Name:</span> <strong>{client.first_name} {client.last_name}</strong></div>
              <div><span style={{ color: 'var(--text-dim)' }}>Gender:</span> <strong>{client.gender}</strong></div>
              <div><span style={{ color: 'var(--text-dim)' }}>Date of Birth:</span> <strong>{client.dob} ({clientAge} years)</strong></div>
              <div><span style={{ color: 'var(--text-dim)' }}>Height:</span> <strong>{formatHeight(client.height_cm)}</strong></div>
              <div><span style={{ color: 'var(--text-dim)' }}>Location:</span> <strong>{client.city}, {client.country}</strong></div>
              <div><span style={{ color: 'var(--text-dim)' }}>Email:</span> <strong>{client.email}</strong></div>
              <div><span style={{ color: 'var(--text-dim)' }}>Phone Number:</span> <strong>{client.phone || 'Available on file'}</strong></div>
            </div>
          </div>

          {/* Card 2: Education & Career */}
          <div className="glass-panel" style={{ padding: '1.5rem' }}>
            <h3 style={{ fontSize: '1.1rem', marginBottom: '1rem', color: '#60a5fa', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
              <GraduationCap size={18} />
              <span>Education & Career</span>
            </h3>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem', fontSize: '0.85rem' }}>
              <div><span style={{ color: 'var(--text-dim)' }}>Undergrad College:</span> <strong>{client.ug_college || 'Not disclosed'}</strong></div>
              <div><span style={{ color: 'var(--text-dim)' }}>Degree:</span> <strong>{client.ug_degree || 'Bachelors'}</strong></div>
              <div><span style={{ color: 'var(--text-dim)' }}>Current Company:</span> <strong>{client.company || 'Corporate'}</strong></div>
              <div><span style={{ color: 'var(--text-dim)' }}>Designation:</span> <strong>{client.designation || 'Specialist'}</strong></div>
              <div><span style={{ color: 'var(--text-dim)' }}>Annual Income:</span> <strong style={{ color: '#34d399' }}>{formatLPA(client.income)}</strong></div>
            </div>
          </div>

          {/* Card 3: Cultural & Family Specifics */}
          <div className="glass-panel" style={{ padding: '1.5rem' }}>
            <h3 style={{ fontSize: '1.1rem', marginBottom: '1rem', color: '#fbbf24', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
              <Shield size={18} />
              <span>Cultural & Family Details</span>
            </h3>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem', fontSize: '0.85rem' }}>
              <div><span style={{ color: 'var(--text-dim)' }}>Marital Status:</span> <strong>{client.marital_status}</strong></div>
              <div><span style={{ color: 'var(--text-dim)' }}>Religion:</span> <strong>{client.religion || 'Hindu'}</strong></div>
              <div><span style={{ color: 'var(--text-dim)' }}>Caste:</span> <strong>{client.caste || 'Open / No barrier'}</strong></div>
              <div><span style={{ color: 'var(--text-dim)' }}>Languages Known:</span> <strong>{client.languages?.join(', ') || 'English, Hindi'}</strong></div>
              <div><span style={{ color: 'var(--text-dim)' }}>Siblings:</span> <strong>{client.siblings || 'None'}</strong></div>
              <div><span style={{ color: 'var(--text-dim)' }}>Kundli / Manglik:</span> <strong>{client.manglik || 'No'}</strong></div>
            </div>
          </div>

          {/* Card 4: Lifestyle & Future Outlook */}
          <div className="glass-panel" style={{ padding: '1.5rem' }}>
            <h3 style={{ fontSize: '1.1rem', marginBottom: '1rem', color: '#34d399', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
              <Sparkles size={18} />
              <span>Lifestyle & Partner Criteria</span>
            </h3>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem', fontSize: '0.85rem' }}>
              <div><span style={{ color: 'var(--text-dim)' }}>Diet:</span> <strong>{client.diet}</strong></div>
              <div><span style={{ color: 'var(--text-dim)' }}>Drinking Habits:</span> <strong>{client.drinking}</strong></div>
              <div><span style={{ color: 'var(--text-dim)' }}>Smoking Habits:</span> <strong>{client.smoking}</strong></div>
              <div><span style={{ color: 'var(--text-dim)' }}>Want Kids:</span> <strong>{client.want_kids}</strong></div>
              <div><span style={{ color: 'var(--text-dim)' }}>Open to Relocate:</span> <strong>{client.open_to_relocate}</strong></div>
              <div><span style={{ color: 'var(--text-dim)' }}>Open to Pets:</span> <strong>{client.open_to_pets}</strong></div>
              {client.about_me && (
                <div style={{ marginTop: '0.5rem', paddingTop: '0.5rem', borderTop: '1px solid rgba(255,255,255,0.06)' }}>
                  <span style={{ color: 'var(--text-dim)' }}>About:</span>
                  <p style={{ marginTop: '0.2rem', color: 'var(--text-main)', fontStyle: 'italic' }}>"{client.about_me}"</p>
                </div>
              )}
            </div>
          </div>
        </div>
      )}

      {/* TAB 3: MATCHMAKER NOTES & CALL LOGS */}
      {activeTab === 'notes' && (
        <div className="glass-panel" style={{ padding: '1.75rem' }}>
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '1rem' }}>
            <div>
              <h3 style={{ fontSize: '1.25rem', marginBottom: '0.2rem' }}>Matchmaker Notes & Call Logs</h3>
              <p style={{ fontSize: '0.8rem', color: 'var(--text-muted)' }}>
                Internal confidential notes from onboarding intake, phone meetings, and client feedback.
              </p>
            </div>

            <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
              <button
                onClick={() => {
                  const timestamp = new Date().toLocaleDateString('en-IN', { month: 'short', day: 'numeric', year: 'numeric' });
                  setNotes(prev => `[Call Log - ${timestamp}]: \n${prev}`);
                }}
                className="btn-secondary"
                style={{ fontSize: '0.8rem', padding: '0.45rem 0.85rem' }}
              >
                + Add Timestamp
              </button>

              <button
                onClick={handleSaveNotes}
                disabled={isSavingNotes}
                className="btn-primary"
                style={{ fontSize: '0.8rem', padding: '0.45rem 1rem' }}
              >
                <Save size={15} />
                <span>{isSavingNotes ? 'Saving...' : 'Save Notes'}</span>
              </button>
            </div>
          </div>

          {noteSavedToast && (
            <div style={{ background: 'rgba(16, 185, 129, 0.15)', border: '1px solid rgba(16, 185, 129, 0.3)', color: '#34d399', padding: '0.6rem 1rem', borderRadius: '8px', fontSize: '0.85rem', marginBottom: '1rem', display: 'flex', alignItems: 'center', gap: '6px' }}>
              <CheckCircle size={16} />
              <span>Notes updated successfully in database!</span>
            </div>
          )}

          <textarea
            value={notes}
            onChange={(e) => setNotes(e.target.value)}
            rows={10}
            placeholder="Record client nuances, call takeaways, non-negotiables, family background, or meeting impressions..."
            style={{
              width: '100%',
              padding: '1rem',
              borderRadius: '12px',
              background: 'rgba(255, 255, 255, 0.04)',
              border: '1px solid var(--border-subtle)',
              color: 'white',
              fontSize: '0.9rem',
              lineHeight: 1.6,
              outline: 'none',
              resize: 'vertical'
            }}
          />
        </div>
      )}
    </div>
  );
};
