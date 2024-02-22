import NavbarRoutes from "@/components/NavbarRoutes";
import MobileSidebar from "./MobileSidebar";
import SearchInput from "@/components/SearchInput";

const Navbar = () => {
  return (
    <div className="p-6 h-full flex items-center md:bg-background bg-secondary">
      <MobileSidebar />
      <SearchInput className="w-full md:max-w-[500px] max-w-none" />
      <NavbarRoutes />
    </div>
  );
};

export default Navbar;
