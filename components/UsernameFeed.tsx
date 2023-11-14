import prisma from "@/lib/db";
import React from "react";
import Tweet from "./Tweet";

const UsernameFeed = async ({ id }: { id: string }) => {
  const userPosts = await prisma.post.findMany({
    where: {
      // @ts-ignore
      authorId: id,
    },
    include: {
      author: {
        select: {
          name: true,
          image: true,
          username: true,
          id: true,
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
        return <Tweet post={post} key={post.id} />;
      })}
    </div>
  );
};

export default UsernameFeed;
