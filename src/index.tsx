import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './components/App';
import reportWebVitals from './reportWebVitals';

document.addEventListener("DOMContentLoaded", function() {
  const draggableElements = document.querySelectorAll(".draggable");

  draggableElements.forEach((element) => {
    element.addEventListener("mousedown", onMouseDown);
  });

  let offsetX: number;
  let offsetY: number;
  let draggedElement: any = null;

  function onMouseDown(e: any) {
    if (e.target.classList.contains("header")) {
      draggedElement = e.currentTarget;
      const rect = draggedElement.getBoundingClientRect();
      offsetX = e.clientX - rect.left;
      offsetY = e.clientY - rect.top;
      draggedElement.classList.add("dragging");
      // bringToFront(draggedElement);
      document.addEventListener("mousemove", onMouseMove);
      document.addEventListener("mouseup", onMouseUp);
    }
  }

  function onMouseMove(e: any) {
    if (draggedElement) {
      const newX = e.clientX - offsetX;
      const newY = e.clientY - offsetY;
      draggedElement.style.left = `${newX}px`;
      draggedElement.style.top = `${newY}px`;
    }
  }

  function onMouseUp() {
    if (draggedElement) {
      draggedElement.classList.remove("dragging");
      draggedElement = null;
      document.removeEventListener("mousemove", onMouseMove);
      document.removeEventListener("mouseup", onMouseUp);
    }
  }

  // function bringToFront(element: any) {
  //   const divs = document.querySelectorAll(".draggable");
  //   let highestZIndex = 0;

  //   divs.forEach((div) => {
  //     const zIndex = parseInt(window.getComputedStyle(div).zIndex, 10);
  //     if (!isNaN(zIndex) && zIndex > highestZIndex) {
  //       highestZIndex = zIndex;
  //     }
  //   });

  //   element.style.zIndex = highestZIndex + 1;
  // }
});
/**
 * TODO:
 * 
 * options bar that opens windows
 * about page
 * links page
 * fun stuff
 */
const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);
root.render(
  <React.StrictMode>
    <App />
{/* menubar */}
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
