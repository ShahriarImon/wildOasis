import React from "react";
import { getCabins } from "../_lib/data-service";
import CabinCard from "./CabinCard";
export interface singleCabin {
  id: number;
  name: string;
  maxCapacity: number;
  regularPrice: number;
  discount: number;
  image: string;
}

const CabinList = async () => {
  const cabins: [] | singleCabin[] = await getCabins();
  return (
    cabins?.length > 0 && (
      <div className="grid sm:grid-cols-1 md:grid-cols-2 gap-8 lg:gap-12 xl:gap-14">
        {cabins.map((cabin) => (
          <CabinCard cabin={cabin} key={cabin.id} />
        ))}
      </div>
    )
  );
};

export default CabinList;
