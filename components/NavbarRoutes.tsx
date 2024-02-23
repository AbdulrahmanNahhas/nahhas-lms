import { auth, clerkClient } from "@clerk/nextjs";
import NavbarRoutesClient from "./NavbarRoutesClient";
import { redirect } from "next/navigation";
import Image from "next/image";
import { Star } from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import Link from "next/link";
import LogOutButton from "./LogOutButton";
import { isTeacher } from "@/lib/teacher";

const NavbarRoutes = async () => {
  const { userId } = auth();
  if (!userId) {
    return redirect("/");
  }
  const user = await clerkClient.users.getUser(userId);
  const xp: any = user.publicMetadata.xp || 0;

  return (
    <div className="flex gap-x-2 ml-auto items-center justify-end w-full">
      <NavbarRoutesClient />
      <div className="flex items-center justify-center bg-secondary rounded-full py-2 px-2 pl-4">
        <div className="flex items-center gap-1 pr-2 text-lg">
          <Star className="text-primary w-6 h-6 fill-primary" />
          {xp}
        </div>
        <div className="border-l border-border/50 flex items-center gap-2 pl-2">
          {user.hasImage ? (
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Image
                  height={140}
                  width={140}
                  src={user.imageUrl}
                  alt="logo"
                  className="h-10 w-10 rounded-full group-hover:rounded-3xl !transition-all !duration-600 cursor-pointer hover:border-2 border-primary"
                />
              </DropdownMenuTrigger>
              <DropdownMenuContent className="mr-6 mt-2">
                <DropdownMenuItem asChild>
                  <Link href={"/settings"}>Settings</Link>
                </DropdownMenuItem>

                {isTeacher(userId) && (
                  <DropdownMenuItem asChild>
                    <Link href="/teacher/courses" className="w-full pr-5">
                      Teacher Dashboard
                    </Link>
                  </DropdownMenuItem>
                )}
                <DropdownMenuItem asChild>
                  <LogOutButton />
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          ) : (
            <Image
              height={140}
              width={140}
              src={`https://ui-avatars.com/api/?name=${user.firstName}+${user.lastName}&background=random`}
              alt="logo"
              className="h-10 w-10 rounded-full"
            />
          )}
        </div>
      </div>
    </div>
  );
};

export default NavbarRoutes;
