"use client";
import {
  CalendarDaysIcon,
  HomeIcon,
  UserIcon,
} from "@heroicons/react/24/solid";
import Link from "next/link";
import SignOutButton from "./SignOutButton";
// import { useEffect, useState } from "react";

const navLinks = [
  {
    name: "Home",
    href: "/account",
    icon: <HomeIcon className="h-5 w-5 text-primary-600" />,
  },
  {
    name: "Reservations",
    href: "/account/reservations",
    icon: <CalendarDaysIcon className="h-5 w-5 text-primary-600" />,
  },
  {
    name: "Guest profile",
    href: "/account/profile",
    icon: <UserIcon className="h-5 w-5 text-primary-600" />,
  },
];

function SideNavigation() {
  // const [s, setS] = useState(0);
  // console.log("s1:", s);
  // useEffect(() => {
  //   setS((prev) => prev + 1);
  //   setS((prev) => prev + 1);
  // }, []);

  type returnType<T> = T extends boolean
    ? string[]
    : T extends string
    ? number[]
    : undefined;

  function conditionalReturn<T>(input: T): returnType<T> {
    if (typeof input === "boolean") return ["result"] as returnType<T>;
    if (typeof input === "string") return [1, 2, 3] as returnType<T>;
    return undefined as returnType<T>;
  }
  const ans1 = conditionalReturn(true); // ["result"]
  console.log("ans1:", ans1);
  const ans2 = conditionalReturn("hello"); // [1, 2, 3]
  console.log("ans2:", ans2);

  const data = {
    0: "T1",
    1: "data2[]",
    name: "test",
  };

  console.log("data-1:", data);
  return (
    <nav className="border-r border-primary-900 flex flex-col justify-between h-full">
      <ul className="flex flex-col gap-2 h-full text-lg">
        {navLinks.map((link) => (
          <li key={link.name}>
            <Link
              className={`py-3 px-5 hover:bg-primary-900 hover:text-primary-100 transition-colors flex items-center gap-4 font-semibold text-primary-200`}
              href={link.href}
            >
              {link.icon}
              <span>{link.name}</span>
            </Link>
          </li>
        ))}
      </ul>

      <ul>
        <li className="mt-auto">
          <SignOutButton />
        </li>
      </ul>
    </nav>
  );
}

export default SideNavigation;
