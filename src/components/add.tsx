"use client";

import { useState } from "react";

const Add = () => {
  const [quantity, setQuantity] = useState(0);

  // Temp
  const stock = 4;
  const handleQuantity = (type: "i" | "d") => {
    if (type === "i" && quantity < stock) {
      setQuantity((prev) => prev + 1);
    }
    if (type === "d" && quantity !== 1) {
      setQuantity((prev) => prev - 1);
    }
  };
  return (
    <div className="flex flex-col gap-4">
      <h4 className="font-medium">Choose a quantity</h4>
      <div className="flex justify-between xs:flex-col">
        <div className="flex items-center gap-3">
          <div className="bg-gray-100 py-2 px-4 rounded-3xl flex items-center justify-between w-32">
            <button
              className="cursor-pointer text-xl"
              onClick={() => handleQuantity("d")}
            >
              -
            </button>
            {quantity}
            <button
              onClick={() => handleQuantity("i")}
              className="cursor-pointer text-xl"
            >
              +
            </button>
          </div>
          <div className="text-sm">
            Only <span className="text-orange-500">4 items</span> left! <br />
            {"Dont't"} miss it.
          </div>
        </div>
        <button className="w-36 text-sm rounded-3xl ring-1 ring-lama text-lama py-2 px-4 hover:bg-lama hover:text-white disabled:cursor-not-allowed disabled:bg-pink-200 disabled:text-white disabled:ring-none">
          Add to cart
        </button>
      </div>
    </div>
  );
};

export default Add;
