import React from 'react';
import Header from './components/Header';
import MainBanner from './HOC/MainBanner';
import AboutCompany from './HOC/AboutCompany';
import Services from './HOC/Services';
import Ordering from './HOC/Ordering';
import Faq from './HOC/Faq';
import Contacts from './HOC/Contacts';
import Footer from './HOC/Footer';
import ScrollAnimation from 'react-animate-on-scroll';

function App() {
  return (
    <div className="page_wrapper">
      <Header />
      <div className="page">
        <ScrollAnimation animateOnce={true} animateIn="fadeIn">
          <MainBanner />
        </ScrollAnimation>
        <ScrollAnimation animateOnce={true} animateIn="fadeIn">
          <Services />
        </ScrollAnimation>
        <ScrollAnimation animateOnce={true} animateIn="fadeIn">
          <Ordering />
          <AboutCompany />
          <Faq />
        </ScrollAnimation>
        <Contacts />
        <Footer />
        {/* <Promo /> */}
      </div>
    </div>
  );
}

export default App;
