"use client";

import { AiFillHome } from "react-icons/ai";
import { BsFillBookmarkFill } from "react-icons/bs";
import { BiSolidUser } from "react-icons/bi";
import { usePathname } from "next/navigation";
import Link from "next/link";

const SideBarNav = () => {
  const pathname = usePathname();

  const links = [
    {
      name: "Home",
      path: "/",
      icon: <AiFillHome className="h-8 w-8" />,
    },
    {
      name: "Bookmarks",
      path: "/bookmarks",
      icon: <BsFillBookmarkFill className="h-6 w-6" />,
    },
    {
      name: "Profile",
      path: "/profile",
      icon: <BiSolidUser className="h-7 w-7" />,
    },
  ];

  const isActive = (path: string) => {
    return pathname === path;
  };

  return (
    <nav className="flex flex-col gap-8 items-center">
      {links.map((link) => {
        return (
          <Link
            className={
              isActive(link.path)
                ? "dark:bg-primary bg-primary/50 p-5 rounded-3xl"
                : "p-5"
            }
            href={link.path}
            key={link.name}
          >
            {link.icon}
          </Link>
        );
      })}
    </nav>
  );
};

export default SideBarNav;
