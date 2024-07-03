import React from "react";
import { buttonVariants } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { auth } from "@clerk/nextjs";
import Link from "next/link";
import Marquee from "react-fast-marquee";
import { FiExternalLink } from "react-icons/fi";
import CoursesList from "@/components/Course/CoursesList";
import BentoGrid from "@/components/BentoGrid";
import Image from "next/image";
import Home_CoursesList from "@/components/Home/Home_CourseList";

const courses = [
  {
    title: "Cook Course",
    image:
      "https://images.unsplash.com/photo-1556911261-6bd341186b2f?w=900&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTh8fGNvb2t8ZW58MHx8MHx8fDA%3D",
  },
  {
    title: "How to be organized",
    image:
      "https://images.unsplash.com/photo-1434030216411-0b793f4b4173?w=800&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTZ8fHBzeWNvbG9neXxlbnwwfDB8MHx8fDA%3D",
  },
  {
    title: "Street Art",
    image:
      "https://images.unsplash.com/photo-1583225214464-9296029427aa?w=900&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTJ8fHN0cmVldCUyMGFydHxlbnwwfHwwfHx8MA%3D%3D",
  },
  {
    title: "Photography",
    image:
      "https://images.unsplash.com/photo-1542038784456-1ea8e935640e?w=900&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NHx8cGhvdG9ncmFwaHl8ZW58MHx8MHx8fDA%3D",
  },
  {
    title: "Video Editing",
    image:
      "https://images.unsplash.com/photo-1526698905402-e13b880ad864?w=900&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTB8fHZpZGVvJTIwZWRpdHxlbnwwfHwwfHx8MA%3D%3D",
  },
  {
    title: "Business Course",
    image:
      "https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?w=900&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8OHx8YnVzc2luZXNzfGVufDB8fDB8fHww",
  },
  // {
  //   title: "Mechatrnoics",
  //   image:
  //     "https://plus.unsplash.com/premium_photo-1663054378169-8ffea2e11c42?w=900&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MXx8QUl8ZW58MHx8MHx8fDA%3D",
  // },
  // {
  //   title: "How to use ChatGPT",
  //   image:
  //     "https://external-content.duckduckgo.com/iu/?u=https%3A%2F%2Fiphonesoft.fr%2Fimages%2F2023%2F01%2Fchatgpt-logo-header-banner.jpg&f=1&nofb=1&ipt=71b6734ff72bc11d4f4ae6fe7fb7913640038075c6f473cd227cc93f5e425d7d&ipo=images",
  // },
];
const courses2 = [
  {
    title: "Artificial Intelligence",
    image:
      "https://images.unsplash.com/photo-1485827404703-89b55fcc595e?w=900&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8OTF8fEFJfGVufDB8fDB8fHww",
  },
  // {
  //   title: "IT & Software ",
  //   image:
  //     "https://plus.unsplash.com/premium_photo-1663012876180-86a7fc80ca86?w=900&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NjF8fElUJTIwJTI2JTIwU29mdHdhcmV8ZW58MHx8MHx8fDA%3D",
  // },
  {
    title: "Marketing",
    image:
      "https://images.unsplash.com/photo-1533750349088-cd871a92f312?w=900&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8bWFya2V0aW5nfGVufDB8fDB8fHww",
  },
  {
    title: "Digital Marketing",
    image:
      "https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=900&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTB8fGRpZ2l0YWwlMjBtYXJrZXRpbmd8ZW58MHx8MHx8fDA%3D",
  },
  {
    title: "Healthy Lifestyle",
    image:
      "https://images.unsplash.com/photo-1501504905252-473c47e087f8?w=900&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MjZ8fGxpZmVzdHlsZXxlbnwwfDB8MHx8fDA%3D",
  },
  {
    title: "Camping",
    image:
      "https://images.unsplash.com/photo-1487730116645-74489c95b41b?w=900&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTF8fGNhbXBpbmd8ZW58MHx8MHx8fDA%3D",
  },
  {
    title: "Health & Fitness",
    image:
      "https://images.unsplash.com/photo-1583454110551-21f2fa2afe61?w=900&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTR8fEZpdG5lc3N8ZW58MHx8MHx8fDA%3D",
  },
  {
    title: "Teaching & Academics",
    image:
      "https://images.unsplash.com/photo-1509062522246-3755977927d7?w=900&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8M3x8dGVhY2hpbmd8ZW58MHx8MHx8fDA%3D",
  },
];

