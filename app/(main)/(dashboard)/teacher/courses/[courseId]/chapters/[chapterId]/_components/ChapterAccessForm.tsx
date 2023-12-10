"use client";

import * as z from "zod";
import axios from "axios";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { Button } from "@/components/ui/button";
import { MdOutlineCancel } from "react-icons/md";
import { useState } from "react";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { BiLoader } from "react-icons/bi";
import { toast } from "sonner";
import { useRouter } from "next/navigation";
import { cn } from "@/lib/utils";
import { Chapter } from "@prisma/client";
import { Checkbox } from "@/components/ui/checkbox";
import { AiFillEyeInvisible } from "react-icons/ai";

interface ChapterAccessFormFormProps {
  initialData: Chapter;
  courseId: string;
  chapterId: string;
}
const formSchema = z.object({
  isFree: z.boolean().default(false),
});

const ChapterAccessFormForm = ({initialData, courseId, chapterId}: ChapterAccessFormFormProps) => {
  const [isEditing, setIsEditing] = useState(false);
  const toggleEdit = () => setIsEditing((current) => !current);
  const router = useRouter();

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      isFree: !!initialData.isFree,
    },
  });

  const { isSubmitting, isValid } = form.formState;
  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    try {
      await axios.patch(
        `/api/courses/${courseId}/chapters/${chapterId}`,
        values
      );
      toast.success("Chapter Updated!");
      toggleEdit();
      router.refresh();
    } catch (error) {
      toast.error("Something went wrong");
    }
  };

  return (
    <div className=" border bg-accent/50 dark:bg-accent/20 rounded-lg p-4  ">
      <div className="font-medium text-lg flex items-start justify-between">
        <span className="flex items-center justify-center gap-2">
          {isSubmitting && <BiLoader className="animate-spin w-5 h-5" />}
          Chapter Access
        </span>
        <Button variant={"ghost"} onClick={toggleEdit}>
          {isEditing ? (
            <>
              <MdOutlineCancel className="h-4 w-4 mr-2" />
              Cancel
            </>
          ) : (
            <>
              <AiFillEyeInvisible className="h-4 w-4 mr-2" />
              Edit Access
            </>
          )}
        </Button>
      </div>
      {isEditing ? (
        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(onSubmit)}
            className="space-y-4 mt-3"
          >
            <FormField
              control={form.control}
              name="isFree"
              render={({ field }) => (
                <FormItem className="w-full flex items-start justify-start space-x-3">
                  <FormControl className="mt-1">
                    <Checkbox
                      checked={field.value}
                      onCheckedChange={field.onChange}
                    />
                  </FormControl>
                  <div className="space-y-1 leading-none !mt-0">
                    <FormLabel>
                      Free For Preview
                    </FormLabel>
                    <FormDescription>
                      Check this box if you want to make this chapter free for preview
                    </FormDescription>
                  </div>
                  <FormMessage />
                </FormItem>
              )}
            ></FormField>
            <div className="flex items-center gap-x-2">
              <Button disabled={!isValid || isSubmitting} type="submit">
                Submit
              </Button>
            </div>
          </form>
        </Form>
      ) : (
        <p
          className={cn(
            "mt-0 text-sm",
            !initialData.isFree && "text-muted-foreground italic"
          )}
        >
          {initialData.isFree ? "This chapter is free for preview" : "This chapter is not free"}
        </p>
      )}
    </div>
  );
};

export default ChapterAccessFormForm;