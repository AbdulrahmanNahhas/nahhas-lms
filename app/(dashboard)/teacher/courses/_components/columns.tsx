"use client";

import { Button } from "@/components/ui/button";
import { Course } from "@prisma/client";
import { ColumnDef } from "@tanstack/react-table";
import { ArrowUpDown, ClipboardIcon, Edit2, Eye, Trash2 } from "lucide-react";
import { MoreHorizontal } from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import Link from "next/link";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { toast } from "sonner";
import axios from "axios";
import { useRouter } from "next/navigation";
import { Badge } from "@/components/ui/badge";
import { AiFillEyeInvisible } from "react-icons/ai";
import { formatPrice } from "@/lib/formats";

export const columns: ColumnDef<Course>[] = [
  {
    accessorKey: "title",
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Title
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      );
    },
    enableHiding: false,
  },
  {
    accessorKey: "price",
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Price
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      );
    },
    cell: ({row}) => {
      const price = parseFloat(row.getValue("price"));
      const formatted = Intl.NumberFormat("en-US", {
        style: "currency",
        currency: "TRY"
      }).format(price);

      return (
        <Badge variant={price === 0 ? "secondary": "outline"} className={price !== 0 && price !== null ? " bg-transparent border-transparent" : ""}>
          {price === 0 && "For Free"}
          {price === null && "Undefined"}
          {price !== 0 && price !== null && (
            <>{formatted}</>
          )}
        </Badge>
      )
    }
  },
  {
    accessorKey: "isPublished",
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Published
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      );
    },
    cell: ({row}) => {
      const isPublished = row.getValue("isPublished") || false;

      return (
        <Badge variant={isPublished ? "default": "secondary"}>
          {isPublished ? "Published" : <><AiFillEyeInvisible className="mr-1"/> Draft</>}
        </Badge>
      )
    }
  },
  {
    id: "actions",
    cell: ({ row }) => {
      const course = row.original;
      const router = useRouter();
      const onDelete = async () => {
        try {
          await axios.delete(`/api/courses/${course.id}`);
          toast.success("Course deleted!");
          router.refresh();
        } catch (error) {
          toast.error("Something went wrong!");
        }
      };

      return (
        <AlertDialog>
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" className="h-8 w-8 p-0">
                <span className="sr-only">Open menu</span>
                <MoreHorizontal className="h-4 w-4" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="w-[200px]">
              <DropdownMenuLabel>Actions</DropdownMenuLabel>
              <DropdownMenuItem
                onClick={() => navigator.clipboard.writeText(course.id)}
              >
                <ClipboardIcon className="w-4 h-4 mr-2" />
                Copy Course ID
              </DropdownMenuItem>
              <DropdownMenuSeparator />
              <Link href={`/courses/${course.id}`}>
                <DropdownMenuItem>
                  <Eye className="w-4 h-4 mr-2" />View Course</DropdownMenuItem>
              </Link>
              <Link href={`/teacher/courses/${course.id}`}>
                <DropdownMenuItem>
                  <Edit2 className="w-4 h-4 mr-2" />
                  Edit Course Details
                </DropdownMenuItem>
              </Link>
              <DropdownMenuSeparator />
              <DropdownMenuItem asChild>
                <AlertDialogTrigger className="flex gap-1 items-center w-full">
                  <>
                    <Trash2 className="w-4 h-4 mr-2" />
                    Delete Course
                  </>
                </AlertDialogTrigger>
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
          <AlertDialogContent>
            <AlertDialogHeader>
              <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
              <AlertDialogDescription>
                This action cannot be undone. This will permanently delete this
                chapter and remove it's data from our database.
              </AlertDialogDescription>
            </AlertDialogHeader>
            <AlertDialogFooter>
              <AlertDialogCancel>Cancel</AlertDialogCancel>
              <AlertDialogAction asChild onClick={onDelete}>
                <Button
                  variant="destructive"
                  className="bg-destructive text-destructive-foreground hover:bg-destructive/75"
                >
                  Delete
                </Button>
              </AlertDialogAction>
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialog>
      );
    },
    enableHiding: false,
  }
];
