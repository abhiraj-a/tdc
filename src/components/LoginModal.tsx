import React, { useState } from 'react';
import { Lock, Mail, HeartHandshake, ShieldCheck, ArrowRight, Loader2, KeyRound } from 'lucide-react';

interface LoginModalProps {
  onLogin: (email: string, pass: string) => Promise<{ success: boolean; error?: string }>;
}

export const LoginModal: React.FC<LoginModalProps> = ({ onLogin }) => {
  const [email, setEmail] = useState('admin@tdc.com');
  const [password, setPassword] = useState('admin123');
  const [error, setError] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setIsSubmitting(true);

    try {
      const res = await onLogin(email, password);
      if (!res.success) {
        setError(res.error || 'Authentication failed. Please verify credentials.');
      }
    } catch (err: any) {
      setError(err?.message || 'Connection to Supabase failed. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleUseDemo = async () => {
    setEmail('admin@tdc.com');
    setPassword('admin123');
    setError('');
    setIsSubmitting(true);

    try {
      const res = await onLogin('admin@tdc.com', 'admin123');
      if (!res.success) {
        setError(res.error || 'Authentication failed.');
      }
    } catch (err: any) {
      setError(err?.message || 'Authentication error.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="modal-overlay" style={{ backdropFilter: 'blur(8px)', background: 'rgba(5, 8, 16, 0.88)' }}>
      <div 
        className="modal-content" 
        style={{ 
          maxWidth: '460px', 
          width: '100%',
          padding: '2.5rem', 
          background: 'linear-gradient(180deg, #131c2e 0%, #0d1320 100%)',
          border: '1px solid rgba(244, 63, 94, 0.3)',
          boxShadow: '0 25px 70px rgba(0, 0, 0, 0.8), 0 0 35px rgba(244, 63, 94, 0.2)',
          borderRadius: '20px'
        }}
      >
        <div style={{ textAlign: 'center', marginBottom: '1.75rem' }}>
          <div 
            style={{ 
              width: 58, 
              height: 58, 
              borderRadius: 18, 
              background: 'linear-gradient(135deg, #f43f5e, #fb7185)', 
              display: 'inline-flex', 
              alignItems: 'center', 
              justifyContent: 'center',
              boxShadow: '0 8px 25px rgba(244, 63, 94, 0.45)',
              marginBottom: '1rem',
              color: 'white'
            }}
          >
            <HeartHandshake size={32} />
          </div>
          <h2 style={{ fontSize: '1.65rem', fontWeight: 700, marginBottom: '0.4rem', color: '#f8fafc' }}>
            TDC Admin Portal
          </h2>
          <p style={{ color: 'var(--text-muted)', fontSize: '0.875rem' }}>
            Protected Matchmaker OS & Algo Recommendation Suite
          </p>
        </div>

        {/* Security Badge Indicator */}
        <div 
          style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            gap: '0.5rem',
            padding: '0.5rem 0.85rem',
            background: 'rgba(16, 185, 129, 0.08)',
            border: '1px solid rgba(16, 185, 129, 0.2)',
            borderRadius: '10px',
            fontSize: '0.78rem',
            color: '#34d399',
            marginBottom: '1.5rem'
          }}
        >
          <ShieldCheck size={15} />
          <span>Secured with Supabase Auth & Session Verification</span>
        </div>

        {error && (
          <div style={{ 
            background: 'rgba(239, 68, 68, 0.15)', 
            border: '1px solid rgba(239, 68, 68, 0.3)', 
            color: '#f87171', 
            padding: '0.85rem', 
            borderRadius: '10px', 
            fontSize: '0.825rem',
            marginBottom: '1.25rem',
            lineHeight: 1.45,
            textAlign: 'left'
          }}>
            <strong style={{ display: 'block', marginBottom: '0.2rem' }}>Authentication Notice:</strong>
            {error}
          </div>
        )}

        <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
          <div>
            <label style={{ display: 'block', fontSize: '0.78rem', fontWeight: 600, color: 'var(--text-muted)', marginBottom: '0.45rem', letterSpacing: '0.04em' }}>
              ADMIN EMAIL ADDRESS
            </label>
            <div style={{ position: 'relative' }}>
              <Mail size={16} style={{ position: 'absolute', left: 14, top: '50%', transform: 'translateY(-50%)', color: 'var(--text-dim)' }} />
              <input
                type="email"
                required
                disabled={isSubmitting}
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="admin@tdc.com"
                style={{
                  width: '100%',
                  padding: '0.75rem 0.85rem 0.75rem 2.5rem',
                  background: 'rgba(255, 255, 255, 0.05)',
                  border: '1px solid var(--border-subtle)',
                  borderRadius: '10px',
                  color: 'white',
                  fontSize: '0.9rem',
                  outline: 'none',
                  transition: 'border-color 0.2s'
                }}
              />
            </div>
          </div>

          <div>
            <label style={{ display: 'block', fontSize: '0.78rem', fontWeight: 600, color: 'var(--text-muted)', marginBottom: '0.45rem', letterSpacing: '0.04em' }}>
              PASSWORD
            </label>
            <div style={{ position: 'relative' }}>
              <Lock size={16} style={{ position: 'absolute', left: 14, top: '50%', transform: 'translateY(-50%)', color: 'var(--text-dim)' }} />
              <input
                type="password"
                required
                disabled={isSubmitting}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="••••••••"
                style={{
                  width: '100%',
                  padding: '0.75rem 0.85rem 0.75rem 2.5rem',
                  background: 'rgba(255, 255, 255, 0.05)',
                  border: '1px solid var(--border-subtle)',
                  borderRadius: '10px',
                  color: 'white',
                  fontSize: '0.9rem',
                  outline: 'none',
                  transition: 'border-color 0.2s'
                }}
              />
            </div>
          </div>

          <button 
            type="submit" 
            disabled={isSubmitting}
            className="btn-primary" 
            style={{ 
              width: '100%', 
              padding: '0.85rem', 
              marginTop: '0.35rem', 
              fontSize: '0.95rem',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              gap: '0.5rem',
              opacity: isSubmitting ? 0.75 : 1,
              cursor: isSubmitting ? 'not-allowed' : 'pointer'
            }}
          >
            {isSubmitting ? (
              <>
                <Loader2 size={18} className="spin-icon" style={{ animation: 'spin 1s linear infinite' }} />
                <span>Authenticating with Supabase...</span>
              </>
            ) : (
              <>
                <span>Sign In to Admin Dashboard</span>
                <ArrowRight size={18} />
              </>
            )}
          </button>
        </form>

        <div style={{ marginTop: '1.5rem', textAlign: 'center', borderTop: '1px solid rgba(255, 255, 255, 0.08)', paddingTop: '1.25rem' }}>
          <button
            type="button"
            disabled={isSubmitting}
            onClick={handleUseDemo}
            style={{
              background: 'rgba(244, 63, 94, 0.08)',
              border: '1px solid rgba(244, 63, 94, 0.25)',
              color: '#fda4af',
              padding: '0.6rem 1.1rem',
              borderRadius: '9px',
              fontSize: '0.825rem',
              fontWeight: 600,
              cursor: isSubmitting ? 'not-allowed' : 'pointer',
              display: 'inline-flex',
              alignItems: 'center',
              gap: '0.5rem',
              transition: 'all 0.2s'
            }}
          >
            <KeyRound size={15} />
            <span>Admin Quick Credentials (admin@tdc.com)</span>
          </button>
        </div>
      </div>
    </div>
  );
};
