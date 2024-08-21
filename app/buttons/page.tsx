import { Button } from "@/components/ui/button";

const ButtonsPage = ()=>{
    return(
        <div className="p-4 space-y-4 flex flex-col w-2/5 max-w-[200px]">
            <Button>Default</Button>
            <Button variant="primary">Primary</Button>
            <Button variant="primaryOutline">Primary Outline</Button>

            <Button variant="primary">Secondary</Button>
            <Button variant="primaryOutline">Secondary Outline</Button>
        </div>

    );
}
export default ButtonsPage;