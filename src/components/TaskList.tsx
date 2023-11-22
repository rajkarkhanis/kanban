import { List, Task } from "@/lib/types";
import { useMemo } from "react";
import { SortableContext, useSortable } from "@dnd-kit/sortable";
import TaskCard from "./TaskCard";
import { CSS } from "@dnd-kit/utilities";
import { cva } from "class-variance-authority";
import { DragHandleDots2Icon, TrashIcon } from "@radix-ui/react-icons";
import { Button } from "./ui/button";

interface TaskListProps {
    list: List;
    tasks: Task[];
    deleteList: CallableFunction;
    isOverlay?: boolean;
}

const TaskList = ({ list, tasks, isOverlay, deleteList }: TaskListProps) => {
    const taskIds = useMemo(() => tasks.map((t) => t.id), [tasks]);

    const {
        setNodeRef,
        attributes,
        listeners,
        transform,
        transition,
        isDragging,
    } = useSortable({ id: list.id, data: { type: "List", list } });

    const style = {
        transition,
        transform: CSS.Transform.toString(transform),
    };

    const variants = cva(
        "flex flex-col h-96 w-80 shrink-0 overflow-y-auto snap-center bg-stone-100 dark:bg-stone-700 dark:text-stone-50 gap-4 p-4 rounded-lg shadow-md",
        {
            variants: {
                dragging: {
                    default: "border-2 border-transparent",
                    over: "ring-2 ring-orange-200 opacity-30",
                    overlay: "ring-2 ring-orange-400",
                },
            },
        }
    );

    const onListDelete = () => {
        deleteList(list);
    };

    return (
        <div
            ref={setNodeRef}
            style={style}
            className={variants({
                dragging: isOverlay
                    ? "overlay"
                    : isDragging
                    ? "over"
                    : undefined,
            })}
        >
            <div className="flex justify-between group">
                <div
                    className="flex items-center gap-4"
                    {...attributes}
                    {...listeners}
                >
                    <DragHandleDots2Icon />
                    <span className="font-bold text-lg">{list.title}</span>
                </div>
                <Button
                    onClick={onListDelete}
                    size={"sm"}
                    variant={"destructive"}
                    className="opacity-0 group-hover:opacity-100 transition-opacity flex items-center gap-2"
                >
                    <TrashIcon />
                </Button>
            </div>
            <SortableContext items={taskIds}>
                {tasks.map((task) => (
                    <TaskCard key={task.id} task={task} />
                ))}
            </SortableContext>
        </div>
    );
};

export default TaskList;
