import { isLoggedIn } from "@/lib/auth";
import WhatsHappeningTweet from "./WhatsHappeningTweet";

const WhatsHappening = async () => {
  const session = await isLoggedIn();
  return (
    <div className="p-10 dark:bg-[#191d20] rounded-3xl w-[40vw]">
      {session ? (
        <WhatsHappeningTweet session={session} />
      ) : (
        <h3 className="text-lg">Please login for a better experience </h3>
      )}
    </div>
  );
};

export default WhatsHappening;
