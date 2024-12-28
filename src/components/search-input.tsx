'use client';

import Image from 'next/image';
import { useRouter } from 'next/navigation';
// import { redirect } from "next/navigation";

const Search = () => {
  const rounter = useRouter();
  const handleSearch = (e: React.FormEvent<HTMLFormElement>) => {
    console.log(100);
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    console.log(113, formData);
    const name = formData.get('name') as string;
    console.log(114, name);
    if (name) {
      //   redirect("/list");
      rounter.push(`/list?name=${name}`);
    }
  };
  return (
    <form
      className="flex flex-1 items-center justify-between gap-4 rounded-md bg-gray-100 p-2"
      onSubmit={handleSearch}
    >
      <input
        type="text"
        name="name"
        placeholder="Search"
        className="flex-1 bg-transparent outline-none"
      />
      <button className="cursor-pointer">
        <Image src="/search.png" alt="" width={16} height={16} />
      </button>
    </form>
  );
};

export default Search;
