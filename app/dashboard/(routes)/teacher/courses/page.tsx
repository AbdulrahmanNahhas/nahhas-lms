import { Button, buttonVariants } from "@/components/ui/button"
import Link from "next/link"

const page = () => {
  return (
    <div className="p-6">
      <p className="mb-2">
        Courses Page!
      </p>
      <Link href="/dashboard/teacher/create" className={buttonVariants()}>
        New Course
      </Link>
    </div>
  )
}

export default page