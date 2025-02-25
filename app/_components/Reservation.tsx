import { getBookedDatesByCabinId, getSettings } from "../_lib/data-service";
import { Cabin } from "../cabins/[cabinID]/page";
import DateSelector from "./DateSelector";
import ReservationForm from "./ReservationForm";

const Reservation = async ({ cabin }: { cabin: Cabin }) => {
  const [settings, bookedDates] = await Promise.all([
    getSettings(),
    getBookedDatesByCabinId(cabin?.id),
  ]);
  console.log("bookedDates21:", bookedDates);
  return (
    <div className="grid grid-cols-12 mt-10 border border-primary-800 min-h-[400px]">
      <div className="col-span-7">
        <DateSelector
          settings={settings}
          bookedDates={bookedDates}
          cabin={cabin}
        />
      </div>
      <div className="col-span-5">
        <ReservationForm cabin={cabin} />
      </div>
    </div>
  );
};

export default Reservation;
