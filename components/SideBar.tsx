import React from "react";

import { ThemeSwitcher } from "./ThemeSwitcher";
import NavAuth from "./NavAuth";
import SideBarNav from "./SideBarNav";

const SideBar = () => {
  return (
    <div className="p-10 rounded-[2rem] bg-primary h-[92vh] dark:bg-[#191d20] sm:sticky sm:block top-10 hidden ">
      <div className="flex flex-col h-full justify-between">
        <SideBarNav />

        <div className="flex items-center flex-col gap-8">
          <ThemeSwitcher />
          <NavAuth />
        </div>
      </div>
    </div>
  );
};

export default SideBar;
