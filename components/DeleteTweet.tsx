"use client";

import { Post } from "@prisma/client";
import { useMutation } from "@tanstack/react-query";
import axios from "axios";
import React from "react";
import { AiOutlineDelete } from "react-icons/ai";
import {
  Modal,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Button,
  useDisclosure,
} from "@nextui-org/react";
import { useRouter } from "next/navigation";
import { toast } from "sonner";

const DeleteTweet = ({
  post,
}: {
  post: Post & {
    author: {
      image: string | null;
      name: string;
      id: string;
    };
  };
}) => {
  const { isOpen, onOpen, onOpenChange, onClose } = useDisclosure();

  const { mutate: deleteTweet, isPending } = useMutation({
    mutationFn: async () => {
      const { data } = await axios.post("/api/tweet/delete", {
        postId: post.id,
      });
      return data;
    },
    onSuccess: () => {
      toast.success("Tweet deleted!");
      router.refresh();
      onClose();
    },
    onError: () => {
      toast.error("Error deleting tweet!");
    },
  });

  const router = useRouter();

  return (
    <>
      <div
        onClick={onOpen}
        className="cursor-pointer flex items-center space-x-2 dark:text-white dark:hover:text-red-500"
      >
        <AiOutlineDelete className="h-5 w-5" />
        <h3>Delete</h3>
      </div>
      <Modal backdrop="blur" isOpen={isOpen} onOpenChange={onOpenChange}>
        <ModalContent>
          {(onClose) => (
            <>
              <ModalHeader className="flex flex-col gap-1">
                Are you sure?
              </ModalHeader>
              <ModalBody>
                <p>Do you want to delete your tweet?</p>
              </ModalBody>
              <ModalFooter>
                <Button color="default" variant="ghost" onPress={onClose}>
                  Cancel
                </Button>
                <Button
                  isLoading={isPending}
                  color="danger"
                  variant="solid"
                  onPress={() => {
                    deleteTweet();
                  }}
                >
                  Delete
                </Button>
              </ModalFooter>
            </>
          )}
        </ModalContent>
      </Modal>
    </>
  );
};

export default DeleteTweet;
