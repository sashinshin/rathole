import React from 'react';
import Header from './components/Header';
import Hero from './components/Hero';
import Gallery from './components/Gallery';
import About from './components/About';

const App: React.FC = () => {
  return (
    <div className="relative">
      <Header />
      <main className="mt-18"> {/* Adjust margin-top to account for fixed header height */}
        <Hero />
        <Gallery />
        <About />
      </main>
    </div>
  );
};

export default App;
