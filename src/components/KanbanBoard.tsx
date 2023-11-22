import { List, initialLists, initialTasks } from "@/lib/types";
import {
    DndContext,
    DragEndEvent,
    DragOverEvent,
    DragOverlay,
    DragStartEvent,
} from "@dnd-kit/core";
import { SortableContext, arrayMove } from "@dnd-kit/sortable";
import { useMemo, useState } from "react";
import TaskList from "./TaskList";

const KanbanBoard = () => {
    const [tasks] = useState(initialTasks);
    const [lists, setLists] = useState(initialLists);

    const [activeList, setActiveList] = useState<List | null>(null);

    const listIds = useMemo(() => lists.map((c) => c.id), [lists]);

    const onDragStart = (event: DragStartEvent) => {
        console.log(event);
        const currentElement = event.active.data.current;

        if (currentElement?.type === "List") {
            setActiveList(currentElement?.list);
            return;
        }
    };

    const onDragOver = (event: DragOverEvent) => {
        console.log(event);
    };

    const onDragEnd = (event: DragEndEvent) => {
        setActiveList(null);
        const { active, over } = event;

        // if List was not dragged over anything
        if (!over) return;

        // if List was dragged, but over itself
        if (active.id === over.id) return;

        // are we actually dragging a list?
        const isActiveAList = active.data.current?.type === "List";
        if (!isActiveAList) return;

        const activeIndex = lists.findIndex((l) => l.id === active.id);
        const overIndex = lists.findIndex((l) => l.id === over?.id);

        const newLists = arrayMove(lists, activeIndex, overIndex);
        setLists(newLists);
    };

    return (
        <DndContext
            onDragStart={onDragStart}
            onDragOver={onDragOver}
            onDragEnd={onDragEnd}
        >
            <div className="flex gap-4 items-center flex-row justify-center">
                <SortableContext items={listIds}>
                    {lists.map((list) => (
                        <TaskList
                            key={list.id}
                            list={list}
                            tasks={tasks.filter((t) => t.columnId === list.id)}
                        />
                    ))}
                </SortableContext>
            </div>
            <DragOverlay>
                {activeList && (
                    <TaskList
                        isOverlay
                        list={activeList}
                        tasks={tasks.filter(
                            (t) => t.columnId === activeList.id
                        )}
                    />
                )}
            </DragOverlay>
        </DndContext>
    );
};

export default KanbanBoard;
