"use client";

import qs from "query-string";
import { IconType } from "react-icons";
import { 
  usePathname, 
  useRouter, 
  useSearchParams
} from "next/navigation";

import { cn } from "@/lib/utils";

interface CategoryItemProps {
  label: string;
  value: string;
  icon?: IconType;
};

const CategoryItem = ({
  label,
  value,
  icon: Icon,
}: CategoryItemProps) => {
  const pathname = usePathname();
  const router = useRouter();
  const searchParams = useSearchParams();

  const currentCategoryId = searchParams.get("categoryId");
  const currentTitle = searchParams.get("title");

  const isSelected = currentCategoryId === value;

  const onClick = () => {
    const url = qs.stringifyUrl({
      url: pathname,
      query: {
        title: currentTitle,
        categoryId: isSelected ? null : value,
      }
    }, { skipNull: true, skipEmptyString: true });

    router.push(url);
  };

  return (
    <button
      onClick={onClick}
      className={cn(
        "py-2 px-3 text-sm border border rounded-xl flex items-center gap-x-2 hover:border-primary/50 transition",
        isSelected && "border-primary/90 bg-primary/75 text-primary-foreground"
      )}
      type="button"
    >
      {Icon && <Icon size={18} />}
      <div className="truncate">
        {label}
      </div>
    </button>
  )
}

export default CategoryItem;