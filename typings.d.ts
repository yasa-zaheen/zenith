type Tasks = Map<Status, Task[]>;

type Status = "To Do" | "In Progress" | "On Hold" | "Done";

interface Task {
  status: Status;
  title: string;
  userId: string;
  description: string;
}

interface User {
  uid: string;
  displayName: string;
  email: string;
}
