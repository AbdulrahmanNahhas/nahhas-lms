import CourseImage from "@/components/CourseImage";
import { buttonVariants } from "@/components/ui/button";
import { auth } from "@clerk/nextjs";
import { Camera, Code2, Factory, LayoutDashboard } from "lucide-react";
import Link from "next/link";
import React from "react";
import Marquee from "react-fast-marquee";

const courses = [
  {
    title: "Cook Course",
    image: "https://images.unsplash.com/photo-1556911261-6bd341186b2f?w=900&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTh8fGNvb2t8ZW58MHx8MHx8fDA%3D",
  },
  {
    title: "How to be organized",
    image: "https://images.unsplash.com/photo-1434030216411-0b793f4b4173?w=800&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTZ8fHBzeWNvbG9neXxlbnwwfDB8MHx8fDA%3D",
  },
  {
    title: "Street Art",
    image: "https://images.unsplash.com/photo-1583225214464-9296029427aa?w=900&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTJ8fHN0cmVldCUyMGFydHxlbnwwfHwwfHx8MA%3D%3D",
  },
  {
    title: "Photography",
    image: "https://images.unsplash.com/photo-1542038784456-1ea8e935640e?w=900&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NHx8cGhvdG9ncmFwaHl8ZW58MHx8MHx8fDA%3D",
  },
  {
    title: "Video Editing",
    image: "https://images.unsplash.com/photo-1526698905402-e13b880ad864?w=900&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTB8fHZpZGVvJTIwZWRpdHxlbnwwfHwwfHx8MA%3D%3D",
  },
  {
    title: "Business Course",
    image: "https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?w=900&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8OHx8YnVzc2luZXNzfGVufDB8fDB8fHww",
  },
  {
    title: "Mechatrnoics",
    image: "https://plus.unsplash.com/premium_photo-1663054378169-8ffea2e11c42?w=900&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MXx8QUl8ZW58MHx8MHx8fDA%3D",
  },
  {
    title: "How to use ChatGPT",
    image: "https://external-content.duckduckgo.com/iu/?u=https%3A%2F%2Fimg-s-msn-com.akamaized.net%2Ftenant%2Famp%2Fentityid%2FAA1km31p.img&f=1&nofb=1&ipt=3cdf248afff4dfb2e16d9f9a03c4af03671f695b1d62f52add42c8afe9d1c83f&ipo=images",
  }
]
const courses2 = [
  {
    title: "Artificial Intelligence",
    image: "https://images.unsplash.com/photo-1485827404703-89b55fcc595e?w=900&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8OTF8fEFJfGVufDB8fDB8fHww",
  },
  {
    title: "IT & Software ",
    image: "https://plus.unsplash.com/premium_photo-1663012876180-86a7fc80ca86?w=900&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NjF8fElUJTIwJTI2JTIwU29mdHdhcmV8ZW58MHx8MHx8fDA%3D",
  },
  {
    title: "Marketing",
    image: "https://images.unsplash.com/photo-1533750349088-cd871a92f312?w=900&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8bWFya2V0aW5nfGVufDB8fDB8fHww",
  },
  {
    title: "Digital Marketing",
    image: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=900&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTB8fGRpZ2l0YWwlMjBtYXJrZXRpbmd8ZW58MHx8MHx8fDA%3D",
  },
  {
    title: "Healthy Lifestyle",
    image: "https://images.unsplash.com/photo-1501504905252-473c47e087f8?w=900&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MjZ8fGxpZmVzdHlsZXxlbnwwfDB8MHx8fDA%3D",
  },
  {
    title: "Camping",
    image: "https://images.unsplash.com/photo-1487730116645-74489c95b41b?w=900&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTF8fGNhbXBpbmd8ZW58MHx8MHx8fDA%3D",
  },
  {
    title: "Health & Fitness",
    image: "https://images.unsplash.com/photo-1583454110551-21f2fa2afe61?w=900&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTR8fEZpdG5lc3N8ZW58MHx8MHx8fDA%3D",
  },
  {
    title: "Teaching & Academics",
    image: "https://images.unsplash.com/photo-1509062522246-3755977927d7?w=900&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8M3x8dGVhY2hpbmd8ZW58MHx8MHx8fDA%3D",
  },
]

