import React from "react";

const About: React.FC = () => {
  return (
    <section
      id="about"
      // className="py-20 px-10 bg-white shadow-lg max-w-4xl mx-auto border border-black"
      className="mb-36"
    >
      <h2
        className="text-center mb-8 font-bold mt-5"
        style={{
          fontSize: "50px",
          color: "gold",
          textShadow: "3px 3px 0 #000, 6px 6px 0 #FF8C00, 9px 9px 0 #000",
        }}
      >
        彩礼88W
      </h2>
      <div className="max-w-3xl px-10 mx-auto text-center text-white">
        <p>hahahahaha</p>
        <p>this is me sadgay</p>
        <img
          src={`${process.env.PUBLIC_URL}/resources/brat_gif.webp`}
          alt="Brat GIF"
          className="mx-auto rounded-lg mt-10 animate-border-pulse"
          width="500"
          // style={{
          //   border: "5px solid #ff00ff", // Custom border
          //   borderRadius: "10px", // Rounded corners
          //   boxShadow:
          //     "0 0 10px #ff00ff, 0 0 20px #ff00ff, 0 0 30px #ff00ff", // Glowing shadow effect
          // }}
        />
      </div>
    </section>
  );
};

export default About;
