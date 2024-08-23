import { StickyWrapper } from "@/components/stickyWrapper";
import { FeedWrapper } from "@/components/feedWrapper";
import { Header } from "./header";
const LearnPage = ()=>{
    return(
        <div className="flex flex-row-reverse gap-[48px] px-6">
            <StickyWrapper>
                My sticky sidebar
            </StickyWrapper>
            <FeedWrapper>
                <Header title='Spanish'></Header>
            </FeedWrapper>
        </div>
    );
}
export default LearnPage;