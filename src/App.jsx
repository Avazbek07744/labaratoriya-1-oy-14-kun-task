import React, { useState, useEffect } from "react";

const App = () => {
  const gridSize = 8;
  const [greenCell, setGreenCell] = useState({ row: 0, col: 0 });
  const [blueCell, setBlueCell] = useState({ row: 0, col: 0 });
  const [redCell, setRedCell] = useState(null);
  const [inputValue, setInputValue] = useState("");

  useEffect(() => {
    const randomRow = Math.floor(Math.random() * gridSize);
    const randomCol = Math.floor(Math.random() * gridSize);
    setGreenCell({ row: randomRow, col: randomCol });
  }, []);

  const handleInputChange = (e) => {
    setInputValue(e.target.value.toLowerCase());
  };

  const handleButtonClick = () => {
    let { row, col } = blueCell;

    for (const char of inputValue) {
      switch (char) {
        case "t":
          row = row > 0 ? row - 1 : row;
          break;
        case "l":
          col = col > 0 ? col - 1 : col;
          break;
        case "r":
          col = col < gridSize - 1 ? col + 1 : col;
          break;
        case "p":
          row = row < gridSize - 1 ? row + 1 : row;
          break;
        default:
          alert(`Noto‘g‘ri harf: ${char}`);
          return;
      }
    }

    setBlueCell({ row, col });

    if (row === greenCell.row && col === greenCell.col) {
      setGreenCell(null);
      setRedCell({ row, col });
    }

    setInputValue("");
  };


  const handleAddClick = () => {

    if (redCell) {
      setRedCell(null);
    }


    setGreenCell(blueCell);
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100 text-gray-800">
      <div className="grid grid-cols-8 gap-2">
        {Array.from({ length: gridSize }).map((_, row) =>
          Array.from({ length: gridSize }).map((_, col) => (
            <span
              key={`${row}-${col}`}
              className={`w-12 h-12 border rounded ${greenCell?.row === row && greenCell?.col === col
                ? "bg-green-500"
                : blueCell.row === row && blueCell.col === col
                  ? "bg-blue-500"
                  : redCell?.row === row && redCell?.col === col
                    ? "bg-red-500"
                    : "bg-gray-200"
                }`}
            ></span>
          ))
        )}
      </div>
      <div className="mt-6 flex flex-col items-center">
        <label
          htmlFor="moveInput"
          className="text-lg font-semibold mb-2 text-blue-600"
        >
          Harakatni kiriting
        </label>
        <div className="flex items-center space-x-3">
          <input
            id="moveInput"
            type="text"
            value={inputValue}
            onChange={handleInputChange}
            placeholder="Harakatlar (masalan, llrtp)"
            className="border border-gray-300 rounded px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          <button
            onClick={handleButtonClick}
            className="bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600"
          >
            OK
          </button>
          {redCell && (
            <button
              onClick={handleAddClick}
              className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
            >
              ADD
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

export default App;
