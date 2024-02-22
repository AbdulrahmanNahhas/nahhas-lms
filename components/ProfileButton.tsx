import { auth, clerkClient } from "@clerk/nextjs";
import Link from "next/link";
import { redirect } from "next/navigation";
import SidebarItem from "@/app/(main)/_components/SidebarItem";
import { Settings2 } from "lucide-react";

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
      <SidebarItem icon={Settings2} label={"Settings"} href={"/settings"} />
    </Link>
  );
};

export default ProfileButton;
