import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { LucideIcon } from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";

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
        "flex items-center justify-start gap-x-3 px-4 py-[26px] text-muted-foreground text-sm mx-3 !rounded-xl overflow-hidden font-[500] transition-all duration-300 rounded-none hover:scale-1 group",
        isActive
          ? "text-primary opacity-100 hover:bg-primary/10 hover:text-primary"
          : "",
      )}
    >
      <Link href={href}>
        <span className={cn("p-[6px] rounded-[6px] transition-all duration-300",isActive ? "bg-primary/25 group-hover:bg-primary/5 text-primary": "bg-accent text-muted-foreground group-hover:text-foreground")}>
          <Icon className="w-5 h-5" />
        </span>
        {label}
      </Link>
    </Button>
  );
};

export default SidebarItem;
