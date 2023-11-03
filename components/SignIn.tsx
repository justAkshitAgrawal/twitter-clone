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
      <BiLogOutCircle className="h-8 w-8 rotate-180" />
      <p className={`uppercase text-xs `}>Sign In</p>{" "}
    </div>
  );
};

export default SignIn;
