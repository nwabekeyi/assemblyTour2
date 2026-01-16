import React from 'react';
import { Outlet, useLocation } from 'react-router-dom';
import Navbar from '../components/sharedComponents/Navbar';
import Hero from '../components/Hero';
import Footer from '../components/sharedComponents/Footer';

function MainLayout() {
  const location = useLocation();
  const hideHero = location.pathname === '/login' || location.pathname === '/signup';

  console.log(location.pathname);

  return (
    <div>
      <Navbar />
      {!hideHero && <Hero />}
      <div className={`${!hideHero ? 'pt-[100vh]' :'pt-[100vh'}`}>
        <Outlet />
      </div>
      <Footer />
    </div>
  );
}

export default MainLayout;
