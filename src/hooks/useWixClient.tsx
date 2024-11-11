"use client";

import { WixClientContext } from "@/context/wix-context";
import { useContext } from "react";

// const wixClientContext = useContext(WixClientContext);

export const useWixClient = () => {
  return useContext(WixClientContext);
};
