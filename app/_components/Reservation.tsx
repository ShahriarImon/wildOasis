import { getBookedDatesByCabinId, getSettings } from "../_lib/data-service";
import { Cabin } from "../cabins/[cabinID]/page";
import DateSelector from "./DateSelector";
import ReservationForm from "./ReservationForm";
import { ReservationProvider } from "./ReservationProvider";

const Reservation = async ({ cabin }: { cabin: Cabin }) => {
  const [settings, bookedDates] = await Promise.all([
    getSettings(),
    getBookedDatesByCabinId(cabin?.id),
  ]);
  console.log("bookedDates21:", bookedDates);
  return (
    <ReservationProvider>
      <div className="grid grid-cols-12 mt-10 border border-primary-800 min-h-[400px]">
        <div className="col-span-6">
          <DateSelector
            settings={settings}
            bookedDates={bookedDates}
            cabin={cabin}
          />
        </div>
        <div className="col-span-6">
          <ReservationForm cabin={cabin} />
        </div>
      </div>
    </ReservationProvider>
  );
};

export default Reservation;
