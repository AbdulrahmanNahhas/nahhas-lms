"use client"

import { Settings } from "lucide-react";
import SidebarRoutes from "./SidebarRoutes";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import Link from "next/link";
import { usePathname } from "next/navigation";

const Sidebar = () => {
  const pathname = usePathname();
  const isActive = pathname === "/settings";

  return (
    <div className="h-full flex flex-col overflow-y-auto bg-secondary md:bg-background w-[250px]">
      {/* Logo */}
      <div className="flex p-4 justify-between items-center">
        <h1 className="font-bold w-auto h-8 flex items-center justify-center gap-3">
          <div className="!h-8 p-1 !w-8 !aspect-square bg-primary rounded-sm text-lg lg:text-xl flex items-center justify-center !text-background">
            N
          </div>
          <div className="flex text-lg md:text-xl items-center gap-1">
            <span>Nahhas</span>
            <span className="text-primary">LMS</span>
          </div>
        </h1>
        <Badge
          variant="secondary"
          className="bg-accent hover:bg-accent cursor-default rounded-[6px] p-1 h-min py-0 tracking-widest font-medium hidden lg:block"
        >
          v1.5
        </Badge>
      </div>
      <SidebarRoutes />
      <div className="flex flex-col justify-center items-center mt-auto mb-2 mx-3">
    <Button
      asChild
      variant={"ghost"}
      size={"lg"}
      className={cn(
        "flex items-center justify-start w-full gap-x-3 px-4 py-[26px] text-muted-foreground text-sm mx-3 !rounded-xl overflow-hidden font-[500] transition-all duration-300 rounded-none hover:scale-1 group",
        isActive
          ? "text-primary opacity-100 hover:bg-primary/10 hover:text-primary"
          : "",
      )}
    >
      <Link href={"/settings"}>
        <span className={cn("p-[6px] rounded-[6px] transition-all duration-300",isActive ? "bg-primary/25 group-hover:bg-primary/5 text-primary": "bg-accent text-muted-foreground group-hover:text-foreground")}>
          <Settings className="w-5 h-5" />
        </span>
        Settings
      </Link>
    </Button>
      </div>
    </div>
  );
};

export default Sidebar;
