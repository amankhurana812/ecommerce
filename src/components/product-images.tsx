'use client';
import Image from 'next/image';
import { useState } from 'react';

const ProductImages = ({ items }: { items: any }) => {
  const [index, setIndex] = useState(0);
  //   const images = [
  //     {
  //       id: 1,
  //       url: "https://images.pexels.com/photos/19036832/pexels-photo-19036832/free-photo-of-mountain-reflection-in-lake.jpeg?auto=compress&cs=tinysrgb&w=800&lazy=load",
  //     },
  //     {
  //       id: 2,
  //       url: "https://images.pexels.com/photos/17867705/pexels-photo-17867705/free-photo-of-crowd-of-hikers-on-the-mountain-ridge-at-dusk.jpeg?auto=compress&cs=tinysrgb&w=800&lazy=load",
  //     },
  //     {
  //       id: 3,
  //       url: "https://images.pexels.com/photos/21812160/pexels-photo-21812160/free-photo-of-puerta-colonial-color-rojo-de-guanajuato-mexico.jpeg?auto=compress&cs=tinysrgb&w=800&lazy=load",
  //     },
  //     {
  //       id: 4,
  //       url: "https://images.pexels.com/photos/20832069/pexels-photo-20832069/free-photo-of-a-narrow-street-with-buildings-and-cars.jpeg?auto=compress&cs=tinysrgb&w=800&lazy=load",
  //     },
  //   ];

  return (
    <div className="">
      <div className="relative h-[500px]">
        <Image
          src={items[index].image?.url}
          alt=""
          sizes="50vw"
          fill
          className="rounded-md object-cover"
        />
      </div>
      <div className="mt-8 flex cursor-pointer justify-between gap-4">
        {items.map((item: any, index: number) => {
          return (
            <div
              className="relative mt-8 h-32 w-1/4 gap-4"
              onClick={() => setIndex(index)}
              key={item._id}
            >
              <Image
                src={item.image.url}
                alt=""
                sizes="30vw"
                fill
                className="rounded-md object-cover"
              />
            </div>
          );
        })}
      </div>
    </div>
    // <div className="">
    //   <div className="h-[500px] relative">
    //     <Image
    //       src={images[index].url}
    //       alt=""
    //       sizes="50vw"
    //       fill
    //       className="object-cover rounded-md"
    //     />
    //   </div>
    //   <div className="flex justify-between gap-4 mt-8 cursor-pointer">
    //     {images.map((img, index) => {
    //       return (
    //         <div
    //           className="w-1/4 h-32 relative gap-4 mt-8"
    //           onClick={() => setIndex(index)}
    //           key={img.id}
    //         >
    //           <Image
    //             src={img.url}
    //             alt=""
    //             sizes="30vw"
    //             fill
    //             className="object-cover rounded-md"
    //           />
    //         </div>
    //       );
    //     })}
    //   </div>
    // </div>
  );
};

export default ProductImages;
