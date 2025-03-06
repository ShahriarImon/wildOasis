"use client";

import { usePathname, useRouter, useSearchParams } from "next/navigation";

const Filter = () => {
  const searchParams = useSearchParams();
  const router = useRouter();
  const pathname = usePathname();

  const activeFilter = searchParams.get("capacity") ?? "all";

  const handleFilter = (filter: string) => {
    const urlSearchParams = new URLSearchParams(searchParams);
    urlSearchParams.set("capacity", filter);
    router.push(`${pathname}?${urlSearchParams.toString()}`);
  };

  return (
    <div className="border border-primary-800 flex">
      <button
        className={`px-5 py-2 hover:bg-primary-700 ${
          "all" === activeFilter ? "bg-primary-700 text-primary-50" : ""
        }`}
        onClick={() => handleFilter("all")}
      >
        All Cabin
      </button>{" "}
      <button
        className={`px-5 py-2 hover:bg-primary-700 ${
          "small" === activeFilter ? "bg-primary-700 text-primary-50" : ""
        }`}
        onClick={() => handleFilter("small")}
      >
        1&mdash;3 guests
      </button>{" "}
      <button
        className={`px-5 py-2 hover:bg-primary-700 ${
          "medium" === activeFilter ? "bg-primary-700 text-primary-50" : ""
        }`}
        onClick={() => handleFilter("medium")}
      >
        4&mdash;7 guests
      </button>{" "}
      <button
        className={`px-5 py-2 hover:bg-primary-700 ${
          "large" === activeFilter ? "bg-primary-700 text-primary-50" : ""
        }`}
        onClick={() => handleFilter("large")}
      >
        8&mdash;12 guests
      </button>
    </div>
  );
};

export default Filter;
