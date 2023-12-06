import { Button } from "@/components/ui/button"
import { cn } from "@/lib/utils"
import { LucideIcon } from "lucide-react"
import Link from "next/link"
import { usePathname, useRouter } from "next/navigation"

interface SidebarItemProps {
  icon: LucideIcon,
  label: string,
  href: string
}

const SidebarItem = ({icon: Icon, label, href}: SidebarItemProps) => {
  const pathname = usePathname();
  const isActive = (pathname === "/" && href === "/") || pathname === href || pathname?.startsWith(`${href}/`);

  return (
    <Button asChild variant={"ghost"} size={"lg"} className={cn("flex items-center justify-start gap-x-3 p-4 text-sm font-[500] transition-all duration-200", (isActive ? " bg-primary/5 text-primary opacity-100 hover:bg-primary/10 hover:text-primary" : "opacity-60 hover:opacity-100"))}>
      <Link href={href}>
        <Icon className="w-6 h-6" />
        {label}
      </Link>
    </Button>
  )
}

export default SidebarItem