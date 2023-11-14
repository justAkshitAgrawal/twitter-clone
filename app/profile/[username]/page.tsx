import ProfileEdit from "@/components/ProfileEdit";
import UsernameFeed from "@/components/UsernameFeed";
import { isLoggedIn } from "@/lib/auth";
import prisma from "@/lib/db";
import { Avatar, Spinner } from "@nextui-org/react";
import { notFound } from "next/navigation";
import React, { Suspense } from "react";

const UsernameProfilePage = async ({
  params,
}: {
  params: {
    username: string;
  };
}) => {
  const user = await prisma.user.findFirst({
    where: {
      username: params.username,
    },
  });

  const session = await isLoggedIn();

  if (!user) notFound();

  return (
    <div className="sm:w-[70vw]">
      {" "}
      <div className="p-5 sm:p-10 dark:bg-[#191d20] w-[90vw] sm:w-[40vw] rounded-3xl shadow-lg">
        <div className="mt-16 ">
          <Avatar src={user.image!} showFallback className="h-28 w-28 " />

          <div className="flex items-center justify-between mt-4">
            <div>
              <h3 className=" text-xl font-semibold">{user?.name}</h3>
              <p className="text-white/60 text-lg">@{user?.username}</p>
            </div>
            {
              // @ts-ignore
              session?.user.id === user.id && (
                <ProfileEdit
                  // @ts-ignore
                  userId={session!.user!.id!}
                  uBio={user?.bio!}
                  uUsername={user?.username!}
                />
              )
            }
          </div>
          {/* Bio */}
          <p className="mt-4">{user?.bio}</p>

          <hr className="h-px mt-5 rounded-full bg-gray-200 border-0 dark:bg-gray-500" />
        </div>
      </div>
      <Suspense
        fallback={
          <div className="flex justify-center sm:w-[40vw] mt-10">
            <Spinner color="current" size="lg" />
          </div>
        }
      >
        <UsernameFeed id={user.id} />
      </Suspense>
    </div>
  );
};

export default UsernameProfilePage;
