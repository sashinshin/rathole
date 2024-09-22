import React, { useEffect, useState } from "react";
import { IMAGES_DATA } from "./constants";
import { ImageData } from "./interfaces";
import { generateValidPosition, parsePercentage, resetImageIncrement } from "./utils";

const Gallery: React.FC = () => {
  const [images, setImages] = useState<ImageData[]>([]);
  const [containerHeight, setContainerHeight] = useState(0);
  const [isLargeScreen, setIsLargeScreen] = useState(window.innerWidth >= 1024);

  useEffect(() => {
    const updateScreenSize = () => {
      setIsLargeScreen(window.innerWidth >= 1024);
    };

    window.addEventListener("resize", updateScreenSize);
    return () => {
      window.removeEventListener("resize", updateScreenSize);
    };
  }, []);

  useEffect(() => {
    let maxBottom = 0;
    resetImageIncrement();
    const containerWidth = window.innerWidth;
    const positionedImages: ImageData[] = [];

    for (const image of IMAGES_DATA) {
      const newImageStyles = generateValidPosition(
        positionedImages,
        containerWidth
      );
      positionedImages.push({ ...image, ...newImageStyles });

      const imageBottom =
        parseInt(newImageStyles.top) +
        parsePercentage(newImageStyles.width, containerWidth);
      if (imageBottom > maxBottom) {
        maxBottom = imageBottom;
      }
    }

    setImages(positionedImages);

    const extraHeight = 400;
    setContainerHeight(maxBottom + extraHeight);
  }, [isLargeScreen]);

  return (
    <section
      id="work"
      className="relative py-20 px-6 bg-gray-100"
      style={isLargeScreen ? { height: `${containerHeight}px` } : {}}
    >
      <h2 className="text-3xl font-bold text-center mb-8">Gallery</h2>
      <div className="relative w-full h-full lg:block">
        {/* Mobile Grid Layout */}
        <div className="grid grid-cols-2 gap-4 lg:hidden">
          {images.map((image, index) => (
            <img
              key={index}
              src={`${process.env.PUBLIC_URL}/${image.src}`}
              alt={image.alt}
              className="object-cover w-full h-auto border border-black rounded-lg shadow-md"
            />
          ))}
        </div>
        {/* Desktop Dynamic Layout */}
        <div className="hidden lg:block relative w-full h-full">
          {images.map((image, index) => (
            <img
              key={index}
              src={`${process.env.PUBLIC_URL}/${image.src}`}
              alt={image.alt}
              style={{
                position: "absolute",
                top: image.top,
                left: image.left,
                width: image.width,
              }}
              className="object-cover border border-black shadow-lg rounded-md hover:blur"
            />
          ))}
        </div>
      </div>
    </section>
  );
};

export default Gallery;
