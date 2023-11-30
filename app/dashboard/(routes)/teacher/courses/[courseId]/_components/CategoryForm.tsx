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
import { TbLoader3 } from "react-icons/tb";
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
    <div className="mt-6 border bg-accent/20 rounded-lg p-4  ">
      <div className="font-medium text-lg flex items-start justify-between">
        Course Category
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
                    options={...options}
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
                {!isValid || isSubmitting && <TbLoader3 className="mr-1 animate-spin" />}
                Save Changes
              </Button>
            </div>
          </form>
        </Form>
      ) : (
        <p className={cn("mt-0 text-sm", !initialData.categoryId && "text-muted-foreground italic")}>
          {selectedOption?.label || "No category"}
        </p>
      )}
    </div>
  );
};

export default CategoryForm;
