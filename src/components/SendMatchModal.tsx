import React, { useState, useEffect } from 'react';
import { X, Send, Sparkles, Mail, CheckCircle2, UserCheck, Briefcase, MapPin, GraduationCap } from 'lucide-react';
import confetti from 'canvas-confetti';
import { User } from '../types';
import { calculateAge, formatHeight, formatLPA } from '../services/matchEngine';
import { GeminiService } from '../services/geminiService';

interface SendMatchModalProps {
  client: User;
  candidate: User;
  initialReasoning?: string;
  onClose: () => void;
  onConfirmSend: (client: User, candidate: User, pitchNote: string) => Promise<void>;
}

export const SendMatchModal: React.FC<SendMatchModalProps> = ({
  client,
  candidate,
  initialReasoning,
  onClose,
  onConfirmSend
}) => {
  const [subject, setSubject] = useState('');
  const [body, setBody] = useState('');
  const [isGeneratingAi, setIsGeneratingAi] = useState(false);
  const [isSending, setIsSending] = useState(false);
  const [sentSuccess, setSentSuccess] = useState(false);

  const candidateAge = calculateAge(candidate.dob);

  // Load initial AI email draft
  useEffect(() => {
    let isMounted = true;
    async function loadDraft() {
      setIsGeneratingAi(true);
      const draft = await GeminiService.generatePersonalizedIntroEmail(client, candidate, 'admintdc');
      if (isMounted) {
        setSubject(draft.subject);
        setBody(draft.body);
        setIsGeneratingAi(false);
      }
    }
    loadDraft();
    return () => { isMounted = false; };
  }, [client, candidate]);

  const handleRegenerateAi = async () => {
    setIsGeneratingAi(true);
    const draft = await GeminiService.generatePersonalizedIntroEmail(client, candidate, 'admintdc');
    setSubject(draft.subject);
    setBody(draft.body);
    setIsGeneratingAi(false);
  };

  const handleSend = async () => {
    setIsSending(true);
    try {
      await onConfirmSend(client, candidate, body);
      
      // Fire celebratory confetti!
      confetti({
        particleCount: 80,
        spread: 60,
        origin: { y: 0.6 }
      });

      setSentSuccess(true);
      setTimeout(() => {
        onClose();
      }, 1800);
    } finally {
      setIsSending(false);
    }
  };

  return (
    <div className="modal-overlay">
      <div 
        className="modal-content" 
        style={{ 
          maxWidth: '680px', 
          border: '1px solid rgba(244, 63, 94, 0.3)',
          boxShadow: '0 25px 60px rgba(0, 0, 0, 0.8), 0 0 35px rgba(244, 63, 94, 0.15)' 
        }}
      >
        {/* Header */}
        <div 
          style={{ 
            padding: '1.25rem 1.5rem', 
            borderBottom: '1px solid var(--border-subtle)', 
            display: 'flex', 
            alignItems: 'center', 
            justifyContent: 'space-between',
            background: 'rgba(255, 255, 255, 0.02)'
          }}
        >
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.6rem' }}>
            <div style={{ width: 34, height: 34, borderRadius: 10, background: 'linear-gradient(135deg, var(--primary), #e11d48)', display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'white' }}>
              <Mail size={18} />
            </div>
            <div>
              <h2 style={{ fontSize: '1.2rem', lineHeight: 1.2 }}>Send Curated Match to Client</h2>
              <p style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>Email dispatch preview with verified biodata attachment</p>
            </div>
          </div>

          <button 
            onClick={onClose}
            style={{ background: 'transparent', border: 'none', color: 'var(--text-muted)', cursor: 'pointer', padding: '0.25rem' }}
          >
            <X size={20} />
          </button>
        </div>

        {sentSuccess ? (
          <div style={{ padding: '3rem', textAlign: 'center' }}>
            <div style={{ width: 64, height: 64, borderRadius: '50%', background: 'rgba(16, 185, 129, 0.15)', color: '#34d399', display: 'inline-flex', alignItems: 'center', justifyContent: 'center', marginBottom: '1rem' }}>
              <CheckCircle2 size={36} />
            </div>
            <h3 style={{ fontSize: '1.4rem', marginBottom: '0.5rem', color: 'white' }}>Match Email Dispatched!</h3>
            <p style={{ color: 'var(--text-muted)', fontSize: '0.9rem' }}>
              Introduction blurb & biodata dossier successfully sent to <strong>{client.first_name} {client.last_name}</strong>.
            </p>
            <div style={{ marginTop: '1rem', fontSize: '0.8rem', color: '#34d399' }}>
              Client pipeline tag updated to "Matches Sent".
            </div>
          </div>
        ) : (
          <div style={{ padding: '1.5rem', display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
            {/* Candidate Attachment Card */}
            <div 
              style={{ 
                background: 'rgba(255, 255, 255, 0.03)', 
                border: '1px solid var(--border-subtle)', 
                borderRadius: '12px', 
                padding: '1rem',
                display: 'flex',
                alignItems: 'center',
                gap: '1rem'
              }}
            >
              <img
                src={candidate.avatar_url || 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=200&auto=format&fit=crop&q=80'}
                alt={candidate.first_name}
                style={{ width: 60, height: 60, borderRadius: '14px', objectFit: 'cover', border: '2px solid rgba(255, 255, 255, 0.1)' }}
              />
              <div style={{ flex: 1 }}>
                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                  <h4 style={{ fontSize: '1.05rem', color: 'white' }}>
                    {candidate.first_name} {candidate.last_name}
                  </h4>
                  <span style={{ fontSize: '0.75rem', color: '#34d399', fontWeight: 700 }}>
                    {formatLPA(candidate.income)}
                  </span>
                </div>
                <div style={{ fontSize: '0.8rem', color: 'var(--text-muted)', marginTop: '0.15rem' }}>
                  {candidateAge} yrs • {formatHeight(candidate.height_cm)} • {candidate.city} • {candidate.designation} at {candidate.company}
                </div>
                <div style={{ fontSize: '0.75rem', color: 'var(--text-dim)', marginTop: '0.25rem' }}>
                  Diet: {candidate.diet} | Kids: {candidate.want_kids} | Relocate: {candidate.open_to_relocate}
                </div>
              </div>
            </div>

            {/* Email Metadata Form */}
            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.85rem' }}>
              <div style={{ display: 'grid', gridTemplateColumns: '100px 1fr', alignItems: 'center', fontSize: '0.85rem' }}>
                <span style={{ color: 'var(--text-dim)' }}>RECIPIENT:</span>
                <span style={{ color: 'white', fontWeight: 600 }}>{client.first_name} {client.last_name} &lt;{client.email}&gt;</span>
              </div>

              <div style={{ display: 'grid', gridTemplateColumns: '100px 1fr', alignItems: 'center', fontSize: '0.85rem' }}>
                <span style={{ color: 'var(--text-dim)' }}>SENDER:</span>
                <span style={{ color: 'white' }}>admintdc &lt;admin@tdc.com&gt; (Lead Matchmaker)</span>
              </div>

              <div>
                <label style={{ display: 'block', fontSize: '0.75rem', color: 'var(--text-dim)', marginBottom: '0.35rem', fontWeight: 600 }}>
                  EMAIL SUBJECT:
                </label>
                <input
                  type="text"
                  value={subject}
                  onChange={(e) => setSubject(e.target.value)}
                  style={{
                    width: '100%',
                    padding: '0.6rem 0.75rem',
                    background: 'rgba(255, 255, 255, 0.05)',
                    border: '1px solid var(--border-subtle)',
                    borderRadius: '8px',
                    color: 'white',
                    fontSize: '0.875rem',
                    outline: 'none'
                  }}
                />
              </div>

              <div>
                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '0.35rem' }}>
                  <label style={{ fontSize: '0.75rem', color: 'var(--text-dim)', fontWeight: 600 }}>
                    PERSONALIZED MATCHMAKER INTRO PITCH (AI GENERATED):
                  </label>
                  <button
                    type="button"
                    onClick={handleRegenerateAi}
                    disabled={isGeneratingAi}
                    style={{
                      background: 'none',
                      border: 'none',
                      color: '#c084fc',
                      fontSize: '0.75rem',
                      display: 'inline-flex',
                      alignItems: 'center',
                      gap: '4px',
                      cursor: 'pointer'
                    }}
                  >
                    <Sparkles size={13} />
                    <span>{isGeneratingAi ? 'Regenerating...' : 'Regenerate via AI'}</span>
                  </button>
                </div>
                <textarea
                  rows={8}
                  value={body}
                  onChange={(e) => setBody(e.target.value)}
                  style={{
                    width: '100%',
                    padding: '0.75rem',
                    background: 'rgba(255, 255, 255, 0.05)',
                    border: '1px solid var(--border-subtle)',
                    borderRadius: '8px',
                    color: 'white',
                    fontSize: '0.85rem',
                    lineHeight: 1.5,
                    outline: 'none',
                    resize: 'vertical'
                  }}
                />
              </div>
            </div>

            {/* Modal Actions */}
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'flex-end', gap: '0.75rem', paddingTop: '0.75rem', borderTop: '1px solid var(--border-subtle)' }}>
              <button
                type="button"
                onClick={onClose}
                className="btn-secondary"
                style={{ padding: '0.6rem 1.25rem' }}
              >
                Cancel
              </button>

              <button
                type="button"
                onClick={handleSend}
                disabled={isSending}
                className="btn-primary"
                style={{ padding: '0.6rem 1.5rem' }}
              >
                <Send size={16} />
                <span>{isSending ? 'Sending Match...' : 'Send Match Now'}</span>
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
