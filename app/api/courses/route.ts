import { db } from "@/lib/db";
import { isTeacher } from "@/lib/teacher";
import { auth } from "@clerk/nextjs"
import { NextResponse } from "next/server"

export async function POST(req: Request) {
  try {
    const {userId} = auth();
    const {title, author} = await req.json();
    
    if(!userId || !isTeacher(userId)) {
      return new NextResponse("Unauthorized", {status: 401})
    }

    const course = await db.course.create({
      data: {
        userId,
        title,
        author
      }
    })

    return NextResponse.json(course)
  } catch (error) {
    console.log("[COURSES]", error)
    return new NextResponse("Internal Error", {status: 500})
  }
}