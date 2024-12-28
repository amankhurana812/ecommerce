// "use client";

import { useCartStore } from "@/hooks/useCartStore";
import { useWixClient } from "@/hooks/useWixClient";
import Image from "next/image";
import { useEffect } from "react";
import { media as wixMedia } from "@wix/sdk";
import { currentCart } from "@wix/ecom";
import { redirects } from "@wix/redirects";

const CartModal = () => {
  // TEMPARAY
  //   const cartItems = true;

  const { cart, isLoading, removeItem } = useCartStore();

  const wixClient = useWixClient();

  //   import { currentCart } from "@wix/ecom";

  //   useEffect(() => {
  //     getCart(wixClient);
  //     // async function getCurrentCart() {
  //     //   const response = await wixClient.currentCart.getCurrentCart();
  //     //   console.log(response);
  //     // }
  //     // getCurrentCart();
  //   }, [wixClient, getCart]);

  const handleCheckout = async () => {
    console.log(311);
    try {
      const checkout =
        await wixClient.currentCart.createCheckoutFromCurrentCart({
          channelType: currentCart.ChannelType.WEB,
        });

      const { redirectSession } =
        await wixClient.redirects.createRedirectSession({
          ecomCheckout: { checkoutId: checkout.checkoutId },
          callbacks: {
            postFlowUrl: window.location.origin,
            thankYouPageUrl: `${window.location.origin}/success`,
          },
        });

      if (redirectSession?.fullUrl) {
        window.location.href = redirectSession.fullUrl;
      }
    } catch (err) {
      console.log(err);
    }
  };
  console.log(2666, cart);

  return (
    <div className="w-max absolute p-4 rounded-md shadow-[0_3px_10px_rgb(0,0,0,0.2)] bg-white top-12 right-0 flex flex-col gap-6 z-20">
      {!cart.lineItems ? (
        <div className="">Cart is Empty</div>
      ) : (
        <>
          <h2 className="text-xl">Shopping Cart</h2>
          {/* list */}
          <div className="flex flex-col gap-8">
            {/* item */}
            {cart.lineItems.map((item) => (
              <div className="flex gap-4" key={item._id}>
                {item.image && (
                  <Image
                    src={wixMedia.getScaledToFillImageUrl(
                      item.image,
                      72,
                      96,
                      {}
                    )}
                    //   src="https://images.pexels.com/photos/7521429/pexels-photo-7521429.jpeg?auto=compress&cs=tinysrgb&w=800&lazy=load"
                    alt=""
                    width={72}
                    height={96}
                    className="object-cover rounded-md"
                  />
                )}
                <div className="flex flex-col justify-between w-full">
                  {/* top */}
                  <div className="">
                    {/* title */}
                    <div className="flex items-center justify-between gap-8">
                      <h3 className="font-semibold">
                        {item.productName?.original}
                      </h3>
                      <div className="p-1 bg-gray-50 flex items-center rounded-sm gap-2">
                        {item.quantity && item.quantity > 1 && (
                          <div className="text-xs text-green-500">
                            {item.quantity} x{" "}
                          </div>
                        )}
                        ${item.price?.amount}
                      </div>
                    </div>
                    {/* description */}
                    <div className="text-sm text-gray-500">
                      {item.availability?.status}
                    </div>
                  </div>

                  {/* bottom */}
                  <div className="flex justify-between text-sm">
                    <span className="text-gray-500">Qty. {item.quantity}</span>
                    <span
                      className="text-blue-500"
                      style={{ cursor: isLoading ? "not-allowed" : "pointer" }}
                      onClick={() => removeItem(wixClient, item._id!)}
                    >
                      Remove
                    </span>
                  </div>
                </div>
              </div>
            ))}
            {/* item */}
          </div>
          {/* // bottom */}
          <div className="">
            <div className="flex items-center justify-between font-semibold">
              <span>Subtotal</span>
              <span>${cart?.subtotal?.amount}</span>
            </div>
            <p className="text-gray-500 text-sm mt-2 mb-4">
              Shipping and texes calculated at checkout.
            </p>
            <div className="flex justify-between text-sm">
              <button className="rounded-md py-3 px-4 ring-1 ring-gray-300">
                View Cart
              </button>
              <button
                className="rounded-md py-3 px-4 bg-black text-white disabled:cursor-not-allowed disabled:opacity-75"
                disabled={isLoading}
                onClick={handleCheckout}
              >
                Checkout
              </button>
            </div>
          </div>
        </>
      )}
    </div>
  );
};

export default CartModal;

{
  /* <div className="flex gap-4">
  <Image
    src="https://images.pexels.com/photos/7521429/pexels-photo-7521429.jpeg?auto=compress&cs=tinysrgb&w=800&lazy=load"
    alt=""
    width={72}
    height={96}
    className="object-cover rounded-md"
  />
  <div className="flex flex-col justify-between w-full"> */
}
{
  /* top */
}
// <div className="">
{
  /* title */
}
//   <div className="flex items-center justify-between gap-8">
//     <h3 className="font-semibold">Product name</h3>
//     <div className="p-1 bg-gray-50 rounded-sm ">$49</div>
//   </div>
{
  /* description */
}
//   <div className="text-sm text-gray-500">available</div>
// </div>

{
  /* bottom */
}
//     <div className="flex justify-between text-sm">
//       <span className="text-gray-500">Qty. 2</span>
//       <span className="text-blue-500">Remove</span>
//     </div>
//   </div>
// </div>
