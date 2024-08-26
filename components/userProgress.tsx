import Link from "next/link";
import { Button } from "./ui/button";
import Image from "next/image";
import { InfinityIcon } from "lucide-react";
import { courses } from "@/db/schema";

type Props = {
    hearts: number;
    points: number;
    hasActiveSubscription: boolean;
    activeCourse: typeof courses.$inferSelect;

}
export const UserProgress = ({activeCourse ,points,hearts, hasActiveSubscription}:Props)=> {
    return(
        <div className="flex items-center justify-between gap-x-2 w-full">
            <Link href="/courses">
                <Button variant="ghost">
                    <Image src={activeCourse.imageSrc} alt={activeCourse.title} 
                        className="rounded-md"
                        height={32}
                        width={32}
                    />
                </Button>
            </Link>
            <Link href="/shop">
                <Button variant="ghost" className="text-orange-500">
                    <Image src="/points.png" height={28} width={28} alt="Points" className="mr-2"></Image>
                    {points}
                </Button>
            </Link>
            <Link href="/shop">
                <Button variant="ghost" className="text-rose-500">
                    <Image src="/heart.png" height={22} width={22} alt="Hearts" className="mr-2"></Image>
                    {hasActiveSubscription? <InfinityIcon className="h-4 w-4 stroke-[3]"/>: hearts}
                </Button>
            </Link>
        </div>
    );
}