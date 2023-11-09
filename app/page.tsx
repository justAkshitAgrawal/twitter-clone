import Feed from "@/components/Feed";
import RightSideBar from "@/components/RightSideBar";
import WhatsHappening from "@/components/WhatsHappening";

const Home = () => {
  return (
    <div className="flex w-[70vw]">
      <div>
        <WhatsHappening />
        <div className="mt-10">
          <h3 className="ml-10 font-medium text-xl">{`Recent Tweets`}</h3>
          <Feed />
        </div>
      </div>
      <div className="px-10">
        <RightSideBar />
      </div>
    </div>
  );
};

export default Home;
