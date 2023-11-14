import { isLoggedIn } from "@/lib/auth";
import prisma from "@/lib/db";
import { Avatar, Button } from "@nextui-org/react";
import Link from "next/link";
import React from "react";

const WhomToFollow = async () => {
  const users = await prisma.user.findMany({
    orderBy: {
      createdAt: "desc",
    },
    take: 3,
  });

  const session = await isLoggedIn();

  return (
    <div className="mt-16">
      <h1 className="ml-5 font-medium text-lg">{`Fellow Tweeters`}</h1>
      <div className="mt-5 grid grid-cols-1 gap-5">
        {users
          // @ts-ignore
          ?.filter((user) => user.id !== session?.user?.id)
          .map((user) => {
            return (
              <Link
                href={`/profile/${user.username}`}
                key={user.id}
                className="p-5 dark:bg-[#191d20] rounded-3xl flex justify-between hover:scale-105 transition-all shadow-lg"
              >
                <div className="flex items-start gap-3">
                  <Avatar src={user.image!} showFallback size="lg" />
                  <div className="flex flex-col">
                    <h1>{user.name}</h1>
                    <h1 className="text-white/60 text-xs">@{user.username}</h1>
                    <p className="text-sm text-white/80">
                      {user.bio && user?.bio?.length > 50
                        ? user?.bio?.slice(0, 50) + "..."
                        : user?.bio}
                    </p>
                  </div>
                </div>

                {/* <Button color="primary" variant="ghost" size="sm">
                View
              </Button> */}
              </Link>
            );
          })}
      </div>
    </div>
  );
};

export default WhomToFollow;
