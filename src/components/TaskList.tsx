import { List, Task } from "@/lib/types";
import { Card, CardContent, CardHeader, CardTitle } from "./ui/card";
import { useMemo } from "react";
import { SortableContext } from "@dnd-kit/sortable";
import TaskCard from "./TaskCard";

interface TaskListProps {
    list: List;
    tasks: Task[];
}

const TaskList = ({ list, tasks }: TaskListProps) => {
    const taskIds = useMemo(() => tasks.map((t) => t.id), [tasks]);

    return (
        <Card>
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
