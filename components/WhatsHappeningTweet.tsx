"use client";

import { PostType } from "@/lib/validator/PostValidator";
import { Avatar, Button } from "@nextui-org/react";
import { useMutation } from "@tanstack/react-query";
import axios from "axios";
import { Session } from "next-auth";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { BsFillEmojiSmileFill } from "react-icons/bs";
import { FaImage } from "react-icons/fa";
import { LuTwitter } from "react-icons/lu";
import { toast } from "sonner";
import EmojiPicker from "emoji-picker-react";

const WhatsHappeningTweet = ({
  session,
}: {
  session: Session | null | undefined;
}) => {
  const [tweet, setTweet] = useState("");
  const [showEmoji, setShowEmoji] = useState(false);

  const router = useRouter();

  const { mutate: postTweet, isPending } = useMutation({
    mutationFn: async ({ tweet }: PostType) => {
      const payload: PostType = { tweet };

      const { data } = await axios.post("/api/tweet", payload);
      return data;
    },
    onSuccess: () => {
      setTweet("");
      toast.success("Tweet posted!");
      router.refresh();
    },
    onError: () => {
      toast.error("Error posting tweet!");
    },
  });

  return (
    <>
      <div className="flex flex-col sm:flex-row items-start gap-5 relative">
        <div>
          <Avatar
            src={session?.user?.image!}
            className="border-2 border-primary cursor-pointer"
            size="lg"
            showFallback
          />
        </div>
        <textarea
          placeholder="What's happening?"
          className={`bg-transparent outline-none w-full p-2 rounded-lg ${
            tweet.length > 255 && "border border-red-500"
          }`}
          rows={2}
          value={tweet}
          onChange={(e) => setTweet(e.target.value)}
        />
      </div>
      <div
        className={`text-end w-full mt-2 text-xs text-white/80 ${
          tweet.length > 255 && "text-red-500"
        }`}
      >
        {tweet.length} / 255
      </div>
      <div className="mt-4 flex items-center justify-between">
        <div className="flex items-center gap-6 relative">
          <FaImage className="h-5 w-5 cursor-not-allowed hidden sm:block" />
          <BsFillEmojiSmileFill
            onClick={() => {
              setShowEmoji((prev) => !prev);
            }}
            className="h-5 w-5 cursor-pointer hidden sm:block"
          />
          {showEmoji && (
            <div className="absolute top-10 z-50 left-10 ">
              <EmojiPicker
                onEmojiClick={(emojiData, e) => {
                  setTweet((prev) => prev + emojiData.emoji);
                }}
              />
            </div>
          )}
        </div>

        <Button
          startContent={!isPending && <LuTwitter className="fill-white" />}
          color="primary"
          variant="shadow"
          onClick={() => postTweet({ tweet })}
          isLoading={isPending}
          isDisabled={tweet.length === 0 || tweet.length > 255}
        >
          Tweet
        </Button>
      </div>
    </>
  );
};

export default WhatsHappeningTweet;
