import { de } from "date-fns/locale";
import ReservationCard from "../../_components/ReservationCard";

export const metadata = {
  title: "Reservations",
  description: "Cabin Reservations",
};

export default function Reservations() {
  // CHANGE

  interface singleCabin {
    id: number;
    name: string;
    description: string;
    image: string;
  }

  const bookings: [] | singleCabin[] = [];

  return (
    <div>
      <h2 className="font-semibold text-2xl text-accent-400 mb-7">
        Your reservations
      </h2>

      {bookings.length === 0 ? (
        <p className="text-lg">
          You have no reservations yet. Check out our{" "}
          <a className="underline text-accent-500" href="/cabins">
            luxury cabins &rarr;
          </a>
        </p>
      ) : (
        <ul className="space-y-6">
          {bookings.map((booking) => (
            <ReservationCard booking={booking} key={booking.id} />
          ))}
        </ul>
      )}
    </div>
  );
}
