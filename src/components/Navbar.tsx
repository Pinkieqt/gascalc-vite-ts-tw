import React from "react";
import { NavLink } from "react-router-dom";
import {
  IoAddCircleOutline,
  IoCogOutline,
  IoHomeOutline,
  IoReader,
  IoReaderOutline,
  IoWalletOutline,
} from "react-icons/io5";

function Navbar() {
  return (
    <div className="fixed bottom-0 md:bottom-3  w-full md:w-1/5 h-14 bg-slate-100 dark:bg-zinc-700 rounded-t-2xl md:rounded-xl ">
      <div className="flex h-full justify-between items-center">
        <div className="w-1/3 text-center rounded-lg h-14 flex justify-center items-center">
          <NavLink
            to="/"
            className={(navData) =>
              navData.isActive ? "text-teal-400 dark:text-teal-200" : ""
            }
          >
            <IoWalletOutline
              size={30}
              className="hover:text-teal-300 transition"
            />
          </NavLink>
        </div>
        <div className="w-1/3 text-center rounded-lg h-14 flex justify-center items-center">
          <NavLink
            to="add"
            className={(navData) =>
              navData.isActive ? "text-teal-400 dark:text-teal-200" : ""
            }
          >
            <IoAddCircleOutline
              size={30}
              className="hover:text-teal-300 transition"
            />
          </NavLink>
        </div>
        <div className="w-1/3 text-center rounded-lg h-14 flex justify-center items-center ">
          <NavLink
            to="settings"
            className={(navData) =>
              navData.isActive ? "text-teal-400 dark:text-teal-200" : ""
            }
          >
            <IoCogOutline
              size={30}
              className="hover:text-teal-300 transition"
            />
          </NavLink>
        </div>
      </div>
    </div>
  );
}

export default Navbar;
