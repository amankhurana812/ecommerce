'use client';

import Image from 'next/image';
import Link from 'next/link';
// import { redirect } from "next/navigation";
import { usePathname, useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import CartModal from './cartModal';
import { useWixClient } from '@/hooks/useWixClient';
import Cookies from 'js-cookie';
import { useCartStore } from '@/hooks/useCartStore';

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
      router.push('/login');
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
  console.log(566, 'pathName', pathName);
  const handleLogout = async () => {
    setIsLoading(true);
    Cookies.remove('refreshToken');
    const { logoutUrl } = await wixClient.auth.logout(window.location.href);
    console.log('logoutUrl', logoutUrl);
    setIsLoading(false);
    setIsProfileOpen(false);
    router.push(logoutUrl);
  };

  const { cart, counter, getCart } = useCartStore();

  useEffect(() => {
    getCart(wixClient);
  }, [wixClient, getCart]);

  return (
    <div className="relative flex items-center gap-4 xl:gap-6">
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
        <div className="absolute left-0 top-8 z-20 rounded-md bg-white p-4 text-sm shadow-[0_3px_10px_rgb(0,0,0,0.2)]">
          <Link href="/profile">Profile</Link>
          <div className="mt-2 cursor-pointer" onClick={handleLogout}>
            {isLoading ? 'Logging out' : 'Logout'}
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
        <div className="absolute -right-4 -top-4 flex h-6 w-6 items-center justify-center rounded-full bg-lama text-sm text-white">
          {/* 2 */}
          {counter}
        </div>
      </div>
      {isCartOpen && <CartModal />}
    </div>
  );
};

export default NavIcons;
