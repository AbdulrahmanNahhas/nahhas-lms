import { LucideIcon } from "lucide-react";

interface InfoCardProps {
  numberOfItems: any;
  nameOfItems: string;
  label: string;
  icon: LucideIcon;
}

export const InfoCard = ({
  nameOfItems,
  icon: Icon,
  numberOfItems,
  label,
}: InfoCardProps) => {
  return (
    <div className="border rounded-md flex items-center gap-x-2 p-3 xl:gap-x-4 xl:px-5 xl:py-4">
      <Icon />
      <div>
        <p className="font-medium">{label}</p>
        <p className="text-gray-500 text-sm">
          {numberOfItems} {nameOfItems}
        </p>
      </div>
    </div>
  );
};
