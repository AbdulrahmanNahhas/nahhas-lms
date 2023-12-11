import { getDashboardCourses } from "@/actions/get-dashboard-courses";
import CoursesList from "@/components/Course/CoursesList";
import { Button } from "@/components/ui/button";
import { auth, clerkClient } from "@clerk/nextjs";
import { ArrowRight, CheckCircle, Clock, Diamond, Star } from "lucide-react";
import Image from "next/image";
import { redirect } from "next/navigation";
import React from "react";
import { FaCheck } from "react-icons/fa6";
import {
  GiAlarmClock,
  GiDiamonds,
  GiExtraTime,
  GiFlamer,
} from "react-icons/gi";
import { InfoCard } from "./_components/InfoCard";

const Dashboard = async () => {
  const { userId } = auth();
  if (!userId) {
    return redirect("/");
  }
  const user = await clerkClient.users.getUser(userId);

  const { completedCourses, coursesInProgress } = await getDashboardCourses(
    userId
  );

  return (
    <div className="p-6 space-y-4 container">
      <div className="flex flex-col mb-6 md:gap-1 items-center sm:items-start">
        <h1 className="text-lg font-semibold sm:text-xl md:text-2xl sm:font-bold">
          Welcome back {user.firstName?.charAt(0)?.toUpperCase()}
          {user.firstName?.slice(1)}!
        </h1>
        <p className="text-muted-foreground text-sm sm:text-base">
          Take a look your learning progress for Today{" "}
          {new Date(Date.now()).toLocaleDateString("en-US", {
            month: "short",
            day: "numeric",
            year: "numeric",
          })}
        </p>
      </div>
      <div className="bg-secondary border rounded-3xl gap-6 xl:gap-0 flex flex-col xl:flex-row p-6">
        <div className="flex gap-6 items-center flex-1">
          {user.hasImage ? (
            <Image
              height={300}
              width={300}
              src={user.imageUrl}
              alt="logo"
              className="h-16 sm:h-24 lg:h-28 w-16 sm:w-24 lg:w-28 rounded-full"
            />
          ) : (
            <Image
              height={300}
              width={300}
              src={`https://ui-avatars.com/api/?name=${user.firstName}+${user.lastName}&background=random`}
              alt="logo"
              className="h-10 sm:h-24 lg:h-28 w-10 sm:w-24 lg:w-28 rounded-full"
            />
          )}
          <div className="flex flex-col gap-4 w-full pr-6">
            <h1 className="font-bold sm:text-xl lg:text-3xl">
              {user.firstName?.charAt(0)?.toUpperCase()}
              {user.firstName?.slice(1)}{" "}
              {user.lastName?.charAt(0)?.toUpperCase()}
              {user.lastName?.slice(1)}
            </h1>
            <div className="flex flex-col gap-1">
              <div className="h-2 rounded-full w-full bg-primary/25">
                <div
                  className="h-2 rounded-full bg-primary"
                  style={{ width: `50%` }}
                ></div>
              </div>
              <div className="flex justify-between items-center">
                <span>100 XP</span>
                <span className="text-muted-foreground">200 XP</span>
              </div>
            </div>
          </div>
        </div>
        <div className="flex flex-col gap-4 items-center flex-1">
          <Button
            className="w-full rounded-xl p-6 bg-transparent border-border flex justify-between hover:!scale-[1.01]"
            variant={"outline"}
          >
            <span>Earn 10 XP for watching one chapter</span>
            <ArrowRight className="hidden sm:block" />
          </Button>
          <Button
            className="w-full rounded-xl p-6 bg-transparent border-border flex justify-between hover:!scale-[1.01]"
            variant={"outline"}
          >
            <span>Earn 50 XP for solving a Quiz </span>
            <ArrowRight className="hidden sm:block" />
          </Button>
        </div>
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <InfoCard
          icon={Clock}
          label="In Progress"
          numberOfItems={coursesInProgress.length}
          nameOfItems={"Courses"}
        />
        <InfoCard
          icon={CheckCircle}
          label="Completed"
          numberOfItems={completedCourses.length}
          nameOfItems={"Courses"}
        />
        <InfoCard
          icon={Star}
          label="Points"
          numberOfItems={50}
          nameOfItems={"XP"}
        />
      </div>
      <hr />
      <CoursesList items={[...coursesInProgress, ...completedCourses]} />
    </div>
  );
};

export default Dashboard;
