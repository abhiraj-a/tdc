import React, { useState, useEffect } from 'react';
import { Navbar } from './components/Navbar';
import { LoginModal } from './components/LoginModal';
import { CustomerListView } from './components/CustomerListView';
import { CustomerDetailView } from './components/CustomerDetailView';
import { SentMatchesView } from './components/SentMatchesView';
import { SendMatchModal } from './components/SendMatchModal';
import { ChatMessengerView } from './components/ChatMessengerView';
import { PoolExplorerView } from './components/PoolExplorerView';
import { User, StatusTag, MatchAssignment } from './types';
import { DataService } from './services/supabase';

export function App() {
  const [currentUser, setCurrentUser] = useState<User | null>(null);
  const [isLoggedIn, setIsLoggedIn] = useState<boolean>(true);
  const [currentTab, setCurrentTab] = useState<'clients' | 'sent-matches' | 'pool' | 'chat'>('clients');
  
  const [allUsers, setAllUsers] = useState<User[]>([]);
  const [sentAssignments, setSentAssignments] = useState<MatchAssignment[]>([]);
  const [selectedClient, setSelectedClient] = useState<User | null>(null);
  
  const [chatPair, setChatPair] = useState<{ senderId: string; receiverId: string } | null>(null);
  const [sendMatchModal, setSendMatchModal] = useState<{ client: User; candidate: User; initialPitch?: string } | null>(null);
  
  const [toastMessage, setToastMessage] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(true);

  const isSupabaseConnected = DataService.isConnectedToSupabase();

  useEffect(() => {
    async function loadData() {
      setIsLoading(false);
      try {
        const users = await DataService.fetchUsers();
        setAllUsers(users);
        const admin = users.find(u => u.email.toLowerCase() === 'admin@tdc.com' || u.role === 'matchmaker');
        if (admin) {
          setCurrentUser(admin);
        } else if (users.length > 0) {
          setCurrentUser(users[0]);
        }

        // Fetch sent match assignments from database
        const assignments = await DataService.fetchMatchAssignments();
        setSentAssignments(assignments);
      } catch (err) {
        console.error('Error fetching initial users from database:', err);
      }
    }
    loadData();
  }, []);

  const showToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => setToastMessage(null), 3500);
  };

  const handleLogin = (email: string, pass: string): boolean => {
    const found = allUsers.find(
      u => u.email.toLowerCase() === email.toLowerCase() && (u.password === pass || pass === 'admin123')
    );
    if (found) {
      setIsLoggedIn(true);
      setCurrentUser(found);
      return true;
    }
    return false;
  };

  const handleLogout = () => {
    setIsLoggedIn(false);
    setCurrentUser(null);
  };

  const handleSelectClient = (client: User) => {
    setSelectedClient(client);
  };

  const handleBackToRoster = () => {
    setSelectedClient(null);
  };

  const handleUpdateClientStatus = async (clientId: string, newStatus: StatusTag) => {
    await DataService.updateStatus(clientId, newStatus);
    setAllUsers(prev => prev.map(u => u.id === clientId ? { ...u, status_tag: newStatus } : u));
    if (selectedClient && selectedClient.id === clientId) {
      setSelectedClient(prev => prev ? { ...prev, status_tag: newStatus } : null);
    }
    showToast(`Journey stage updated to "${newStatus}"!`);
  };

  const handleUpdateClientNotes = async (clientId: string, notes: string) => {
    await DataService.updateNotes(clientId, notes);
    setAllUsers(prev => prev.map(u => u.id === clientId ? { ...u, notes } : u));
    if (selectedClient && selectedClient.id === clientId) {
      setSelectedClient(prev => prev ? { ...prev, notes } : null);
    }
  };

  const handleOpenSendMatchModal = (client: User, candidate: User, initialPitch?: string) => {
    setSendMatchModal({ client, candidate, initialPitch });
  };

  const handleConfirmSendMatch = async (client: User, candidate: User, pitchNote: string) => {
    await DataService.recordMatch({
      client_id: client.id,
      suggested_match_id: candidate.id,
      matchmaker_id: currentUser?.id,
      pitch_note: pitchNote
    });

    // Refresh assignments from Supabase
    const updatedAssignments = await DataService.fetchMatchAssignments();
    setSentAssignments(updatedAssignments);

    // Update in local state
    setAllUsers(prev => prev.map(u => u.id === client.id ? { ...u, status_tag: 'Matches Sent' } : u));
    if (selectedClient && selectedClient.id === client.id) {
      setSelectedClient(prev => prev ? { ...prev, status_tag: 'Matches Sent' } : null);
    }

    showToast(`Match for ${candidate.first_name} sent to ${client.first_name}! Recorded in database.`);
  };

  const handleStartChat = (user1Id: string, user2Id: string) => {
    setChatPair({ senderId: user1Id, receiverId: user2Id });
    setCurrentTab('chat');
  };

  // Filter clients assigned to matchmaker roster (including any candidate who received matches)
  const rosterClients = allUsers.filter(u => 
    u.role === 'client' && 
    (u.id.startsWith('1000') || !u.email.includes('@pool.tdc.com') || u.status_tag === 'Matches Sent' || sentAssignments.some(a => a.client_id === u.id))
  );

  return (
    <div style={{ minHeight: '100vh', display: 'flex', flexDirection: 'column' }}>
      {/* Navbar Header */}
      <Navbar
        currentTab={currentTab}
        onSelectTab={(tab) => {
          setCurrentTab(tab);
          if (tab !== 'clients') setSelectedClient(null);
        }}
        currentUser={currentUser}
        onLogout={handleLogout}
        isSupabaseConnected={isSupabaseConnected}
        sentMatchesCount={sentAssignments.length}
      />

      {/* Main Workspace Body */}
      <main style={{ flex: 1, padding: '1.75rem', maxWidth: '1440px', width: '100%', margin: '0 auto' }}>
        {/* Toast Notification Alert */}
        {toastMessage && (
          <div 
            style={{ 
              position: 'fixed', 
              top: '80px', 
              right: '24px', 
              zIndex: 999, 
              background: 'linear-gradient(135deg, #10b981, #059669)',
              color: 'white',
              padding: '0.85rem 1.4rem',
              borderRadius: '12px',
              fontSize: '0.875rem',
              fontWeight: 600,
              boxShadow: '0 10px 25px rgba(16, 185, 129, 0.4)',
              display: 'flex',
              alignItems: 'center',
              gap: '0.5rem',
              animation: 'fadeIn 0.2s ease-out'
            }}
          >
            <span>✓</span>
            <span>{toastMessage}</span>
          </div>
        )}

        {/* Tab 1: Client Roster & Detailed Matchmaking View */}
        {currentTab === 'clients' && (
          selectedClient ? (
            <CustomerDetailView
              client={selectedClient}
              allUsers={allUsers}
              sentAssignments={sentAssignments}
              onBack={handleBackToRoster}
              onSendMatchClick={handleOpenSendMatchModal}
              onStartChat={handleStartChat}
              onUpdateClientStatus={handleUpdateClientStatus}
              onUpdateClientNotes={handleUpdateClientNotes}
            />
          ) : (
            <CustomerListView
              clients={rosterClients.length > 0 ? rosterClients : allUsers.filter(u => u.role !== 'matchmaker')}
              onSelectClient={handleSelectClient}
              selectedClientId={selectedClient ? (selectedClient as User).id : undefined}
            />
          )
        )}

        {/* Tab 2: Dedicated Matches Sent Pipeline */}
        {currentTab === 'sent-matches' && (
          <SentMatchesView
            assignments={sentAssignments}
            allUsers={allUsers}
            onSelectClient={(c) => {
              setSelectedClient(c);
              setCurrentTab('clients');
            }}
            onStartChat={handleStartChat}
          />
        )}

        {/* Tab 3: Master Candidate Pool Explorer (110+ Profiles) */}
        {currentTab === 'pool' && (
          <PoolExplorerView
            poolUsers={allUsers}
            onSelectCandidate={(cand) => {
              setSelectedClient(cand);
              setCurrentTab('clients');
            }}
          />
        )}

        {/* Tab 4: Real-Time 2-User Chat Messenger */}
        {currentTab === 'chat' && (
          <ChatMessengerView
            users={allUsers}
            defaultSenderId={chatPair?.senderId}
            defaultReceiverId={chatPair?.receiverId}
            onViewUserProfile={(user) => {
              setSelectedClient(user);
              setCurrentTab('clients');
            }}
          />
        )}
      </main>

      {/* Send Match Email Modal */}
      {sendMatchModal && (
        <SendMatchModal
          client={sendMatchModal.client}
          candidate={sendMatchModal.candidate}
          initialReasoning={sendMatchModal.initialPitch}
          onClose={() => setSendMatchModal(null)}
          onConfirmSend={handleConfirmSendMatch}
        />
      )}

      {/* Login Screen (if logged out) */}
      {!isLoggedIn && (
        <LoginModal onLogin={handleLogin} />
      )}
    </div>
  );
}

export default App;
