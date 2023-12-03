"use client";

import { Chapter } from "@prisma/client";
import { useEffect, useState } from "react";
import { DragDropContext, Droppable, Draggable, DropResult } from "@hello-pangea/dnd";
import { MdDragIndicator } from "react-icons/md";
import { cn } from "@/lib/utils";
import { Badge } from "@/components/ui/badge";
import { FaPencil } from "react-icons/fa6";
import { AiFillEyeInvisible } from "react-icons/ai";

interface ChaptersListProps {
  items: Chapter[];
  onReorder: (updateData: { id: string; position: number }[]) => void;
  onEdit: (id: string) => void;
}

const ChaptersList = ({ items, onEdit, onReorder }: ChaptersListProps) => {
  const [isMounted, setIsMounted] = useState(false);
  const [chapters, setChapters] = useState(items);

  useEffect(() => {
    setIsMounted(true);
  }, [])

  useEffect(() => {
    setChapters(items);
  }, [items])

  if (!isMounted) {
    return null
  }

  const onDragEnd = (result: DropResult) => {
    if (!result.destination) return;

    const items = Array.from(chapters);
    const [reorderedItem] = items.splice(result.source.index, 1);
    items.splice(result.destination.index, 0, reorderedItem);

    const startIndex = Math.min(result.source.index, result.destination.index);
    const endIndex = Math.max(result.source.index, result.destination.index);

    const updatedChapters = items.slice(startIndex, endIndex + 1);

    setChapters(items);

    const bulkUpdateData = updatedChapters.map((chapter) => ({
      id: chapter.id,
      position: items.findIndex((item) => item.id === chapter.id)
    }));

    onReorder(bulkUpdateData);
  }

  return (
    <DragDropContext onDragEnd={onDragEnd}>
      <Droppable droppableId="chapters">
        {(provided) => (
          <div {...provided.droppableProps} ref={provided.innerRef}>
            {chapters.map((chapter, index) => (
              <Draggable 
                key={chapter.id} 
                draggableId={chapter.id} 
                index={index}
              >
                {(provided) => (
                  <div
                    className={cn(
                      "flex items-center gap-x-2 bg-slate-100 dark:bg-accent/25 border text-foreground rounded-md mb-4 text-sm overflow-hidden",
                      chapter.isPublished && "bg-sky-100 border-sky-200 text-sky-700"
                    )}
                    ref={provided.innerRef}
                    {...provided.draggableProps}
                  >
                    <div
                      className={cn(
                        "px-2 py-3 border-r hover:bg-slate-300 dark:hover:bg-accent transition",
                        chapter.isPublished && "border-r-sky-200 hover:bg-sky-200"
                      )}
                      {...provided.dragHandleProps}
                    >
                      <MdDragIndicator
                        className="h-5 w-5"
                      />
                    </div>
                    {chapter.title}
                    <div className="ml-auto pr-2 flex items-center gap-x-2">
                      <AiFillEyeInvisible className={chapter.isPublished ? "!hidden" : "noselect cursor-default block md:hidden lg:block xl:hidden w-4 h-4 hover:opacity-80 text-muted-foreground"} />
                      {!chapter.isFree && (
                        <Badge className="px-[7px] noselect cursor-default">
                          Free
                        </Badge>
                      )}
                      <Badge variant="outline" className="noselect cursor-default bg-accent/25 hover:bg-slate-200 dark:hover:bg-accent/60 font-normal text-xs px-2 hidden md:block lg:hidden xl:block" >
                        {chapter.isPublished ? "Published" : "Draft"}
                      </Badge>
                      <FaPencil
                        onClick={() => onEdit(chapter.id)}
                        className="w-4 h-4 cursor-pointer hover:opacity-80 mr-1 py-[0.5px]"
                      />
                    </div>
                  </div>
                )}
              </Draggable>
            ))}
            {provided.placeholder}
          </div>
        )}
      </Droppable>
    </DragDropContext>
  );
};

export default ChaptersList;
