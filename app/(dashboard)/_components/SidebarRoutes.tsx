"use client";

import { BarChart, Compass, List, Plus } from "lucide-react";
import SidebarItem from "./SidebarItem";
import { usePathname } from "next/navigation";
import { MdInfoOutline } from "react-icons/md";
import { IoChatboxEllipsesOutline } from "react-icons/io5";
import { LuLayoutDashboard } from "react-icons/lu";

const guestRoutes = [
  {
    icon: LuLayoutDashboard,
    label: "Dashboard",
    href: "/dashboard"
  },
  {
    icon: Compass,
    label: "Browse",
    href: "/search"
  },
  {
    icon: MdInfoOutline,
    label: "About us",
    href: "/about"
  },
  {
    icon: IoChatboxEllipsesOutline,
    label: "Contact",
    href: "/contact"
  },
]
const teacherRoutes = [
  {
    icon: Plus,
    label: "Create a Course",
    href: "/teacher/create"
  },
  {
    icon: List,
    label: "Courses",
    href: "/teacher/courses"
  },
  {
    icon: BarChart,
    label: "Analytics",
    href: "/teacher/analytics"
  },
]

const SidebarRoutes = () => {
  const pathname = usePathname();
  
  const isTecacherPage = pathname?.includes("/teacher");
  
  const routes = isTecacherPage ? teacherRoutes : guestRoutes;

  return ( 
    <div className="flex flex-col w-full gap-2 p-6 pt-3">
      {routes.map((route, index) => (
        <SidebarItem
          key={index}
          icon={route.icon}
          label={route.label}
          href={route.href}
        />
      ))}
    </div>
   );
}
 
export default SidebarRoutes;