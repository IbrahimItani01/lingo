import { StickyWrapper } from "@/components/stickyWrapper";
import {getUserProgress, getUserSubscription } from "@/db/queries";
import { redirect } from "next/navigation";
import { UserProgress } from "@/components/userProgress";
import { FeedWrapper } from "@/components/feedWrapper";
import Image from "next/image";
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
                       {/*TODO: Add quests*/}
                </div>
            </FeedWrapper>
        </div>
    );
}
export default QuestsPage; 