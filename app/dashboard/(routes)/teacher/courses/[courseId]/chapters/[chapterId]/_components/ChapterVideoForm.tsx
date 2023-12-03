"use client";

import * as z from "zod";
import axios from "axios";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { Button } from "@/components/ui/button";
import { MdOutlineCancel, MdQuestionMark } from "react-icons/md";
import { useState } from "react";
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
import ReactPlayer from "react-player";
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

interface ChapterVideoFormProps {
  initialData: Chapter;
  courseId: string;
  chapterId: string;
}

const formSchema = z.object({
  videoUrl: z.string().min(1, {
    message: "Video is required",
  }),
});

const ChapterVideoForm = ({
  initialData,
  courseId,
  chapterId,
}: ChapterVideoFormProps) => {
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
              <FaFileVideo className="h-4 w-4 mr-2" />
              Change Video
            </>
          )}
        </Button>
      </div>
      {isEditing && (
        <div>
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
                          <DialogTitle>
                            How should be the url?
                          </DialogTitle>
                        </DialogHeader>
                        <DialogDescription>
                          <Table>
                            <TableCaption>A list of allowed URLs</TableCaption>
                            <TableHeader>
                              <TableRow>
                                <TableHead className="font-bold">
                                  Platform
                                </TableHead>
                                <TableHead className="font-bold">
                                  URL
                                </TableHead>
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
                                <TableCell>
                                  https://soundcloud.com/...
                                </TableCell>
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
                                <TableCell>
                                  https://streamable.com/...
                                </TableCell>
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
                  {!isValid ||
                    (isSubmitting && (
                      <BiLoader className="mr-1 animate-spin" />
                    ))}
                  Save
                </Button>
              </div>
            </form>
          </Form>
          {/* <div>
            <FileUpload
              onChange={(url) => {
                if (url) {
                  onSubmit({ videoUrl: url });
                }
              }}
            />
          </div>
          <span className="text-xs text-muted-foreground mt-4">
            16:9 aspect ratio recommended
          </span> */}
        </div>
      )}
      {!isEditing && initialData.videoUrl && (
        <div className="relative aspect-video mt-2">
          <ReactPlayer url={initialData.videoUrl} controls width={"100%"} height={"100%"} style={{borderRadius: 15, overflow: "hidden"}}/>
        </div>
      )}
      {!isEditing && !initialData.videoUrl && (
        <>
          <div className="flex items-center justify-center h-60 bg-accent rounded-xl mt-2 cursor-not-allowed">
            <FaFileVideo className="h-10 w-10 text-muted-foreground" />
          </div>
          <span className="text-xs text-muted-foreground mt-4">
            * No Video Found
          </span>
        </>
      )}
    </div>
  );
};

export default ChapterVideoForm;
