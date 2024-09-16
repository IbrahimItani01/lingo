import { StickyWrapper } from "@/components/stickyWrapper";
import { getTopTenUsers, getUserProgress, getUserSubscription } from "@/db/queries";
import { redirect } from "next/navigation";
import { UserProgress } from "@/components/userProgress";
import { FeedWrapper } from "@/components/feedWrapper";
import Image from "next/image";
import { Separator } from "@/components/ui/separator";
import { Avatar } from "@/components/ui/avatar";
import { AvatarImage } from "@radix-ui/react-avatar";
import { Promo } from "@/components/promo";
const LeaderboardPage= async ()=>{
    
    const userProgressData = getUserProgress();
    const userSubscriptionData = getUserSubscription();
    const topTenUsersData = getTopTenUsers();
     
    const [
        userProgress,
        userSubscription,
        topTenUsers,
    ] = await Promise.all([
        userProgressData,
        userSubscriptionData,
        topTenUsersData
    ]);

    if(!userProgress || !userProgress.activeCourse){
        redirect("/courses")
    }

    return(
        <div className="flex flex-row-reverse gap-[48px] px-6">
            <StickyWrapper>
                <UserProgress
                    activeCourse={userProgress.activeCourse}
                    hearts={userProgress.hearts}
                    points={userProgress.points}
                    hasActiveSubscription={!!userSubscription?.isActive}
                />
                {!(!!userSubscription?.isActive) &&  <Promo/>}

            </StickyWrapper>
            <FeedWrapper>
                <div className="w-full flex flex-col items-center">
                    <Image
                        src="/leaderboard.png"
                        alt="leaderboard"
                        height={90}
                        width={90}
                    />
                    <h1 className="text-center font-bold text-neutral-800 text-2xl my-6">Leaderboard</h1>
                    <p className="text-muted-foreground text-center text-lg mb-6">
                        See your rank among other users in Lingo's community
                    </p>
                    <Separator
                        className="mb-4 h-0.5 rounded-full"
                    />
                    {topTenUsers.map((userProgress,index)=>(
                        <div 
                            key={userProgress.userId}
                            className="flex items-center w-full px-4 p-2 rounded-xl hove:bg-gray-200/50"
                        >
                            <p className="font-bold text-lime-700 mr-4">
                                {index+1}
                            </p>
                            <Avatar className="border bg-green-500 h-12 w-12 ml-3 mr-6">
                                <AvatarImage
                                    src={userProgress.userImageSrc}
                                    className="object-cover"
                                />
                            </Avatar>
                            <p
                                className="font-bold text-neutral-800 flex-1"
                            >
                                {userProgress.userName}
                            </p>
                            <p
                                className="text-muted-foreground"
                            >
                                {userProgress.points} XP
                            </p>
                        </div>
                    ))}
                </div>
            </FeedWrapper>
        </div>
    );
}
export default LeaderboardPage; 