interface courseProps {
  image: string;
  title: string;
}
const CourseImage = ({ course }: { course: courseProps }) => {
  return (
    <div className="w-full !w-[410px] h-[260px] rounded-xl border-2 !mx-4 group relative overflow-hidden">
      <span className="opacity-0 duration-300 group-hover:opacity-100 absolute z-50 bottom-0 left-0 text-foreground bg-background px-4 py-2 text-lg rounded-tr-xl">
        {course.title}
      </span>
      <Image
        width={1000}
        height={500}
        src={course.image}
        alt="image"
        className="h-full w-full object-cover"
      />
    </div>
  );
};

const page = () => {
  const { userId } = auth();

  return (
    <div className="flex flex-col gap-6">
      <section className="flex flex-col items-center justify-center h-full container gap-6 pt-10 md:pt-24 lg:pt-36">
        <h1 className="font-bold text-2xl max-w-none sm:text-3xl sm:max-w-3xl md:text-4xl md:max-w-4xl lg:text-6xl lg:max-w-6xl text-center">
          Teaching in the Internet age means we must teach{" "}
          <span className="text-primary">tomorrow&apos;s</span> skills today
        </h1>
        <p className="text-muted-foreground text-sm md:text-base max-w-3xl text-center font-light">
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Quasi a
          asperiores dolorem temporibus assumenda placeat fugit nobis eaque
          neque aperiam, earum, aliquid dignissimos aspernatur enim.
        </p>
        <div className="flex items-center justify-center gap-3">
          {userId ? (
            <Link className={cn(buttonVariants({ size: "lg" }), "duration-300 transition-all")} href="/dashboard">
              Dashboard
            </Link>
          ) : (
            <>
              <Link className={cn(buttonVariants({ size: "lg" }), "duration-300 transition-all")} href="/sign-up">
                Sign up
              </Link>
            </>
          )}
          <Link className={cn(buttonVariants({ variant: "outline", size: "lg" }), "duration-300 transition-all")} href="https://github.com/AbdulrahmanNahhas/nahhas-lms">
            Github
          </Link>
        </div>
      </section>
      <section className="flex flex-col items-center justify-center h-full gap-6 py-14 w-screen">
        <Marquee pauseOnClick={true} className="!rotate-[-4deg]" speed={30}>
          {courses.map((item, index) => (
            <CourseImage course={item} key={index} />
          ))}
        </Marquee>
        <Marquee
          pauseOnClick={true}
          className="!rotate-[-4deg]"
          gradientWidth={250}
          speed={30}
          direction="right"
        >
          {courses2.map((item, index) => (
            <CourseImage course={item} key={index} />
          ))}
        </Marquee>
      </section>
      {/* <section className="flex flex-col items-center justify-center h-full container gap-6 py-14">
        <h1 className="font-bold text-xl max-w-none sm:text-2xl sm:max-w-2xl md:text-3xl md:max-w-3xl lg:text-5xl lg:max-w-5xl text-center">
          Latest Courses
          <p className="text-muted-foreground text-sm md:text-base max-w-3xl text-center font-light mt-3">
            Find the best course for yourself.
          </p>
        </h1>
        <Home_CoursesList />
        <Link
          href="/search"
          className={cn(
            buttonVariants({ variant: "link" }),
            "text-foreground underline hover:no-underline hover:bg-accent flex gap-2 items-center"
          )}
        >
          <span>See All</span>
          <FiExternalLink />
        </Link>
      </section>
      <BentoGrid /> */}
    </div>
  );
};

export default page;
