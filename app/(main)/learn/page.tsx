import { StickyWrapper } from "@/components/stickyWrapper";
import { FeedWrapper } from "@/components/feedWrapper";
import { Header } from "./header";
import { UserProgress } from "@/components/userProgress";
import { getUserProgress } from "@/db/queries";
import { redirect } from "next/navigation";
const LearnPage = async ()=>{
    const userProgressData = getUserProgress();
    const [userProgress] = await Promise.all([userProgressData])
    if(!userProgress || !userProgress.activeCourse){
        redirect("/courses");
    }
    return(
        <div className="flex flex-row-reverse gap-[48px] px-6">
            <StickyWrapper>
                <UserProgress
                    activeCourse={userProgress.activeCourse}
                    hearts={userProgress.hearts}
                    points={userProgress.points}
                    hasActiveSubscription={false}
                ></UserProgress>
            </StickyWrapper>
            <FeedWrapper>
                <Header title={userProgress.activeCourse.title}></Header>
            </FeedWrapper>
        </div>
    );
}
export default LearnPage;