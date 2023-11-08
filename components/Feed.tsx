import prisma from "@/lib/db";
import React from "react";
import Tweet from "./Tweet";
import { isLoggedIn } from "@/lib/auth";
import FeedAnimateProvider from "./FeedAnimateProvider";

const Feed = async () => {
  const posts = await prisma.post.findMany({
    include: {
      author: {
        select: {
          name: true,
          image: true,
          id: true,
        },
      },
      likes: true,
    },
    orderBy: {
      createdAt: "desc",
    },
  });

  const session = await isLoggedIn();

  return (
    <FeedAnimateProvider>
      {posts?.map((post) => (
        // @ts-ignore
        <Tweet post={post} key={post.id} userId={session?.user?.id!} />
      ))}
    </FeedAnimateProvider>
  );
};

export default Feed;
