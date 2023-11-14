import prisma from "@/lib/db";
import Tweet from "./Tweet";
import { isLoggedIn } from "@/lib/auth";
import FeedAnimateProvider from "./FeedAnimateProvider";

export const dynamic = "force-dynamic";
export const fetchCache = "force-no-store";

const Feed = async () => {
  const posts = await prisma.post.findMany({
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
