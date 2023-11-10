import Tweet from "@/components/Tweet";
import { isLoggedIn } from "@/lib/auth";
import prisma from "@/lib/db";
import { Spinner } from "@nextui-org/react";
import React, { Suspense } from "react";

export const dynamic = "force-dynamic";
export const fetchCache = "force-no-store";

const BookmarksPage = async () => {
  const session = await isLoggedIn();

  if (!session) {
    return (
      <div className="w-[70vw]">
        <h3 className="p-10 text-2xl">Log in to view your saved tweets</h3>
      </div>
    );
  }

  const posts = await prisma.post.findMany({
    where: {
      savedBy: {
        some: {
          // @ts-ignore
          userId: session?.user?.id,
        },
      },
    },
    include: {
      author: {
        select: {
          name: true,
          image: true,
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
    <div className="w-[70vw]">
      <h3 className="p-10 text-2xl font-medium">Your Saved Tweets</h3>
      <Suspense
        fallback={
          <div className="flex justify-center w-[40vw] mt-10">
            <Spinner color="current" size="lg" />
          </div>
        }
      >
        <div className="grid grid-cols-2 gap-10 w-fit">
          {posts?.map((post) => {
            return (
              // @ts-ignore
              <Tweet post={post} key={post.id} userId={session?.user?.id!} />
            );
          })}
        </div>
      </Suspense>
    </div>
  );
};

export default BookmarksPage;
