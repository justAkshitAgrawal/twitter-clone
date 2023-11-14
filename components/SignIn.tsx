"use client";

import { signIn } from "next-auth/react";
import React from "react";
import { BiLogOutCircle } from "react-icons/bi";

const SignIn = () => {
  return (
    <div
      onClick={() => {
        signIn("google");
      }}
      className="flex flex-col items-center gap-1 cursor-pointer -ml-1 "
    >
      <BiLogOutCircle className="sm:h-8 sm:w-8 h-7 w-7 rotate-180 text-white max-sm:text-black max-sm:dark:text-white" />
      <p className={`uppercase text-xs hidden sm:block text-white`}>Sign In</p>{" "}
    </div>
  );
};

export default SignIn;
