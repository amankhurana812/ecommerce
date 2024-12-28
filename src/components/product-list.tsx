import { wixClientServer } from '@/lib/wixClientServer';
import { products } from '@wix/stores';
import Image from 'next/image';
import Link from 'next/link';
import DOMPurify from 'isomorphic-dompurify';
import Pagination from './pagination';

const PRODUCT_PER_PAGE = 8;
const ProductList = async ({
  categoryId,
  limit,
  searchParams,
}: {
  categoryId: string;
  limit?: number;
  searchParams?: any;
}) => {
  //   const resolvedSearchParams = await searchParams;
  const wixClient = await wixClientServer();

  const productQuery = wixClient.products
    .queryProducts()
    .startsWith('name', searchParams?.name || '')
    .eq('collectionIds', categoryId)
    .hasSome(
      'productType',
      searchParams?.type ? [searchParams.type] : ['physical', 'digital'],
    )
    .gt('priceData.price', searchParams?.min || 0)
    .lt('priceData.price', searchParams?.max || 999999)
    .limit(limit || PRODUCT_PER_PAGE)
    .skip(
      searchParams?.page ? parseInt(searchParams.page) * PRODUCT_PER_PAGE : 0,
    );

  if (searchParams?.sort) {
    const [sortType, sortBy] = searchParams.sort.split(' ');
    if (sortType === 'asc') {
      console.log(400);
      //   productQuery.ascending
      productQuery.ascending();
      console.log(455, productQuery);
    }
    if (sortType === 'desc') {
      productQuery.descending(sortBy);
    }
  }

  const res = await productQuery.find();

  console.log(res);
  return (
    <div className="mt-12 flex flex-wrap items-center justify-between gap-8 gap-y-16">
      {res.items.map((product: products.Product) => (
        <Link
          href={'/' + product.slug}
          className="flex w-full flex-col gap-4 sm:w-[45%] lg:w-[22%]"
          key={product._id}
        >
          <div className="relative h-80 w-full">
            <Image
              src={product.media?.mainMedia?.image?.url || '/product.png'}
              alt=""
              fill
              sizes="25vw"
              className="easy absolute z-10 rounded-md object-cover transition-opacity duration-500 hover:opacity-0"
            />
            {product.media?.items && (
              <Image
                src={product.media.items[1].image?.url || '/product.png'}
                alt=""
                fill
                sizes="25vw"
                className="absolute rounded-md object-cover"
              />
            )}
          </div>
          <div className="flex justify-between">
            <span className="font-medium">{product.name}</span>
            <span className="font-semibold">${product.priceData?.price}</span>
          </div>
          {product.additionalInfoSections && (
            <div
              className="text-sm text-gray-500"
              dangerouslySetInnerHTML={{
                __html: DOMPurify.sanitize(
                  product.additionalInfoSections?.find(
                    (section: any) => section.title === 'shortDesc',
                  )?.description || 'my description ',
                ),
              }}
            >
              {/* {product.additionalInfoSections?.find(
                (section: any) => section.title === "shortDesc"
              )?.description || "my description "} */}
            </div>
          )}
          <button className="w-max rounded-2xl px-4 py-2 text-sm text-lama ring-1 ring-lama hover:bg-lama hover:text-white">
            Add to Cart
          </button>
        </Link>
      ))}

      {searchParams?.cat || searchParams?.name ? (
        <Pagination
          currentPage={res.currentPage || 0}
          hasPrv={res.hasPrev()}
          hasNext={res.hasNext()}
        />
      ) : null}
      {/* <Link
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
      </Link> */}
    </div>
  );
};

export default ProductList;
