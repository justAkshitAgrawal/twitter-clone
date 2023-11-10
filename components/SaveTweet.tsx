"use client";

import { Post } from "@prisma/client";
import { useMutation } from "@tanstack/react-query";
import axios from "axios";
import { usePathname, useRouter } from "next/navigation";
import React from "react";
import { BsBookmark, BsBookmarkFill } from "react-icons/bs";

const SaveTweet = ({
  post,
  userId,
}: {
  post: Post & {
    author: {
      image: string | null;
      name: string;
    };
    savedBy: {
      userId: string;
      postId: string;
    }[];
  };
  userId: string | undefined;
}) => {
  const isSaved = post.savedBy.some((save) => save.userId === userId);
  const [isSavedState, setIsSavedState] = React.useState(isSaved);

  const router = useRouter();
  const pathname = usePathname();

  const { mutate: saveTweet } = useMutation({
    mutationFn: async () => {
      if (!isSaved) {
        await axios.post(`/api/tweet/save`, {
          postId: post.id,
          action: "save",
        });
      } else {
        await axios.post(`/api/tweet/save`, {
          postId: post.id,
          action: "unsave",
        });
      }

      if (pathname === "/bookmarks") {
        router.refresh();
      }
    },
    onSuccess: () => {
      router.refresh();
    },
  });

  return (
    <div
      onClick={() => {
        saveTweet();
        setIsSavedState(!isSavedState);
      }}
      className="cursor-pointer flex items-center space-x-2 dark:text-white dark:hover:text-purple-500"
    >
      {isSavedState ? (
        <BsBookmarkFill className="h-5 w-5 text-purple-500" />
      ) : (
        <BsBookmark className="h-5 w-5" />
      )}

      <p
        className={`text-sm ${
          isSavedState ? "text-purple-500" : "text-white/60"
        }`}
      >
        {isSavedState ? "Saved" : "Save"}
      </p>
    </div>
  );
};

export default SaveTweet;
