import { ImageStyles } from "./interfaces";

// Function to tweak image generation logic
let imageIncrement = 0;
const acceptableOverlap = (
    overlapArea: number,
    smallerArea: number
) => {
    if (imageIncrement > 5) {
        return overlapArea / smallerArea > 0.4;
    }
    return overlapArea / smallerArea > 0.1;
}

export const resetImageIncrement = () => imageIncrement = 0;
export const parsePercentage = (value: string, base: number) => (parseInt(value) / 100) * base;

// Function to generate a random position and size for each image
const generateRandomPosition = (containerWidth: number): ImageStyles => {
    const width = Math.floor(Math.random() * 20) + 15 + "%"; // Random width (15% to 35%)
    const widthPx = parsePercentage(width, containerWidth);

    const top = Math.floor(Math.random() * 5000) + "px"; // Random top position (allow it to extend)
    const left = Math.floor(Math.random() * (containerWidth - widthPx)) + "px"; // Random left position within bounds

    return { top, left, width };
};

const isOverlapping = (
    image1: ImageStyles,
    image2: ImageStyles,
    containerWidth: number,
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

    return acceptableOverlap(overlapArea, smallerArea);
};

export const generateValidPosition = (
    existingImages: ImageStyles[],
    containerWidth: number,
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

// Debounce function to prevent frequent execution during resizing
 export const debounce = (func: Function, delay: number) => {
  let timeoutId: NodeJS.Timeout;
  return (...args: any[]) => {
    clearTimeout(timeoutId);
    timeoutId = setTimeout(() => {
      func.apply(null, args);
    }, delay);
  };
};
