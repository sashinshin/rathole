// App.tsx
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
    <div className="min-h-screen flex items-center justify-center space-x-4">
      {/* Render three draggable boxes with different sizes and header colors */}
      <DraggableBox
        content="Box 1: content"
        initialX={0}
        initialY={0}
        zIndex={activeBoxIndex === 0 ? 10 : 1}
        headerColor="#1E3A8A" // Blue header
        onDragStart={() => handleDragStart(0)}
        width="150px"
        height="300px" // Tall box
      />
      <DraggableBox
        content="Box 2: more content"
        initialX={170}
        initialY={0}
        zIndex={activeBoxIndex === 1 ? 10 : 1}
        headerColor="#10B981" // Green header
        onDragStart={() => handleDragStart(1)}
        width="200px"
        height="200px" // Big square box
      />
      <DraggableBox
        content="Box 3: content in here as well"
        initialX={380}
        initialY={0}
        zIndex={activeBoxIndex === 2 ? 10 : 1}
        headerColor="#F59E0B" // Yellow header
        onDragStart={() => handleDragStart(2)}
        width="150px"
        height="300px" // Tall box similar to the first
      />
    </div>
  );
};

export default App;
