"use client";

import * as z from "zod";
import axios from "axios";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { Button } from "@/components/ui/button";
import { MdOutlineCancel, MdQuestionMark } from "react-icons/md";
import { useMemo, useState } from "react";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from "@/components/ui/form";
import { BiLoader } from "react-icons/bi";
import { toast } from "sonner";
import { useRouter } from "next/navigation";
import { Chapter } from "@prisma/client";
import { BiSolidVideoPlus } from "react-icons/bi";
import { FaFileVideo } from "react-icons/fa6";
import { Input } from "@/components/ui/input";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import dynamic from "next/dynamic";
import { RiVideoUploadLine } from "react-icons/ri";

interface ChapterVideoFormProps {
  initialData: Chapter;
  courseId: string;
  chapterId: string;
}
const formSchema = z.object({
  videoUrl: z.string(),
});

const ChapterVideoForm = ({
  initialData,
  courseId,
  chapterId,
}: ChapterVideoFormProps) => {
  const ReactPlayer = useMemo(
    () => dynamic(() => import("react-player"), { ssr: false }),
    []
  );
  const [isEditing, setIsEditing] = useState(false);
  const toggleEdit = () => setIsEditing((current) => !current);
  const router = useRouter();

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      videoUrl: initialData?.videoUrl || "",
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
      <div className="font-medium text-lg flex items-center justify-between">
        <span className="flex items-center justify-center gap-2 text-xl">
          {isSubmitting && <BiLoader className="animate-spin w-5 h-5" />}
          Chapter Video
        </span>
        <Button variant={"ghost"} onClick={toggleEdit} disabled={isSubmitting}>
          {isEditing && (
            <>
              <MdOutlineCancel className="h-4 w-4 mr-2" />
              Cancel
            </>
          )}
          {!isEditing && !initialData.videoUrl && (
            <>
              <BiSolidVideoPlus className="h-4 w-4 mr-2" />
              Add Video
            </>
          )}
          {!isEditing && initialData.videoUrl && (
            <>
              <RiVideoUploadLine className="h-4 w-4 mr-2" />
              Change Video
            </>
          )}
        </Button>
      </div>
      {isEditing && (
        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(onSubmit)}
            className="space-y-4 mt-3"
          >
            <FormField
              control={form.control}
              name="videoUrl"
              render={({ field }) => (
                <FormItem className="flex items-center flex-wrap">
                  <FormControl>
                    <Input
                      disabled={isSubmitting}
                      placeholder="https://www.youtube.com/watch?v=..."
                      {...field}
                      className="w-[calc(100%-50px)] mr-2"
                    />
                  </FormControl>
                  <Dialog>
                    <DialogTrigger asChild>
                      <Button
                        size={"icon"}
                        variant={"outline"}
                        className="!mt-0"
                        type="button"
                      >
                        <MdQuestionMark className="h-4 w-4" />
                      </Button>
                    </DialogTrigger>
                    <DialogContent>
                      <DialogHeader>
                        <DialogTitle>How should be the url?</DialogTitle>
                      </DialogHeader>
                      <DialogDescription>
                        <Table>
                          <TableCaption>A list of allowed URLs</TableCaption>
                          <TableHeader>
                            <TableRow>
                              <TableHead className="font-bold">
                                Platform
                              </TableHead>
                              <TableHead className="font-bold">URL</TableHead>
                            </TableRow>
                          </TableHeader>
                          <TableBody>
                            <TableRow>
                              <TableCell>Youtube</TableCell>
                              <TableCell>
                                https://www.youtube.com/watch?v=...
                              </TableCell>
                            </TableRow>
                            <TableRow>
                              <TableCell>Sound Cloud</TableCell>
                              <TableCell>https://soundcloud.com/...</TableCell>
                            </TableRow>
                            <TableRow>
                              <TableCell>Facebook</TableCell>
                              <TableCell>
                                https://www.facebook.com/facebook/videos/...
                              </TableCell>
                            </TableRow>
                            <TableRow>
                              <TableCell>Vimeo</TableCell>
                              <TableCell>https://vimeo.com/...</TableCell>
                            </TableRow>
                            <TableRow>
                              <TableCell>Twitch</TableCell>
                              <TableCell>
                                https://www.twitch.tv/videos/...
                              </TableCell>
                            </TableRow>
                            <TableRow>
                              <TableCell>Streamable</TableCell>
                              <TableCell>https://streamable.com/...</TableCell>
                            </TableRow>
                            <TableRow>
                              <TableCell>Daily Motion</TableCell>
                              <TableCell>
                                https://www.dailymotion.com/video/...
                              </TableCell>
                            </TableRow>
                          </TableBody>
                        </Table>
                      </DialogDescription>
                    </DialogContent>
                  </Dialog>

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
                Save
              </Button>
            </div>
          </form>
        </Form>
      )}
      {!isEditing && initialData.videoUrl && (
        <div className="relative aspect-video mt-2 !aspect-video">
          <ReactPlayer
            url={initialData.videoUrl}
            controls
            width={"100%"}
            height={"100%"}
            style={{ borderRadius: 15, overflow: "hidden", zIndex: 10 }}
            className=" !h-full !w-full !max-h-none !max-w-none"
          />
        </div>
      )}
      {!isEditing && !initialData.videoUrl && (
        <>
          <div className="my-2 !aspect-video">
            <ReactPlayer
              url={"."}
              controls
              width={"100%"}
              height={"100%"}
              style={{ borderRadius: 15, overflow: "hidden", zIndex: 10 }}
              className="!aspect-video !h-full !w-full max-h-none max-w-none"
            />
          </div>
          <span className="text-xs text-muted-foreground pt-6">
            * No Video has Found
          </span>
        </>
      )}
    </div>
  );
};

export default ChapterVideoForm;
