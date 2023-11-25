import NavbarRoutesClient from "./NavbarRoutesClient";
import ProfileButton from "./ProfileButton";
import { ThemeToggle } from "./ThemeToggle";

const NavbarRoutes = () => {
  return (
    <div className="flex gap-x-2 ml-auto items-center justify-between w-full">
      <NavbarRoutesClient />
      <div className="flex gap-x-2 items-center justify-center">
        <ProfileButton />
        <ThemeToggle />
      </div>
    </div>
  );
};

export default NavbarRoutes;
