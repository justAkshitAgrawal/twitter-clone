import React from "react";
import { AiOutlineHeart, AiOutlineRetweet } from "react-icons/ai";
import { formatTimeToNow } from "@/lib/utils";
import { Avatar } from "@nextui-org/react";
import { Post } from "@prisma/client";
import { BsBookmark } from "react-icons/bs";

const Tweet = ({
  post,
}: {
  post: Post & {
    author: {
      image: string | null;
      name: string;
    };
  };
}) => {
  return (
    <div className="p-10 dark:bg-[#191d20] rounded-3xl " key={post.id}>
      <div className="flex items-start gap-5">
        <Avatar src={post.author.image!} showFallback size="lg" />
        <div className="flex-col flex gap-4">
          <div className="flex items-center gap-4">
            <h3>{post.author.name}</h3>
            <h3 className="text-white/60 text-xs">
              {formatTimeToNow(post.createdAt)}
            </h3>
          </div>
          <h3>{post.content}</h3>
        </div>
      </div>
      <div className="mt-10 flex gap-16">
        <div className="cursor-pointer flex items-center space-x-2">
          <AiOutlineHeart className="h-5 w-5 text-red-500" />
          <p className="text-red-500 text-sm">{post.likes}</p>
        </div>
        <div className="cursor-pointer flex items-center space-x-2">
          <AiOutlineRetweet className="h-5 w-5 dark:text-white" />
          <p className=" text-sm">Retweet</p>
        </div>
        <div className="cursor-pointer flex items-center space-x-2">
          <BsBookmark className="h-5 w-5 dark:text-white" />
          <p className=" text-sm">Bookmark</p>
        </div>
      </div>
    </div>
  );
};

export default Tweet;
