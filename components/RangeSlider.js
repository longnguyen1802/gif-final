import { useState, useEffect, useRef } from "react";

const RangeSlider = ({ initalValue,setInitalValue, initialMax, min, max, step}) => {
  const progressRef = useRef(null);


  const handleValue = (e) => {
    setInitalValue(parseInt(e.target.value))
  };


  useEffect(() => {
    progressRef.current.style.left = (initalValue / max) * step + "%";
    //progressRef.current.style.right = step - (maxValue / max) * step + "%";
  }, [initalValue, max, step]);

  return (
    <div className="min-h-screen grid place-items-center bg-green-300">
      <div className="flex flex-col w-96 bg-white shadow-xl rounded-lg px-6 py-4">
        <h3> Gif speed</h3>
        <p className="font-semibold text-lg text-gray-700">
          Use slider to choose
        </p>

        <div className="flex justify-between items-center my-6 ">
          <div className="rounded-md">
            <span className="p-2 font-semibold"> Value</span>
            <input
              onChange={(e) => setInitalValue(e.target.value)}
              type="number"
              value={initalValue}
              className="w-24 rounded-md border border-gray-400"
            />
          </div>
        </div>

        <div className="mb-4">
          <div className="slider relative h-1 rounded-md bg-gray-300">
            <div
              className="progress absolute h-1 bg-green-300 rounded "
              ref={progressRef}
            ></div>
          </div>

          <div className="range-input relative  ">
            <input
              onChange={handleValue}
              type="range"
              min={min}
              step={step}
              max={max}
              value={initalValue}
              className="range-min absolute w-full  -top-1  h-1   bg-transparent  appearance-none pointer-events-none"
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default RangeSlider;
