import { List, Task, initialLists, initialTasks } from "@/lib/types";
import {
    DndContext,
    DragEndEvent,
    DragOverEvent,
    DragOverlay,
    DragStartEvent,
    MouseSensor,
    TouchSensor,
    useSensor,
    useSensors,
} from "@dnd-kit/core";
import { SortableContext, arrayMove } from "@dnd-kit/sortable";
import { useMemo, useState } from "react";
import TaskList from "./TaskList";
import TaskCard from "./TaskCard";

const KanbanBoard = () => {
    const [tasks, setTasks] = useState(initialTasks);
    const [lists, setLists] = useState(initialLists);

    const [activeList, setActiveList] = useState<List | null>(null);
    const [activeTask, setActiveTask] = useState<Task | null>(null);

    const listIds = useMemo(() => lists.map((c) => c.id), [lists]);
    const sensors = useSensors(useSensor(MouseSensor), useSensor(TouchSensor));

    const onDragStart = (event: DragStartEvent) => {
        console.log(event);
        const currentElement = event.active.data.current;

        if (currentElement?.type === "List") {
            setActiveList(currentElement?.list);
            return;
        }

        if (currentElement?.type === "Task") {
            setActiveTask(currentElement?.task);
            return;
        }
    };

    const onDragOver = (event: DragOverEvent) => {
        console.log(event);

        const { active, over } = event;

        // Task was not dragged over anything
        if (!over) return;

        // Task was dragged over itself
        if (over.id === active.id) return;

        const isActiveATask = active.data.current?.type === "Task";
        const isOverATask = over.data.current?.type === "Task";

        // Switch position of two tasks
        if (isActiveATask && isOverATask) {
            const activeIndex = tasks.findIndex((t) => t.id === active.id);
            const overIndex = tasks.findIndex((t) => t.id === over.id);

            // if task is being dragged on top of a task from another list
            if (tasks[activeIndex].columnId !== tasks[overIndex].columnId) {
                tasks[activeIndex].columnId = tasks[overIndex].columnId;
                const newTasks = arrayMove(tasks, activeIndex, overIndex - 1);
                setTasks(newTasks);
                return;
            }

            const newTasks = arrayMove(tasks, activeIndex, overIndex);
            setTasks(newTasks);
            return;
        }

        // if task is being dragged over empty spot in a list
        const isOverAList = over.data.current?.type === "List";

        if (isActiveATask && isOverAList) {
            const activeIndex = tasks.findIndex((t) => t.id === active.id);
            tasks[activeIndex].columnId = over.id as number;
            const newTasks = arrayMove(tasks, activeIndex, activeIndex);
            setTasks(newTasks);
            return;
        }
    };

    const onDragEnd = (event: DragEndEvent) => {
        setActiveList(null);
        setActiveTask(null);
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
            sensors={sensors}
            onDragStart={onDragStart}
            onDragOver={onDragOver}
            onDragEnd={onDragEnd}
        >
            <div className="flex flex-col items-center w-full min-h-screen bg-stone-50 dark:bg-stone-800 gap-8 lg:flex-row lg:justify-evenly p-8">
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
                {activeTask && <TaskCard task={activeTask} isOverlay />}
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
