"use client";

import Image from "next/image";
import Link from "next/link";
// import { redirect } from "next/navigation";
import { usePathname, useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import CartModal from "./cartModal";
import { useWixClient } from "@/hooks/useWixClient";
import Cookies from "js-cookie";
import { useCartStore } from "@/hooks/useCartStore";

const NavIcons = () => {
  const [isProfileOpen, setIsProfileOpen] = useState(false);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const router = useRouter();
  const pathName = usePathname();
  //   const isLoggedIn = false;

  const wixClient = useWixClient();
  //   const router = useRouter();

  const isLoggedIn = wixClient.auth.loggedIn();

  //   if (isLoggedIn) {
  //     router.push("/");
  //   }

  const handleProfile = () => {
    console.log(1888);
    if (!isLoggedIn) {
      //   redirect("/login");
      router.push("/login");
    } else {
      setIsProfileOpen((prev) => !prev);
    }
  };

  //   AUTH WITH WIX MANAGE AUTH -  AUTH by Google

  //   const wixClient = useWixClient();
  //   const login = async () => {
  //     const loginRequestData = wixClient.auth.generateOAuthData(
  //       "http://localhost:3000"
  //       //   "https://www.mysite.com/login"
  //     );

  //     console.log(loginRequestData);
  //     localStorage.setItem("oAuthRedirectData", JSON.stringify(loginRequestData));
  //     const { authUrl } = await wixClient.auth.getAuthUrl(loginRequestData);
  //     window.location.href = authUrl;
  //   };

  console.log(244, isProfileOpen);
  console.log(566, "pathName", pathName);
  const handleLogout = async () => {
    setIsLoading(true);
    Cookies.remove("refreshToken");
    const { logoutUrl } = await wixClient.auth.logout(window.location.href);
    console.log("logoutUrl", logoutUrl);
    setIsLoading(false);
    setIsProfileOpen(false);
    router.push(logoutUrl);
  };

  const { cart, counter, getCart } = useCartStore();

  useEffect(() => {
    getCart(wixClient);
  }, [wixClient, getCart]);

  return (
    <div className="flex items-center gap-4 xl:gap-6 relative">
      <Image
        src="/profile.png"
        alt=""
        height={22}
        width={22}
        className="cursor-pointer"
        // onClick={login}
        onClick={handleProfile}
      />
      {isProfileOpen && (
        <div className="absolute p-4 rounded-md top-8 left-0 text-sm  shadow-[0_3px_10px_rgb(0,0,0,0.2)] z-20 bg-white">
          <Link href="/profile">Profile</Link>
          <div className="mt-2 cursor-pointer" onClick={handleLogout}>
            {isLoading ? "Logging out" : "Logout"}
          </div>
        </div>
      )}
      <Image
        src="/notification.png"
        alt=""
        height={22}
        width={22}
        className="cursor-pointer"
      />
      <div
        className="relative cursor-pointer"
        onClick={() => setIsCartOpen((prev) => !prev)}
      >
        <Image
          src="/cart.png"
          alt=""
          height={22}
          width={22}
          className="cursor-pointer"
        />
        <div className="absolute -top-4 -right-4 w-6 h-6 bg-lama rounded-full text-white text-sm flex items-center justify-center">
          {/* 2 */}
          {counter}
        </div>
      </div>
      {isCartOpen && <CartModal />}
    </div>
  );
};

export default NavIcons;
