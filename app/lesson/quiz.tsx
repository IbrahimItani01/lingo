"use client";

import { challengeOptions, challenges } from "@/db/schema";
import { useState,useTransition } from "react";
import { Header } from "./header";
import { QuestionBubble } from "./questionBubble";
import { Challenge } from "./challenge";
import { Footer } from "./footer";
import { upsertChallengeProgress } from "@/actions/challenge-progress";
import { toast } from "sonner";
import { reduceHearts } from "@/actions/user-progress";
import { useAudio } from "react-use";
type Props ={
    initialPercentage: number;
    initialHearts: number;
    initialLessonId: number;
    initialLessonChallenges: (typeof challenges.$inferSelect & {
        completed: boolean;
        challengeOptions: typeof challengeOptions.$inferSelect[];
    })[];
    userSubscription: any;
}
export const Quiz = ({initialHearts,initialLessonChallenges,initialLessonId,initialPercentage,userSubscription}: Props)=>{

    const [
        correctAudio,
        _c,
        correctControls
    ]= useAudio({src:"/correct.wav"})

    const [
        incorrectAudio,
        _inc,
        incorrectControls
    ]= useAudio({src:"/incorrect.wav"})

    const [pending,startTransition] = useTransition();
    const [hearts,setHearts]= useState(initialHearts);
    const [percentage,setPercentage]=useState(initialPercentage);
    const [challenges] = useState(initialLessonChallenges);
    const [activeIndex,setActiveIndex] = useState(()=>{
        const unCompletedIndex = challenges.findIndex((challenge)=>!challenge.completed);
        return unCompletedIndex===-1? 0:unCompletedIndex;
    });
    const [selectedOption,setSelectedOption] = useState<number>();
    const [status,setStatus]=useState<"correct"|"wrong"|"none">("none")
    const challenge = challenges[activeIndex];
    const options = challenge?.challengeOptions ?? [];

    const onNext = ()=>{
        setActiveIndex((current) => current+1);
    }

    const onSelect = (id:number)=>{
        if(status !== "none") return;
        setSelectedOption(id);
    }

    const onContinue = ()=>{
        if(!selectedOption) return;
        if(status === "wrong"){
            setStatus("none");
            setSelectedOption(undefined);
            return;
        }
        if(status === "correct"){
            onNext();
            setStatus("none");
            setSelectedOption(undefined);
            return;
        }
        const correctOption = options.find((option)=>option.correct);

        if(!correctOption) return;
        

        if(correctOption && correctOption.id === selectedOption){
            startTransition(()=>{
                upsertChallengeProgress(challenge.id)
                .then((response)=>{
                    if(response?.error === 'hearts'){
                        console.error("Missing hearts");
                        return;
                    }
                    correctControls.play();
                    setStatus("correct");
                    setPercentage((prev)=>prev+100/challenges.length);

                    if(initialPercentage===100){
                        setHearts((prev)=>Math.min(prev+1,5))
                    }
                }).catch(()=>toast.error("Something went wrong. Please try again."))
                
            })
        }else{
            startTransition(()=>{
                reduceHearts(challenge.id)
                .then((response)=>{
                    if(response?.error==="hearts")
                    {
                        console.error("Missing Hearts");
                        return;
                    }
                    incorrectControls.play()
                    setStatus("wrong");
                    if(!response?.error){
                        setHearts((prev)=> Math.max(prev-1,0));
                    }
                })
                .catch(()=> toast.error("Something went wrong. Please try again."))
            })
        }

    };
    if(!challenge){
        return(
            <div>
                Finished the challenge
            </div>
        )
    }
    const title = challenge.type === "ASSIST"? "Select the correct Meaning": challenge.question;
    return(
        <>
        {incorrectAudio}
        {correctAudio}
            <Header
            hearts={hearts}
            percentage={percentage}
            hasActiveSubscription={!!userSubscription?.isActive}
            />
            <div className="flex-1">
                <div className="h-full flex items-center justify-center">
                    <div className="lg:min-h-[350px] lg:w-[600px] w-full px-6 lg:px-0 flex flex-col gap-y-12">
                        <h1 className="text-lg lg:text-3xl text-center lg:text-start font-bold text-neutral-700">
                            {title}
                        </h1>
                        <div>
                             {challenge.type==="ASSIST" && (
                                <QuestionBubble question={challenge.question}/>
                             )}
                             <Challenge
                                options={options}
                                onSelect={onSelect}
                                status = {status}
                                selectedOption ={selectedOption}
                                disabled={pending}
                                type= {challenge.type}
                             />
                        </div>
                    </div>
                </div>
            </div>
            <Footer
                disabled={pending || !selectedOption}
                status={status}
                onCheck={onContinue}
            />
        </>
    );

}