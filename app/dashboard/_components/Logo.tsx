import { cn } from "@/lib/utils";
import Image from "next/image";

export const Logo = ({className}: {className:string}) => {
  return (
    <>
    <Image
      height={130}
      width={130}
      alt="logo"
      src="/logo_dark.svg"
      className={cn(className, "block dark:hidden")}
    />
    <Image
      height={130}
      width={130}
      alt="logo"
      src="/logo.svg"
      className={cn(className, "hidden dark:block")}
    />
    </>
  )
}