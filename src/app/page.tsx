"use client";

import CategoryList from "@/components/category-list";
import Footer from "@/components/footer";
import ProductList from "@/components/product-list";
import Slider from "@/components/slider";

export default function Home() {
  return (
    <div>
      <Slider />
      <div className="mt-24 px-4 md:px-8 lg:px-16 xl:px-32 2xl:px-64 relative">
        <h1>Featured Products</h1>
        <ProductList />
      </div>
      <div className="mt-24">
        <h1 className="px-4 md:px-8 lg:px-16 xl:px-32 2xl:px-64 mb-12">
          Categories
        </h1>
        {/* CategoryList */}
        <CategoryList />
        {/* <ProductList /> */}
      </div>
      <div className="mt-24 px-4 md:px-8 lg:px-16 xl:px-32 2xl:px-64 relative">
        <h1>New Products</h1>
        <ProductList />
      </div>
    </div>
  );
}
