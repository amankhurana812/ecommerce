import Image from "next/image";
import Link from "next/link";

const ProductList = () => {
  return (
    <div className="mt-12 flex gap-8 gap-y-16 items-center justify-between flex-wrap">
      <Link
        href="/test"
        className="w-full flex flex-col gap-4 sm:w-[45%] lg:w-[22%]"
      >
        <div className="relative w-full h-80">
          <Image
            src="https://images.pexels.com/photos/7521429/pexels-photo-7521429.jpeg?auto=compress&cs=tinysrgb&w=800&lazy=load"
            alt=""
            fill
            sizes="25vw"
            className="absolute object-cover rounded-md z-10 hover:opacity-0 transition-opacity easy duration-500"
          />
          <Image
            src=" https://images.pexels.com/photos/28670264/pexels-photo-28670264/free-photo-of-scenic-mountain-view-with-forest-road-at-sunset.jpeg?auto=compress&cs=tinysrgb&w=800&lazy=load"
            alt=""
            fill
            sizes="25vw"
            className="absolute object-cover rounded-md"
          />
        </div>
        <div className="flex justify-between">
          <span className="font-medium">Product Name</span>
          <span className="font-semibold">$49</span>
        </div>
        <div className="text-sm text-gray-500">My Description</div>
        <button className="rounded-2xl w-max ring-1 ring-lama text-lama py-2 px-4 text-sm hover:bg-lama hover:text-white">
          Add to Cart
        </button>
      </Link>
      <Link
        href="/test"
        className="w-full flex flex-col gap-4 sm:w-[45%] lg:w-[22%]"
      >
        <div className="relative w-full h-80">
          <Image
            src="https://images.pexels.com/photos/7521429/pexels-photo-7521429.jpeg?auto=compress&cs=tinysrgb&w=800&lazy=load"
            alt=""
            fill
            sizes="25vw"
            className="absolute object-cover rounded-md z-10 hover:opacity-0 transition-opacity easy duration-500"
          />
          <Image
            src=" https://images.pexels.com/photos/28670264/pexels-photo-28670264/free-photo-of-scenic-mountain-view-with-forest-road-at-sunset.jpeg?auto=compress&cs=tinysrgb&w=800&lazy=load"
            alt=""
            fill
            sizes="25vw"
            className="absolute object-cover rounded-md"
          />
        </div>
        <div className="flex justify-between">
          <span className="font-medium">Product Name</span>
          <span className="font-semibold">$49</span>
        </div>
        <div className="text-sm text-gray-500">My Description</div>
        <button className="rounded-2xl w-max ring-1 ring-lama text-lama py-2 px-4 text-sm hover:bg-lama hover:text-white">
          Add to Cart
        </button>
      </Link>
      <Link
        href="/test"
        className="w-full flex flex-col gap-4 sm:w-[45%] lg:w-[22%]"
      >
        <div className="relative w-full h-80">
          <Image
            src="https://images.pexels.com/photos/7521429/pexels-photo-7521429.jpeg?auto=compress&cs=tinysrgb&w=800&lazy=load"
            alt=""
            fill
            sizes="25vw"
            className="absolute object-cover rounded-md z-10 hover:opacity-0 transition-opacity easy duration-500"
          />
          <Image
            src=" https://images.pexels.com/photos/28670264/pexels-photo-28670264/free-photo-of-scenic-mountain-view-with-forest-road-at-sunset.jpeg?auto=compress&cs=tinysrgb&w=800&lazy=load"
            alt=""
            fill
            sizes="25vw"
            className="absolute object-cover rounded-md"
          />
        </div>
        <div className="flex justify-between">
          <span className="font-medium">Product Name</span>
          <span className="font-semibold">$49</span>
        </div>
        <div className="text-sm text-gray-500">My Description</div>
        <button className="rounded-2xl w-max ring-1 ring-lama text-lama py-2 px-4 text-sm hover:bg-lama hover:text-white">
          Add to Cart
        </button>
      </Link>
      <Link
        href="/test"
        className="w-full flex flex-col gap-4 sm:w-[45%] lg:w-[22%]"
      >
        <div className="relative w-full h-80">
          <Image
            src="https://images.pexels.com/photos/7521429/pexels-photo-7521429.jpeg?auto=compress&cs=tinysrgb&w=800&lazy=load"
            alt=""
            fill
            sizes="25vw"
            className="absolute object-cover rounded-md z-10 hover:opacity-0 transition-opacity easy duration-500"
          />
          <Image
            src=" https://images.pexels.com/photos/28670264/pexels-photo-28670264/free-photo-of-scenic-mountain-view-with-forest-road-at-sunset.jpeg?auto=compress&cs=tinysrgb&w=800&lazy=load"
            alt=""
            fill
            sizes="25vw"
            className="absolute object-cover rounded-md"
          />
        </div>
        <div className="flex justify-between">
          <span className="font-medium">Product Name</span>
          <span className="font-semibold">$49</span>
        </div>
        <div className="text-sm text-gray-500">My Description</div>
        <button className="rounded-2xl w-max ring-1 ring-lama text-lama py-2 px-4 text-sm hover:bg-lama hover:text-white">
          Add to Cart
        </button>
      </Link>
    </div>
  );
};

export default ProductList;