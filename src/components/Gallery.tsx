import React, { useEffect, useState } from "react";
import { ImageStyles, ImageData } from "../interfaces";

let imageIncrement = 0;
const imagesData = [
  { src: "/resources/tattoo_1.jpeg", alt: "Image 1" },
  { src: "/resources/profile_ash.jpg", alt: "Image 2" },
  { src: "/resources/tattoo_1.jpeg", alt: "Image 3" },
  { src: "/resources/profile_ash.jpg", alt: "Image 4" },
  { src: "/resources/tattoo_design_1.jpeg", alt: "Image 5" },
  { src: "/resources/profile_ash.jpg", alt: "Image 6" },
  { src: "/resources/tattoo_design_1.jpeg", alt: "Image 7" },
  { src: "/resources/profile_ash.jpg", alt: "Image 8" },
  { src: "/resources/tattoo_1.jpeg", alt: "Image 1" },
  { src: "/resources/tattoo_1.jpeg", alt: "Image 1" },
  { src: "/resources/profile_ash.jpg", alt: "Image 2" },
  { src: "/resources/tattoo_1.jpeg", alt: "Image 3" },
  { src: "/resources/profile_ash.jpg", alt: "Image 4" },
  { src: "/resources/tattoo_design_1.jpeg", alt: "Image 5" },
  { src: "/resources/profile_ash.jpg", alt: "Image 6" },
  { src: "/resources/tattoo_design_1.jpeg", alt: "Image 7" },
  { src: "/resources/profile_ash.jpg", alt: "Image 8" },
  { src: "/resources/tattoo_1.jpeg", alt: "Image 1" },
];

// Function to generate a random position and size for each image
const generateRandomPosition = (containerWidth: number): ImageStyles => {
  const width = Math.floor(Math.random() * 20) + 15 + "%"; // Random width (15% to 35%)
  const widthPx = parsePercentage(width, containerWidth);

  const top = Math.floor(Math.random() * 5000) + "px"; // Random top position (allow it to extend)
  const left = Math.floor(Math.random() * (containerWidth - widthPx)) + "px"; // Random left position within bounds

  return { top, left, width };
};

// Helper function to convert percentage strings to numbers
const parsePercentage = (value: string, base: number) =>
  (parseInt(value) / 100) * base;

// Function to check if two images overlap by more than 10%
const isOverlapping = (
  image1: ImageStyles,
  image2: ImageStyles,
  containerWidth: number
) => {
  const width1 = parsePercentage(image1.width, containerWidth);
  const height1 = width1; // Assuming square images for simplicity
  const top1 = parseInt(image1.top);
  const left1 = parseInt(image1.left);

  const width2 = parsePercentage(image2.width, containerWidth);
  const height2 = width2; // Assuming square images for simplicity
  const top2 = parseInt(image2.top);
  const left2 = parseInt(image2.left);

  // Calculate the overlapping area
  const overlapX = Math.max(
    0,
    Math.min(left1 + width1, left2 + width2) - Math.max(left1, left2)
  );
  const overlapY = Math.max(
    0,
    Math.min(top1 + height1, top2 + height2) - Math.max(top1, top2)
  );
  const overlapArea = overlapX * overlapY;

  // Calculate the area of the smaller image
  const area1 = width1 * height1;
  const area2 = width2 * height2;
  const smallerArea = Math.min(area1, area2);

  if (imageIncrement > 5) {
    return overlapArea / smallerArea > 0.4;
  }
  return overlapArea / smallerArea > 0.1;
};

const generateValidPosition = (
  existingImages: ImageStyles[],
  containerWidth: number
) => {
  let newImage: ImageStyles = { top: "0%", left: "0%", width: "0%" };
  let isValid = false;

  while (!isValid) {
    newImage = generateRandomPosition(containerWidth);
    isValid = existingImages.every(
      (existingImage) => !isOverlapping(existingImage, newImage, containerWidth)
    );
  }

  imageIncrement++;
  return newImage;
};

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
    imageIncrement = 0;
    let maxBottom = 0;
    const containerWidth = window.innerWidth;
    const positionedImages: ImageData[] = [];

    for (const image of imagesData) {
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
