import React, { useState, useEffect, useRef } from 'react';
import { 
  Send, MessageSquare, ArrowLeftRight, Search, 
  Check, CheckCheck, MapPin, Briefcase, Sparkles, User as UserIcon
} from 'lucide-react';
import { User, Message } from '../types';
import { DataService } from '../services/supabase';
import { calculateAge } from '../services/matchEngine';

interface ChatMessengerViewProps {
  users: User[];
  defaultSenderId?: string;
  defaultReceiverId?: string;
  onViewUserProfile?: (user: User) => void;
}

export const ChatMessengerView: React.FC<ChatMessengerViewProps> = ({
  users,
  defaultSenderId,
  defaultReceiverId,
  onViewUserProfile
}) => {
  // Find initial users (exclude general matchmaker if pairing 2 clients, or include them)
  const [senderId, setSenderId] = useState<string>(
    defaultSenderId || users.find(u => u.role === 'client')?.id || users[0]?.id || ''
  );
  
  const [receiverId, setReceiverId] = useState<string>(
    defaultReceiverId || users.find(u => u.id !== senderId && u.role === 'client')?.id || users[1]?.id || ''
  );

  const [messages, setMessages] = useState<Message[]>([]);
  const [inputText, setInputText] = useState('');
  const [isSending, setIsSending] = useState(false);
  const [searchContact, setSearchContact] = useState('');
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const sender = users.find(u => u.id === senderId);
  const receiver = users.find(u => u.id === receiverId);

  // Load conversation between sender and receiver
  useEffect(() => {
    if (!senderId || !receiverId) return;

    let isMounted = true;
    async function loadChat() {
      const msgs = await DataService.getMessages(senderId, receiverId);
      if (isMounted) {
        setMessages(msgs);
        scrollToBottom();
      }
    }

    loadChat();

    // Subscribe to real-time incoming messages
    const unsubscribe = DataService.subscribeToMessages((newMsg) => {
      if (
        (newMsg.sender_id === senderId && newMsg.receiver_id === receiverId) ||
        (newMsg.sender_id === receiverId && newMsg.receiver_id === senderId)
      ) {
        setMessages(prev => {
          if (prev.some(m => m.id === newMsg.id)) return prev;
          return [...prev, newMsg];
        });
        scrollToBottom();
      }
    });

    return () => {
      isMounted = false;
      unsubscribe();
    };
  }, [senderId, receiverId]);

  const scrollToBottom = () => {
    setTimeout(() => {
      messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
    }, 50);
  };

  const handleSendMessage = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!inputText.trim() || !senderId || !receiverId || isSending) return;

    const text = inputText.trim();
    setInputText('');
    setIsSending(true);

    try {
      const created = await DataService.sendMessage(senderId, receiverId, text);
      setMessages(prev => {
        if (prev.some(m => m.id === created.id)) return prev;
        return [...prev, created];
      });
      scrollToBottom();
    } finally {
      setIsSending(false);
    }
  };

  const handleSwapUsers = () => {
    const temp = senderId;
    setSenderId(receiverId);
    setReceiverId(temp);
  };

  // Contacts list (users eligible to chat with)
  const contactCandidates = users.filter(u => {
    if (u.id === senderId) return false;
    const nameMatch = `${u.first_name} ${u.last_name}`.toLowerCase().includes(searchContact.toLowerCase());
    const cityMatch = u.city?.toLowerCase().includes(searchContact.toLowerCase());
    return nameMatch || cityMatch;
  });

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem', height: 'calc(100vh - 120px)' }}>
      {/* Perspective Switcher Controls Banner */}
      <div 
        className="glass-panel" 
        style={{ 
          padding: '0.85rem 1.25rem', 
          display: 'flex', 
          alignItems: 'center', 
          justifyContent: 'space-between', 
          flexWrap: 'wrap', 
          gap: '1rem' 
        }}
      >
        <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', flexWrap: 'wrap' }}>
          {/* User A Selector */}
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
            <span style={{ fontSize: '0.75rem', fontWeight: 700, color: 'var(--text-dim)', textTransform: 'uppercase' }}>
              Chatting As:
            </span>
            <select
              value={senderId}
              onChange={(e) => setSenderId(e.target.value)}
              style={{
                padding: '0.4rem 0.75rem',
                borderRadius: '8px',
                background: 'rgba(244, 63, 94, 0.15)',
                border: '1px solid rgba(244, 63, 94, 0.3)',
                color: '#fda4af',
                fontWeight: 600,
                fontSize: '0.85rem',
                cursor: 'pointer'
              }}
            >
              {users.map(u => (
                <option key={`sender-${u.id}`} value={u.id}>
                  {u.first_name} {u.last_name} ({u.role === 'matchmaker' ? 'Lead Matchmaker' : `${u.gender}, ${u.city}`})
                </option>
              ))}
            </select>
          </div>

          {/* Swap Button */}
          <button
            onClick={handleSwapUsers}
            className="btn-secondary"
            style={{ padding: '0.4rem 0.75rem', fontSize: '0.75rem' }}
            title="Swap typing perspective"
          >
            <ArrowLeftRight size={14} />
            <span>Swap Perspectives</span>
          </button>

          {/* User B Selector */}
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
            <span style={{ fontSize: '0.75rem', fontWeight: 700, color: 'var(--text-dim)', textTransform: 'uppercase' }}>
              With:
            </span>
            <select
              value={receiverId}
              onChange={(e) => setReceiverId(e.target.value)}
              style={{
                padding: '0.4rem 0.75rem',
                borderRadius: '8px',
                background: 'rgba(255, 255, 255, 0.06)',
                border: '1px solid var(--border-subtle)',
                color: 'white',
                fontWeight: 600,
                fontSize: '0.85rem',
                cursor: 'pointer'
              }}
            >
              {users.filter(u => u.id !== senderId).map(u => (
                <option key={`receiver-${u.id}`} value={u.id}>
                  {u.first_name} {u.last_name} ({u.role === 'matchmaker' ? 'Matchmaker' : `${u.gender}, ${u.city}`})
                </option>
              ))}
            </select>
          </div>
        </div>

        <div style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>
          Powered by <strong>Supabase Realtime</strong> WebSocket channels
        </div>
      </div>

      {/* Main Chat Interface */}
      <div className="chat-container" style={{ flex: 1, minHeight: 0 }}>
        {/* Left Sidebar: Contact Directory */}
        <div className="chat-sidebar">
          <div style={{ padding: '1rem', borderBottom: '1px solid var(--border-subtle)' }}>
            <div style={{ position: 'relative' }}>
              <Search size={14} style={{ position: 'absolute', left: 10, top: '50%', transform: 'translateY(-50%)', color: 'var(--text-dim)' }} />
              <input
                type="text"
                placeholder="Search profiles to chat with..."
                value={searchContact}
                onChange={(e) => setSearchContact(e.target.value)}
                style={{
                  width: '100%',
                  padding: '0.45rem 0.5rem 0.45rem 2rem',
                  borderRadius: '8px',
                  background: 'rgba(255, 255, 255, 0.05)',
                  border: '1px solid var(--border-subtle)',
                  color: 'white',
                  fontSize: '0.8rem',
                  outline: 'none'
                }}
              />
            </div>
          </div>

          <div style={{ overflowY: 'auto', flex: 1 }}>
            {contactCandidates.slice(0, 30).map(u => {
              const isSelected = u.id === receiverId;
              return (
                <div
                  key={u.id}
                  className={`chat-thread-item ${isSelected ? 'active' : ''}`}
                  onClick={() => setReceiverId(u.id)}
                >
                  <img
                    src={u.avatar_url || 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=100&auto=format&fit=crop&q=80'}
                    alt={u.first_name}
                    style={{ width: 40, height: 40, borderRadius: '12px', objectFit: 'cover' }}
                  />
                  <div style={{ flex: 1, overflow: 'hidden' }}>
                    <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                      <div style={{ fontSize: '0.85rem', fontWeight: 600, color: 'white', whiteSpace: 'nowrap', textOverflow: 'ellipsis', overflow: 'hidden' }}>
                        {u.first_name} {u.last_name}
                      </div>
                      <span style={{ fontSize: '0.7rem', color: 'var(--text-dim)' }}>{u.city}</span>
                    </div>
                    <div style={{ fontSize: '0.75rem', color: 'var(--text-muted)', whiteSpace: 'nowrap', textOverflow: 'ellipsis', overflow: 'hidden' }}>
                      {u.role === 'matchmaker' ? 'Lead Matchmaker' : `${u.designation || 'Client'}`}
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Right Chat Pane */}
        <div style={{ display: 'flex', flexDirection: 'column', height: '100%', background: '#0c111c' }}>
          {/* Active Conversation Header */}
          {receiver && (
            <div 
              style={{ 
                padding: '0.85rem 1.25rem', 
                borderBottom: '1px solid var(--border-subtle)', 
                display: 'flex', 
                alignItems: 'center', 
                justifyContent: 'space-between',
                background: 'rgba(18, 24, 38, 0.7)'
              }}
            >
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
                <img
                  src={receiver.avatar_url || 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=100&auto=format&fit=crop&q=80'}
                  alt={receiver.first_name}
                  style={{ width: 44, height: 44, borderRadius: '12px', objectFit: 'cover', border: '1.5px solid rgba(255, 255, 255, 0.15)' }}
                />
                <div>
                  <div style={{ fontSize: '1rem', fontWeight: 700, color: 'white', display: 'flex', alignItems: 'center', gap: '6px' }}>
                    <span>{receiver.first_name} {receiver.last_name}</span>
                    <span className="pulse-badge" title="Online" />
                  </div>
                  <div style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>
                    {receiver.role === 'matchmaker' ? 'Lead Matchmaker' : `${calculateAge(receiver.dob)} yrs • ${receiver.designation} at ${receiver.company} (${receiver.city})`}
                  </div>
                </div>
              </div>

              {onViewUserProfile && receiver.role !== 'matchmaker' && (
                <button
                  onClick={() => onViewUserProfile(receiver)}
                  className="btn-secondary"
                  style={{ padding: '0.4rem 0.8rem', fontSize: '0.75rem' }}
                >
                  <UserIcon size={13} />
                  <span>View Biodata</span>
                </button>
              )}
            </div>
          )}

          {/* Messages Stream */}
          <div style={{ flex: 1, overflowY: 'auto', padding: '1.25rem', display: 'flex', flexDirection: 'column', gap: '0.85rem' }}>
            {messages.length === 0 ? (
              <div style={{ margin: 'auto', textAlign: 'center', color: 'var(--text-dim)', maxWidth: '300px' }}>
                <MessageSquare size={36} style={{ margin: '0 auto 0.75rem auto', opacity: 0.4 }} />
                <p style={{ fontSize: '0.9rem', color: 'var(--text-muted)' }}>No messages yet between {sender?.first_name} and {receiver?.first_name}.</p>
                <p style={{ fontSize: '0.75rem', marginTop: '0.25rem' }}>Start the conversation by sending a message below!</p>
              </div>
            ) : (
              messages.map((msg) => {
                const isFromSender = msg.sender_id === senderId;
                const timeString = new Date(msg.created_at).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });

                return (
                  <div
                    key={msg.id}
                    className={isFromSender ? 'chat-bubble-sender' : 'chat-bubble-receiver'}
                  >
                    <div style={{ fontSize: '0.875rem', lineHeight: 1.45 }}>
                      {msg.message}
                    </div>
                    <div 
                      style={{ 
                        display: 'flex', 
                        alignItems: 'center', 
                        justifyContent: 'flex-end', 
                        gap: '4px', 
                        fontSize: '0.65rem', 
                        opacity: 0.7, 
                        marginTop: '0.25rem' 
                      }}
                    >
                      <span>{timeString}</span>
                      {isFromSender && <CheckCheck size={12} />}
                    </div>
                  </div>
                );
              })
            )}
            <div ref={messagesEndRef} />
          </div>

          {/* Message Input Form */}
          <form 
            onSubmit={handleSendMessage}
            style={{ 
              padding: '0.85rem 1.25rem', 
              borderTop: '1px solid var(--border-subtle)', 
              background: 'rgba(18, 24, 38, 0.8)',
              display: 'flex',
              gap: '0.75rem',
              alignItems: 'center'
            }}
          >
            <input
              type="text"
              value={inputText}
              onChange={(e) => setInputText(e.target.value)}
              placeholder={`Send message as ${sender?.first_name}...`}
              style={{
                flex: 1,
                padding: '0.7rem 1rem',
                borderRadius: '10px',
                background: 'rgba(255, 255, 255, 0.05)',
                border: '1px solid var(--border-subtle)',
                color: 'white',
                fontSize: '0.875rem',
                outline: 'none'
              }}
            />
            <button
              type="submit"
              disabled={!inputText.trim() || isSending}
              className="btn-primary"
              style={{ padding: '0.7rem 1.25rem' }}
            >
              <Send size={16} />
              <span>Send</span>
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};
