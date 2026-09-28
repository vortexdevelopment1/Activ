import { useEffect, useState } from 'react'
import Header from './components/Header'
import Home from './components/Home'
import Players from './components/Players'
import VenuePartners from './components/venuePartners'
import Support from './components/Support'
import Login from './components/Login'
import Admin from './components/Admin'
import PrivacyPolicy from './components/PrivacyPolicy'
import TermsOfService from './components/TermsOfService'
import Footer from './components/Footer'
import './App.css'

import Lenis from 'lenis'
import 'lenis/dist/lenis.css'

function App() {
  const getPageFromPath = () => window.location.pathname.replace(/^\//, '') || 'home';
  const [currentPage, setCurrentPage] = useState(getPageFromPath);

  useEffect(() => {
    // Initialize Lenis for smooth scrolling
    const lenis = new Lenis({
      autoRaf: true,
      duration: 1.2,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t))
    });

    const handlePopState = () => setCurrentPage(getPageFromPath());
    window.addEventListener('popstate', handlePopState);
    
    return () => {
      window.removeEventListener('popstate', handlePopState);
      lenis.destroy();
    };
  }, []);

  const navigate = (view: string) => {
    const path = view === 'home' ? '/' : `/${view}`;
    window.history.pushState({}, '', path);
    setCurrentPage(view);
  };

  return (
    <div className="min-h-screen flex flex-col justify-between bg-black text-white">
      {currentPage !== 'admin' && <Header currentPage={currentPage} onNavigate={navigate} />}
      <main className="flex-grow">
        {currentPage === 'home' && <Home onNavigate={setCurrentPage} />}
        {currentPage === 'players' && <Players />}
        {currentPage === 'venue-partners' && <VenuePartners />}
        {currentPage === 'support' && <Support />}
        {currentPage === 'login' && <Login onSubmit={({ email, password }) => {
          if (email === 'adminactiv@gmail.com' && password === 'Admin@123') navigate('admin');
        }} onNavigateHome={() => navigate('home')} />}
        {currentPage === 'admin' && <Admin onNavigate={navigate} />}
        {currentPage === 'privacy-policy' && <PrivacyPolicy />}
        {currentPage === 'terms' && <TermsOfService />}
      </main>
      {currentPage !== 'admin' && <Footer onNavigate={navigate} />}
    </div>
  )
}

export default App