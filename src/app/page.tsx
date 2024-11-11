// "use client";

import CategoryList from "@/components/category-list";
import Footer from "@/components/footer";
import ProductList from "@/components/product-list";
import Slider from "@/components/slider";
import { WixClientContext } from "../context/wix-context";
import { Suspense, useContext, useEffect } from "react";
import { useWixClient } from "@/hooks/useWixClient";
import { wixClientServer } from "@/lib/wixClientServer";

export default async function Home() {
  // const wixContext = useContext(WixClientContext);
  // const wixClientContext = useWixClient();
  // //
  // const getProducts = async () => {
  //   const response = await wixClientContext.products.queryProducts().find();
  //   console.log(response);
  // };

  // useEffect(() => {
  //   getProducts();
  // }, [wixClientContext]);

  // const wixClient = await wixClientServer();

  // const res = await wixClient.products.queryProducts().find();
  // console.log(res);

  return (
    <div>
      <Slider />
      <div className="mt-24 px-4 md:px-8 lg:px-16 xl:px-32 2xl:px-64 relative">
        <h1>Featured Products</h1>
        <Suspense fallback={"loading..."}>
          <ProductList
            categoryId={process.env.NEXT_PUBLIC_FEATURED_CATEGORY_ID!}
            limit={4}
          />
        </Suspense>
      </div>
      <div className="mt-24">
        <h1 className="px-4 md:px-8 lg:px-16 xl:px-32 2xl:px-64 mb-12">
          Categories
        </h1>
        {/* CategoryList */}
        <Suspense fallback={"Loading..."}>
          <CategoryList />
        </Suspense>
        {/* <ProductList /> */}
      </div>
      <div className="mt-24 px-4 md:px-8 lg:px-16 xl:px-32 2xl:px-64 relative">
        <h1>New Products</h1>
        {/* <ProductList /> */}
      </div>
    </div>
  );
}
