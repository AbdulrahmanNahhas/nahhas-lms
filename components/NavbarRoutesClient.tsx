"use client";

import { usePathname } from "next/navigation";
import { Button } from "./ui/button";
import { LogOut } from "lucide-react";
import Link from "next/link";
import SearchInput from "./SearchInput";
import { useAuth } from "@clerk/nextjs";
import { isTeacher } from "@/lib/teacher";

const NavbarRoutesClient = () => {
  const {userId} = useAuth();
  const pathname = usePathname();
  const isTecacherPage = pathname?.includes("/teacher");
  const isPlayerPage = pathname?.startsWith("/chapter");
  const isSearchPage = pathname === "/search";

  return (
    <>
      {isSearchPage && (
        <div className="hidden md:block">
          <SearchInput />
        </div>
      )}
      {isTecacherPage || isPlayerPage ? (
        <Button variant={"ghost"} asChild>
          <Link href="/dashboard">
            <LogOut className="h-4 w-4 mr-2" />
            Exit
          </Link>
        </Button>
      ) : isTeacher(userId) ? (
        <Button variant={"ghost"} asChild className="ml-auto">
          <Link href="/teacher/courses">Teacher Dashboard</Link>
        </Button>
      ): null}
    </>
  );
};

export default NavbarRoutesClient;
