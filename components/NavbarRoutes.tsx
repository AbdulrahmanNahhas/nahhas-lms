import { auth } from "@clerk/nextjs";
import NavbarRoutesClient from "./NavbarRoutesClient";
import ProfileButton from "./ProfileButton";
import { ThemeToggle } from "./ThemeToggle";
import { buttonVariants } from "./ui/button";
import Link from "next/link";

const NavbarRoutes = () => {
  const { userId } = auth();

  return (
    <div className="flex gap-x-2 ml-auto items-center justify-between w-full">
      <NavbarRoutesClient />
      <div className="flex gap-x-2 items-center justify-center">
        {userId ? (
          <ProfileButton />
        ) : (
          <Link href="/sign-in" className={buttonVariants()}>
            Sign In
          </Link>
        )}
        <ThemeToggle />
      </div>
    </div>
  );
};

export default NavbarRoutes;
