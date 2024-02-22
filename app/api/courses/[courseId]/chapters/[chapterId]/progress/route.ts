import { db } from "@/lib/db";
import { auth, clerkClient } from "@clerk/nextjs";
import { NextResponse } from "next/server";

export async function PUT(req: Request, { params }:{ params: { courseId: string, chapterId: string }}) {
  try {
    const { userId } = auth();
    const { isCompleted } = await req.json();

    if (!userId) {
      return new NextResponse("Unauthorized", { status: 401 })
    }

    const user = await clerkClient.users.getUser(userId);
    const xp = user.publicMetadata.xp as number || 0;

    const userProgress = await db.userProgress.upsert({
      where: {
        userId_chapterId: {
          userId,
          chapterId: params.chapterId
        }
      },
      update: {
        isCompleted
      },
      create: {
        userId,
        chapterId: params.chapterId,
        isCompleted
      }
    })

    if (isCompleted === true) {
      await clerkClient.users.updateUserMetadata(userId, {
        publicMetadata: {
          xp: xp+10
        }
      })
    } else if(isCompleted === false) {
      await clerkClient.users.updateUserMetadata(userId, {
        publicMetadata: {
          xp: xp-10
        }
      })
    }

    return NextResponse.json(userProgress);
  } catch (error) {
    console.log("[CHAPTER_ID_PROGRESS]", error);
    return new NextResponse("Internal Error", { status: 500 })

  }
}