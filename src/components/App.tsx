import React, { useState } from 'react';
import DraggableBox from './DraggableBox';

const App: React.FC = () => {
  // State to track the active box index
  const [activeBoxIndex, setActiveBoxIndex] = useState<number | null>(null);

  // Handle setting the active box when dragging starts
  const handleDragStart = (index: number) => {
    setActiveBoxIndex(index); // Update the active box index to bring it to the front
  };

  return (
    <div className="min-h-screen flex items-center justify-center">
      <DraggableBox
        content="Box 1: Drag me!"
        initialX={0}
        initialY={0}
        zIndex={activeBoxIndex === 0 ? 10 : 1}
        onDragStart={() => handleDragStart(0)}
      />
      <DraggableBox
        content="Box 2: I'm draggable too!"
        initialX={150}
        initialY={0}
        zIndex={activeBoxIndex === 1 ? 10 : 1}
        onDragStart={() => handleDragStart(1)}
      />
      <DraggableBox
        content="Box 3: Don't forget me!"
        initialX={300}
        initialY={0}
        zIndex={activeBoxIndex === 2 ? 10 : 1}
        onDragStart={() => handleDragStart(2)}
      />
    </div>
  );
};

export default App;
