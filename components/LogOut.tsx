"use client";

import { signOut } from "next-auth/react";
import React from "react";
import { BiLogOutCircle } from "react-icons/bi";

const LogOut = () => {
  return (
    <div
      onClick={() => {
        signOut();
      }}
      className="flex flex-col items-center gap-1 cursor-pointer -ml-1 "
    >
      <BiLogOutCircle className="sm:h-8 sm:w-8 h-7 w-7 -ml-1 text-white max-sm:text-black max-sm:dark:text-white" />
      <p className={`uppercase text-xs hidden sm:block text-white`}>Logout</p>{" "}
    </div>
  );
};

export default LogOut;
