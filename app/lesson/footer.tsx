import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { useMedia } from "react-use";

type Props={
    disabled?:boolean;
    status: "correct"|"wrong"|"none"|"completed";
    onCheck: ()=>void;
    lessonId?:boolean;
}
export const Footer = ({disabled,status,onCheck,lessonId}:Props)=>{

    const isMobile = useMedia("(max-width:1024px)")

    return(
       <footer
       className={cn(
        "lg:-h[140px] h-[100px] border-t-2",
        status === "correct" && "border-transparent bg-green-100",
        status === "wrong" && "border-transparent bg-rose-100",
        
       )}
       >
        <div
            className="max-w-[1140px] h-full mx-auto flex items-center justify-between px-6 lg:px-10"
        >
            <Button
                disabled={disabled}
                className="ml-auto"
                onClick={onCheck}
                size={isMobile?"sm":"lg"}
                variant={status==="wrong"? "danger":"secondary"}
            >
                {status ==="none" && "Check"}
                {status ==="correct" && "Next"}
                {status ==="wrong" && "Retry"}
                {status ==="completed" && "Continue"}
            </Button>
        </div>
       </footer>
    );
}