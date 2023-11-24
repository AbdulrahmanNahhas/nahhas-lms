"use client";

import { BarChart, Compass, Layout, List, Plus } from "lucide-react";
import SidebarItem from "./SidebarItem";
import { usePathname } from "next/navigation";

const guestRoutes = [
  {
    icon: Layout,
    label: "Dashboard",
    href: "/dashboard"
  },
  {
    icon: Compass,
    label: "Browse",
    href: "/dashboard/search"
  },
]
const teacherRoutes = [
  {
    icon: Plus,
    label: "Create Course",
    href: "/dashboard/teacher/create"
  },
  {
    icon: List,
    label: "Courses",
    href: "/dashboard/teacher/courses"
  },
  {
    icon: BarChart,
    label: "Analytics",
    href: "/dashboard/teacher/analytics"
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