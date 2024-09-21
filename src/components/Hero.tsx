import React from 'react';

const Hero: React.FC = () => {
  return (
    <section
      id="home"
      className="h-screen bg-cover bg-center flex items-center justify-center"
      style={{ backgroundImage: `url(${process.env.PUBLIC_URL}/resources/main_background.jpg)`}}
    >
      <div className="text-white text-center px-4">
        <h1 className="text-5xl font-bold mb-4"> rathole</h1>
        <p className="text-lg">about text</p>
      </div>
    </section>
  );
};

export default Hero;
