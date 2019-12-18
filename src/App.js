import React from 'react';
import Button from './components/Button';
import Header from './components/Header';
import MainBanner from './HOC/MainBanner';
import AboutCompany from './HOC/AboutCompany';
import Services from './HOC/Services';
import Ordering from './HOC/Ordering';
import Faq from './HOC/Faq';
import Contacts from './HOC/Contacts';
import Promo from './HOC/Promo';
import Footer from './HOC/Footer';

function App() {
  return (
    <div className="page_wrapper">
      <Header />
      <div className="page">
        <MainBanner />
        <AboutCompany />
        <Services />
        <Ordering />
        <Faq />
        <Contacts />
        <Promo />
        <Footer />
      </div>
    </div>
  );
}

export default App;
