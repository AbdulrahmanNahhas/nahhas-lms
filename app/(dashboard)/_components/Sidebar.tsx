import { Button, buttonVariants } from "@/components/ui/button";
import { Logo } from "./Logo";
import { cn } from "@/lib/utils";
import SidebarRoutes from "./SidebarRoutes";
import { Heart } from "lucide-react";

const Sidebar = () => {
  return (
    <div className="h-full flex flex-col border-r overflow-y-auto bg-background shadow-sm">
      {/* Logo */}
      <div className="px-6 py-3 h-[80px] border-b">
        <Logo
          className={cn(
            buttonVariants({ variant: "ghost", size: "lg" }),
            "w-full h-full py-3 hover:bg-transparent"
          )}
        />
      </div>
      <SidebarRoutes />
      <div className="border border-primary rounded-xl p-3 pt-7 m-6 relative flex flex-col justify-center items-center mt-auto">
        <Heart className="absolute -top-4 bg-primary text-primary-foreground p-2 h-10 w-10 rounded-lg" />
        <h1 className="text-lg font-bold">Donate</h1>
        <p className="text-[12px] text-center text-muted-foreground">
          This project is 100% <br /> for Free (Forever).
        </p>

        <Button className="w-full mt-2 rounded-xl " size={"sm"}>
          Donate
        </Button>
      </div>
    </div>
  );
};

export default Sidebar;
