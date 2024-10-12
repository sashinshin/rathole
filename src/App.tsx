import React, { useEffect, useState } from "react";
import { Footer, About, Gallery, Header, Hero, Divider } from "./components";

const App: React.FC = () => {
  const [bgOpacity, setBgOpacity] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      const scrollY = window.scrollY;
      const fadeInPoint = 200; // Point at which the fade effect starts
      const maxScroll = 800; // Point where the fade effect reaches full opacity

      let opacity = 0;
      if (scrollY > fadeInPoint) {
        opacity = (scrollY - fadeInPoint) / (maxScroll - fadeInPoint);
        const opacityCap = 0.85;
        opacity = Math.min(opacity, opacityCap);
      }

      setBgOpacity(opacity);
    };

    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  return (
    <div className="relative">
      <div
        className="fixed inset-0 z-0"
        style={{
          backgroundColor: `rgba(0, 0, 0, ${bgOpacity})`,
          transition: "background-color 0.4s ease",
        }}
      ></div>

      <div className="relative z-10">
        <Header />
        <main className="mt-18">
          {" "}
          {/* Adjust margin-top to account for fixed header height */}
          <Hero />
          <Gallery />
          <Divider />
          <About />
        </main>
          <Footer />
      </div>
    </div>
  );
};

export default App;
