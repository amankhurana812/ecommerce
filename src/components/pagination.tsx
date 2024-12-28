'use client';
import { usePathname, useSearchParams, useRouter } from 'next/navigation';

const Pagination = ({
  currentPage,
  hasNext,
  hasPrv,
}: {
  currentPage: number;
  hasNext: boolean;
  hasPrv: boolean;
}) => {
  const pathName = usePathname();
  const searchParams = useSearchParams();
  const { replace } = useRouter();
  const createPageUrl = (pageNumber: number) => {
    const params = new URLSearchParams(searchParams);
    params.set('page', pageNumber.toString());
    replace(`${pathName}?${params.toString()}`);
  };
  return (
    <div className="mt-12 flex w-full justify-between">
      <button
        className="w-24 cursor-pointer rounded-md bg-lama p-2 text-sm text-white disabled:cursor-not-allowed disabled:bg-pink-200"
        disabled={!hasPrv}
        onClick={() => createPageUrl(currentPage - 1)}
      >
        Previous
      </button>
      <button
        className="w-24 cursor-pointer rounded-md bg-lama p-2 text-sm text-white disabled:cursor-not-allowed disabled:bg-pink-200"
        disabled={!hasNext}
        onClick={() => createPageUrl(currentPage + 1)}
      >
        Next
      </button>
    </div>
  );
};

export default Pagination;
