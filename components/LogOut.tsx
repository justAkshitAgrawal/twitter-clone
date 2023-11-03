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
      <BiLogOutCircle className="h-8 w-8 -ml-1" />
      <p className={`uppercase text-xs `}>Logout</p>{" "}
    </div>
  );
};

export default LogOut;
