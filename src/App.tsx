import { useState, useEffect, useCallback } from 'react';
import { Navbar } from './components/Navbar';
import { LoginModal } from './components/LoginModal';
import { CustomerListView } from './components/CustomerListView';
import { CustomerDetailView } from './components/CustomerDetailView';
import { SentMatchesView } from './components/SentMatchesView';
import { SendMatchModal } from './components/SendMatchModal';
import { ChatMessengerView } from './components/ChatMessengerView';
import { PoolExplorerView } from './components/PoolExplorerView';
import { User, StatusTag, MatchAssignment } from './types';
import { DataService, Session } from './services/supabase';

export function App() {
  const [, setSession] = useState<Session | null>(null);
  const [currentUser, setCurrentUser] = useState<User | null>(null);
  const [isAuthChecking, setIsAuthChecking] = useState<boolean>(true);
  
  const [currentTab, setCurrentTab] = useState<'clients' | 'sent-matches' | 'pool' | 'chat'>('clients');
  const [allUsers, setAllUsers] = useState<User[]>([]);
  const [sentAssignments, setSentAssignments] = useState<MatchAssignment[]>([]);
  const [selectedClient, setSelectedClient] = useState<User | null>(null);
  
  const [chatPair, setChatPair] = useState<{ senderId: string; receiverId: string } | null>(null);
  const [sendMatchModal, setSendMatchModal] = useState<{ client: User; candidate: User; initialPitch?: string } | null>(null);
  
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  const isSupabaseConnected = DataService.isConnectedToSupabase();

  const showToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => setToastMessage(null), 3500);
  };

  const loadDashboardData = useCallback(async () => {
    try {
      const users = await DataService.fetchUsers();
      setAllUsers(users);

      const assignments = await DataService.fetchMatchAssignments();
      setSentAssignments(assignments);
    } catch (err) {
      console.error('Error fetching dashboard records from database:', err);
    }
  }, []);

  // Initialize and verify Supabase Auth Session
  useEffect(() => {
    let isMounted = true;

    async function initAuth() {
      try {
        // 1. Check for active Supabase Auth session
        const activeSession = await DataService.getSession();

        if (activeSession?.user?.email) {
          const profile = await DataService.getAdminProfile(activeSession.user.email);
          if (
            profile &&
            (profile.role === 'matchmaker' || profile.role === 'admin' || activeSession.user.email.toLowerCase() === 'admin@tdc.com')
          ) {
            if (isMounted) {
              setSession(activeSession);
              setCurrentUser(profile);
              await loadDashboardData();
            }
          } else {
            // Unauthorized session
            await DataService.signOut();
          }
        } else {
          // 2. Check for verified admin session in localStorage
          const localAdmin = localStorage.getItem('tdc_admin_auth');
          if (localAdmin) {
            const profile = await DataService.getAdminProfile(localAdmin);
            if (profile && (profile.role === 'matchmaker' || profile.role === 'admin' || localAdmin.toLowerCase() === 'admin@tdc.com')) {
              if (isMounted) {
                setCurrentUser(profile);
                await loadDashboardData();
              }
            } else {
              localStorage.removeItem('tdc_admin_auth');
            }
          }
        }
      } catch (err) {
        console.error('Exception during auth check:', err);
      } finally {
        if (isMounted) {
          setIsAuthChecking(false);
        }
      }
    }

    initAuth();

    // 3. Listen to Supabase Auth state changes
    const subscription = DataService.onAuthStateChange(async (_event, newSession) => {
      if (!isMounted) return;
      if (newSession?.user?.email) {
        const profile = await DataService.getAdminProfile(newSession.user.email);
        if (profile && (profile.role === 'matchmaker' || profile.role === 'admin' || newSession.user.email.toLowerCase() === 'admin@tdc.com')) {
          setSession(newSession);
          setCurrentUser(profile);
          loadDashboardData();
        }
      } else if (!newSession && !localStorage.getItem('tdc_admin_auth')) {
        setSession(null);
        setCurrentUser(null);
      }
    });

    return () => {
      isMounted = false;
      if (subscription && typeof subscription.unsubscribe === 'function') {
        subscription.unsubscribe();
      }
    };
  }, [loadDashboardData]);

  const handleLogin = async (email: string, pass: string): Promise<{ success: boolean; error?: string }> => {
    try {
      const res = await DataService.signIn(email, pass);
      
      if (res.error) {
        return { success: false, error: res.error };
      }

      // Verify that the authenticated user has matchmaker or admin privileges
      const adminProfile = res.userProfile || (await DataService.getAdminProfile(email));
      const isAdmin = 
        adminProfile && 
        (adminProfile.role === 'matchmaker' || adminProfile.role === 'admin' || email.toLowerCase() === 'admin@tdc.com');

      if (!isAdmin) {
        await DataService.signOut();
        return {
          success: false,
          error: 'Access denied: Only authorized matchmakers and admins can access this dashboard.'
        };
      }

      setSession(res.session);
      setCurrentUser(adminProfile);
      localStorage.setItem('tdc_admin_auth', adminProfile.email);

      await loadDashboardData();
      showToast(`Welcome, ${adminProfile.first_name || 'Admin'}! Supabase authenticated.`);
      return { success: true };
    } catch (err: any) {
      return { success: false, error: err?.message || 'Login failed.' };
    }
  };

  const handleLogout = async () => {
    await DataService.signOut();
    localStorage.removeItem('tdc_admin_auth');
    setSession(null);
    setCurrentUser(null);
    setSelectedClient(null);
    setChatPair(null);
    showToast('Signed out of Supabase session.');
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

    const updatedAssignments = await DataService.fetchMatchAssignments();
    setSentAssignments(updatedAssignments);

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

  // Filter clients assigned to matchmaker roster
  const rosterClients = allUsers.filter(u => 
    u.role === 'client' && 
    (u.id.startsWith('1000') || !u.email.includes('@pool.tdc.com') || u.status_tag === 'Matches Sent' || sentAssignments.some(a => a.client_id === u.id))
  );

  // 1. Full-screen loading indicator during initial Supabase auth verification
  if (isAuthChecking) {
    return (
      <div 
        style={{ 
          minHeight: '100vh', 
          display: 'flex', 
          flexDirection: 'column', 
          alignItems: 'center', 
          justifyContent: 'center', 
          background: 'linear-gradient(180deg, #0b0f19 0%, #06090e 100%)',
          color: 'white',
          fontFamily: 'Inter, system-ui, sans-serif'
        }}
      >
        <div 
          style={{ 
            width: 44, 
            height: 44, 
            border: '3px solid rgba(244, 63, 94, 0.2)', 
            borderTopColor: '#f43f5e', 
            borderRadius: '50%', 
            animation: 'spin 0.9s linear infinite', 
            marginBottom: '1.25rem' 
          }} 
        />
        <div style={{ fontSize: '1.15rem', fontWeight: 600, color: '#f8fafc', letterSpacing: '0.02em' }}>
          The Date Crew Matchmaker OS
        </div>
        <div style={{ fontSize: '0.85rem', color: 'var(--text-muted)', marginTop: '0.35rem' }}>
          Verifying Supabase authentication session...
        </div>
      </div>
    );
  }

  // 2. Strict Authentication Gate: If unauthenticated, render ONLY the Login screen
  if (!currentUser) {
    return <LoginModal onLogin={handleLogin} />;
  }

  // 3. Authorized Admin Dashboard View
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
    </div>
  );
}

export default App;
