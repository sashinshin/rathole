import React, { useState } from 'react';

type DraggableBoxProps = {
  content: string;
  initialX: number;
  initialY: number;
  zIndex: number;
  onDragStart: () => void;
};

const DraggableBox: React.FC<DraggableBoxProps> = ({
  content,
  initialX,
  initialY,
  zIndex,
  onDragStart,
}) => {
  const [position, setPosition] = useState({ x: initialX, y: initialY });
  const [isDragging, setIsDragging] = useState(false);
  const [offset, setOffset] = useState({ x: 0, y: 0 });

  const handleMouseDown = (e: React.MouseEvent<HTMLDivElement>) => {
    setIsDragging(true);
    onDragStart(); // Trigger the drag start event to update z-index
    setOffset({
      x: e.clientX - position.x,
      y: e.clientY - position.y,
    });
  };

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!isDragging) return;

    setPosition({
      x: e.clientX - offset.x,
      y: e.clientY - offset.y,
    });
  };

  const handleMouseUp = () => {
    setIsDragging(false);
  };

  return (
    <div
      className="select-none fixed p-6 bg-white rounded-lg shadow-lg border border-gray-200 cursor-grab active:cursor-grabbing"
      style={{
        transform: `translate(${position.x}px, ${position.y}px)`,
        zIndex, // Apply the dynamic z-index
      }}
      onMouseDown={handleMouseDown}
      onMouseMove={handleMouseMove}
      onMouseUp={handleMouseUp}
      onMouseLeave={handleMouseUp}
    >
      <p className="text-gray-600">{content}</p>
    </div>
  );
};

export default DraggableBox;
