"use client";

import { ourFileRouter } from "@/app/api/uploadthing/core";
import { UploadDropzone } from "@/lib/uploadthing";
import { cn } from "@/lib/utils";
import { toast } from "sonner";

interface FileUploadProps {
  onChange: (url?: string) => void;
  endpoint: keyof typeof ourFileRouter;
  className?: string;
}

export const FileUpload = ({ onChange, endpoint, className }: FileUploadProps) => {
  return (
    <UploadDropzone
      className={cn("border border-border border-solid h-60 text-muted-foreground", className)}
      endpoint={endpoint}
      onClientUploadComplete={(res) => {
        onChange(res?.[0].url);
      }}
      onUploadError={(error: Error) => {
        toast.error(`${error?.message}`);
        console.log(`${error}`);
      }}
    />
  );
};
