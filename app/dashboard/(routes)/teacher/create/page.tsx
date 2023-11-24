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
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { toast } from "sonner";

const formSchema = z.object({
  title: z.string().min(8, {
    message: "Title must be at least 8 characters.",
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
      const respone = await axios.post("/api/course", values);
      router.push(`teacher/courses/${respone.data.id}`)
    } catch {
      toast.error('Something went wrong');
    }
  }

  return (
    <div className="md:p-6 py-6 md:py-10 container">
      <h1 className="font-bold text-xl sm:text-2xl md:text-3xl mb-6">Create a new Course</h1>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
          <FormField
            control={form.control}
            name="title"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Title</FormLabel>
                <FormControl>
                  <Input placeholder="e.g. 'Advanced web development'" {...field} />
                </FormControl>
                <FormDescription>
                  This is the public name for the course.
                </FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />
          <Button type="submit" disabled={!isValid || isSubmitting}>Create</Button>
          <Button type="button" variant={"ghost"}>Cancel</Button>
        </form>
      </Form>
    </div>
  );
}

export default CreateCourse;