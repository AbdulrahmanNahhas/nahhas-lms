import NavbarRoutes from "@/components/NavbarRoutes"
import MobileSidebar from "./MobileSidebar"

const Navbar = () => {
  return (
    <div className="border-b p-4 h-full flex items-center bg-background shadow-sm p-6">
      <MobileSidebar />
      <NavbarRoutes />
    </div>
  )
}

export default Navbar