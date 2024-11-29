import { ulid } from "ulid";
import { List, Task } from "./types";

export const generateRandomId = () => ulid();

const listOne: List = {
  id: generateRandomId(),
  title: "To Do",
};

const listTwo: List = {
  id: generateRandomId(),
  title: "In Progress",
};

const listThree: List = {
  id: generateRandomId(),
  title: "Done",
};

export const initialLists: List[] = [listOne, listTwo, listThree];

export const initialTasks: Task[] = [
  {
    id: generateRandomId(),
    listId: listThree.id,
    content: "Project initiation and planning",
  },
  {
    id: generateRandomId(),
    listId: listThree.id,
    content: "Gather requirements from stakeholders",
  },
  {
    id: generateRandomId(),
    listId: listThree.id,
    content: "Create wireframes and mockups",
  },
  {
    id: generateRandomId(),
    listId: listTwo.id,
    content: "Develop homepage layout",
  },
  {
    id: generateRandomId(),
    listId: listTwo.id,
    content: "Design color scheme and typography",
  },
  {
    id: generateRandomId(),
    listId: listOne.id,
    content: "Implement user authentication",
  },
  {
    id: generateRandomId(),
    listId: listOne.id,
    content: "Build contact us page",
  },
  {
    id: generateRandomId(),
    listId: listOne.id,
    content: "Create product catalog",
  },
  {
    id: generateRandomId(),
    listId: listOne.id,
    content: "Develop about us page",
  },
  {
    id: generateRandomId(),
    listId: listOne.id,
    content: "Optimize website for mobile devices",
  },
  {
    id: generateRandomId(),
    listId: listOne.id,
    content: "Integrate payment gateway",
  },
  {
    id: generateRandomId(),
    listId: listOne.id,
    content: "Perform testing and bug fixing",
  },
  {
    id: generateRandomId(),
    listId: listOne.id,
    content: "Launch website and deploy to server",
  },
];
