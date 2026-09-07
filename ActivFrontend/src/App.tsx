// import { useState } from 'react'
// import Header from './components/Header'
// import Home from './components/Home'
// import Players from './components/Players'
// import VenuePartners from './components/venuePartners'
// import Support from './components/Support'
// import Footer from './components/Footer'
// import './App.css'

// function App() {
//   const [currentPage, setCurrentPage] = useState('home');

//   return (
//     <div className="min-h-screen flex flex-col justify-between bg-black text-white">
//       <Header currentPage={currentPage} onNavigate={setCurrentPage} />
//       <main className="flex-grow">
//         {currentPage === 'home' && <Home onNavigate={setCurrentPage} />}
//         {currentPage === 'players' && <Players />}
//         {currentPage === 'venue-partners' && <VenuePartners />}
//         {currentPage === 'support' && <Support />}
//       </main>
//       <Footer onNavigate={setCurrentPage} />
//     </div>
//   )
// }

// export default App






import { useEffect, useState } from 'react'
import Header from './components/Header'
import Home from './components/Home'
import Players from './components/Players'
import VenuePartners from './components/venuePartners'
import Support from './components/Support'
import Login from './components/Login'
import Admin from './components/Admin'
import Footer from './components/Footer'
import './App.css'

function App() {
  const getPageFromPath = () => window.location.pathname.replace(/^\//, '') || 'home';
  const [currentPage, setCurrentPage] = useState(getPageFromPath);

  useEffect(() => {
    const handlePopState = () => setCurrentPage(getPageFromPath());
    window.addEventListener('popstate', handlePopState);
    return () => window.removeEventListener('popstate', handlePopState);
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
      </main>
      {currentPage !== 'admin' && <Footer onNavigate={navigate} />}
    </div>
  )
}

export default App