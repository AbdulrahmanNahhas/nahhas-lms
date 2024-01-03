"use client";

import * as React from "react";
import { Check, ChevronsUpDown } from "lucide-react";

import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
} from "@/components/ui/command";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { IconType } from "react-icons";
import {
  FaCode,
  FaLaptopCode,
  FaMicrochip,
  FaMobileScreenButton,
  FaPaintbrush,
} from "react-icons/fa6";

interface ComboboxProps {
  options: {
    value: string;
    label: string;
  }[];
  value?: string;
  onChange: (value: string) => void;
  className?: string;
}

const IconMap: Record<string, IconType> = {
  Programming: FaCode,
  "Web Development": FaLaptopCode,
  Electronics: FaMicrochip,
  "Mobile App Development": FaMobileScreenButton,
  Design: FaPaintbrush,
};

// const RenderIcon = ({ Icon, className }: { Icon: IconType; className?: string }) => {
//   return <Icon />;
// };

export const Combobox = ({
  options,
  value,
  onChange,
  className,
}: ComboboxProps) => {
  const [open, setOpen] = React.useState(false);

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <Button
          variant="outline"
          role="combobox"
          aria-expanded={open}
          className={cn("w-[200px] justify-between !scale-100", className)}
        >
          {value
            ? options.find((option) => option.value === value)?.label
            : "Select option..."}
          <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-[200px] p-0">
        <Command>
          <CommandInput placeholder="Search option..." />
          <CommandEmpty>No Option found.</CommandEmpty>
          <CommandGroup>
            {options.map((option) => (
              <CommandItem
                key={option.value}
                value={option.label}
                onSelect={() => {
                  onChange(option.value === value ? "" : option.value);
                  setOpen(false);
                }}
                className={cn("flex gap-2 items-center", value === option.value ? "opacity-100" : "opacity-75")}
              >
                {/* <RenderIcon
                  Icon={IconMap[option.label]}
                  className={cn(
                    "!mr-2 h-4 w-4",
                    value === option.value ? "opacity-100" : "opacity-10"
                  )}
                /> */}
                {option.label}
              </CommandItem>
            ))}
          </CommandGroup>
        </Command>
      </PopoverContent>
    </Popover>
  );
};

export default Combobox;
