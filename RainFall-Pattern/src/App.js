import React, { useEffect, useState, useRef } from 'react';
import './App.css';


const numRows = 15;
const numCols = 20;
const maxActiveColumns = 2; 

const App = () => {
  const [grid, setGrid] = useState(createGrid());
  const [colorIndex, setColorIndex] = useState(0);
  const colorIndexRef = useRef(colorIndex);

  const colors = [
    ['#00ff00', '#00e600', '#00cc00', '#00b300', '#009900', '#008000', '#006600', '#004d00'],
    ['#ff0000', '#e60000', '#cc0000', '#b30000', '#990000', '#800000', '#660000', '#4d0000'], 
    ['#0000ff', '#0000e6', '#0000cc', '#0000b3', '#000099', '#000080', '#000066', '#00004d'],
    ['#ffa500', '#e69500', '#cc8500', '#b37500', '#996600', '#805600', '#664700', '#4d3700'], 
    ['#8a2be2', '#7a25cc', '#6b1fb3', '#5c1999', '#4d1480', '#3e0e66', '#2f094d', '#200333'], 
    ['#ffd700', '#e6c300', '#ccaf00', '#b39b00', '#998700', '#807300', '#665f00', '#4d4b00'],
    ['#ff00ff', '#e600e6', '#cc00cc', '#b300b3', '#990099', '#800080', '#660066', '#4d004d'], 
    ['#00ffff', '#00e6e6', '#00cccc', '#00b3b3', '#009999', '#008080', '#006666', '#004d4d'],
    ['#ffff00', '#e6e600', '#cccc00', '#b3b300', '#999900', '#808000', '#666600', '#4d4d00'],
    ['#ff4500', '#e63e00', '#cc3700', '#b33000', '#992900', '#802200', '#661a00', '#4d1300']
];


  useEffect(() => {
    const colorChangeInterval = setInterval(() => {
      setColorIndex(prevIndex => {
        const newIndex = (prevIndex + 1) % colors.length;
        colorIndexRef.current = newIndex; 
        return newIndex;
      });
    }, 3000); 

   
    for (let i = 0; i < maxActiveColumns; i++) {
      startRainfallWithRandomDelay();
    }

    return () => {
      clearInterval(colorChangeInterval);
    };
  }, []);

  const startRainfallWithRandomDelay = () => {
    const randomDelay = Math.random() * 2000; 
    setTimeout(() => {
      createRainfall();
      startRainfallWithRandomDelay(); 
    }, randomDelay);
  };

  const createRainfall = () => {
    const randomColumn = Math.floor(Math.random() * numCols);

    for (let i = 0; i < numRows + 5; i++) {
      setTimeout(() => {
        setGrid(prevGrid => {
          const newGrid = prevGrid.map((row, rowIndex) =>
            row.map((cell, colIndex) => {
              if (colIndex === randomColumn) {
                if (rowIndex >= i && rowIndex < i + 5) {
                  return colors[colorIndexRef.current][rowIndex - i];
                } else if (rowIndex === i - 1) {
                  return false;
                }
              }
              return cell;
            })
          );
          return newGrid;
        });
      }, i * 100);
    }
  };

  return (
    <div className="grid">
    <h1>RainFall-Grid</h1>
      {grid.map((row, rowIndex) => (
        <div key={rowIndex} className="row">
          {row.map((cell, colIndex) => (
            <div
              key={colIndex}
              className="cell"
              style={{ backgroundColor: cell ? cell : '' }}
            />
          ))}
        </div>
      ))}
    </div>
  );
};

const createGrid = () => {
  const grid = [];
  for (let i = 0; i < numRows; i++) {
    const row = [];
    for (let j = 0; j < numCols; j++) {
      row.push(false);
    }
    grid.push(row);
  }
  return grid;
};

export default App;
