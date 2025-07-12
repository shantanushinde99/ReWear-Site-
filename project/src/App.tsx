import React, { useState } from 'react';
import { AuthProvider } from './contexts/AuthContext';
import Header from './components/Layout/Header';
import Footer from './components/Layout/Footer';
import LandingPage from './pages/LandingPage';
import AuthPage from './pages/AuthPage';
import UserDashboard from './pages/UserDashboard';
import BrowseItemsPage from './pages/BrowseItemsPage';
import ItemDetailPage from './pages/ItemDetailPage';
import AddItemPage from './pages/AddItemPage';
import AdminPanel from './pages/AdminPanel';

function App() {
  const [currentPage, setCurrentPage] = useState('landing');
  const [selectedItem, setSelectedItem] = useState(null);

  const renderPage = () => {
    switch (currentPage) {
      case 'landing':
        return <LandingPage setCurrentPage={setCurrentPage} setSelectedItem={setSelectedItem} />;
      case 'auth':
        return <AuthPage setCurrentPage={setCurrentPage} />;
      case 'dashboard':
        return <UserDashboard setCurrentPage={setCurrentPage} setSelectedItem={setSelectedItem} />;
      case 'browse':
        return <BrowseItemsPage setCurrentPage={setCurrentPage} setSelectedItem={setSelectedItem} />;
      case 'item-detail':
        return <ItemDetailPage item={selectedItem} setCurrentPage={setCurrentPage} />;
      case 'add-item':
        return <AddItemPage setCurrentPage={setCurrentPage} />;
      case 'admin':
        return <AdminPanel setCurrentPage={setCurrentPage} setSelectedItem={setSelectedItem} />;
      default:
        return <LandingPage setCurrentPage={setCurrentPage} setSelectedItem={setSelectedItem} />;
    }
  };

  return (
    <AuthProvider>
      <div className="min-h-screen bg-gray-50">
        <Header currentPage={currentPage} setCurrentPage={setCurrentPage} />
        <main className="flex-1">
          {renderPage()}
        </main>
        <Footer />
      </div>
    </AuthProvider>
  );
}

export default App;