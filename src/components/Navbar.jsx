import { useState } from "react";
import burger from "../assets/burger.svg";
import cross from "../assets/cross.svg";

export default function Navbar() {
  const [myNavbar, setMyNavbar] = useState(true);

  return (
    <nav className="  w-full bg-sky-800 flex justify-center p-4">
      <ul
        className={`${
          myNavbar ? "flex" : "hidden"
        }  flex-col bg-sky-800 items-center justify-center w-full pb-5 px-3 sm:flex sm:relative sm:flex-row sm:p-0 `}
      >
        <li className="inline-block py-2 mx-4 text-lg sm:py-O">
          <a href="#">Home</a>
        </li>
        <li className="inline-block py-2 mx-4 text-lg sm:py-O">
          <a className="opacity-20" href="#">
            My favorites
          </a>
        </li>
        <li className="inline-block py-2 mx-4 text-lg sm:py-O">
          <a className="opacity-20" href="#">
            My Blacklist
          </a>
        </li>
        <li className="inline-block py-2 mx-4 text-lg sm:py-O">
          <a className="opacity-20" href="#">
            Contact
          </a>
        </li>
      </ul>
      <button
        onClick={() => setMyNavbar(!myNavbar)}
        className="ml-auto sm:hidden"
      >
        <img
          className="w-4"
          src={myNavbar ? cross : burger}
          alt={myNavbar ? "image de croix" : "image de burger"}
        />
      </button>
    </nav>
  );
}
