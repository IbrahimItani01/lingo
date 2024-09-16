import { StickyWrapper } from "@/components/stickyWrapper";
import { FeedWrapper } from "@/components/feedWrapper";
import { Header } from "./header";
import { UserProgress } from "@/components/userProgress";
import { getCourseProgress, getLessonPercentage, getUnits, getUserProgress, getUserSubscription } from "@/db/queries";
import { redirect } from "next/navigation";
import { Unit } from "./unit";
import { Promo } from "@/components/promo";
import { Quests } from "@/components/quests";
const LearnPage = async ()=>{
    const userProgressData = getUserProgress();
    const courseProgressData = getCourseProgress();
    const lessonPercentageData = getLessonPercentage();
    const activeSubscriptionData = getUserSubscription();
    const unitsData = getUnits();
    const [userProgress,units,courseProgress,lessonPercentage,activeSubscription] = await Promise.all([userProgressData,unitsData,courseProgressData,lessonPercentageData,activeSubscriptionData])
    if(!userProgress || !userProgress.activeCourse){
        redirect("/courses");
    }
    if(!courseProgress){
        redirect("/courses");
    }
    return(
        <div className="flex flex-row-reverse gap-[48px] px-6">
            <StickyWrapper>
                <UserProgress
                    activeCourse={userProgress.activeCourse}
                    hearts={userProgress.hearts}
                    points={userProgress.points}
                    hasActiveSubscription={!!activeSubscription?.isActive}
                ></UserProgress>
                {!(!!activeSubscription?.isActive) &&  <Promo/>}
                <Quests
                    points={userProgress.points}
                />
            </StickyWrapper>
            <FeedWrapper>
                <Header title={userProgress.activeCourse.title}></Header>
                {units.map((unit)=>(
                    <div key={unit.id} className="mb-10">
                        <Unit
                            id={unit.id}
                            order={unit.order}
                            description={unit.description}
                            title={unit.title}
                            lessons={unit.lessons}
                            activeLesson={courseProgress.activeLesson}
                            activeLessonPercentage={lessonPercentage}
                        />
                    </div>
                ))}
            </FeedWrapper>
        </div>
    );
}
export default LearnPage;