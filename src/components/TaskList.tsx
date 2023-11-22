import { List, Task } from "@/lib/types";
import { Card, CardContent, CardHeader, CardTitle } from "./ui/card";
import { useMemo } from "react";
import { SortableContext, useSortable } from "@dnd-kit/sortable";
import TaskCard from "./TaskCard";
import { CSS } from "@dnd-kit/utilities";
import { cva } from "class-variance-authority";

interface TaskListProps {
    list: List;
    tasks: Task[];
    isOverlay?: boolean;
}

const TaskList = ({ list, tasks, isOverlay }: TaskListProps) => {
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
        "h-[500px] max-h-[500px] w-[350px] max-w-full bg-secondary flex flex-col shrink-0 snap-center",
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
            <CardHeader>
                <CardTitle>{list.title}</CardTitle>
            </CardHeader>
            <CardContent>
                <SortableContext items={taskIds}>
                    {tasks.map((task) => (
                        <TaskCard key={task.id} content={task.content} />
                    ))}
                </SortableContext>
            </CardContent>
        </Card>
    );
};

export default TaskList;
