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
import { useState } from "react";

const formSchema = z.object({
  title: z.string().min(3, {
    message: "Title must be at least : characters.",
  }),
  author: z.string().min(1)
});

function CreateCourse() {
  const router = useRouter();
  // My form.
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      title: "",
      author: "",
    },
  });

  const [isLoading, setIsLoading] = useState(false);
  const {isValid, isSubmitting} = form.formState;

  // Submit handler.
  const onSubmit = async (values: z.infer<typeof formSchema>) => { 
    try {
      setIsLoading(true);
      toast.success(`Title: ${values.title}`);
      toast.success(`Author: ${values.author}`);
      const respone = await axios.post("/api/courses", values)
      router.push(`courses/${respone.data.id}`)
      toast.success('Please wait, The course is creating...');
    } catch {
      setIsLoading(false);
      toast.error('Something went wrong');
    }
  }

  return (
    <div className="md:p-6 py-6 md:p-10 bg-secondary/50 text-secondary-foreground md:rounded-3xl container max-w-3xl h-full flex flex-col items-start justify-center">
      <h1 className="font-bold text-xl sm:text-2xl md:text-3xl">Name your Course</h1>
      <p className="text-muted-foreground mt-1 text-sm sm:text-base">
        What would you like to name your course?
        Don&apos;t worry, you can change this later.
      </p>
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
          <FormField
            control={form.control}
            name="author"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Teacher&apos;s Name</FormLabel>
                <FormControl>
                  <Input placeholder="Abdulrahman Nahhas" {...field} />
                </FormControl>
                <FormDescription>
                  What is your name?
                </FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />
          <div className="flex w-full items-center justify-end gap-2 ml-auto">
          <Link href="/teacher/courses" type="button" className={buttonVariants({variant:"ghost"})}>Cancel</Link>
          <Button type="submit" disabled={!isValid || isSubmitting || isLoading}>{!isValid || isSubmitting || isLoading && <Loader2 className="mr-1 animate-spin p-1" />} Create Course</Button>
          </div>
        </form>
      </Form>
    </div>
  );
}

export default CreateCourse;