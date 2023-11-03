import { isLoggedIn } from "@/lib/auth";
import React from "react";
import LogOut from "./LogOut";
import SignIn from "./SignIn";

const NavAuth = async () => {
  const session = await isLoggedIn();
  return <div>{!session ? <SignIn /> : <LogOut />}</div>;
};

export default NavAuth;
