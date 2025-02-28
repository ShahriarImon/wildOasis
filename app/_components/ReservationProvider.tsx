"use client";

import { createContext, ReactNode, useContext, useState } from "react";
import { DateRange } from "react-day-picker";

interface Reservation {
  range: DateRange;
  handleRange: (selectedRange: DateRange) => void;
  resetRange: () => void;
}

const ReservationContext = createContext<Reservation>({} as Reservation);

function ReservationProvider({ children }: { children: ReactNode }) {
  const [range, setRange] = useState<DateRange>({
    from: undefined,
    to: undefined,
  });
  console.log("range-zzz:", range);
  const handleRange = (selectedRange: DateRange) => {
    console.log("selectedRange:", selectedRange);
    setRange(selectedRange);
  };
  const resetRange = () => setRange({ from: undefined, to: undefined });

  return (
    <ReservationContext.Provider value={{ range, handleRange, resetRange }}>
      {children}
    </ReservationContext.Provider>
  );
}

function useReservation() {
  const context = useContext(ReservationContext);
  if (context === undefined)
    throw new Error("Context was used outside provider");
  return context;
}

export { ReservationProvider, useReservation };
