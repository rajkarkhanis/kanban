import { useSortable } from "@dnd-kit/sortable";
import { Task } from "@/lib/types";
import { CSS } from "@dnd-kit/utilities";
import { cva } from "class-variance-authority";

interface TaskCardProps {
    task: Task;
    isOverlay?: boolean;
}

const TaskCard = ({ task, isOverlay }: TaskCardProps) => {
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

    const variants = cva("bg-white dark:bg-stone-600 p-4 rounded-lg shadow-md", {
        variants: {
            dragging: {
                over: "ring-2 ring-orange-200 opacity-30",
                overlay: "ring-2 ring-orange-400 dark:text-stone-50",
            },
        },
    });

    return (
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
    );
};

export default TaskCard;
