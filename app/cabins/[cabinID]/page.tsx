import Reservation from "@/app/_components/Reservation";
import Spinner from "@/app/_components/Spinner";
import TextExpander from "@/app/_components/TextExpander";
import { fetchCabin } from "@/app/_lib/data-service";
import { EyeSlashIcon, MapPinIcon, UsersIcon } from "@heroicons/react/24/solid";
import Image from "next/image";
import { Suspense } from "react";

// PLACEHOLDER DATA
export interface Cabin {
  id: number;
  name: string;
  maxCapacity: number;
  regularPrice: number;
  discount: number;
  description: string;
  image: string;
  image2: string;
}
interface CabinProps {
  params: {
    cabinID: string;
  };
}

// export async function generateStaticParams() {
//   const data = await getCabins();
//   return data?.map((item) => ({ cabinID: String(item.id) }));
// }

// export async function generateMetadata({ params }: CabinProps) {
//   const { name, image, description } = await getCabin<Cabin>(params?.cabinID);

//   return {
//     title: `Cabin-${name}`,
//     description: description,
//     image: image,
//   };
// }

const Cabin = async ({ params }: CabinProps) => {
  const cabin = await fetchCabin<Cabin>(params?.cabinID);
  // console.log("cabin3232:", cabin);
  const { name, maxCapacity, image, description } = cabin;

  // console.log("description121212:", description);
  return (
    <>
      <div className="max-w-6xl mx-auto mt-8">
        {/* {data?.data?.title} */}
        <div className="grid grid-cols-[3fr_4fr] gap-20 border border-primary-800 py-3 px-10 mb-24">
          <div className="relative scale-[1.15] -translate-x-3">
            <Image
              fill
              src={image}
              alt={`Cabin ${name}`}
              className="object-cover"
            />
          </div>

          <div>
            <h3 className="text-accent-100 font-black text-7xl mb-5 translate-x-[-254px] bg-primary-950 p-6 pb-1 w-[150%]">
              Cabin {name}
            </h3>

            <p className="text-lg text-primary-300 mb-10">
              <TextExpander>{description}</TextExpander>
            </p>

            <ul className="flex flex-col gap-4 mb-7">
              <li className="flex gap-3 items-center">
                <UsersIcon className="h-5 w-5 text-primary-600" />
                <span className="text-lg">
                  For up to <span className="font-bold">{maxCapacity}</span>{" "}
                  guests
                </span>
              </li>
              <li className="flex gap-3 items-center">
                <MapPinIcon className="h-5 w-5 text-primary-600" />
                <span className="text-lg">
                  Located in the heart of the{" "}
                  <span className="font-bold">Dolomites</span> (Italy)
                </span>
              </li>
              <li className="flex gap-3 items-center">
                <EyeSlashIcon className="h-5 w-5 text-primary-600" />
                <span className="text-lg">
                  Privacy <span className="font-bold">100%</span> guaranteed
                </span>
              </li>
            </ul>
          </div>
        </div>

        <div>
          <h2 className="text-5xl font-semibold text-center text-accent-400">
            Reserve today. Pay on arrival.
          </h2>
        </div>
      </div>
      <div>
        <Suspense
          fallback={
            <div className="flex justify-center items-center">
              <Spinner />
            </div>
          }
        >
          <Reservation cabin={cabin} />
        </Suspense>
      </div>
    </>
  );
};

export default Cabin;
