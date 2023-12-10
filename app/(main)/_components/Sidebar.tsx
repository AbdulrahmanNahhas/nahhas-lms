"use client";
import { Button, buttonVariants } from "@/components/ui/button";
import { Logo } from "./Logo";
import { cn } from "@/lib/utils";
import SidebarRoutes from "./SidebarRoutes";
import { Heart } from "lucide-react";
import { useAuth } from "@clerk/nextjs";
import ProfileButton from "@/components/ProfileButton";
import Link from "next/link";
import { useState } from "react";

const Sidebar = () => {
  const { userId } = useAuth();

  return (
    <div
      className={cn(
        "h-full flex flex-col border-r overflow-y-auto bg-secondary rounded-r-3xl shadow-sm duration-300",
      )}
    >
      {/* Logo */}
      <div className="px-4 py-8">
        <h1
          className={cn(
            "font-bold w-full h-full flex items-center justify-center gap-1 text-lg md:text-xl "
          )}
        >     <span>NAHHAS</span>
              <span className="text-primary">LMS</span>
        </h1>
      </div>
      <SidebarRoutes />
      <div className="flex flex-col justify-center items-center mt-auto p-4 border-t">
        {userId ? (
          <ProfileButton />
        ) : (
          <Link href="/sign-in" className={buttonVariants()}>
            Sign In
          </Link>
        )}
      </div>
    </div>
  );
};

export default Sidebar;
