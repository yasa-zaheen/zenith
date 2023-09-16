import { getTasks } from "@/lib/getTasks";
import { create } from "zustand";

interface TasksState {
  tasks: Tasks;
  setTasks: (user: any) => void;
}

const useTasksStore = create<TasksState>((set) => ({
  tasks: new Map<Status, Task[]>(),
  setTasks: async (user) => {
    const data = await getTasks(user);
    set({ tasks: data });
  },
}));

export default useTasksStore;
