import ProfileEdit from "@/components/ProfileEdit";
import UserFeed from "@/components/UserFeed";
import WhomToFollow from "@/components/WhomToFollow";
import { isLoggedIn } from "@/lib/auth";
import prisma from "@/lib/db";
import { Avatar, Spinner } from "@nextui-org/react";
import React, { Suspense } from "react";

export const dynamic = "force-dynamic";
export const fetchCache = "force-no-store";

const ProfilePage = async () => {
  const session = await isLoggedIn();

  if (!session) {
    return (
      <div className="sm:w-[70vw]">
        <h3 className="p-10 text-2xl">Log in to view your profile</h3>
      </div>
    );
  }

  const user = await prisma.user.findUnique({
    where: {
      email: session!.user?.email!,
    },
  });

  return (
    <>
      <div className="sm:w-[70vw]">
        <div className="p-5 sm:p-10 dark:bg-[#191d20] w-[90vw] sm:w-[40vw] rounded-3xl shadow-lg">
          <div className="sm:mt-16 ">
            <Avatar
              src={session.user?.image!}
              showFallback
              className="w-20 h-20 sm:h-28 sm:w-28 "
            />

            <div className="flex items-center justify-between mt-4">
              <div>
                <h3 className=" text-xl font-semibold">{session.user?.name}</h3>
                <p className="text-white/60 text-lg">@{user?.username}</p>
              </div>
              <ProfileEdit
                // @ts-ignore
                userId={session!.user!.id!}
                uBio={user?.bio!}
                uUsername={user?.username!}
              />
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
          <UserFeed />
        </Suspense>
      </div>
    </>
  );
};

export default ProfilePage;
