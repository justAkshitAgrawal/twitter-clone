import { Button } from "@nextui-org/react";
import React from "react";
import { AiOutlineSearch } from "react-icons/ai";
import WhatsTrending from "./WhatsTrending";
import WhomToFollow from "./WhomToFollow";

const RightSideBar = () => {
  return (
    <div className="flex flex-col w-[20vw]">
      {/* <div className="px-10 py-5 dark:bg-[#191d20] rounded-3xl flex items-center">
        <input
          className=" bg-transparent outline-none pr-5"
          placeholder="Search"
        />
        <Button
          color="primary"
          variant="shadow"
          startContent={<AiOutlineSearch className="h-5 w-5" />}
          className="rounded-full "
          size="sm"
        />
      </div> */}
      <WhatsTrending />

      <WhomToFollow />
    </div>
  );
};

export default RightSideBar;
