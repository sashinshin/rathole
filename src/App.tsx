import React from 'react';
import Header from './components/Header';
import Hero from './components/Hero';
import Gallery from './components/Gallery';
import About from './components/About';
import Footer from './components/Footer';


const App: React.FC = () => {
  return (
    <div className="relative">
      <Header />
      <main className="mt-18"> {/* Adjust margin-top to account for fixed header height */}
        <Hero />
        <Gallery />
        <About />
        <Footer />
      </main>
    </div>
  );
};

export default App;
// const images = [
//   { src: "/resources/profile_ash.jpg", alt: "Image 1", top: "5%", left: "10%", width: "20%" },
//   { src: "/resources/profile_ash.jpg", alt: "Image 2", top: "40%", left: "25%", width: "15%" },
//   { src: "/resources/tattoo_1.jpeg", alt: "Image 3", top: "15%", left: "40%", width: "25%" },
//   { src: "/resources/profile_ash.jpg", alt: "Image 4", top: "50%", left: "55%", width: "20%" },
//   { src: "/resources/tattoo_design_1.jpeg", alt: "Image 5", top: "10%", left: "70%", width: "30%" },
//   { src: "/resources/profile_ash.jpg", alt: "Image 6", top: "60%", left: "5%", width: "35%" },
//   { src: "/resources/profile_ash.jpg", alt: "Image 7", top: "80%", left: "50%", width: "20%" },
//   { src: "/resources/profile_ash.jpg", alt: "Image 8", top: "70%", left: "75%", width: "25%" },
// ];