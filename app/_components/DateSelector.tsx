"use client";

export interface Settings {
  id: number;
  minBookingLength: number;
  maxBookingLength: number;
  maxGuestsPerBooking: number;
  breakfastPrice: number;
}
export interface BookedDates {
  startDate: Date;
  endDate: Date;
  numNights: number;
}
import { differenceInDays, isPast, isSameDay } from "date-fns";
import { DateRange, DayPicker } from "react-day-picker";
import "react-day-picker/dist/style.css";
import { Cabin } from "../cabins/[cabinID]/page";
import { useReservation } from "./ReservationProvider";
import "./custom.css";

// function isAlreadyBooked(range: DateRange, datesArr: BookedDates[]) {
//   return (
//     range.from &&
//     range.to &&
//     datesArr.some((date) =>
//       isWithinInterval(new Date(date.numNights), {
//         start: range.from,
//         end: range.to,
//       })
//     )
//   );
// }

function DateSelector({
  settings,
  cabin,
  bookedDates,
}: {
  settings: Settings;
  cabin: Cabin;
  bookedDates: BookedDates[];
}) {
  const { range, handleRange, resetRange } = useReservation();
  console.log("range12:", range);

  const displayRange: DateRange = range;

  const { regularPrice, discount } = cabin;
  const numNights =
    displayRange?.to &&
    displayRange?.from &&
    differenceInDays(displayRange?.to, displayRange?.from);
  const cabinPrice = numNights && numNights * (regularPrice - discount);

  const { minBookingLength, maxBookingLength } = settings;

  return (
    <div className="flex flex-col justify-between">
      <div className="h-[356px]">
        <DayPicker
          className="pt-6 place-self-center my-daypicker"
          mode="range"
          onSelect={(val) => handleRange(val)}
          selected={range}
          min={minBookingLength + 1}
          max={maxBookingLength}
          fromMonth={new Date()}
          fromDate={new Date()}
          toYear={new Date().getFullYear() + 5}
          captionLayout="dropdown"
          numberOfMonths={2}
          showOutsideDays
          disabled={(curDate) =>
            isPast(curDate) ||
            bookedDates.some((date) =>
              isSameDay(new Date(date.numNights), curDate)
            )
          }
        />
      </div>

      <div className="flex items-center justify-between px-8 bg-accent-500 text-primary-800 h-[72px]">
        <div className="flex items-baseline gap-6">
          <p className="flex gap-2 items-baseline">
            {discount > 0 ? (
              <>
                <span className="text-2xl">${regularPrice - discount}</span>
                <span className="line-through font-semibold text-primary-700">
                  ${regularPrice}
                </span>
              </>
            ) : (
              <span className="text-2xl">${regularPrice}</span>
            )}
            <span className="">/night</span>
          </p>
          {numNights ? (
            <>
              <p className="bg-accent-600 px-3 py-2 text-2xl">
                <span>&times;</span> <span>{numNights}</span>
              </p>
              <p>
                <span className="text-lg font-bold uppercase">Total</span>{" "}
                <span className="text-2xl font-semibold">${cabinPrice}</span>
              </p>
            </>
          ) : null}
        </div>

        {range?.from || range?.to ? (
          <button
            className="border border-primary-800 py-2 px-4 text-sm font-semibold"
            onClick={resetRange}
          >
            Clear
          </button>
        ) : null}
      </div>
    </div>
  );
}

export default DateSelector;
