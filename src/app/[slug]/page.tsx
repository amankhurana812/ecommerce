import Add from "@/components/add";
import CustomizeProducts from "@/components/customise-products";
import ProductImages from "@/components/product-images";
import { wixClientServer } from "@/lib/wixClientServer";
import { notFound } from "next/navigation";

const SinglePage = async ({ params }: { params: { slug: string } }) => {
  const { slug } = await params;
  const wixClient = await wixClientServer();
  // console.log(1444, categoryId);
  const products = await wixClient.products
    .queryProducts()
    .eq("slug", slug)
    .find();

  if (!products.items[0]) {
    return notFound();
  }
  // console.log(19999, product);
  const product = products.items[0];

  return (
    <div className="px-4 md:px-8 lg:px-16 xl:px-32 2xl:px-64 relative flex flex-col lg:flex-row gap-16">
      {/* img container */}
      <div className="w-full lg:w-1/2 lg:sticky top-20 h-max">
        <ProductImages items={product.media?.items} />
      </div>

      {/* texts */}
      <div className="w-full lg:w-1/2 flex flex-col gap-6">
        <h1 className="text-4xl font-medium">{product.name}</h1>
        <p className="text-gray-500">{product.description}</p>
        <div className="h-[2px] bg-gray-100"></div>
        {product.priceData?.price === product.priceData?.discountedPrice ? (
          <h2 className="font-medium text-2xl">${product.priceData?.price}</h2>
        ) : (
          <div className="flex items-center gap-4">
            <h3 className="text-xl text-gray-500 line-through">
              ${product.priceData?.price}
            </h3>
            <h2 className="font-medium text-2xl">
              ${product.priceData?.discountedPrice}
            </h2>
          </div>
        )}
        <div className="h-[2px] bg-gray-100"></div>
        <CustomizeProducts />
        <Add />
        <div className="h-[2px] bg-gray-100"></div>
        {product.additionalInfoSections?.map((section: any) => (
          <div className="text-sm" key={section.title}>
            <h4 className="font-medium mb-4">{section.title}</h4>
            <p>{section.description}</p>
          </div>
        ))}
        {/* <div className="text-sm">
          <h4 className="font-medium mb-4">Title</h4>
          <p>
            In a small town nestled between misty mountains, whispers of ancient
            secrets filled the air. Lanterns glowed warmly as night fell,
            casting shadows that danced along cobblestone paths, alive with
            mystery.
          </p>
        </div>
        <div className="text-sm">
          <h4 className="font-medium mb-4">Title</h4>
          <p>
            In a small town nestled between misty mountains, whispers of ancient
            secrets filled the air. Lanterns glowed warmly as night fell,
            casting shadows that danced along cobblestone paths, alive with
            mystery.
          </p> */}
        {/* </div> */}
      </div>
    </div>
    // <div className="px-4 md:px-8 lg:px-16 xl:px-32 2xl:px-64 relative flex flex-col lg:flex-row gap-16">
    //   {/* img container */}
    //   <div className="w-full lg:w-1/2 lg:sticky top-20 h-max">
    //     <ProductImages />
    //   </div>

    //   {/* texts */}
    //   <div className="w-full lg:w-1/2 flex flex-col gap-6">
    //     <h1 className="text-4xl font-medium">Product Name</h1>
    //     <p className="text-gray-500">
    //       In a small town nestled between misty mountains, whispers of ancient
    //       secrets filled the air. Lanterns glowed warmly as night fell, casting
    //       shadows that danced along cobblestone paths, alive with mystery.
    //     </p>
    //     <div className="h-[2px] bg-gray-100"></div>
    //     <div className="flex items-center gap-4">
    //       <h3 className="text-xl text-gray-500 line-through">$59</h3>
    //       <h3 className="font-medium text-2xl">$49</h3>
    //     </div>
    //     <div className="h-[2px] bg-gray-100"></div>
    //     <CustomizeProducts />
    //     <Add />
    //     <div className="h-[2px] bg-gray-100"></div>
    //     <div className="text-sm">
    //       <h4 className="font-medium mb-4">Title</h4>
    //       <p>
    //         In a small town nestled between misty mountains, whispers of ancient
    //         secrets filled the air. Lanterns glowed warmly as night fell,
    //         casting shadows that danced along cobblestone paths, alive with
    //         mystery.
    //       </p>
    //     </div>
    //     <div className="text-sm">
    //       <h4 className="font-medium mb-4">Title</h4>
    //       <p>
    //         In a small town nestled between misty mountains, whispers of ancient
    //         secrets filled the air. Lanterns glowed warmly as night fell,
    //         casting shadows that danced along cobblestone paths, alive with
    //         mystery.
    //       </p>
    //     </div>
    //     <div className="text-sm">
    //       <h4 className="font-medium mb-4">Title</h4>
    //       <p>
    //         In a small town nestled between misty mountains, whispers of ancient
    //         secrets filled the air. Lanterns glowed warmly as night fell,
    //         casting shadows that danced along cobblestone paths, alive with
    //         mystery.
    //       </p>
    //     </div>
    //   </div>
    // </div>
  );
};

export default SinglePage;
