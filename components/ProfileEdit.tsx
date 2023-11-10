"use client";

import { ProfileType } from "@/lib/validator/ProfileValidator";
import {
  Modal,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Button,
  useDisclosure,
  Input,
  Textarea,
  Spinner,
} from "@nextui-org/react";
import { useMutation } from "@tanstack/react-query";
import axios from "axios";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { AiFillCheckCircle, AiFillCloseCircle } from "react-icons/ai";
import { toast } from "sonner";
import { useDebouncedCallback } from "use-debounce";

const ProfileEdit = ({
  userId,
  uBio,
  uUsername,
}: {
  userId: string;
  uBio?: string;
  uUsername: string;
}) => {
  const { isOpen, onOpen, onOpenChange, onClose } = useDisclosure();

  const [username, setUsername] = useState(uUsername);
  const [bio, setBio] = useState<string>(uBio || "");

  const [usernameAvailable, setUsernameAvailable] = useState(true);

  const router = useRouter();

  const { mutate: updateProfile, isPending: isUpdatePending } = useMutation({
    mutationFn: async ({ username, bio }: ProfileType) => {
      const payload: ProfileType = {
        username,
        bio,
      };

      const { data } = await axios.post("/api/profile", payload);
      onClose();
      return data;
    },
    onSuccess: () => {
      toast.success("Profile updated!");
      router.refresh();
    },
    onError: () => {
      toast.error("Error updating profile!");
    },
  });

  const { mutate: checkUsername, isPending: isCheckPending } = useMutation({
    // @ts-ignore
    mutationFn: useDebouncedCallback(async (username: string) => {
      try {
        const { data } = await axios.get(`/api/username/${username}`);
        setUsernameAvailable(data.available);
        if (username === uUsername) setUsernameAvailable(true);
        return data;
      } catch (error) {
        setUsernameAvailable(false);
      }
    }, 600),
  });

  return (
    <>
      <Button
        variant="ghost"
        onPress={() => {
          setBio(uBio || "");
          setUsername(uUsername);
          onOpen();
        }}
      >
        Edit
      </Button>
      <Modal backdrop="blur" isOpen={isOpen} onOpenChange={onOpenChange}>
        <ModalContent>
          {(onClose) => (
            <>
              <ModalHeader className="flex flex-col gap-1">
                Edit Profile
              </ModalHeader>
              <ModalBody>
                <div className="relative">
                  {isCheckPending ? (
                    <Spinner
                      size="sm"
                      className="absolute top-[50%] translate-y-[-50%] right-4 z-20"
                      color="white"
                    />
                  ) : usernameAvailable ? (
                    <AiFillCheckCircle className="absolute h-5 w-5 right-4 top-[50%] translate-y-[-50%] z-20 text-green-500" />
                  ) : (
                    <AiFillCloseCircle className="absolute h-5 w-5 right-4 top-[50%] translate-y-[-50%] z-20 text-red-500" />
                  )}
                  <Input
                    value={username}
                    onChange={(e) => {
                      setUsername(e.target.value);
                      if (!e.target.value) {
                        setUsernameAvailable(false);
                        return;
                      }
                      checkUsername(e.target.value);
                    }}
                    label="Username"
                    maxLength={25}
                    isRequired
                  />
                </div>
                <Textarea
                  value={bio}
                  onChange={(e) => setBio(e.target.value)}
                  label="Bio"
                  max={160}
                />
              </ModalBody>
              <ModalFooter>
                <Button
                  color="danger"
                  variant="light"
                  onPress={() => {
                    setBio(uBio || "");
                    setUsername(uUsername);
                    onClose();
                  }}
                >
                  Cancel
                </Button>
                <Button
                  isLoading={isUpdatePending}
                  color="primary"
                  onPress={() => {
                    updateProfile({ username, bio });
                  }}
                  isDisabled={!usernameAvailable || !username}
                >
                  Save
                </Button>
              </ModalFooter>
            </>
          )}
        </ModalContent>
      </Modal>
    </>
  );
};

export default ProfileEdit;
