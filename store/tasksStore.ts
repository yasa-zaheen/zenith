import { getTasks } from "@/lib/getTasks";
import { create } from "zustand";

interface TasksState {
  tasks: Tasks;
  setTasks: (user: any) => void;
  updateTasks: (tasks: Tasks) => void;
}

const useTasksStore = create<TasksState>((set) => ({
  tasks: new Map<Status, Task[]>(),
  setTasks: async (user) => {
    const data = await getTasks(user);
    set({ tasks: data });
  },
  updateTasks: (tasks: Tasks) => {
    set({ tasks: tasks });
  },
}));

export default useTasksStore;
