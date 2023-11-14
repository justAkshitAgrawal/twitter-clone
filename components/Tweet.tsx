import { AiOutlineRetweet } from "react-icons/ai";
import { formatTimeToNow } from "@/lib/utils";
import { Avatar } from "@nextui-org/react";
import { Like, Post } from "@prisma/client";
import TweetLike from "./TweetLike";
import Retweet from "./Retweet";
import DeleteTweet from "./DeleteTweet";
import SaveTweet from "./SaveTweet";
import Link from "next/link";

const Tweet = ({
  post,
  userId,
}: {
  post: Post & {
    author: {
      image: string | null;
      name: string;
      id: string;
      username: string;
    };
    likes: Like[];
    savedBy: {
      userId: string;
      postId: string;
    }[];
  };
  userId?: string;
}) => {
  return (
    <div
      className="p-5 sm:p-10 dark:bg-[#191d20] rounded-3xl shadow-lg"
      key={post.id}
    >
      <div className="flex items-start gap-5">
        <Avatar
          src={post.author.image!}
          className="cursor-pointer hidden sm:block"
          showFallback
          size="lg"
        />
        <Avatar
          src={post.author.image!}
          className="cursor-pointer sm:hidden"
          showFallback
          size="sm"
        />
        <div className="flex-col flex gap-4">
          <div className="flex items-center gap-4">
            <Link
              href={`/profile/${post.author.username}`}
              className=" font-medium hover:underline cursor-pointer text-sm"
            >
              {post.author.name}
            </Link>
            <h3 className="text-white/60 text-xs">
              {formatTimeToNow(post.createdAt)}
            </h3>
            {post.retweetedFrom && (
              <h3 className="flex items-center gap-1">
                <AiOutlineRetweet className="h-3 w-3" />
                <span className="text-white/60 text-xs">
                  {post.retweetedFrom}
                </span>
              </h3>
            )}
          </div>
          <h3 className="hidden sm:block">{post.content}</h3>
        </div>
      </div>
      <h3 className="sm:hidden mt-4">{post.content}</h3>
      <div className="mt-10 grid grid-cols-3 gap-x-2 place-items-start">
        <TweetLike post={post} userId={userId} />

        {post.author.id === userId ? null : <Retweet post={post} />}

        <SaveTweet post={post} userId={userId} />

        <div>{post.author.id === userId && <DeleteTweet post={post} />}</div>
      </div>
    </div>
  );
};

export default Tweet;
