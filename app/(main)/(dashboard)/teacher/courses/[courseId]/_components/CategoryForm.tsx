"use client";

import * as z from "zod";
import axios from "axios";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { Button } from "@/components/ui/button";
import { FaPencilAlt } from "react-icons/fa";
import { MdOutlineCancel, MdOutlineChangeCircle } from "react-icons/md";
import { useState } from "react";
import { Form, FormControl, FormField, FormItem, FormMessage } from "@/components/ui/form";
import { BiLoader } from "react-icons/bi";
import { toast } from "sonner";
import { useRouter } from "next/navigation";
import { cn } from "@/lib/utils";
import { Course } from "@prisma/client";
import Combobox from "@/components/ui/combox";

interface CategoryFormProps {
  initialData: Course;
  courseId: string;
  options:{
    value: string
    label: string
  }[],
}
const formSchema = z.object({
  categoryId: z.string().min(1),
});
import { IconType } from 'react-icons';
import { FaCode, FaLaptopCode, FaMicrochip, FaMobileScreenButton, FaPaintbrush } from 'react-icons/fa6';
import { MdErrorOutline } from "react-icons/md";

const IconMap: Record<string, IconType> = {
  "Programming": FaCode,
  "Web Development": FaLaptopCode,
  "Electronics": FaMicrochip,
  "Mobile App Development": FaMobileScreenButton,
  "Design": FaPaintbrush,
};

const RenderIcon = ({Icon}: {Icon: IconType}) => {
  return (
    <Icon />
  )
}

const CategoryForm = ({ initialData, courseId, options }: CategoryFormProps) => {
  const [isEditing, setIsEditing] = useState(false);
  const toggleEdit = () => setIsEditing((current) => !current);
  const router = useRouter();

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      categoryId: initialData?.categoryId || ""
    },
  });

  const { isSubmitting, isValid } = form.formState;

  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    try {
      console.log(values);
      await axios.patch(`/api/courses/${courseId}`, values)
      toast.success("Course Updated!");
      toggleEdit();
      router.refresh();
    } catch (error) {
      toast.error("Something went wrong");
    }
  };

  const selectedOption = options.find((option)=> option.value === initialData.categoryId);

  return (
    <div className=" border bg-accent/50 dark:bg-accent/20 rounded-lg p-4">
      <div className="font-medium text-lg flex items-start justify-between">
        <span className="flex items-center justify-center gap-2">
          {isSubmitting && <BiLoader className="animate-spin w-5 h-5" />}
          Course Category
        </span>
        <Button variant={"ghost"} onClick={toggleEdit}>
          {isEditing ? (
            <>
              <MdOutlineCancel className="h-4 w-4 mr-2" />
              Cancel
            </>
          ) : (
            <>
              <MdOutlineChangeCircle className="h-4 w-4 mr-2" />
              Change
            </>
          )}
        </Button>
      </div>
      {isEditing ? (
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="mt-3 gap-2 flex">
            <FormField control={form.control} name="categoryId" render={({field} ) => (
              <FormItem className="w-full">
                <FormControl>
                  <Combobox
                    options={options}
                    className="w-full"
                    {...field}
                    />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}></FormField>
            <div className="flex items-center gap-x-2">
              <Button disabled={!isValid || isSubmitting}
              type="submit">
                Save Changes
              </Button>
            </div>
          </form>
        </Form>
      ) : (
        <p className={cn("mt-0 text-base flex gap-2 items-center", !initialData.categoryId && "text-muted-foreground italic")}>
          {/* <RenderIcon Icon={IconMap[selectedOption?.label || MdErrorOutline]} /> */}
          {selectedOption?.label || "No category"}
        </p>
      )}
    </div>
  );
};

export default CategoryForm;
