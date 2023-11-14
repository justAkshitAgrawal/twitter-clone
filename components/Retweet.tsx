"use client";

import { PostType } from "@/lib/validator/PostValidator";
import { Post } from "@prisma/client";
import { useMutation } from "@tanstack/react-query";
import axios from "axios";
import React from "react";
import { AiOutlineRetweet } from "react-icons/ai";
import {
  Popover,
  PopoverTrigger,
  PopoverContent,
  Button,
} from "@nextui-org/react";
import { useRouter } from "next/navigation";
import { toast } from "sonner";

const Retweet = ({
  post,
}: {
  post: Post & {
    author: {
      image: string | null;
      name: string;
    };
  };
}) => {
  const { mutate: retweet } = useMutation({
    mutationFn: async ({ tweet, retweetedFrom }: PostType) => {
      const payload: PostType = {
        tweet,
        retweetedFrom,
      };
      await axios.post("/api/tweet", payload);
    },
    onSuccess: () => {
      setIsOpen(false);
      toast.success("Retweeted!");
      router.refresh();
    },
  });

  const [isOpen, setIsOpen] = React.useState(false);

  const router = useRouter();

  return (
    <>
      <Popover
        isOpen={isOpen}
        onOpenChange={(open) => setIsOpen(open)}
        placement="bottom"
        backdrop="transparent"
      >
        <PopoverTrigger>
          <div className="cursor-pointer flex items-center space-x-2 dark:text-white dark:hover:text-green-400">
            <AiOutlineRetweet className="h-5 w-5" />
            <p className=" text-sm hidden sm:block">Retweet</p>
          </div>
        </PopoverTrigger>
        <PopoverContent className="p-3 border border-zinc-600">
          <div>
            <h3 className={`font-semibold`}>
              Do you want to retweet this tweet?
            </h3>
            <div className="flex gap-4 mt-2">
              <Button
                size="sm"
                color="primary"
                variant="shadow"
                onClick={() => {
                  retweet({
                    tweet: post.content,
                    retweetedFrom: post.author.name,
                  });
                }}
              >
                Yes
              </Button>
              <Button
                size="sm"
                color="danger"
                variant="ghost"
                onClick={() => setIsOpen(false)}
              >
                No
              </Button>
            </div>
          </div>
        </PopoverContent>
      </Popover>
    </>
  );
};

export default Retweet;
