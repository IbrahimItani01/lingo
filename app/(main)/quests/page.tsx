import { StickyWrapper } from "@/components/stickyWrapper";
import {getUserProgress, getUserSubscription } from "@/db/queries";
import { redirect } from "next/navigation";
import { UserProgress } from "@/components/userProgress";
import { FeedWrapper } from "@/components/feedWrapper";
import Image from "next/image";
import { Progress } from "@/components/ui/progress";
import { Promo } from "@/components/promo";
const quests = [
    {
        title: "Earn 20 XP",
        value: 20,
    },
    {
        title: "Earn 50 XP",
        value: 50,
    },
    {
        title: "Earn 100 XP",
        value: 100,
    },
    {
        title: "Earn 250 XP",
        value: 250,
    },
]

const QuestsPage= async ()=>{
    
    const userProgressData = getUserProgress();
    const userSubscriptionData = getUserSubscription();
     
    const [
        userProgress,
        userSubscription,
    ] = await Promise.all([
        userProgressData,
        userSubscriptionData,
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
                        src="/quests.png"
                        alt="Quests"
                        height={90}
                        width={90}
                    />
                    <h1 className="text-center font-bold text-neutral-800 text-2xl my-6">Quests</h1>
                    <p className="text-muted-foreground text-center text-lg mb-6">
                        Complete quests by earning points!
                    </p>
                    <ul
                        className="w-full"
                    >
                        {quests.map((quest)=>{
                            const progress = (userProgress.points/quest.value)*100;
                            return(
                                <div
                                    className="flex items-center w-full p-4 gap-x-4 border-t-2"
                                    key={quest.title}
                                >
                                    <Image
                                        src="/points.png"
                                        alt="Points"
                                        width={60}
                                        height={60}
                                    />
                                    <div className="flex flex-col gap-y-2 w-full">
                                        <p className="text-neutral-700 text-xl font-bold">
                                            {quest.title}
                                        </p>
                                        <Progress value={progress} className="h-3" />
                                    </div>
                                </div>
                            );
                        })}
                    </ul>
                </div>
            </FeedWrapper>
        </div>
    );
}
export default QuestsPage; 