const page = () => {
  const { userId } = auth();

  return (
    <div className="flex flex-col gap-6">
      <section className="flex flex-col items-center justify-center h-full container  gap-6 pt-10 md:pt-24 lg:pt-36">
        <h1 className="font-bold text-2xl max-w-none sm:text-3xl sm:max-w-3xl md:text-4xl md:max-w-4xl lg:text-6xl lg:max-w-6xl text-center">
          Teaching in the Internet age means we must teach{" "}
          <span className="text-primary">tomorrow's</span> skills today
        </h1>
        <p className="text-muted-foreground text-sm md:text-base max-w-3xl text-center font-light">
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Quasi a
          asperiores dolorem temporibus assumenda placeat fugit nobis eaque
          neque aperiam, earum, aliquid dignissimos aspernatur enim.
        </p>
        <div className="flex items-center justify-center gap-4">
          {userId ? (
            <Link className={buttonVariants({ size: "lg" })} href="/dashboard">
              Dashboard
            </Link>
          ) : (
            <Link className={buttonVariants({ size: "lg" })} href="/sign-up">
              Sign up
            </Link>
          )}
          <Link
            className={buttonVariants({ variant: "outline", size: "lg" })}
            href="/dashboard/search"
          >
            Browse Courses
          </Link>
        </div>
      </section>
      <section className="flex flex-col items-center justify-center h-full gap-6 py-14 w-screen">
        <Marquee
          pauseOnClick={true}
          className="!rotate-[-4deg]"
          gradientColor="red"
          speed={50}
        >
          {courses.map((item, index) => (
            <CourseImage course={item} key={index} />
          ))}
        </Marquee>
        <Marquee
          pauseOnClick={true}
          className="!rotate-[-4deg]"
          gradientWidth={250}
          speed={50}
          gradientColor="red"
          direction="right"
        >
        {courses2.map((item, index) => (
          <CourseImage course={item} key={index} />
        ))}
        </Marquee>
      </section>
      <section className="flex flex-col items-center justify-center h-full container  gap-6 py-10">
        <h1 className="font-bold text-xl max-w-none sm:text-2xl sm:max-w-2xl md:text-3xl md:max-w-3xl lg:text-5xl lg:max-w-5xl text-center">
          Categories
          <p className="text-muted-foreground text-sm md:text-base max-w-3xl text-center font-light mt-3">
            Find the best course for yourself.
          </p>
        </h1>
        <div className="flex gap-4 items-center justify-center w-full max-w-4xl">
          <div className="border p-6 w-1/4 rounded-xl min-h-[150px] hover:bg-accent/50 flex flex-col items-start justify-end gap-1">
            <LayoutDashboard className="w-8 h-8" />
            <h1>Design</h1>
            <p className="text-muted-foreground">4 Course</p>
          </div>
          <div className="border p-6 w-1/4 rounded-xl min-h-[150px] hover:bg-accent/50 flex flex-col items-start justify-end gap-1">
            <Code2 className="w-8 h-8" />
            <h1>Development</h1>
            <p className="text-muted-foreground">12 Course</p>
          </div>
          <div className="border p-6 w-1/4 rounded-xl min-h-[150px] hover:bg-accent/50 flex flex-col items-start justify-end gap-1">
            <Camera className="w-8 h-8" />
            <h1>Photography</h1>
            <p className="text-muted-foreground">8 Course</p>
          </div>
          <div className="border p-6 w-1/4 rounded-xl min-h-[150px] hover:bg-accent/50 flex flex-col items-start justify-end gap-1">
            <Factory className="w-8 h-8" />
            <h1>Business</h1>
            <p className="text-muted-foreground">1 Course</p>
          </div>
        </div>
      </section>
    </div>
  );
};

export default page;