"use client";

import * as z from "zod";
import axios from "axios";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { Button } from "@/components/ui/button";
import { MdOutlineCancel } from "react-icons/md";
import { useState } from "react";
import { BiLoader } from "react-icons/bi";
import { toast } from "sonner";
import { useRouter } from "next/navigation";
import { Course } from "@prisma/client";
import { BiSolidImageAdd } from "react-icons/bi";
import { MdOutlineImagesearchRoller } from "react-icons/md";
import { FaImage } from "react-icons/fa6";
import FileUpload from "@/components/FileUpload";
import { CldImage } from "next-cloudinary";
import { getPublicIdFromCloudinaryURL } from "@/lib/formats";
// import { FileUpload } from "@/components/FileUpload";

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
        <span className="flex items-center justify-center gap-2">
          {isSubmitting && <BiLoader className="animate-spin w-5 h-5" />}
          <span>
            Course Image <span className="text-red-500">*</span>
          </span>
        </span>
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
          {/* <Form {...form}>
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
                <Button
                  disabled={!isValid || isSubmitting}
                  type="submit"
                  variant="default"
                >
                  {!isValid ||
                    (isSubmitting && (
                      <BiLoader className="mr-1 animate-spin" />
                    ))}
                  Save
                </Button>
              </div>
            </form>
          </Form> */}
          <div>
            <FileUpload
              onChange={(url) => {
                if (url) {
                  onSubmit({ imageUrl: url });
                }
              }}
            />
          </div>
          <span className="text-xs text-muted-foreground mt-4">
            16:9 aspect ratio recommended
          </span>
        </div>
      )}
      {!isEditing && initialData.imageUrl && (
        <div className="relative aspect-video mt-2">
          {/* https://res.cloudinary.com/dceqm5pnu/image/upload/v1701449387/courses_images/bpghnhllevcducufgsdm.jpg */}
          <CldImage
            aspectRatio="video"
            width={1600}
            height={900}
            src={getPublicIdFromCloudinaryURL(initialData.imageUrl)}
            alt={"Image"}
            className="rounded-3xl border"
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
