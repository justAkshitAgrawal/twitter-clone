"use client";

import { Like, Post } from "@prisma/client";
import { useMutation } from "@tanstack/react-query";
import axios from "axios";
import React from "react";
import { AiFillHeart, AiOutlineHeart } from "react-icons/ai";

const TweetLike = ({
  post,
  userId,
}: {
  post: Post & {
    author: {
      image: string | null;
      name: string;
    };
    likes: Like[];
  };
  userId: string | undefined;
}) => {
  const isLiked = post.likes.some((like) => like.userId === userId);
  const [isLikedState, setIsLikedState] = React.useState(isLiked);
  const [likeCount, setLikeCount] = React.useState(post.likes.length);

  const { mutate: likeTweet } = useMutation({
    mutationFn: async () => {
      if (isLiked) {
        await axios.post(`/api/tweet/like`, {
          postId: post.id,
          action: "unlike",
        });
      } else {
        await axios.post(`/api/tweet/like`, {
          postId: post.id,
          action: "like",
        });
      }
    },
  });

  return (
    <div
      onClick={() => {
        likeTweet();
        setIsLikedState((prev) => !prev);
        if (isLikedState) {
          setLikeCount(likeCount - 1);
        } else {
          setLikeCount(likeCount + 1);
        }
      }}
      className="cursor-pointer flex items-center space-x-2"
    >
      {isLikedState ? (
        <AiFillHeart className="h-5 w-5 text-red-500" />
      ) : (
        <AiOutlineHeart className="h-5 w-5 text-red-500" />
      )}
      <p className="text-red-500 text-sm">
        {likeCount} {likeCount === 1 ? "Like" : "Likes"}
      </p>
    </div>
  );
};

export default TweetLike;
