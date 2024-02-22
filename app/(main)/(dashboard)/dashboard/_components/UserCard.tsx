import { auth, clerkClient } from "@clerk/nextjs";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { ArrowRight, Edit } from "lucide-react";
import { redirect } from "next/navigation";
import { ChangeAvatarDialog } from "@/components/ChangeAvatar";
import { avatarDecorations } from "@/config/avatar-decorations";

const UserCard = async () => {
  const { userId } = auth();
  if (!userId) {
    return redirect("/");
  }
  const user = await clerkClient.users.getUser(userId);

  // XP
  const xp = user.publicMetadata.xp as number || 0;
  function getHundreds(number: number) {
    return Math.floor(number / 100) * 100;
  }
  function removeHundreds(number: number): number {
    return number % 100;
  }
  function calculateProgress(currentValue: number, totalValue: number) {
    return Math.round((currentValue / totalValue) * 100);
  }

  // Image
  const image = user.publicMetadata.image as string || "";
  const [groupName, indexString] = image.split("-");
  const index = Number(indexString);
  const matchingDecoration = avatarDecorations.find(
    (decoration) => decoration.title === groupName
  );
  let imageURL = ""
  if (matchingDecoration) {
    imageURL = matchingDecoration.images[index];
  }


  return (
    <div className="bg-secondary border-b gap-6 xl:gap-0 flex flex-col xl:flex-row p-6">
      <div className="flex gap-6 items-center flex-1">
        {user.hasImage ? (
          <div className="relative h-16 sm:h-24 lg:h-28 w-16 sm:w-24 lg:w-28 aspect-square">
            {/* <ChangeAvatarDialog /> */}
            <Image
              height={300}
              width={300}
              src={user.imageUrl}
              alt="logo"
              className="p-2 rounded-full w-full h-full"
            />
            {/* {imageURL !== "" && image !== "" && (
              <img src={imageURL} alt="border"  className="absolute top-0 left-0" />
            )} */}
          </div>
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
            {user.firstName?.slice(1)} {user.lastName?.charAt(0)?.toUpperCase()}
            {user.lastName?.slice(1)}
          </h1>
          <div className="flex flex-col gap-1">
            <div className="h-2 rounded-full w-full bg-primary/25">
              <div
                className="h-2 rounded-full bg-primary"
                style={{
                  width: `${calculateProgress(removeHundreds(xp),100)}%`,
                }}
              ></div>
            </div>
            <div className="flex justify-between items-center">
              <button>{`${xp} `}XP</button>
              <span className="text-muted-foreground">
                {getHundreds(xp)+100} XP
              </span>
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
          className="w-full rounded-xl p-6 bg-transparent border-border flex justify-between hover:!scale-[1.01] animate-pulse cursor-not-allowed"
          disabled
          variant={"outline"}
        >
          <span>Earn 50 XP for solving a Quiz </span>
          <ArrowRight className="hidden sm:block" />
        </Button>
      </div>
    </div>
  );
};

export default UserCard;
