"use client";

import { buttonVariants } from "../ui/button";
import Link from "next/link";
import { cn } from "@/lib/utils";
import { CldImage } from "next-cloudinary";
import { getPublicIdFromCloudinaryURL } from "@/lib/formats";
import { BiMoneyWithdraw } from "react-icons/bi";
import { Video } from "lucide-react";
import { Badge } from "../ui/badge";
import { FaPlay } from "react-icons/fa6";

interface CourseCardProps {
  id: string;
  title: string;
  description: string;
  imageUrl: string;
  chaptersLength: number;
  price: number;
  progress: number | null;
  category?: string;
  author: string;
}

const CourseCard = ({
  id,
  title,
  imageUrl,
  price,
  progress,
  category,
  chaptersLength,
  author,
  description,
}: CourseCardProps) => {
  return (
    <div className="overflow-hidden rounded-2xl border border-border/50 group max-w-[400px] min-w-[300px] relative group">
      <div className="max-w-[400px] min-w-[300px] h-[195px] overflow-hidden p-3 group-hover:p-[6px] !duration-300 bg-accent/25 group-hover:bg-accent/50">
        <CldImage
          aspectRatio="video"
          width={1600}
          height={900}
          src={getPublicIdFromCloudinaryURL(imageUrl)}
          alt={"Image"}
          className="w-full h-full object-cover duration-200 group-hover:scale-[1.12] rounded-xl group-hover:rounded-none"
        />
      </div>
      <div className="p-3 pt-0 !duration-300 bg-accent/25 group-hover:bg-accent/50 pt-1">
        <Badge
          variant={"outline"}
          className="absolute top-2 left-2 transition-all duration-200 group-hover:top-0 group-hover:left-0  group-hover:rounded-l-none group-hover:rounded-t-none bg-accent group-hover:border-0 group-hover:pl-1 group-hover:px-3 group-hover:py-[4px] group-hover:rounded-br-xl"
        >
          {category}
        </Badge>
        <h1 className="font-semibold text-xl mt-1">{title}</h1>
        <h2 className="text-sm text-foreground/90">By: {author}</h2>
        <div className="flex mt-4 gap-2 items-center">
          <Link
            href={`/courses/${id}`}
            className={cn(
              buttonVariants({ variant: "secondary", size: progress === 100 ? "icon" : "default" }),
              "rounded-xl bg-accent hover:bg-accent/75 hover:text-muted-foreground"
            )}
          >
            {progress !== null ? (
              progress === 100 ? <FaPlay /> :"Continue"
            ) : "View Info"}
          </Link>
          {progress !== null ? (
            <>
              <div className="flex-1 h-1 rounded-full bg-primary/20">
                <div
                  className={`w-[${progress}%] h-full bg-primary rounded-full`}
                  style={{ width: `${progress}%` }}
                ></div>
              </div>
              <p className="text-muted-foreground">{Math.round(progress)}%</p>
            </>
          ) : (
            <div className="flex flex-col ml-auto gap-1">
              <p className="text-muted-foreground font-light text-sm ml-auto flex gap-0">
                <BiMoneyWithdraw className={"h-5 w-5 mr-1"} />
                {price === 0 ? "FREE" : `${price} TL`}
              </p>
              <p className="text-muted-foreground font-light text-sm ml-auto flex">
                <Video className={"h-5 w-5 mr-1"} />
                {chaptersLength} {chaptersLength === 1 ? "Chapter" : "Chapters"}
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default CourseCard;
