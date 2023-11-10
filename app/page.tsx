import Feed from "@/components/Feed";
import RightSideBar from "@/components/RightSideBar";
import WhatsHappening from "@/components/WhatsHappening";
import { Spinner } from "@nextui-org/react";
import { Suspense } from "react";

export const dynamic = "force-dynamic";
export const fetchCache = "force-no-store";

const Home = () => {
  return (
    <div className="flex w-[70vw]">
      <div>
        <WhatsHappening />
        <div className="mt-10">
          <h3 className="ml-10 font-medium text-xl">{`Recent Tweets`}</h3>
          <Suspense
            fallback={
              <div className="flex justify-center w-[40vw] mt-10">
                <Spinner color="current" size="lg" />
              </div>
            }
          >
            <Feed />
          </Suspense>
        </div>
      </div>
      <div className="px-10">
        <RightSideBar />
      </div>
    </div>
  );
};

export default Home;
