import { eachDayOfInterval } from "date-fns";
import { notFound } from "next/navigation.js";
import supabase from "./supabase.js";

/////////////
// GET

export async function getCabin<T>(id: number | string): Promise<T> {
  const { data, error } = await supabase

    .from("cabins")
    .select("*")
    .eq("id", id)
    .single();
  console.log("Fetching data....");
  // For testing
  // await new Promise((res) => setTimeout(res, 1000));

  if (error) {
    console.error(error);
    notFound();
  }

  // await new Promise((resolve) => setTimeout(resolve, 2500));

  return data as T;
}

export async function fetchCabin<T>(id: number | string): Promise<T> {
  try {
    // Construct the URL with query parameters
    const url = new URL(`${process.env.SUPABASE_URL}/rest/v1/cabins`);
    url.searchParams.append("id", `eq.${encodeURIComponent(id)}`);

    // Make the Fetch request
    const response = await fetch(url, {
      method: "GET",
      headers: {
        apikey: process.env.SUPABASE_KEY, // Required for Supabase auth
        Authorization: `Bearer ${process.env.SUPABASE_KEY}`, // Required for Supabase auth
        Accept: "application/vnd.pgrst.object+json", // Ensures single object response
        "Content-Type": "application/json",
      },
    });

    // Handle errors
    if (!response.ok) {
      if (response.status === 406) {
        throw new Error("No cabin found or multiple cabins match the ID");
      }
      throw new Error(`Request failed: ${response.status}`);
    }

    // Parse and return data
    const data = await response.json();
    return data as T;
  } catch (error) {
    console.error(error);
    notFound();
  }
}

export async function getCabinPrice(id: number | string) {
  const { data, error } = await supabase
    .from("cabins")
    .select("regularPrice, discount")
    .eq("id", id)
    .single();

  if (error) {
    console.error(error);
  }

  return data;
}

export const getCabins = async function () {
  const { data, error } = await supabase
    .from("cabins")
    .select("id, name, maxCapacity, regularPrice, discount, image")
    .order("name");

  if (error) {
    console.error(error);
    throw new Error("Cabins could not be loaded");
  }
  return data;
};

// Guests are uniquely identified by their email address
export async function getGuest(email: string) {
  const {
    data,
    // error
  } = await supabase.from("guests").select("*").eq("email", email).single();

  // No error here! We handle the possibility of no guest in the sign in callback
  return data;
}

export async function getBooking(id: number | string) {
  const {
    data,
    error,
    //count
  } = await supabase.from("bookings").select("*").eq("id", id).single();

  if (error) {
    console.error(error);
    throw new Error("Booking could not get loaded");
  }

  return data;
}

export async function getBookings(guestId: number | string) {
  const {
    data,
    error,
    // count
  } = await supabase
    .from("bookings")
    // We actually also need data on the cabins as well. But let's ONLY take the data that we actually need, in order to reduce downloaded data.
    .select(
      "id, created_at, startDate, endDate, numNights, numGuests, totalPrice, guestId, cabinId, cabins(name, image)"
    )
    .eq("guestId", guestId)
    .order("startDate");

  if (error) {
    console.error(error);
    throw new Error("Bookings could not get loaded");
  }

  return data;
}

export async function getBookedDatesByCabinId(cabinId: number | string) {
  let today: Date | string = new Date();
  today.setUTCHours(0, 0, 0, 0);
  today = today.toISOString();

  // Getting all bookings
  const { data, error } = await supabase
    .from("bookings")
    .select("*")
    .eq("cabinId", cabinId)
    .or(`startDate.gte.${today},status.eq.checked-in`);

  if (error) {
    console.error(error);
    throw new Error("Bookings could not get loaded");
  }

  // Converting to actual dates to be displayed in the date picker
  const bookedDates = data
    .map((booking) => {
      return eachDayOfInterval({
        start: new Date(booking.startDate),
        end: new Date(booking.endDate),
      });
    })
    .flat();

  return bookedDates;
}

export async function getSettings() {
  const { data, error } = await supabase.from("settings").select("*").single();

  if (error) {
    console.error(error);
    throw new Error("Settings could not be loaded");
  }

  return data;
}

export async function getCountries() {
  try {
    const res = await fetch(
      "https://restcountries.com/v2/all?fields=name,flag"
    );
    const countries = await res.json();
    return countries;
  } catch {
    throw new Error("Could not fetch countries");
  }
}

/////////////
// CREATE

export async function createGuest(newGuest: number | string) {
  const { data, error } = await supabase.from("guests").insert([newGuest]);

  if (error) {
    console.error(error);
    throw new Error("Guest could not be created");
  }

  return data;
}

export async function createBooking(newBooking: number | string) {
  const { data, error } = await supabase
    .from("bookings")
    .insert([newBooking])
    // So that the newly created object gets returned!
    .select()
    .single();

  if (error) {
    console.error(error);
    throw new Error("Booking could not be created");
  }

  return data;
}

/////////////
// UPDATE

// The updatedFields is an object which should ONLY contain the updated data
export async function updateGuest(
  id: number | string,
  updatedFields: number | string
) {
  const { data, error } = await supabase
    .from("guests")
    .update(updatedFields)
    .eq("id", id)
    .select()
    .single();

  if (error) {
    console.error(error);
    throw new Error("Guest could not be updated");
  }
  return data;
}

export async function updateBooking(
  id: number | string,
  updatedFields: number | string
) {
  const { data, error } = await supabase
    .from("bookings")
    .update(updatedFields)
    .eq("id", id)
    .select()
    .single();

  if (error) {
    console.error(error);
    throw new Error("Booking could not be updated");
  }
  return data;
}

/////////////
// DELETE

export async function deleteBooking(id: number | string) {
  const { data, error } = await supabase.from("bookings").delete().eq("id", id);

  if (error) {
    console.error(error);
    throw new Error("Booking could not be deleted");
  }
  return data;
}
