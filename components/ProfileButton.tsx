import { SignOutButton, UserButton } from "@clerk/nextjs";
import { Heart } from "lucide-react";

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
import { Button } from "./ui/button";
import User from "./User";
import Link from "next/link";

const ProfileButton = () => {
  return (
    <Dialog>
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button variant="ghost" size={"default"} className="px-0 p-2">
            <User />
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent className="w-56 lg:w-64 relative right-4 top-0 sm:w-[200px]">
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
            <SignOutButton />
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
      <DialogContent>
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
  );
};

export default ProfileButton;
