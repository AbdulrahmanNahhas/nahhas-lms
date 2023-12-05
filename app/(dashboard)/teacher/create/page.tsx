"use client";

import axios from "axios"
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import * as z from "zod";

import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Button, buttonVariants } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import { Loader2 } from "lucide-react";
import Link from "next/link";

const formSchema = z.object({
  title: z.string().min(3, {
    message: "Title must be at least : characters.",
  }),
});

function CreateCourse() {
  const router = useRouter();
  // My form.
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      title: "",
    },
  });

  const {isValid, isSubmitting} = form.formState;

  // Submit handler.
  const onSubmit = async (values: z.infer<typeof formSchema>) => { 

    try {
      const respone = await axios.post("/api/courses", values)
      router.push(`courses/${respone.data.id}`)
      toast.success('Course Created Successfuly!');
    } catch {
      toast.error('Something went wrong');
    }
  }

  return (
    <div className="md:p-6 py-6 md:py-10 container max-w-2xl h-full flex flex-col items-start justify-center">
      {/* <div className="border py-2 px-3 rounded-lg inline-flex gap-2 mb-4 mx-auto">
        <span>Name</span>
        <span>/</span>
        <span className="opacity-50 cursor-not-allowed">Category</span>
      </div> */}
      <h1 className="font-bold text-xl sm:text-2xl md:text-3xl">Name your Course</h1>
      <p className="text-muted-foreground mt-1 text-sm sm:text-base">
        What would you like to name your course?
        Don&apos;t worry, you can change this later.
      </p>
      {/* <hr className="my-4" /> */}
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8 mt-6 w-full">
          <FormField
            control={form.control}
            name="title"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Course Title</FormLabel>
                <FormControl>
                  <Input placeholder="e.g. 'Advanced web development'" {...field} />
                </FormControl>
                <FormDescription>
                  What will you teach in this course?
                </FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />
          <div className="flex w-full items-center justify-end gap-2 ml-auto">
          <Link href="" type="button" className={buttonVariants({variant:"ghost"})}>Cancel</Link>
          <Button type="submit" disabled={!isValid || isSubmitting}>{!isValid || isSubmitting && <Loader2 className="mr-1 animate-spin p-1" />} Create Course</Button>
          </div>
        </form>
      </Form>
    </div>
  );
}

export default CreateCourse;