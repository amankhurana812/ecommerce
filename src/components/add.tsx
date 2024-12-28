"use client";

import { useState } from "react";
import { currentCart } from "@wix/ecom";
import { useWixClient } from "@/hooks/useWixClient";
import { useCartStore } from "@/hooks/useCartStore";

const Add = ({
  productId,
  variantId,
  stockNumber,
}: {
  productId: string;
  variantId: string;
  stockNumber: number;
}) => {
  const [quantity, setQuantity] = useState(0);

  // Temp
  //   const stock = 4;
  const wixClient = useWixClient();

  const handleQuantity = (type: "i" | "d") => {
    if (type === "d" && quantity > 1) {
      setQuantity((prev) => prev - 1);
    }
    if (type === "i" && quantity < stockNumber) {
      setQuantity((prev) => prev + 1);
    }
  };

  //   const addItem = async () => {
  //     const response = await wixClient.currentCart.addToCurrentCart({
  //       lineItems: [
  //         {
  //           catalogReference: {
  //             appId: process.env.NEXT_PUBLIC_WIX_APP_ID!,
  //             catalogItemId: productId,
  //             ...(variantId && { options: { variantId } }),
  //           },
  //           quantity: quantity,
  //         },
  //       ],
  //     });
  //   };

  const { addItem, isLoading } = useCartStore();

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
          {stockNumber < 1 ? (
            <div className="text-xs">Product is out of stock</div>
          ) : (
            <div className="text-xs">
              Only <span className="text-orange-500">{stockNumber} items</span>{" "}
              left!
              <br /> {"Don't"} miss it
            </div>
          )}
        </div>
        <button
          onClick={() => addItem(wixClient, productId, variantId, quantity)}
          disabled={isLoading}
          className="w-36 text-sm rounded-3xl ring-1 ring-lama text-lama py-2 px-4 hover:bg-lama hover:text-white disabled:cursor-not-allowed disabled:bg-pink-200 disabled:text-white disabled:ring-none disabled:ring-0"
        >
          Add to cart
        </button>
      </div>
    </div>
  );
};

export default Add;
