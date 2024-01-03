import { db } from "@/lib/db";
import { isTeacher } from "@/lib/teacher";
import { auth, clerkClient } from "@clerk/nextjs"
import { NextResponse } from "next/server"

export async function POST(req: Request) {
  try {
    const { userId } = auth();
    const { image } = await req.json();

    if (!userId) {
      return new NextResponse("Unauthorized", { status: 401 })
    }

    await clerkClient.users.updateUserMetadata(userId, {
      publicMetadata: {
        image: image
      }
    })

    return NextResponse.json({ success: true });
  } catch (error) {
    console.log("[USER]", error);
    return new NextResponse("Internal Error", { status: 500 })

  }
}