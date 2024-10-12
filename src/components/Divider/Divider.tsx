import React from "react";

const Divider: React.FC = () => {
  return (
    <section id="divider" className="flex justify-center my-96">
      <img
        src={`${process.env.PUBLIC_URL}/resources/profile_ash.jpg`}
        alt="Profile"
        className="rounded-full w-24 h-24 border-4 border-white animate-spin-slow"
      />
    </section>
  );
};

export default Divider;
