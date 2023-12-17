import SidebarRoutes from "./SidebarRoutes";
import ProfileButton from "@/components/ProfileButton";
import { Badge } from "@/components/ui/badge";

const Sidebar = () => {
  return (
    <div className="h-full flex flex-col border-r overflow-y-auto bg-secondary shadow-sm w-[300px]">
      {/* Logo */}
      <div className="flex p-4 border-b justify-between items-center">
        <h1 className="font-bold w-auto h-8 flex items-center justify-center gap-3">
          <div className="!h-8 p-1 !w-8 !aspect-square bg-primary rounded-full text-lg lg:text-xl flex items-center justify-center">
            N
          </div>
          <div className="flex text-lg md:text-xl items-center gap-1">
            <span>Nahhas</span>
            <span className="text-primary">LMS</span>
          </div>
        </h1>
        <Badge
          variant="secondary"
          className="bg-accent hover:bg-accent cursor-default rounded-[6px] p-1 h-min py-0 tracking-widest font-medium"
        >
          v1.0.2
        </Badge>
      </div>
      <SidebarRoutes />
      <div className="flex flex-col justify-center items-center mt-auto border-t">
        <ProfileButton />
      </div>
    </div>
  );
};

export default Sidebar;
