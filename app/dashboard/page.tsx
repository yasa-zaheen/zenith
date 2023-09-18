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

// React Beautiful DnD
import { DragDropContext, DropResult } from "react-beautiful-dnd";

// Firebase
import { doc, updateDoc } from "firebase/firestore";
import { db } from "@/firebase";

export default function DashboardPage() {
  const tasks = useTasksStore((state) => state.tasks);

  const tasksAsArray = Array.from(tasks);

  const [toDo, setToDo] = useState<any>(null);
  const [inProgress, setInProgress] = useState<any>(null);
  const [onHold, setOnHold] = useState<any>(null);
  const [done, setDone] = useState<any>(null);

  useEffect(() => {
    if (tasksAsArray.length != 0) {
      setToDo(tasksAsArray[0][1]);
      setInProgress(tasksAsArray[1][1]);
      setOnHold(tasksAsArray[2][1]);
      setDone(tasksAsArray[3][1]);
    }
  }, [tasks]);

  const handleOnDragEnd = async (result: DropResult) => {
    const { destination, source } = result;

    if (!destination || !source) return;

    const arr = Array.from(tasks);
    const [task] = arr[+source.droppableId][1].splice(source.index, 1);
    arr[+destination!.droppableId][1].splice(destination!.index, 0, task);

    const destinationStatus = arr[+destination!.droppableId][0];
    const docRef = doc(db, "tasks", task.id);
    // Set the "capital" field of the city 'DC'
    await updateDoc(docRef, {
      status: destinationStatus,
    });
  };

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
