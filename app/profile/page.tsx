import ProfileEdit from "@/components/ProfileEdit";
import UserFeed from "@/components/UserFeed";
import { isLoggedIn } from "@/lib/auth";
import prisma from "@/lib/db";
import { Avatar, Spinner } from "@nextui-org/react";
import React, { Suspense } from "react";

export const dynamic = "force-dynamic";
export const fetchCache = "force-no-store";

const ProfilePage = async () => {
  const session = await isLoggedIn();

  const user = await prisma.user.findUnique({
    where: {
      email: session!.user?.email!,
    },
  });

  if (!session) {
    return (
      <div className="w-[70vw]">
        <h3 className="p-10 text-2xl">Log in to view your profile</h3>
      </div>
    );
  }
  return (
    <div className="w-[70vw]">
      <div className="p-10 dark:bg-[#191d20] w-[40vw] rounded-3xl">
        <div className="mt-16 ">
          <Avatar
            src={session.user?.image!}
            showFallback
            className="h-28 w-28 "
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

          <hr className="h-px mt-10 bg-gray-200 border-0 dark:bg-gray-500" />
        </div>
      </div>
      <Suspense
        fallback={
          <div className="flex justify-center w-[40vw] mt-10">
            <Spinner color="current" size="lg" />
          </div>
        }
      >
        <UserFeed />
      </Suspense>
    </div>
  );
};

export default ProfilePage;
