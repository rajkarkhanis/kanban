import { initialLists, initialTasks } from "@/lib/types";
import { DndContext } from "@dnd-kit/core";
import { SortableContext } from "@dnd-kit/sortable";
import { useMemo, useState } from "react";
import TaskList from "./TaskList";

const KanbanBoard = () => {
    const [tasks] = useState(initialTasks);
    const [lists] = useState(initialLists);
    
    const listIds = useMemo(() => lists.map((c) => c.id), [lists]);

    return (
        <DndContext>
            <SortableContext items={listIds}>
                {lists.map((list) => (
                    <TaskList
                        key={list.id}
                        list={list}
                        tasks={tasks.filter((t) => t.columnId === list.id)}
                    />
                ))}
            </SortableContext>
        </DndContext>
    );
};

export default KanbanBoard;
