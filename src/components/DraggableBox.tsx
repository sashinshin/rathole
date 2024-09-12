import React, { useState } from 'react';

type DraggableBoxProps = {
  content: string;
  initialX: number;
  initialY: number;
  zIndex: number;
  headerColor: string;
  onDragStart: () => void;
  width: string;
  height: string;
};

const DraggableBox: React.FC<DraggableBoxProps> = ({
  content,
  initialX,
  initialY,
  zIndex,
  headerColor,
  onDragStart,
  width,
  height,
}) => {
  const [position, setPosition] = useState({ x: initialX, y: initialY });
  const [isDragging, setIsDragging] = useState(false);
  const [offset, setOffset] = useState({ x: 0, y: 0 });

  // Handle the start of the drag when the header is grabbed
  const handleMouseDown = (e: React.MouseEvent<HTMLDivElement>) => {
    setIsDragging(true);
    onDragStart();
    setOffset({
      x: e.clientX - position.x,
      y: e.clientY - position.y,
    });
  };

  // Handle the dragging movement
  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!isDragging) return;

    setPosition({
      x: e.clientX - offset.x,
      y: e.clientY - offset.y,
    });
  };

  // Handle the end of the drag
  const handleMouseUp = () => {
    setIsDragging(false);
  };

  return (
    <div
      className={`fixed rounded-lg shadow-lg border border-gray-200 select-none`}
      style={{
        transform: `translate(${position.x}px, ${position.y}px)`,
        zIndex,
        width,
        height,
      }}
      onMouseMove={handleMouseMove}
      onMouseUp={handleMouseUp}
      onMouseLeave={handleMouseUp} // Ensures dragging stops when the mouse leaves the box
    >
      {/* Header section that triggers the drag */}
      <div
        className={`p-2 cursor-grab active:cursor-grabbing`}
        style={{ backgroundColor: headerColor }}
        onMouseDown={handleMouseDown}
      >
        <h3 className="text-white font-semibold">Draggable Header</h3>
      </div>
      {/* Content section */}
      <div className="p-4 bg-white">
        <p className="text-gray-600">{content}</p>
      </div>
    </div>
  );
};

export default DraggableBox;
