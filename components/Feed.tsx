import prisma from "@/lib/db";
import React from "react";
import Tweet from "./Tweet";

const Feed = async () => {
  const posts = await prisma.post.findMany({
    include: {
      author: {
        select: {
          name: true,
          image: true,
        },
      },
    },
    orderBy: {
      createdAt: "desc",
    },
  });

  return (
    <div className="mt-10 grid grid-cols-1 gap-10">
      {posts?.map((post) => (
        <Tweet post={post} key={post.id} />
      ))}
    </div>
  );
};

export default Feed;
