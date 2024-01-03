"use client";

import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Edit } from "lucide-react";
import axios from "axios";
import { useState } from "react";
import { cn } from "@/lib/utils";
import { avatarDecorations } from "@/config/avatar-decorations";
import { toast } from "sonner";
import { redirect, useRouter } from "next/navigation";

interface AvatarDialogProps {
  xp: number;
  image: string;
}

const AvatarDialog = ({ xp, image }: AvatarDialogProps) => {
  const [selectedDecoration, setSelectedDecoration] = useState(image);
  const [isLoading, setIsLoading] = useState(false);
  const [open, setOpen] = useState(false);
  const router = useRouter();

  const onSubmit = async () => {
    try{
      setIsLoading(true)
      await axios.post(`/api/user`, {
        image: selectedDecoration,
      });
      toast.success(("Avatar Decoration Changed!!"));
      setOpen(false);
      return router.push("/dashboard");
    } catch (error) {
      setIsLoading(false)
      toast.error(("something went wrong"));
    } finally {
      setIsLoading(false)
    }
  };

  return (
    <Dialog open={open} onOpenChange={() => setOpen(!open)}>
      <DialogTrigger asChild onClick={() => setOpen(true)}>
        <div className="bg-accent border rounded-full absolute bottom-2 right-2 cursor-pointer z-50">
          <Edit className="p-1" />
        </div>
      </DialogTrigger>
      <DialogContent
        className="max-w-[700px] max-h-[600px] overflow-scroll"
      >
        <DialogHeader>
          <DialogTitle>Change Decorations</DialogTitle>
        </DialogHeader>
        <div className="flex items-start justify-start flex-wrap">
          {avatarDecorations.map((decoration, index) => (
            <div
              className={cn(
                "flex flex-col items-start py-5 border-b w-full",
                decoration.price > xp && "!animate-pulse opacity-40"
              )}
              key={index}
            >
              <h1 className="mb-3">
                {decoration.title} ({decoration.price} XP)
              </h1>
              <div className="flex items-center justify-start flex-wrap gap-4">
                {decoration.images.map((image, index) => (
                  <Button
                    variant="secondary"
                    className={cn(
                      "!w-24 !h-24 relative p-3 rounded-[0.5rem]",
                      decoration.price < xp &&
                        selectedDecoration === `${decoration.title}-${index}`
                        ? "bg-primary/25 border border-primary hover:border-primary/50"
                        : "bg-primary/10"
                    )}
                    key={index}
                    onClick={() => {
                      if (
                        decoration.price < xp
                      ) {
                        setSelectedDecoration(`${decoration.title}-${index}`);
                      }
                    }}
                  >
                    <>
                      <img
                        src="https://external-content.duckduckgo.com/iu/?u=https%3A%2F%2Fwww.pngkey.com%2Fpng%2Ffull%2F115-1150152_default-profile-picture-avatar-png-green.png&f=1&nofb=1&ipt=88b85dc2f8a0ebacc9770b247d375e3432e8b0e5436f77376ac858f296df6157&ipo=images"
                        alt="image"
                        className="w-full h-full aspect-square"
                      />
                      <img
                        src={image}
                        alt="border"
                        className="w-full h-full aspect-square absolute top-0 right-0 p-1"
                      />
                    </>
                  </Button>
                ))}
              </div>
            </div>
          ))}
        </div>
        <DialogFooter className="flex gap-2 items-center">
          <DialogTrigger>Cancel</DialogTrigger>
          <Button 
        onClick={onSubmit} disabled={isLoading || selectedDecoration===""}>Save</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default AvatarDialog;
