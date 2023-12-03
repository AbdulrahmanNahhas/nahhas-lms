"use server";

import { auth, clerkClient } from "@clerk/nextjs";
import Image from "next/image";

const User = async () => {
  const { userId } = auth();

  if (userId) {
    const user = await clerkClient.users.getUser(userId);
    
    return (
      <div className="flex items-center justify-center gap-2">
        {user.hasImage ? (
          <Image height={80} width={80} src={user.imageUrl} alt="logo" className="h-7 w-7 rounded-lg" />
        ): (
          <Image height={140} width={140} src={`https://ui-avatars.com/api/?name=${user.firstName}+${user.lastName}&background=random`} alt="logo" className="h-8 w-8 rounded-xl" />
        )}
        <div className="flex flex-col items-start justify-center gap-0">
        {/* string.charAt(0).toUpperCase() + string.slice(1) */}
          <p className="text-[14px] leading-4">{user.firstName?.charAt(0)?.toUpperCase()}{user.firstName?.slice(1)}</p>
          <p className="leading-4 text-[10px] text-muted-foreground">Student</p>
        </div>
      </div>
    );
  } else {
    console.log("No User Found");
    return (
      <h1>Error</h1>
    )
  }
};

export default User;
