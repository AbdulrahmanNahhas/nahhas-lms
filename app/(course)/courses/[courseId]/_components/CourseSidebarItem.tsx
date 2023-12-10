"use client";

import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { cn } from "@/lib/utils";
import { usePathname, useRouter } from "next/navigation";
import { FaCircleCheck, FaCirclePlay, FaLock } from "react-icons/fa6";

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

  const Icon = isLocked ? FaLock : isCompleted ? FaCircleCheck : FaCirclePlay;
  const isActive = pathname?.includes(id);

  const onClick = () => {
    router.push(`/courses/${courseId}/chapters/${id}`);
  };
  return (
    <button
      onClick={onClick}
      className={cn(
        "text-sm flex gap-3 text-break py-2 px-4 hover:bg-accent items-center cursor-pointer w-full justify-start text-start",
        isActive &&
          "bg-primary/10 text-primary hover:bg-primary/20 hover:text-primary",
        isLocked && "opacity-50 cursor-not-allowed"
      )}
      disabled={isLocked}
    >
      <Icon />
      {label}
    </button>
  );
};

export default CourseSidebarItem;