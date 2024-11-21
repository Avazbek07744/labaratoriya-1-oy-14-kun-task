import React, { useState, useEffect } from "react";

const App = () => {
  const table = 12;
  const [greenCell, setGreenCell] = useState({ row: 0, col: 0 });
  const [blueCell, setBlueCell] = useState({ row: 0, col: 0 });
  const [redCell, setRedCell] = useState(null);
  const [inputValue, setInputValue] = useState("");
  const [movements, setMovements] = useState([]); 

  useEffect(() => {
    const randomRow = Math.floor(Math.random() * table);
    const randomCol = Math.floor(Math.random() * table);
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
          if (row === 0) {
            alert("Robot yuqoriga yura olmaydi!");
            return;
          }
          row -= 1;
          break;
        case "l":
          if (col === 0) {
            alert("Robot chapga yura olmaydi!");
            return;
          }
          col -= 1;
          break;
        case "r":
          if (col === table - 1) {
            alert("Robot o‘ngga yura olmaydi!");
            return;
          }
          col += 1;
          break;
        case "p":
          if (row === table - 1) {
            alert("Robot pastga yura olmaydi!");
            return;
          }
          row += 1;
          break;
        default:
          alert(`Noto‘g‘ri harf: ${char}`);
          return;
      }
    }

    setMovements((prevMovements) => [...prevMovements, inputValue]);

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
    <div className="flex">
      <div className="flex-1 flex flex-col items-center justify-center min-h-screen bg-gray-100 text-gray-800">
        <div className="grid grid-cols-12 gap-2">
          {Array.from({ length: table }).map((_, row) =>
            Array.from({ length: table }).map((_, col) => (
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

      <div className="w-1/4 p-4 bg-gray-200 text-2xl">
        <h2 className="text-black font-semibold mb-4">Harakatlar</h2>
        <ul className="list-disc pl-5">
          {movements.map((move, index) => (
            <li key={index} className="text-gray-800 list-none">
              {move}
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default App;
