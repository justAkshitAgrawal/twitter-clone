import { isLoggedIn } from "@/lib/auth";
import WhatsHappeningTweet from "./WhatsHappeningTweet";

const WhatsHappening = async () => {
  const session = await isLoggedIn();
  return (
    <div className="p-5 sm:p-10 dark:bg-[#191d20] rounded-3xl w-[90vw] sm:w-[40vw] shadow-lg">
      {session ? (
        <WhatsHappeningTweet session={session} />
      ) : (
        <h3 className="text-lg">Please login for a better experience </h3>
      )}
    </div>
  );
};

export default WhatsHappening;
