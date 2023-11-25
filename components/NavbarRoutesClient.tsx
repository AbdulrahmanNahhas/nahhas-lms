"use client";

import { usePathname } from "next/navigation";
import { Button } from "./ui/button";
import { LogOut } from "lucide-react";
import Link from "next/link";

const NavbarRoutesClient = () => {
  const pathname = usePathname();
  const isTecacherPage = pathname?.includes("/teacher");
  const isPlayerrPage = pathname?.startsWith("/dashboard/chapter");

  return (
    <>
      {isTecacherPage || isPlayerrPage ? (
        <Link href="/dashboard">
          <Button variant={"ghost"}>
            <LogOut className="h-4 w-4 mr-2" />
            Exit
          </Button>
        </Link>
      ) : (
        <Button variant={"outline"} size={"sm"} asChild>
          <Link href="/dashboard/teacher/courses">Teacher Mode</Link>
        </Button>
      )}
    </>
  );
};

export default NavbarRoutesClient;
