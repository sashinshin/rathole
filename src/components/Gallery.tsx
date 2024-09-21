import React from "react";

const images = [
  { src: "/resources/profile_ash.jpg", alt: "Image 1" },
  { src: "/resources/profile_ash.jpg", alt: "Image 2" },
  { src: "/resources/tattoo_1.jpeg", alt: "Image 3" },

  { src: "/resources/profile_ash.jpg", alt: "Image 4" },
  { src: "/resources/tattoo_design_1.jpeg", alt: "Image 5" },
  { src: "/resources/profile_ash.jpg", alt: "Image 6" },

  { src: "/resources/profile_ash.jpg", alt: "Image 7" },
  { src: "/resources/profile_ash.jpg", alt: "Image 8" },
  { src: "/resources/profile_ash.jpg", alt: "Image 9" },

  { src: "/resources/profile_ash.jpg", alt: "Image 10" },
  { src: "/resources/tattoo_design_1.jpeg", alt: "Image 11" },
  { src: "/resources/profile_ash.jpg", alt: "Image 12" },

  { src: "/resources/profile_ash.jpg", alt: "Image 13" },
  { src: "/resources/profile_ash.jpg", alt: "Image 14" },
  { src: "/resources/profile_ash.jpg", alt: "Image 15" },
];

const Gallery: React.FC = () => {
  return (
    <section id="work" className="py-20 px-6 lg:px-10 bg-gray-100">
      <h2 className="text-3xl font-bold text-center mb-8">gallery</h2>
      <div className="grid grid-cols-2 lg:grid-cols-3 gap-6">
        {images.map((image, index) => (
          <div
            key={index}
            className="relative w-full h-auto"
          >
            <img
              src={`${process.env.PUBLIC_URL}/${image.src}`}
              alt={image.alt}
              className="w-full h-auto object-contain rounded-lg shadow-md border-2 border-black rounded-lg shadow-md hover:blur"
            />
            {/* overlay content goes here */}
          </div>
        ))}
      </div>
    </section>
  );
};

export default Gallery;
