import { AiOutlineRetweet } from "react-icons/ai";
import { formatTimeToNow } from "@/lib/utils";
import { Avatar } from "@nextui-org/react";
import { Like, Post } from "@prisma/client";
import { BsBookmark } from "react-icons/bs";
import TweetLike from "./TweetLike";
import Retweet from "./Retweet";
import DeleteTweet from "./DeleteTweet";

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
      <div className="mt-10 flex gap-16">
        <TweetLike post={post} userId={userId} />

        {post.author.id === userId ? null : <Retweet post={post} />}

        <div className="cursor-pointer flex items-center space-x-2 dark:text-white dark:hover:text-purple-500">
          <BsBookmark className="h-5 w-5" />
          <p className=" text-sm">Bookmark</p>
        </div>

        <div>{post.author.id === userId && <DeleteTweet post={post} />}</div>
      </div>
    </div>
  );
};

export default Tweet;
