import React, { useState } from 'react';
import { AuthProvider } from './contexts/AuthContext';
import { ThemeProvider } from './contexts/ThemeContext';
import { ChatProvider } from './contexts/ChatContext';
import Header from './components/Layout/Header';
import Footer from './components/Layout/Footer';
import LandingPage from './pages/LandingPage';
import AuthPage from './pages/AuthPage';
import UserDashboard from './pages/UserDashboard';
import BrowseItemsPage from './pages/BrowseItemsPage';
import ItemDetailPage from './pages/ItemDetailPage';
import AddItemPage from './pages/AddItemPage';
import AdminPanel from './pages/AdminPanel';
import ChatWindow from './components/Chat/ChatWindow';

function App() {
  const [currentPage, setCurrentPage] = useState('landing');
  const [selectedItem, setSelectedItem] = useState(null);
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [showChatWindow, setShowChatWindow] = useState(false);

  const renderPage = () => {
    switch (currentPage) {
      case 'landing':
        return (
          <LandingPage 
            setCurrentPage={setCurrentPage} 
            setSelectedItem={setSelectedItem}
            setSelectedCategory={setSelectedCategory}
          />
        );
      case 'auth':
        return <AuthPage setCurrentPage={setCurrentPage} />;
      case 'dashboard':
        return <UserDashboard setCurrentPage={setCurrentPage} setSelectedItem={setSelectedItem} />;
      case 'browse':
        return (
          <BrowseItemsPage 
            setCurrentPage={setCurrentPage} 
            setSelectedItem={setSelectedItem}
            selectedCategory={selectedCategory}
          />
        );
      case 'item-detail':
        return (
          <ItemDetailPage 
            item={selectedItem} 
            setCurrentPage={setCurrentPage}
            onStartChat={() => setShowChatWindow(true)}
          />
        );
      case 'add-item':
        return <AddItemPage setCurrentPage={setCurrentPage} />;
      case 'admin':
        return <AdminPanel setCurrentPage={setCurrentPage} setSelectedItem={setSelectedItem} />;
      default:
        return (
          <LandingPage 
            setCurrentPage={setCurrentPage} 
            setSelectedItem={setSelectedItem}
            setSelectedCategory={setSelectedCategory}
          />
        );
    }
  };

  return (
    <ThemeProvider>
      <AuthProvider>
        <ChatProvider>
          <div className="min-h-screen bg-gray-50 dark:bg-gray-900 transition-colors">
            <Header currentPage={currentPage} setCurrentPage={setCurrentPage} />
            <main>
              {renderPage()}
            </main>
            {currentPage === 'landing' && <Footer />}
            
            {/* Chat Window */}
            <ChatWindow 
              isOpen={showChatWindow}
              onClose={() => setShowChatWindow(false)}
            />
          </div>
        </ChatProvider>
      </AuthProvider>
    </ThemeProvider>
  );
}

export default App;