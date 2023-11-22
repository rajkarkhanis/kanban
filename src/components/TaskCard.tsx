import { useSortable } from "@dnd-kit/sortable";
import { Task } from "@/lib/types";
import { CSS } from "@dnd-kit/utilities";
import { cva } from "class-variance-authority";
import { Button } from "./ui/button";
import { DragHandleDots2Icon, TrashIcon } from "@radix-ui/react-icons";

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

    const variants = cva(
        "flex items-center justify-between bg-slate-50 dark:bg-stone-600 rounded-lg p-4 shadow-md group",
        {
            variants: {
                dragging: {
                    over: "ring-2 ring-orange-200 opacity-30",
                    overlay: "ring-2 ring-orange-400 dark:text-stone-50",
                },
            },
        }
    );

    const onTaskDelete = () => {
        deleteTask(task);
    };

    const onChange = (event: React.ChangeEvent<HTMLTextAreaElement>) => {
        console.log(event.target.value);
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
            <div className="flex items-center gap-4">
                <div {...attributes} {...listeners}>
                    <DragHandleDots2Icon />
                </div>
                <textarea
                    onChange={onChange}
                    id={task.id}
                    defaultValue={task.content}
                    rows={1}
                    cols={28}
                    className="bg-inherit text-inherit resize-none focus:outline-none truncate"
                ></textarea>
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
