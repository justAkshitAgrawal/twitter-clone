import { AiOutlineRetweet } from "react-icons/ai";
import { formatTimeToNow } from "@/lib/utils";
import { Avatar } from "@nextui-org/react";
import { Like, Post } from "@prisma/client";
import TweetLike from "./TweetLike";
import Retweet from "./Retweet";
import DeleteTweet from "./DeleteTweet";
import SaveTweet from "./SaveTweet";

const Tweet = ({
  post,
  userId,
}: {
  post: Post & {
    author: {
      image: string | null;
      name: string;
      id: string;
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
    <div className="p-10 dark:bg-[#191d20] rounded-3xl " key={post.id}>
      <div className="flex items-start gap-5">
        <Avatar
          src={post.author.image!}
          className="cursor-pointer"
          showFallback
          size="lg"
        />
        <div className="flex-col flex gap-4">
          <div className="flex items-center gap-4">
            <h3 className=" font-medium hover:underline cursor-pointer text-sm">
              {post.author.name}
            </h3>
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
          <h3>{post.content}</h3>
        </div>
      </div>
      <div className="mt-10 grid grid-cols-4">
        <TweetLike post={post} userId={userId} />

        {post.author.id === userId ? null : <Retweet post={post} />}

        <SaveTweet post={post} userId={userId} />

        <div>{post.author.id === userId && <DeleteTweet post={post} />}</div>
      </div>
    </div>
  );
};

export default Tweet;
