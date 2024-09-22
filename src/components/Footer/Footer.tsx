import React, { useEffect, useRef } from "react";
import "./Footer.css";

const Footer: React.FC = () => {
  const scrollRef = useRef<HTMLDivElement>(null);
  const INTERVAL_SPEED = 30;

  useEffect(() => {
    const scrollElement = scrollRef.current;

    if (scrollElement) {
      scrollElement.scrollLeft = scrollElement.scrollWidth / 2;
    }

    let isScrolling = false;
    const scrollContent = () => {
      if (scrollElement && !isScrolling) {
        scrollElement.scrollLeft += 1;

        if (
          scrollElement.scrollLeft >= scrollElement.scrollWidth / 2 ||
          scrollElement.scrollLeft <= 1
        ) {
          scrollElement.scrollLeft = scrollElement.scrollWidth / 4;
        }
      }
    };

    const scrollInterval = setInterval(scrollContent, INTERVAL_SPEED);

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

  const footerContent = (
    <div className="flex-shrink-0">
      <span className="mx-40"></span>
      I HAVE SEEN THE FUTURE 
      <span className="mx-60"></span> 
      AND THERE IS NO FUTURE      
      <span className="mx-40"></span>
      Footer text this is cool...
      <span className="mx-20"></span>
      [link]
      <span className="mx-20"></span>
      [link]
      <span className="mx-20"></span>
      [link]
      <span className="mx-40"></span>
    </div>
  );

  return (
    <footer className="fixed bottom-0 w-full text-gray-600">
      <div
        ref={scrollRef}
        className="whitespace-nowrap overflow-x-auto scroll-hidden select-none flex"
        style={{ display: "flex" }}
      >
        {footerContent}
        {footerContent}
        {footerContent}
      </div>
    </footer>
  );
};

export default Footer;
