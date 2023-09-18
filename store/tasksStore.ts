import { getTasks } from "@/lib/getTasks";
import { create } from "zustand";

interface TasksState {
  tasks: Tasks;
  setTasks: (user: any) => void;
  updateTasks: (tasks: Tasks) => void;
  addTask: (task: Task) => void;
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
  addTask: (task: Task) => {
    set((state) => {
      const newMap = new Map(state.tasks);
      newMap.get(task.status)!.push({
        description: task.description,
        id: task.id,
        title: task.title,
        status: task.status,
        userId: task.userId,
      });

      return { tasks: newMap };
    });
  },
}));

export default useTasksStore;
