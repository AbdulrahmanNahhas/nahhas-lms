import { Button } from "@/components/ui/button"
import { Menu } from "lucide-react"
import {
  Sheet,
  SheetContent,
  SheetTrigger
} from "@/components/ui/sheet"
import Sidebar from "./Sidebar"

const MobileSidebar = () => {
  return (
    <Sheet>
      <SheetTrigger asChild>
        <Button variant={"outline"} size={"icon"} className="flex md:hidden mr-2 bg-secondary">
          <Menu/>
        </Button>
      </SheetTrigger>
      <SheetContent side={"left"} className="p-0 border-l-none w-auto">
        <Sidebar />
      </SheetContent>
    </Sheet>
  )
}

export default MobileSidebar