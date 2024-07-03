"use client";

import { Button, buttonVariants } from "@/components/ui/button";
import { isTeacher } from "@/lib/teacher";
import { SignOutButton, useAuth } from "@clerk/nextjs";
import { useTheme } from "next-themes";
import Link from "next/link";
import { redirect } from "next/navigation";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { AlertCircle } from "lucide-react";
import { Separator } from "@/components/ui/separator";

function Page() {
  const { userId } = useAuth();
  const { theme, setTheme } = useTheme();

  if (!userId) {
    return redirect("/");
  }

  return (
    <div className="w-full p-10 lg:p-22  bg-secondary min-h-screen rounded-t-3xl md:rounded-tl-3xl">
      <div className="container max-w-[770px]">
        <div className="flex flex-col mb-6 md:gap-1 items-center sm:items-start">
          <h1 className="text-lg font-semibold sm:text-xl md:text-2xl sm:font-bold">
            My Settings
          </h1>
          <p className="text-muted-foreground text-sm sm:text-base">
            Change your settings, and customize the website!
          </p>
        </div>
        {isTeacher(userId) && (
          <div className="flex flex-row items-center justify-between rounded-lg border p-4">
            <div className="space-y-0.5">
              <h3 className="text-base font-semibold">Teacher Account</h3>
              <p>You are a teacher you can go to teacher dashboard</p>
            </div>
            <div>
              <Button asChild>
                <Link href="/teacher/courses" className="w-full">
                  Dashboard
                </Link>
              </Button>
            </div>
          </div>
        )}
        <div className="py-4">
          <h3 className="text-lg font-medium">Appearance</h3>
          <p className="text-sm text-muted-foreground">
            Customize the appearance of the app. Automatically switch between
            day and night themes.
          </p>
          <div className="flex pt-4 gap-4 items-center flex-wrap">
            <button
              disabled={theme === "light"}
              onClick={() => setTheme("light")}
            >
              <div className="items-center rounded-md border-2 border-muted p-1 hover:border-accent">
                <div className="space-y-2 rounded-sm bg-[#ecedef] p-2">
                  <div className="space-y-2 rounded-md bg-white p-2 shadow-sm">
                    <div className="h-2 w-[80px] rounded-lg bg-[#ecedef]" />
                    <div className="h-2 w-[100px] rounded-lg bg-[#ecedef]" />
                  </div>
                  <div className="flex items-center space-x-2 rounded-md bg-white p-2 shadow-sm">
                    <div className="h-4 w-4 rounded-full bg-[#ecedef]" />
                    <div className="h-2 w-[100px] rounded-lg bg-[#ecedef]" />
                  </div>
                  <div className="flex items-center space-x-2 rounded-md bg-white p-2 shadow-sm">
                    <div className="h-4 w-4 rounded-full bg-[#ecedef]" />
                    <div className="h-2 w-[100px] rounded-lg bg-[#ecedef]" />
                  </div>
                </div>
              </div>
              <span className="block w-full p-2 text-center font-normal">
                Light
              </span>
            </button>
            <button
              disabled={theme === "dark"}
              onClick={() => setTheme("dark")}
            >
              <div className="items-center rounded-md border-2 border-muted bg-popover p-1 hover:bg-accent hover:text-accent-foreground">
                <div className="space-y-2 rounded-sm bg-slate-950 p-2">
                  <div className="space-y-2 rounded-md bg-slate-800 p-2 shadow-sm">
                    <div className="h-2 w-[80px] rounded-lg bg-slate-400" />
                    <div className="h-2 w-[100px] rounded-lg bg-slate-400" />
                  </div>
                  <div className="flex items-center space-x-2 rounded-md bg-slate-800 p-2 shadow-sm">
                    <div className="h-4 w-4 rounded-full bg-slate-400" />
                    <div className="h-2 w-[100px] rounded-lg bg-slate-400" />
                  </div>
                  <div className="flex items-center space-x-2 rounded-md bg-slate-800 p-2 shadow-sm">
                    <div className="h-4 w-4 rounded-full bg-slate-400" />
                    <div className="h-2 w-[100px] rounded-lg bg-slate-400" />
                  </div>
                </div>
              </div>
              <span className="block w-full p-2 text-center font-normal">
                Dark
              </span>
            </button>
            <button
              disabled={theme === "system"}
              onClick={() => setTheme("system")}
            >
              <div className="items-center rounded-md border-2 border-muted bg-popover p-1 hover:bg-accent hover:text-accent-foreground h-full !h-[148px] w-[168px] text-3xl font-bold cursor-pointer flex items-center justify-center">
                ?
              </div>
              <span className="block w-full p-2 text-center font-normal">
                System
              </span>
            </button>
          </div>
        </div>
        <div className="pb-10">
          <h3 className="text-lg font-medium">Links</h3>
          <p className="text-sm text-muted-foreground">
            I don&apos;t know what to write here :D
          </p>
          <div className="flex pt-4 gap-4 items-center flex-wrap">
            <Link className={buttonVariants({variant:"outline"})} href={"https://github.com/AbdulrahmanNahhas/nahhas-lms"}>Github</Link>
            <Button variant={"outline"} disabled>Donate</Button>
          </div>
        </div>

        <Separator className="mb-10" />

        <Alert
          variant="destructive"
          className="flex justify-between items-center dark:text-red-600 dark:border-red-600"
        >
          <div className="flex flex-col">
            <div className="flex gap-1 items-start">
              <AlertCircle className="h-4 w-4" />
              <AlertTitle>Danger Zone</AlertTitle>
            </div>
            <AlertDescription>
              Do you want to sign out from your account?
            </AlertDescription>
          </div>
          <div>
            <Button variant="destructive" className="mx-auto">
              <SignOutButton signOutCallback={() => redirect("/")} />
            </Button>
          </div>
        </Alert>
      </div>
    </div>
  );
}

export default Page;
