"use client";

import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { cn } from "@/lib/utils";
import { usePathname, useRouter } from "next/navigation";
import { BsPauseCircle } from "react-icons/bs";
import { FaCircleCheck, FaCirclePlay, FaLock, FaPause } from "react-icons/fa6";
import { RiFolderVideoLine } from "react-icons/ri";

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
  const Icon = isLocked
    ? FaLock
    : isCompleted
    ? FaCircleCheck
    : isActive
    ? BsPauseCircle
    : RiFolderVideoLine;

  const onClick = () => {
    router.push(`/courses/${courseId}/chapters/${id}`);
  };
  return (
    <button
      onClick={onClick}
      disabled={isLocked}
      className={cn(
        "flex gap-3 hover:bg-accent items-center cursor-pointer justify-start w-[calc(100%-24px)] mx-3 p-2 rounded-xl",
        isActive &&
          "bg-primary/10 text-primary hover:bg-primary/20 hover:text-primary",
        isLocked && "opacity-50 cursor-not-allowed",
        isCompleted && !isActive && "opacity-50"
      )}
    >
      <Icon className={cn("!h-4 !w-4",isCompleted && "text-primary")} />
      <span className={cn("text-sm text-break text-start w-[250px]")}>{label}</span>
    </button>
  );
};

export default CourseSidebarItem;
