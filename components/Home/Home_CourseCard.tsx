import { Button } from "../ui/button";
import { FaPlay } from "react-icons/fa6";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import Image from "next/image";

interface CourseCardProps {
  image: string;
  teacher: string;
  rank: string;
  description: string;
  hours?: number;
  lessons?: number;
}

const Home_CourseCard = ({ image, teacher, rank, description, hours, lessons }: CourseCardProps) => {
  return (
    <Dialog>
      <div className="overflow-hidden rounded-2xl border group cursor-pointer w-[400px]">
        <div className="w-[400px] h-[260px] overflow-hidden">
          <Image
            height={540}
            width={960}
            className="w-full h-full object-cover duration-200 group-hover:scale-105"
            src={image}
            alt="image"
          />
        </div>
        <div className="p-4 bg-accent/50">
          <h1 className="font-semibold text-xl">{teacher}</h1>
          <h2 className="text-sm text-foreground/90">{rank}</h2>
          <p className="text-sm text-muted-foreground mt-1 font-light">
            {description}
          </p>
          <div className="flex mt-4 gap-2 items-center">
            <DialogTrigger asChild>
              <Button
                variant="secondary"
                size={"icon"}
                className="rounded-xl hover:bg-accent/50 hover:text-muted-foreground"
              >
                <FaPlay className="text-xl xl:text-[12px]" />
              </Button>
            </DialogTrigger>
            <Button
              variant="secondary"
              size={"default"}
              className="rounded-xl hover:bg-accent/50 hover:text-muted-foreground"
            >
              View Course
            </Button>
            <p className="text-muted-foreground font-light text-sm">
              {lessons} Lessons
            </p>
            <p className="text-muted-foreground font-light text-sm">{hours} hrs.</p>
          </div>
        </div>
      </div>
      <DialogContent className="p-0 max-w-none h-[80vh] w-[80vw] overflow-hidden">
        <DialogHeader>
          <iframe
            width="560"
            height="315"
            src="https://www.youtube-nocookie.com/embed/bNyUyrR0PHo?si=nyO0n0GUNuHKQdz0"
            title="YouTube video player"
            frameBorder="0"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
            allowFullScreen
            className="w-full h-full"
          ></iframe>
        </DialogHeader>
      </DialogContent>
    </Dialog>
  );
};

export default Home_CourseCard;
