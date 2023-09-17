"use client";

// React
import { useEffect, useState } from "react";

// Components
import Column from "@/components/Column";

// State management
import useTasksStore from "@/store/tasksStore";

// Icons
import {
  MagnifyingGlassIcon,
  ArrowLongRightIcon,
  ArrowPathRoundedSquareIcon,
  PauseIcon,
  CheckIcon,
} from "@heroicons/react/24/outline";
import { DragDropContext } from "react-beautiful-dnd";

export default function DashboardPage() {
  const tasks = useTasksStore((state) => state.tasks);

  const tasksAsArray = Array.from(tasks);

  const [toDo, setToDo] = useState<Task[]>([]);
  const [inProgress, setInProgress] = useState<Task[]>([]);
  const [onHold, setOnHold] = useState<Task[]>([]);
  const [done, setDone] = useState<Task[]>([]);

  useEffect(() => {
    if (tasksAsArray.length != 0) {
      setToDo(tasksAsArray[0][1]);
      setInProgress(tasksAsArray[1][1]);
      setOnHold(tasksAsArray[2][1]);
      setDone(tasksAsArray[3][1]);
    }
  }, [tasksAsArray]);

  const handleOnDragEnd = () => {};

  return (
    <div className="w-full h-screen p-8 flex flex-col space-y-8">
      {/* DashboardHeader */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold">Tasks</h1>
          <p className="opacity-50 text-sm">Have a productive day!</p>
        </div>

        <div className="flex text-xs border border-x-0 border-t-0 border-black/25 outline-none p-2 space-x-2">
          <MagnifyingGlassIcon className="h-5 w-5 text-black" />
          <input type="text" className="outline-none peer" />
        </div>

        <button className="bg-black text-white text-xs px-4 py-2 shadow-lg">
          Create task
        </button>
      </div>

      {/* Board */}
      <div className="grid grid-cols-4 grid-rows-1 gap-8">
        <DragDropContext onDragEnd={handleOnDragEnd}>
          <Column
            tasks={toDo}
            title="To Do"
            Icon={ArrowLongRightIcon}
            index={0}
            color="text-blue-400"
          />
          <Column
            tasks={inProgress}
            title="In Progress"
            Icon={ArrowPathRoundedSquareIcon}
            index={1}
            color="text-orange-400"
          />
          <Column
            tasks={onHold}
            title="On Hold"
            Icon={PauseIcon}
            index={2}
            color="text-red-500"
          />
          <Column
            tasks={done}
            title="Done"
            Icon={CheckIcon}
            index={3}
            color="text-green-500"
          />
        </DragDropContext>
      </div>
    </div>
  );
}
