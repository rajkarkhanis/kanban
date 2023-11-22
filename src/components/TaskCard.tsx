import { useSortable } from "@dnd-kit/sortable";
import { Card, CardContent } from "./ui/card";
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

    const variants = cva("", {
        variants: {
            dragging: {
                over: "ring-2 ring-orange-200 opacity-30",
                overlay: "ring-2 ring-orange-400",
            },
        },
    });

    return (
        <Card
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
            <CardContent>{task.content}</CardContent>
        </Card>
    );
};

export default TaskCard;
