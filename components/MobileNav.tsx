import React from "react";
import MobileNavMenu from "./MobileNavMenu";
import NavAuth from "./NavAuth";

const MobileNav = () => {
  return (
    <div className="flex items-center justify-between bottom-0 fixed px-5 py-4 sm:hidden w-full  rounded-t-xl z-[100] backdrop-blur-xl border-t-1">
      <MobileNavMenu />
      <NavAuth />
    </div>
  );
};

export default MobileNav;
