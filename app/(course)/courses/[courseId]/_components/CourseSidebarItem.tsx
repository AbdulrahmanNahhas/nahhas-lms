"use client";

import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { cn } from "@/lib/utils";
import { usePathname, useRouter } from "next/navigation";
import { FaCircleCheck, FaCirclePlay, FaLock, FaPause } from "react-icons/fa6";

interface CourseSidebarItemProps {
  id: string;
  label: string;
  isCompleted: boolean;
  courseId: string;
  isLocked: boolean;
}

const CourseSidebarItem = ({
  id,
  label,
  isCompleted,
  courseId,
  isLocked,
}: CourseSidebarItemProps) => {
  const pathname = usePathname();
  const router = useRouter();

  const isActive = pathname?.includes(id);
  const Icon = isLocked ? FaLock : (isCompleted ? FaCircleCheck : (isActive ? FaPause : FaCirclePlay));

  const onClick = () => {
    router.push(`/courses/${courseId}/chapters/${id}`);
  };
  return (
    <button
      onClick={onClick}
      className={cn(
        "text-sm flex gap-3 text-break py-3 px-4 hover:bg-accent items-center cursor-pointer w-full justify-start text-start",
        isActive &&
          "bg-primary/10 text-primary hover:bg-primary/20 hover:text-primary",
        isLocked && "opacity-50 cursor-not-allowed",
        isCompleted && !isActive && "opacity-50"
      )}
      disabled={isLocked}
    >
      <Icon className={isCompleted && "text-primary"} />
      {label}
    </button>
  );
};

export default CourseSidebarItem;
