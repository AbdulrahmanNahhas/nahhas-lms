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
  FormField,
  FormItem,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { TbLoader3 } from "react-icons/tb";
import { toast } from "sonner";
import { useRouter } from "next/navigation";
import { Course } from "@prisma/client";
import { BiSolidImageAdd } from "react-icons/bi";
import { MdOutlineImagesearchRoller } from "react-icons/md";
import { FaImage } from "react-icons/fa6";
import Image from "next/image";
import { FileUpload } from "@/components/FileUpload";

interface ImageFormProps {
  initialData: Course;
  courseId: string;
}

const formSchema = z.object({
  imageUrl: z.string().min(1, {
    message: "Image is required",
  }),
});

const ImageForm = ({ initialData, courseId }: ImageFormProps) => {
  const [isEditing, setIsEditing] = useState(false);
  const toggleEdit = () => setIsEditing((current) => !current);
  const router = useRouter();

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      imageUrl: initialData?.imageUrl || "",
    },
  });

  const { isSubmitting, isValid } = form.formState;

  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    try {
      await axios.patch(`/api/courses/${courseId}`, values);
      toast.success("Course Updated!");
      toggleEdit();
      router.refresh();
    } catch (error) {
      toast.error("Something went wrong");
    }
  };

  return (
    <div className=" border bg-accent/50 dark:bg-accent/20 rounded-lg p-4  ">
      <div className="font-medium text-lg flex items-start justify-between">
        Course Image
        <Button variant={"ghost"} onClick={toggleEdit} disabled={isSubmitting}>
          {isEditing && (
            <>
              <MdOutlineCancel className="h-4 w-4 mr-2" />
              Cancel
            </>
          )}
          {!isEditing && !initialData.imageUrl && (
            <>
              <BiSolidImageAdd className="h-4 w-4 mr-2" />
              Add Image
            </>
          )}
          {!isEditing && initialData.imageUrl && (
            <>
              <MdOutlineImagesearchRoller className="h-4 w-4 mr-2" />
              Edit Image
            </>
          )}
        </Button>
      </div>
      {isEditing && (
        <div>
          <Form {...form}>
            <form
              onSubmit={form.handleSubmit(onSubmit)}
              className="space-y-4 xl:space-y-0 mt-3 xl:flex xl:gap-2 xl:w-full xl:justify-start xl:items-start"
            >
              <FormField
                control={form.control}
                name="imageUrl"
                render={({ field }) => (
                  <FormItem className="w-full">
                    <FormControl>
                      <Input
                        disabled={isSubmitting}
                        placeholder="https://images.com/imageUrl"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              ></FormField>
              <div className="flex items-center gap-x-2">
                <Button disabled={!isValid || isSubmitting} type="submit" variant="default">
                  {!isValid ||
                    (isSubmitting && (
                      <TbLoader3 className="mr-1 animate-spin" />
                    ))}
                  Save
                </Button>
              </div>
            </form>
          </Form>
          <FileUpload
            endpoint="courseImage"
            onChange={(url) => {
              if (url) {
                onSubmit({ imageUrl: url });
              }
            }}
            className="opacity-50 cursor-not-allowed"
          />
          <div className="text-xs text-muted-foreground mt-4">
            {/* 16:9 aspect ratio recommended */}
            Image uploading is not available right now.
          </div>
        </div>
      )}
      {!isEditing && initialData.imageUrl && (
        <div className="relative aspect-video mt-2">
          <img
            src={initialData.imageUrl}
            alt="Course Image"
            className="object-cover aspect-video rounded-xl"
          />
        </div>
      )}
      {!isEditing && !initialData.imageUrl && (
        <div className="flex items-center justify-center h-60 bg-accent rounded-xl mt-2 cursor-not-allowed">
          <FaImage className="h-10 w-10 text-muted-foreground" />
        </div>
      )}
    </div>
  );
};

export default ImageForm;
