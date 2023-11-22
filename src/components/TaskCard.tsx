import { useSortable } from "@dnd-kit/sortable";
import { Task } from "@/lib/types";
import { CSS } from "@dnd-kit/utilities";
import { cva } from "class-variance-authority";
import { Button } from "./ui/button";
import { TrashIcon } from "@radix-ui/react-icons";

interface TaskCardProps {
    task: Task;
    isOverlay?: boolean;
    deleteTask: CallableFunction;
}

const TaskCard = ({ task, isOverlay, deleteTask }: TaskCardProps) => {
    const {
        setNodeRef,
        attributes,
        listeners,
        transform,
        transition,
        isDragging,
    } = useSortable({ id: task.id, data: { type: "Task", task } });

    const style = {
        transition,
        transform: CSS.Transform.toString(transform),
    };

    const variants = cva("", {
        variants: {
            dragging: {
                over: "ring-2 ring-orange-200 opacity-30",
                overlay: "ring-2 ring-orange-400 dark:text-stone-50",
            },
        },
    });

    const onTaskDelete = () => {
        deleteTask(task);
    };

    return (
        <div className="flex items-center justify-between bg-slate-50 dark:bg-stone-600 rounded-lg p-4 shadow-md group">
            <div
                ref={setNodeRef}
                {...attributes}
                {...listeners}
                style={style}
                className={variants({
                    dragging: isOverlay
                        ? "overlay"
                        : isDragging
                        ? "over"
                        : undefined,
                })}
            >
                {task.content}
            </div>
            <Button
                onClick={onTaskDelete}
                size={"sm"}
                variant={"destructive"}
                className="opacity-0 group-hover:opacity-100 transition-opacity"
            >
                <TrashIcon />
            </Button>
        </div>
    );
};

export default TaskCard;
