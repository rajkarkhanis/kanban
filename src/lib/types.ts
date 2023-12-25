export interface List {
  id: string;
  title: string;
}

export interface Task {
  id: string;
  listId: string;
  content: string | undefined;
}
