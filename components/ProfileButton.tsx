"use client";

import { SignOutButton, UserProfile, useAuth } from "@clerk/nextjs";
import { Heart } from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuShortcut,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Dialog, DialogContent, DialogTrigger } from "@/components/ui/dialog";
import { useUser } from "@clerk/nextjs";
import Image from "next/image";
import { MdArrowDropDown } from "react-icons/md";
import Link from "next/link";
import { isTeacher } from "@/lib/teacher";
import { redirect } from "next/navigation";

const ProfileButton = () => {
  const { userId } = useAuth();
  const { isLoaded, isSignedIn, user } = useUser();

  return (
    <Dialog>
      <DropdownMenu>
        <DropdownMenuTrigger className="outline-none w-full group">
          <div className="flex items-center justify-start gap-2 p-2 hover:bg-accent px-3 rounded-xl">
            {!isLoaded || !isSignedIn ? (
              <h1 className="text-center py-2 w-full">Loading Acount...</h1>
            ) : (
              <>
                {user.hasImage ? (
                  <Image
                    height={140}
                    width={140}
                    src={user.imageUrl}
                    alt="logo"
                    className="h-10 w-10 rounded-sm group-hover:rounded-3xl !transition-all !duration-300"
                  />
                ) : (
                  <Image
                    height={140}
                    width={140}
                    src={`https://ui-avatars.com/api/?name=${user.firstName}+${user.lastName}&background=random`}
                    alt="logo"
                    className="h-10 w-10 rounded-lg"
                  />
                )}
                <div className="hidden sm:flex flex-col items-start justify-center gap-0">
                  <p className=" font-semibold flex items-center">
                    {user.firstName?.charAt(0)?.toUpperCase()}
                    {user.firstName?.slice(1)}
                    <MdArrowDropDown className="w-6 h-6 duration-200 group-hover:rotate-180" />
                  </p>
                  <p className="text-xs text-muted-foreground/80">My Profile</p>
                </div>
              </>
            )}
          </div>
        </DropdownMenuTrigger>
        <DropdownMenuContent
          side="top"
          className="w-56 lg:w-64 relative right-2 sm:-right-4 sm:w-[200px]"
        >
          <DropdownMenuLabel>My Settings</DropdownMenuLabel>
          <DropdownMenuSeparator />
          <DropdownMenuGroup>
            {isTeacher(userId) && (
              <DropdownMenuItem asChild>
                <Link href="/teacher/courses" className="w-full">
                  Teacher Mode
                </Link>
              </DropdownMenuItem>
              )}
            <DropdownMenuItem asChild>
              <DialogTrigger className="w-full">Profile</DialogTrigger>
            </DropdownMenuItem>
            <DropdownMenuItem disabled>
              Billing
              <DropdownMenuShortcut>⌘B</DropdownMenuShortcut>
            </DropdownMenuItem>
            <DropdownMenuItem disabled>
              Settings
              <DropdownMenuShortcut>⌘S</DropdownMenuShortcut>
            </DropdownMenuItem>
          </DropdownMenuGroup>
          <DropdownMenuSeparator />
          <DropdownMenuGroup>
            {/* <DropdownMenuSub>
              <DropdownMenuSubTrigger>Appearance</DropdownMenuSubTrigger>
              <DropdownMenuPortal>
                <DropdownMenuSubContent>
                  <DropdownMenuCheckboxItem
                    checked={theme === "light"}
                    onCheckedChange={() => setTheme("light")}
                  >
                    Light
                  </DropdownMenuCheckboxItem>
                  <DropdownMenuCheckboxItem
                    checked={theme === "dark"}
                    onCheckedChange={() => setTheme("dark")}
                  >
                    Dark
                  </DropdownMenuCheckboxItem>
                  <DropdownMenuCheckboxItem
                    checked={theme === "system"}
                    onCheckedChange={() => setTheme("system")}
                  >
                    System
                  </DropdownMenuCheckboxItem>
                </DropdownMenuSubContent>
              </DropdownMenuPortal>
            </DropdownMenuSub> */}
          </DropdownMenuGroup>
          <DropdownMenuSeparator />
          <DropdownMenuItem>GitHub</DropdownMenuItem>
          <DropdownMenuItem className="flex justify-between">
            Donate <Heart className="fill-primary py-1 px-0 text-primary" />
          </DropdownMenuItem>
          <DropdownMenuSeparator />
          <DropdownMenuItem asChild className="w-full">
            <SignOutButton signOutCallback={() => redirect("/")} />
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
      <DialogContent className="h-full lg:h-[95vh] w-full !rounded-none lg:!rounded-xl max-w-none lg:max-w-[1000px] flex items-center justify-center">
        {/* <DialogTitle className="md:text-2xl font-bold">Profile</DialogTitle>
        <DialogDescription className="flex items-center gap-2">
          Click On your Profile Image {"->"}
          <UserButton />
        </DialogDescription>
        <DialogFooter>
          Sorry We have a problem, so you need to open your profile from the
          profile image here (up).
        </DialogFooter> */}
        {/* <div className="w-full fixed h-screen overflow-hidden flex justify-center items-center top-0 left-0 bg-[#00000068] z-[9999]"> */}
        <div className="w-min relative max-h-[90vh] overflow-y-scroll bg-background rounded-xl shadow">
          <UserProfile />
        </div>
        {/* </div> */}
      </DialogContent>
    </Dialog>
  );
};

export default ProfileButton;
