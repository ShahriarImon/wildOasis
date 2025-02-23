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

const CabinList = async ({ filter }: { filter: string }) => {
  const cabins: [] | singleCabin[] = await getCabins();
  let displayedCabins: [] | singleCabin[] = [];
  if (filter == "all") {
    displayedCabins = cabins;
  }
  if (filter == "small") {
    displayedCabins = cabins?.filter((cabin) => cabin.maxCapacity <= 3);
  }
  if (filter == "medium") {
    displayedCabins = cabins?.filter(
      (cabin) => cabin.maxCapacity >= 4 && cabin.maxCapacity <= 7
    );
  }
  if (filter == "large") {
    displayedCabins = cabins?.filter((cabin) => cabin.maxCapacity >= 8);
  }
  return (
    displayedCabins?.length > 0 && (
      <div className="grid sm:grid-cols-1 md:grid-cols-2 gap-8 lg:gap-12 xl:gap-14">
        {displayedCabins.map((cabin) => (
          <CabinCard cabin={cabin} key={cabin.id} />
        ))}
      </div>
    )
  );
};

export default CabinList;
