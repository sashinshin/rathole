import React, { useEffect, useState } from "react";
import { IMAGES_DATA, DEBOUNCE_DELAY } from "./constants";
import { ImageData, StyledImageData } from "./interfaces";
import {
  generateValidPosition,
  parsePercentage,
  resetImageIncrement,
  debounce,
} from "./utils";

const Gallery: React.FC = () => {
  const [images, setImages] = useState<StyledImageData[]>([]);
  const [containerHeight, setContainerHeight] = useState(0);
  const [isLargeScreen, setIsLargeScreen] = useState(window.innerWidth >= 1024);
  const [selectedImage, setSelectedImage] = useState<ImageData | null>(null);

  useEffect(() => {
    const handleResizeLayoutCalculation = debounce(() => {
      if (window.innerWidth >= 1024) {
        triggerLayoutRecalculation();
      }
    }, DEBOUNCE_DELAY);

    const handleResizeLargeScreen = () => {
      setIsLargeScreen(window.innerWidth >= 1024);
    };

    window.addEventListener("resize", handleResizeLayoutCalculation);
    window.addEventListener("resize", handleResizeLargeScreen);

    // Initial trigger if the window width is already above 1024px
    if (window.innerWidth >= 1024) {
      triggerLayoutRecalculation();
    }

    // Cleanup the event listener when the component is unmounted
    return () => {
      window.removeEventListener("resize", handleResizeLayoutCalculation);
      window.removeEventListener("resize", handleResizeLargeScreen);
    };
  }, []);

  const triggerLayoutRecalculation = () => {
    let maxBottom = 0;
    resetImageIncrement();
    const containerWidth = window.innerWidth;
    const positionedImages: StyledImageData[] = [];

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
  };

  const closeModal = () => setSelectedImage(null);

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
          {IMAGES_DATA.map((image, index) => (
            <img
              key={index}
              src={`${process.env.PUBLIC_URL}/${image.src}`}
              alt={image.alt}
              className="object-cover w-full h-auto border border-black rounded-lg shadow-md cursor-pointer"
              onClick={() => setSelectedImage(image)} // Set selected image when clicked
            />
          ))}
        </div>
        {/* Desktop Dynamic Layout */}
        <div className="hidden lg:block relative w-full h-full">
          {images.map((image, index) => (
            <div
            className="hover:blur cursor-pointer"
              style={{
                position: "absolute",
                top: image.top,
                left: image.left,
                width: image.width,
              }}
            >
              <img
                key={index}
                src={`${process.env.PUBLIC_URL}/${image.src}`}
                alt={image.alt}
                className="object-cover border border-black shadow-lg rounded-md"
                onClick={() => setSelectedImage(image)} // Set selected image when clicked
              />
              <p className="-translate-y-7 translate-x-2">{image.about}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Modal for Enlarged Image */}
      {selectedImage && (
        <div
          className="fixed inset-0 bg-black bg-opacity-75 flex justify-center items-center z-50"
          onClick={closeModal} // Close modal when clicking on the overlay
        >
          <div className="relative">
            <img
              src={`${process.env.PUBLIC_URL}/${selectedImage.src}`}
              alt={selectedImage.alt}
              style={{
                maxWidth: "66vw", // Max width to two-thirds of the viewport width
                maxHeight: "66vh", // Max height to two-thirds of the viewport height
                width: "auto", // Maintain aspect ratio
                height: "auto", // Maintain aspect ratio
              }}
              className="rounded-lg shadow-lg"
            />
            <button
              onClick={closeModal}
              className="absolute top-2 right-2 text-white bg-black rounded-full px-2 py-1"
            >
              X
            </button>
          </div>
        </div>
      )}
    </section>
  );
};

export default Gallery;
