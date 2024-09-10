"use client"

import { Button } from "@/components/ui/button";
import Image from "next/image";
const pointsToRefill = 10;
type Props = {
    hearts: number;
    points: number;
    hasActiveSubscription: boolean;
}

export const Items = ({hearts,points,hasActiveSubscription}:Props)=>
{

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
                    disabled={hearts===5 || points < pointsToRefill}
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
        </ul>
    );
}