import Filter from '@/components/filter';
import ProductList from '@/components/product-list';
import { wixClientServer } from '@/lib/wixClientServer';
import Image from 'next/image';

export default async function List({ searchParams }: { searchParams: any }) {
  const { cat } = await searchParams;
  // console.log(664333, params);
  const wixClient = await wixClientServer();
  const listPage = await wixClient.collections.getCollectionBySlug(
    cat || 'all-products',
  );
  console.log(1111, listPage);
  return (
    <div className="relative px-4 md:px-8 lg:px-16 xl:px-32 2xl:px-64">
      {/* CAMPAIGN */}

      <div className="hidden h-64 justify-between bg-pink-50 px-4 sm:flex">
        <div className="flex w-2/3 flex-col items-center justify-center gap-8">
          <h1 className="text-4xl font-semibold leading-[48px] text-gray-700">
            Grab up to 50% off on
            <br /> Selected Products
          </h1>
          <button className="w-max rounded-3xl bg-lama px-5 py-3 text-sm text-white">
            Buy Now
          </button>
        </div>
        <div className="relative w-1/3">
          <Image src="/woman.png" alt="" fill className="object-contain" />
        </div>
      </div>
      {/* Filter */}
      <Filter />
      {/* product list */}
      <h1 className="mt-12 text-xl font-semibold">
        {listPage?.collection?.name} for you!
      </h1>
      <ProductList
        categoryId={
          listPage.collection?._id || '00000000-000000-000000-000000000001'
        }
        searchParams={searchParams}
      />
    </div>
  );
}
