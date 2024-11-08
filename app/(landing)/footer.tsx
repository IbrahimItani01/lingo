import { Button } from "@/components/ui/button";
import Image from "next/image";

export const Footer = () => {
  return (
    <footer className="hidden lg:block h-20 w-full border-t-2 border-slate-200 p-2">
      <div className="max-w-screen-lg mx-auto flex items-center justify-evenly h-full">
        <Button size="lg" variant="ghost" className="w-full">
          <Image src="/de.png" height={32} width={40} alt="German" className="mr-4 rounded-md"/>
          German
        </Button>
        <Button size="lg" variant="ghost" className="w-full">
          <Image src="/en.png" height={32} width={40} alt="English" className="mr-4 rounded-md"/>
          English
        </Button>
        <Button size="lg" variant="ghost" className="w-full">
          <Image src="/es.png" height={32} width={40} alt="Spanish" className="mr-4 rounded-md"/>
          Spanish
        </Button>
        <Button size="lg" variant="ghost" className="w-full">
          <Image src="/it.png" height={32} width={40} alt="Italian" className="mr-4 rounded-md"/>
          Italian
        </Button>
        <Button size="lg" variant="ghost" className="w-full">
          <Image src="/fr.png" height={32} width={40} alt="French" className="mr-4 rounded-md"/>
          French
        </Button>
      </div>
    </footer>
  );
};
