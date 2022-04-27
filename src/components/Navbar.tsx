import React from "react";
import { NavLink } from "react-router-dom";
import {
  IoAddCircleOutline,
  IoCog,
  IoCogOutline,
  IoHomeOutline,
} from "react-icons/io5";

function Navbar() {
  return (
    <div className="fixed bottom-0  w-full md:w-1/3 h-14 bg-slate-50 dark:bg-zinc-900 rounded-t-2xl ">
      <div className="flex h-full justify-between items-center">
        <div className="w-1/3 text-center rounded-lg h-14 flex justify-center items-center">
          <NavLink
            to="/"
            className={(navData) =>
              navData.isActive ? "text-teal-400 dark:text-teal-200" : ""
            }
          >
            <IoHomeOutline
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
