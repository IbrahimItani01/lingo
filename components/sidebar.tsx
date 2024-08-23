import { cn } from "@/lib/utils";
import Image from "next/image";
import Link from "next/link";
import { SidebarItem } from "./sidebarItem";
import { ClerkLoaded, ClerkLoading, SignOutButton, UserButton } from "@clerk/nextjs";
import { Loader } from "lucide-react";

type Props ={
    className?:string;
}

export const Sidebar= ({className}:Props)=>{
    return(
        <div className={cn(
            "h-full lg:w-[256px] lg:fixed flex left-0 top-0 px-4 border-r-2 flex-col",className,
        )}>
            <Link href="/learn">
                <div className="pt-8 pl-4 pb-7 flex items-center gap-x-3">
                        <Image src="/logo.png" height={40} width={40} alt="Logo"/>
                        <h1 className="text-2xl font-extrabold text-green-600 tracking-wide">Lingo</h1>
                    </div>
            </Link>
            <div className="flex flex-col gap-y-2 flex-1">
                <SidebarItem iconSrc="/learn.png"  label="learn" href="/learn"></SidebarItem>
                <SidebarItem iconSrc="/leaderboard.png"  label="leaderboard" href="/leaderboard"></SidebarItem>
                <SidebarItem iconSrc="/quests.png"  label="quests" href="/quests"></SidebarItem>
                <SidebarItem iconSrc="/shop.png"  label="shop" href="/shop"></SidebarItem>
            </div>
            <div className="p-4">
                <ClerkLoading>
                    <Loader className="h-5 w-5 text-muted-foreground animate-spin"></Loader>
                </ClerkLoading>
                <ClerkLoaded>
                    <SignOutButton redirectUrl="/"></SignOutButton>
                </ClerkLoaded>
            </div>
        </div>
            
              
    );
}