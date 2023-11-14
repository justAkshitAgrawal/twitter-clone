"use client";

import { AiFillHome } from "react-icons/ai";
import { BsFillBookmarkFill } from "react-icons/bs";
import { BiSolidUser } from "react-icons/bi";
import { usePathname } from "next/navigation";
import Link from "next/link";

const MobileNavMenu = () => {
  const pathname = usePathname();

  const links = [
    {
      name: "Home",
      path: "/",
      icon: <AiFillHome className="h-5 w-5" />,
    },
    {
      name: "Bookmarks",
      path: "/bookmarks",
      icon: <BsFillBookmarkFill className="h-5 w-5" />,
    },
    {
      name: "Profile",
      path: "/profile",
      icon: <BiSolidUser className="h-6 w-6" />,
    },
  ];

  const isActive = (path: string) => {
    return pathname === path;
  };
  return (
    <nav className="flex justify-between w-full mr-20 items-center">
      {links.map((link) => {
        return (
          <Link
            className={
              isActive(link.path)
                ? "dark:text-primary text-primary/50 p-2 rounded-3xl"
                : "p-2"
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

export default MobileNavMenu;
