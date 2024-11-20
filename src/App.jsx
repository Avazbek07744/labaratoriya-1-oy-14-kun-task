import React, { useState } from "react";

const App = () => {
  const [input, setInput] = useState("");
  const [colors, setColors] = useState(
    Array(16).fill("bg-red-500")
  );

  const handleInputChange = (e) => {
    setInput(e.target.value);
  };

  const handleButtonClick = () => {
    let tanlangan = Array(16).fill("bg-red-500");
    let yasahilSpan = tanlangan.indexOf("bg-green-500");
    if (yasahilSpan === -1) yasahilSpan = 4;

    for (let char of input) {
      if (char === "v" && yasahilSpan < 6) {
        yasahilSpan += 3;
      } else if (char === "l" && yasahilSpan % 3 > 0) {
        yasahilSpan -= 1;
      } else if (char === "b" && yasahilSpan >= 3) {
        yasahilSpan -= 3;
      } else if (char === "p" && yasahilSpan % 3 < 2) {
        yasahilSpan += 1;
      }
    }

    tanlangan[yasahilSpan] = "bg-green-500";
    setColors(tanlangan);
  };

  return (
    <div>
      <div className="grid grid-rows-4 grid-cols-4 gap-5 items-center w-[300px] mx-auto mt-40">
        {colors.map((color, index) => (
          <span
            key={index}
            className={`p-5 border border-gray-500 ${color} w-max h-5 rounded-md`}
          ></span>
        ))}
      </div>
      <form
        className="w-72 flex flex-col gap-2 mt-10 mx-auto"
        onSubmit={(e) => e.preventDefault()}
      >
        <label
          htmlFor="inp"
          className="px-2 text-xl font-semibold text-blue-700"
        >
          Joylashuvni kiriting
        </label>
        <div className="flex gap-3">
          <div className="border border-blue-500 w-full py-3 rounded-md">
            <input
              placeholder="Joylashuvni kiriting"
              type="text"
              id="inp"
              className="w-full outline-none border-none px-5"
              value={input}
              onChange={handleInputChange}
            />
          </div>
          <button
            className="bg-green-500 px-5 py-3 uppercase text-white rounded-md w-max"
            onClick={handleButtonClick}
          >
            ok
          </button>
        </div>
      </form>
    </div>
  );
};

export default App;
