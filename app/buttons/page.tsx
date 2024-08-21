import { Button } from "@/components/ui/button";

const ButtonsPage = ()=>{
    return(
        <div className="p-4 space-y-4 flex flex-col w-2/5 max-w-[200px]">
            <Button>Primary</Button>
            <Button>Primary Outline</Button>
        </div>

    );
}
export default ButtonsPage;