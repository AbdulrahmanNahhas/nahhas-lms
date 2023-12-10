import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { LucideIcon } from "lucide-react";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";

interface SidebarItemProps {
  icon: LucideIcon;
  label: string;
  href: string;
}

const SidebarItem = ({ icon: Icon, label, href }: SidebarItemProps) => {
  const pathname = usePathname();
  const isActive =
    (pathname === "/" && href === "/") ||
    pathname === href ||
    pathname?.startsWith(`${href}/`);

  return (
    <Button
      asChild
      variant={"ghost"}
      size={"lg"}
      className={cn(
        "flex items-center rounded-full justify-start gap-x-3 p-4 text-sm font-[500] transition-all duration-300",
        isActive
          ? " bg-primary/20 text-primary opacity-100 hover:bg-primary/10 hover:text-primary w-[calc(100%+24px)] rounded-r-none"
          : "opacity-60 hover:opacity-100",
      )}
    >
      <Link href={href}>
        <Icon className={cn("w-6 h-6")} />
        {label}
      </Link>
    </Button>
  );
};

export default SidebarItem;
