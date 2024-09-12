"use client"

import { refillHearts } from "@/actions/user-progress";
import { createStripeUrl } from "@/actions/user-subscription";
import { Button } from "@/components/ui/button";
import Image from "next/image";
import { useTransition } from "react";
import { toast } from "sonner";
const pointsToRefill = 10;
type Props = {
    hearts: number;
    points: number;
    hasActiveSubscription: boolean;
}

export const Items = ({hearts,points,hasActiveSubscription}:Props)=>
{

    const [pending, startTransition] = useTransition();
    const onRefillHearts = ()=>{
        if(pending || hearts === 5 || points<pointsToRefill)
        {
            return;
        }
        startTransition(()=>{
            refillHearts().catch(()=> toast.error("Something went wrong"))
        });
    };
    const onUpgrade = ()=>{
        startTransition(()=>{
            createStripeUrl().then((respone)=>{
                if(respone.data){
                    window.location.href = respone.data;
                }
            })
            .catch(()=>toast.error("Something went wrong"));
        })
    }
    return(
        <ul className="w-full">
            <div className="flex items-center w-full p-4 gap-x-4 border-t-2">
                <Image
                    src="/heart.png"
                    alt="heart"
                    height={60}
                    width={60}
                />
                <div className="flex-1">
                    <p className="text-neutral-700 text-base lg:text-xl font-bold">
                        Refill Hearts 
                    </p>
                </div>
                <Button
                    onClick={onRefillHearts}
                    disabled={hearts===5 || points < pointsToRefill
                        || pending
                    }
                >
                    {hearts ===5 ? "full": (
                        <div className="flex items-center">
                            <Image
                                src="/points.png"
                                alt="points"
                                width={20}
                                height={20}
                            />
                            <p>{pointsToRefill}</p>
                        </div>
                    )}
                </Button>
            </div>
            <div className="flex items-center w-full p-4 pt-8 gap-x-4 border-t-2" >
                    <Image
                        src="/unlimitedHearts.png"
                        alt="Unlimited"
                        height={60}
                        width={60}
                    />
                    <div className="flex-1">
                        <p className="text-neutral-700 text-base lg:text-xl font-bold">
                            Unlimited Hearts
                        </p>
                    </div>
                    <Button
                    onClick={onUpgrade}
                        disabled={pending || hasActiveSubscription}
                    >
                        {hasActiveSubscription? "active":"upgrade"}
                    </Button>
            </div>
        </ul>
    );
}