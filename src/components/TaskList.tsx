import { List, Task } from "@/lib/types";
import { useMemo } from "react";
import { SortableContext, useSortable } from "@dnd-kit/sortable";
import TaskCard from "./TaskCard";
import { CSS } from "@dnd-kit/utilities";
import { cva } from "class-variance-authority";
import { DragHandleDots2Icon } from "@radix-ui/react-icons";

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
        "flex flex-col h-[500px] max-h-[500px] w-[350px] max-w-full overflow-y-auto overflow-x-hidden snap-center bg-stone-100 dark:bg-stone-700 dark:text-stone-50 gap-4 p-4 rounded-lg shadow-md",
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
            <div
                className="flex items-center gap-4"
                {...attributes}
                {...listeners}
            >
                <DragHandleDots2Icon />
                <span className="font-bold text-lg">{list.title}</span>
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
