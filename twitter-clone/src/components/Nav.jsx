import React from "react";

import { navSections } from "../utils/constant";
import { RiTwitterXFill } from "react-icons/ri";
import { auth } from "../firebase/config";

import { BiUserCircle } from "react-icons/bi";
import { signOut } from "firebase/auth";

const Nav = () => {
  return (
    <nav className="flex flex-col justify-between h-[100vh]">
      <div>
        <RiTwitterXFill style={{ fontSize: "90px" }} className="m-3" />

        {navSections.map((sec, i) => (
          <div
            key={i}
            className="flex items-center gap-3 text-lg p-3 hover:bg-gray-900 cursor-pointer transition"
          >
            {sec.icon}
            <span>{sec.title}</span>
          </div>
        ))}
      </div>

      <div className="text-white flex flex-wrap items-center gap-2">
        <BiUserCircle
          style={{ fontSize: "40px" }}
          className="rounded-full w-14"
        />

        <div className="flex flex-col gap-2 p-2 items-center">
          <span>{auth.currentUser?.displayName} irem </span>
          <span>@{auth.currentUser?.displayName?.toLowerCase()}irem</span>
        </div>
        <button
          className="mx-2 mb-4 hover:bg-gray-900 p-3 rounded-lg"
          onClick={() => signOut(auth)}
        >
          Çıkış Yap
        </button>
      </div>
    </nav>
  );
};

export default Nav;
