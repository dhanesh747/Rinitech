import React, { useState } from 'react';
import Header from './components/Header';
import Hero from './components/Hero';
import Services from './components/Services';
import About from './components/About';
import Contact from './components/Contact';
import Footer from './components/Footer';
import AdminPanel from './components/AdminPanel';
import SecretCodeModal from './components/SecretCodeModal';
import AIChatModal from './components/AIChatModal';

function App() {
  const [showAdminPanel, setShowAdminPanel] = useState(false);
  const [showSecretModal, setShowSecretModal] = useState(false);
  const [showAIChat, setShowAIChat] = useState(false);

  const handleAdminAccess = () => {
    setShowAdminPanel(true);
    setShowSecretModal(false);
  };

  const handleSecretCode = () => {
    setShowSecretModal(true);
  };

  const handleAIChat = () => {
    setShowAIChat(true);
  };

  return (
    <div className="min-h-screen">
      <Header onSecretCode={handleSecretCode} onAIChat={handleAIChat} />
      {showAdminPanel ? (
        <AdminPanel onClose={() => setShowAdminPanel(false)} />
      ) : (
        <>
          <Hero />
          <Services />
          <About />
          <Contact />
          <Footer />
        </>
      )}
      <SecretCodeModal
        isOpen={showSecretModal}
        onClose={() => setShowSecretModal(false)}
        onSuccess={handleAdminAccess}
      />
      <AIChatModal
        isOpen={showAIChat}
        onClose={() => setShowAIChat(false)}
      />
    </div>
  );
}

export default App;