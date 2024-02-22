import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/lib/utils";
import { FaInfo } from "react-icons/fa6";
import { MdErrorOutline } from "react-icons/md";
import { IoIosCheckmarkCircleOutline } from "react-icons/io";
import { IoWarningOutline } from "react-icons/io5";

const bannerVariants = cva(
  "text-center p-2 md:p-3 text-sm flex items-center w-full rounded-full mb-2",
  {
    variants: {
      variant: {
        success: `border-[1px] bg-[hsl(143,85%,96%)] border-[hsl(145,92,91)] text-[hsl(140,100%,27%)]
                  dark:bg-[hsl(150,100%,6%)] dark:border-[hsl(147,100,12)] dark:text-[hsl(150,86%,65%)]`,

        info: `border-[1px] bg-[hsl(208,100%,97%)] border-[hsl(221,91,91)] text-[hsl(210,92%,45%)]
              dark:bg-[hsl(215,100%,6%)] dark:border-[hsl(223,100,12)] dark:text-[hsl(216,87%,65%)]`,

        warning: `border-[1px] bg-[hsl(49,100%,97%)] border-[hsl(49,91,91)] text-[hsl(31,92%,45%)]
                  dark:bg-[hsl(64,100%,6%)]  dark:border-[hsl(60,100,12)] dark:text-[hsl(46,87%,65%)]`,

        error: `border-[1px] bg-[hsl(359,100%,97%)] border-[hsl(359,100,94)] text-[hsl(360,100%,45%)]
                dark:bg-[hsl(358,76%,10%)] dark:border-[hsl(357,89,16)]  dark:text-[hsl(358,100%,81%)]`,
      },
    },
    defaultVariants: {
      variant: "warning",
    },
  }
);

interface BannerProps extends VariantProps<typeof bannerVariants> {
  label: string;
}

const iconMap = {
  warning: IoWarningOutline,
  success: IoIosCheckmarkCircleOutline,
  info: FaInfo,
  error: MdErrorOutline,
};

export const Banner = ({ label, variant }: BannerProps) => {
  const Icon = iconMap[variant || "warning"];

  return (
    <div
      className={cn(
        bannerVariants({ variant }),
        "w-full flex items-center border-0"
      )}

    >
      <Icon className="h-5 w-5 mr-2" />
      {label}
    </div>
  );
};
