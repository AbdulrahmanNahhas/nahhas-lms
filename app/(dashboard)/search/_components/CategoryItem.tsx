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
  icon?: IconType;
};

const CategoryItem = ({
  label,
  icon: Icon,
}: CategoryItemProps) => {
  const pathname = usePathname();
  const router = useRouter();
  const searchParams = useSearchParams();

  function textToSlug(text: string) {
    return text
      .toLowerCase() // Lowercase the text
      .trim() // Remove leading and trailing spaces
      .replace(/\s+/g, "-") // Replace spaces with hyphens
      .replace(/[^\w\-]+/g, ""); // Remove non-alphanumeric characters and hyphens
  }

  const currentCategoryId = searchParams.get("categoryId");
  const currentTitle = searchParams.get("title");

  const isSelected = currentCategoryId === textToSlug(label);

  const onClick = () => {
    const url = qs.stringifyUrl({
      url: pathname,
      query: {
        title: currentTitle,
        categoryId: isSelected ? null : textToSlug(label),
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