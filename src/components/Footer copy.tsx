import React, { useEffect, useRef } from "react";
import "./Footer.css";

const Footer: React.FC = () => {
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const scrollElement = scrollRef.current;

    if (scrollElement) {
      scrollElement.scrollLeft = scrollElement.scrollWidth / 2;
    }

    let isScrolling = false;

    const scrollContent = () => {
      if (scrollElement && !isScrolling) {
        scrollElement.scrollLeft += 1; // Move scroll automatically

        // Reset scroll if we reach either end of the duplicated content
        if (
          scrollElement.scrollLeft >= scrollElement.scrollWidth / 2 ||
          scrollElement.scrollLeft <= 0
        ) {
          scrollElement.scrollLeft = scrollElement.scrollWidth / 4;
        }

      }
    };

    const scrollInterval = setInterval(scrollContent, 30); // Adjust speed if needed

    const handleMouseDown = () => {
      isScrolling = true;
    };

    const handleMouseUp = () => {
      isScrolling = false;
    };

    if (scrollElement) {
      scrollElement.addEventListener("mousedown", handleMouseDown);
      scrollElement.addEventListener("mouseup", handleMouseUp);
    }

    return () => {
      clearInterval(scrollInterval);
      if (scrollElement) {
        scrollElement.removeEventListener("mousedown", handleMouseDown);
        scrollElement.removeEventListener("mouseup", handleMouseUp);
      }
    };
  }, []);

  return (
    <footer className="fixed bottom-0 w-full bg-gray-800 text-white">
      <div
        ref={scrollRef}
        className="whitespace-nowrap overflow-x-auto scrolling-auto scroll-hidden select-none flex"
        style={{ display: "flex" }}
      >
        <div className="px-10 py-4 flex-shrink-0">
          Footer text this is cool... link link link Footer text this is cool...
          link link link Footer text this is cool... link link link Footer text
          this is cool... link link link Footer text this is cool... link link
          link Footer text this is cool... link link link Footer text this is
          cool... link link link Footer text this is cool... link link link
        </div>
        {/* Cloned content for seamless infinite scroll */}
        <div className="px-10 py-4 flex-shrink-0">
          Footer text this is cool... link link link Footer text this is cool...
          link link link Footer text this is cool... link link link Footer text
          this is cool... link link link Footer text this is cool... link link
          link Footer text this is cool... link link link Footer text this is
          cool... link link link Footer text this is cool... link link link
        </div>
        {/* Cloned content again for infinite loop */}
        <div className="px-10 py-4 flex-shrink-0">
          Footer text this is cool... link link link Footer text this is cool...
          link link link Footer text this is cool... link link link Footer text
          this is cool... link link link Footer text this is cool... link link
          link Footer text this is cool... link link link Footer text this is
          cool... link link link Footer text this is cool... link link link
        </div>
      </div>
    </footer>
  );
};

export default Footer;
