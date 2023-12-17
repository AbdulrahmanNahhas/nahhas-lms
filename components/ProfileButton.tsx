import { auth, clerkClient } from "@clerk/nextjs";
import Image from "next/image";
import { MdArrowDropDown } from "react-icons/md";
import Link from "next/link";
import { redirect } from "next/navigation";

const ProfileButton = async () => {
  const { userId } = auth();
  if (!userId) {
    return redirect("/");
  }
  const user = await clerkClient.users.getUser(userId);

  return (
    <Link
      href={"/settings"}
      className="flex items-center justify-start sm:gap-2 sm:px-2 lg:px-4 sm:py-1 lg:py-3 sm:hover:bg-accent group w-full rounded-md lg:rounded-none"
    >
      {user.hasImage ? (
        <Image
          height={140}
          width={140}
          src={user.imageUrl}
          alt="logo"
          className="h-10 w-10 rounded-sm group-hover:rounded-3xl !transition-all !duration-300"
        />
      ) : (
        <Image
          height={140}
          width={140}
          src={`https://ui-avatars.com/api/?name=${user.firstName}+${user.lastName}&background=random`}
          alt="logo"
          className="h-10 w-10 rounded-lg"
        />
      )}
      <div className="flex items-center justify-between w-full">
        <div className="hidden sm:flex flex-col items-start justify-center gap-0">
          <p className=" font-semibold flex items-center text-sm">
            {user.firstName?.charAt(0)?.toUpperCase()}
            {user.firstName?.slice(1)}
          </p>
          <p className="text-xs text-[12px] mt-0 leading-[12px] text-muted-foreground/80">
            {user.emailAddresses[0].emailAddress}
          </p>
        </div>
        <MdArrowDropDown className="w-6 h-6 duration-200 -rotate-90 opacity-50 group-hover:opacity-100 hidden lg:block" />
      </div>
    </Link>
  );
};

export default ProfileButton;
