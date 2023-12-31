import { isLoggedIn } from "@/lib/auth";
import prisma from "@/lib/db";
import React from "react";
import Tweet from "./Tweet";

export const dynamic = "force-dynamic";
export const fetchCache = "force-no-store";

const UserFeed = async () => {
  const session = await isLoggedIn();
  const userPosts = await prisma.post.findMany({
    where: {
      // @ts-ignore
      authorId: session!.user?.id!,
    },
    include: {
      author: {
        select: {
          name: true,
          image: true,
          id: true,
          username: true,
        },
      },
      likes: true,
      savedBy: {
        select: {
          userId: true,
          postId: true,
        },
      },
    },
    orderBy: {
      createdAt: "desc",
    },
  });

  return (
    <div className="mt-8 sm:w-[40vw] grid grid-cols-1 gap-10">
      {userPosts?.map((post) => {
        return (
          <Tweet
            post={post}
            key={post.id}
            // @ts-ignore
            userId={session!.user?.id!}
          />
        );
      })}
    </div>
  );
};

export default UserFeed;
