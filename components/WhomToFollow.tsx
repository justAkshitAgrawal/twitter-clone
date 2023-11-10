import prisma from "@/lib/db";
import { Avatar, Button } from "@nextui-org/react";
import React from "react";

const WhomToFollow = async () => {
  const users = await prisma.user.findMany({
    orderBy: {
      createdAt: "desc",
    },
    take: 3,
  });

  return (
    <div className="mt-16">
      <h1 className="ml-5 font-medium text-lg">{`Fellow Tweeters`}</h1>
      <div className="mt-5 grid grid-cols-1 gap-5">
        {users?.map((user) => {
          return (
            <div
              key={user.id}
              className="p-5 dark:bg-[#191d20] rounded-3xl flex justify-between"
            >
              <div className="flex items-start gap-3">
                <Avatar src={user.image!} showFallback size="lg" />
                <div className="flex flex-col">
                  <h1>{user.name}</h1>
                  <h1 className="text-white/60 text-xs">{user.email}</h1>
                </div>
              </div>

              {/* <Button color="primary" variant="ghost" size="sm">
                View
              </Button> */}
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default WhomToFollow;
