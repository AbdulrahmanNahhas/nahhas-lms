import { auth, clerkClient } from "@clerk/nextjs";
import { redirect } from "next/navigation";
import AvatarDialog from "./AvatarDialog";

export async function ChangeAvatarDialog() {
  const { userId } = auth();
  if (!userId) {
    return redirect("/");
  }
  const user = await clerkClient.users.getUser(userId);
  const xp = user.publicMetadata.xp as number || 0;
  const image = user.publicMetadata.image as string || "";

  return (
    <AvatarDialog xp={xp} image={image} />
  );
}
