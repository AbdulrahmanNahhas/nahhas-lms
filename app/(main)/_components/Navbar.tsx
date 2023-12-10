import NavbarRoutes from "@/components/NavbarRoutes"
import MobileSidebar from "./MobileSidebar"

const Navbar = () => {
  return (
    <>
    <div className="border-b p-6 h-full flex items-center bg-background shadow-sm md:hidden">
      <MobileSidebar />
      <NavbarRoutes />
    </div>
    </>
  )
}

export default Navbar