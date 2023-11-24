"use client";

import { usePathname, useRouter } from "next/navigation";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { SignOutButton, UserButton, UserProfile } from "@clerk/nextjs";
import { Button } from "./ui/button";
import { Heart, LogOut, Settings } from "lucide-react";
import Link from "next/link";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuPortal,
  DropdownMenuSeparator,
  DropdownMenuShortcut,
  DropdownMenuSub,
  DropdownMenuSubContent,
  DropdownMenuSubTrigger,
  DropdownMenuTrigger,
  DropdownMenuCheckboxItem,
} from "@/components/ui/dropdown-menu";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";

const NavbarRoutes = () => {
  const pathname = usePathname();

  const isTecacherPage = pathname?.includes("/teacher");
  const isPlayerrPage = pathname?.startsWith("/dashboard/chapter");

  return (
    <div className="flex gap-x-2 ml-auto items-center">
      {/* <UserProfile afterSignOutUrl="/" /> */}
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

      <Dialog>
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" size={"icon"}>
              <Settings />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent className="w-56 relative right-4 top-0 sm:w-[200px]">
            <DropdownMenuLabel>My Settings</DropdownMenuLabel>
            <DropdownMenuSeparator />
            <DropdownMenuGroup>
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
              <DropdownMenuSub>
                <DropdownMenuSubTrigger>Appearance</DropdownMenuSubTrigger>
                <DropdownMenuPortal>
                  <DropdownMenuSubContent>
                    <DropdownMenuCheckboxItem
                      checked={true}
                      onCheckedChange={() => {}}
                    >
                      Light
                    </DropdownMenuCheckboxItem>
                    <DropdownMenuCheckboxItem
                      checked={false}
                      onCheckedChange={() => {}}
                      disabled
                    >
                      Dark
                    </DropdownMenuCheckboxItem>
                    <DropdownMenuCheckboxItem
                      checked={false}
                      onCheckedChange={() => {}}
                      disabled
                    >
                      System
                    </DropdownMenuCheckboxItem>
                  </DropdownMenuSubContent>
                </DropdownMenuPortal>
              </DropdownMenuSub>
              <DropdownMenuSub>
                <DropdownMenuSubTrigger>Font Family</DropdownMenuSubTrigger>
                <DropdownMenuPortal>
                  <DropdownMenuSubContent>
                    <DropdownMenuCheckboxItem
                      checked={true}
                      onCheckedChange={() => {}}
                    >
                      Inter
                    </DropdownMenuCheckboxItem>
                    <DropdownMenuCheckboxItem
                      checked={false}
                      onCheckedChange={() => {}}
                      disabled
                    >
                      Coming Soon
                    </DropdownMenuCheckboxItem>
                  </DropdownMenuSubContent>
                </DropdownMenuPortal>
              </DropdownMenuSub>
            </DropdownMenuGroup>
            <DropdownMenuSeparator />
            <DropdownMenuItem>GitHub</DropdownMenuItem>
            <DropdownMenuItem className="flex justify-between">Donate <Heart className="fill-primary py-1 px-0 text-primary" /></DropdownMenuItem>
            <DropdownMenuSeparator />
            <DropdownMenuItem asChild className="w-full">
              <SignOutButton />
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
        <DialogContent>
          {/* <UserProfile /> */}
          <DialogTitle className="md:text-2xl font-bold">Profile</DialogTitle>
          <DialogDescription className="flex items-center gap-2">
            Click On your Profile Image {"->"}
            <UserButton />
          </DialogDescription>
          <DialogFooter>
            Sorry We have a problem, so you need to open your profile from the
            profile image here (up).
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default NavbarRoutes;
