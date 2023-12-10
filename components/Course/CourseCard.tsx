"use client";

import { buttonVariants } from "../ui/button";
import Link from "next/link";
import { cn } from "@/lib/utils";
import { CldImage } from "next-cloudinary";
import { getPublicIdFromCloudinaryURL } from "@/lib/formats";
import { BiMoneyWithdraw } from "react-icons/bi";
import { Video } from "lucide-react";

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
    // <Dialog>
      <div className="overflow-hidden rounded-2xl border group cursor-pointer w-[300px] relative">
        <div className="w-[300px] h-[195px] overflow-hidden p-3 bg-accent/50">
          <CldImage
            aspectRatio="video"
            width={1600}
            height={900}
            src={getPublicIdFromCloudinaryURL(imageUrl)}
            alt={"Image"}
            className="w-full h-full object-cover duration-200 group-hover:scale-[0.98] rounded-xl hover:rounded-2xl"
          />
        </div>
        <div className="p-4 pt-1 bg-accent/50 relative">
          <h1 className="font-semibold text-xl">{title}</h1>
          <h2 className="text-sm text-foreground/90">By: {author}</h2>
          {/* <p className="text-sm text-muted-foreground mt-1 font-light h-[60px] overflow-y-scroll text-justify">
            {description}
          </p> */}
          <div className="flex mt-4 gap-2 items-center">
            {/* <Badge variant={"secondary"} className="absolute -top-6 right-2">
            {category}
            </Badge> */}
            {/* <DialogTrigger asChild><Button variant="secondary" size={"icon"} className="rounded-xl hover:bg-accent/50 hover:text-muted-foreground"><FaPlay className="text-xl xl:text-[12px]" /></Button></DialogTrigger> */}
            <Link
              href={`/courses/${id}`}
              className={cn(
                buttonVariants({ variant: "secondary", size: "default" }),
                "rounded-xl bg-accent hover:bg-accent/75 hover:text-muted-foreground"
              )}
            >
              {progress ? <>Continue</> : <>View Info</>}
            </Link>
            {progress ? (
              <>
                <div className="flex-1 h-1 rounded-full bg-primary/20">
                  <div className={`w-[${progress}%] h-full bg-primary rounded-full`} style={{width: `${progress}%`}}></div>
                </div>
                <p className="text-muted-foreground">{progress}%</p>
              </>
            ) : (
              <div className="flex flex-col ml-auto gap-1">
                <p className="text-muted-foreground font-light text-sm ml-auto flex gap-0">
                  <BiMoneyWithdraw className={"h-5 w-5 mr-1"} />
                  {price === 0 ? "FREE" : `${price} TL`}
                </p>
                <p className="text-muted-foreground font-light text-sm ml-auto flex">
                  <Video className={"h-5 w-5 mr-1"} />
                  {chaptersLength}{" "}
                  {chaptersLength === 1 ? "Chapter" : "Chapters"}
                </p>
              </div>
            )}
          </div>
        </div>
      </div>
      // <DialogContent className="p-0 max-w-none h-[80vh] w-[80vw] overflow-hidden">
      //   <iframe
      //     width="560"
      //     height="315"
      //     src="https://www.youtube-nocookie.com/embed/bNyUyrR0PHo?si=nyO0n0GUNuHKQdz0"
      //     title={title}
      //     allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
      //     allowFullScreen
      //     className="w-full h-full"
      //   ></iframe>
      // </DialogContent>
    // </Dialog>
  );
};

export default CourseCard;
