export interface List {
    id: number;
    title: string;
}

export interface Task {
    id: number;
    columnId: number;
    content: string;
}

export const initialLists: List[] = [
    { id: 1, title: "To-Do" },
    { id: 2, title: "In Progress" },
    { id: 3, title: "Done" },
];

export const initialTasks: Task[] = [
    {
        id: 4,
        columnId: 3,
        content: "Project initiation and planning",
    },
    {
        id: 5,
        columnId: 3,
        content: "Gather requirements from stakeholders",
    },
    {
        id: 6,
        columnId: 3,
        content: "Create wireframes and mockups",
    },
    {
        id: 7,
        columnId: 2,
        content: "Develop homepage layout",
    },
    {
        id: 8,
        columnId: 2,
        content: "Design color scheme and typography",
    },
    {
        id: 9,
        columnId: 1,
        content: "Implement user authentication",
    },
    {
        id: 10,
        columnId: 1,
        content: "Build contact us page",
    },
    {
        id: 11,
        columnId: 1,
        content: "Create product catalog",
    },
    {
        id: 12,
        columnId: 1,
        content: "Develop about us page",
    },
    {
        id: 13,
        columnId: 1,
        content: "Optimize website for mobile devices",
    },
    {
        id: 14,
        columnId: 1,
        content: "Integrate payment gateway",
    },
    {
        id: 15,
        columnId: 1,
        content: "Perform testing and bug fixing",
    },
    {
        id: 16,
        columnId: 1,
        content: "Launch website and deploy to server",
    },
];
