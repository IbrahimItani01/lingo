import { StickyWrapper } from "@/components/stickyWrapper";
import { FeedWrapper } from "@/components/feedWrapper";
const LearnPage = ()=>{
    return(
        <div className="flex flex-row-reverse gap-[48px] px-6">
            <StickyWrapper>
                My sticky sidebar
            </StickyWrapper>
            <FeedWrapper>
               my feed
            </FeedWrapper>
        </div>
    );
}
export default LearnPage;