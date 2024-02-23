"use client";

import React from "react";
import {
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerDescription,
  DrawerFooter,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
} from "@/components/ui/drawer";
import { useMediaQuery } from "@/hooks/use-media-query";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogOverlay,
  DialogTitle,
  DialogTrigger,
} from "./ui/dialog";
import { Button } from "./ui/button";
import { SignOutButton, SignedOut } from "@clerk/nextjs";

const LogOutButton = () => {
  const [open, setOpen] = React.useState(false);
  const isDesktop = useMediaQuery("(min-width: 768px)");

  return (
    <div>
      {isDesktop ? (
        <Dialog open={open} onOpenChange={setOpen}>
          <DialogTrigger className="relative flex cursor-default select-none items-center rounded-sm px-2 py-1.5 text-sm outline-none transition-colors hover:bg-accent hover:text-accent-foreground data-[disabled]:pointer-events-none data-[disabled]:opacity-50 w-full">
            Sign out
          </DialogTrigger>
          <DialogContent className="sm:max-w-[425px] border">
            <DialogHeader>
              <DialogTitle>Sign out</DialogTitle>
              <DialogDescription>
                Are you sure you want to sign out from your account? you will
                need to enter your password again when trying to sign in.
              </DialogDescription>
            </DialogHeader>
            <div className="flex w-full gap-2 items-center">
              <Button
                className="w-full rounded-md hover:scale-100"
                variant="outline"
                onClick={() => setOpen(false)}
              >
                Cancel
              </Button>
              <SignOutButton>
                <Button
                  className="w-full rounded-md hover:scale-100"
                  variant="destructive"
                >
                  Sign Out
                </Button>
              </SignOutButton>
            </div>
          </DialogContent>
        </Dialog>
      ) : (
        <Drawer open={open} onOpenChange={setOpen}>
          <DrawerTrigger className="relative flex cursor-default select-none items-center rounded-sm px-2 py-1.5 text-sm outline-none transition-colors hover:bg-accent hover:text-accent-foreground data-[disabled]:pointer-events-none data-[disabled]:opacity-50 w-full">
            Sign out
          </DrawerTrigger>
          <DrawerContent>
            <DrawerHeader className="text-left">
              <DrawerTitle>Are you sure?</DrawerTitle>
              <DrawerDescription>
                Are you sure you want to sign out from your account? <br /> You
                will need to enter your password again when trying to sign in.
              </DrawerDescription>
            </DrawerHeader>
            <div className="flex w-full gap-2 items-center p-4 pt-0">
              <DrawerClose className="w-full rounded-md hover:scale-100">
                <Button
                  className="w-full rounded-md hover:scale-100"
                  variant="outline"
                  onClick={() => setOpen(false)}
                >
                  Cancel
                </Button>
              </DrawerClose>
              <SignOutButton>
                <Button
                  className="w-full rounded-md hover:scale-100"
                  variant="destructive"
                >
                  Sign Out
                </Button>
              </SignOutButton>
            </div>
          </DrawerContent>
        </Drawer>
      )}
    </div>
  );
};

export default LogOutButton;
