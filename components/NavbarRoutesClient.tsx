"use client";

import { usePathname } from "next/navigation";
import { Button } from "./ui/button";
import { LogOut } from "lucide-react";
import Link from "next/link";

const NavbarRoutesClient = () => {
  const pathname = usePathname();
  const isTecacherPage = pathname?.includes("/teacher");
  const isPlayerrPage = pathname?.startsWith("/chapter");

  return (
    <>
      {isTecacherPage || isPlayerrPage ? (
        <Link href="">
          <Button variant={"ghost"}>
            <LogOut className="h-4 w-4 mr-2" />
            Exit
          </Button>
        </Link>
      ) : (
        <Button variant={"outline"} size={"sm"} asChild>
          <Link href="/teacher/courses">Teacher Mode</Link>
        </Button>
      )}
    </>
  );
};

export default NavbarRoutesClient;
