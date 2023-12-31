"use client";

// React
import { useEffect, useState } from "react";

// Components
import Column from "@/components/Column";
import CreateTaskModal from "@/components/CreateTaskModal";

// State management
import useTasksStore from "@/store/tasksStore";
import useModalStore from "@/store/modalStore";

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
  // Global states
  const tasks = useTasksStore((state) => state.tasks);
  const [setModalOpen] = useModalStore((state) => [state.setModalOpen]);

  // Local states
  const [toDo, setToDo] = useState<any>(null);
  const [inProgress, setInProgress] = useState<any>(null);
  const [onHold, setOnHold] = useState<any>(null);
  const [done, setDone] = useState<any>(null);

  const tasksAsArray = Array.from(tasks);

  // Effects
  useEffect(() => {
    if (tasksAsArray.length != 0) {
      setToDo(tasksAsArray[0][1]);
      setInProgress(tasksAsArray[1][1]);
      setOnHold(tasksAsArray[2][1]);
      setDone(tasksAsArray[3][1]);
    }
  }, [tasks]);

  // Functions
  const handleOnDragEnd = async (result: DropResult) => {
    const { destination, source } = result;

    // Not doing anything if drag is invalid
    if (!destination || !source) return;

    // Adjusting the UI
    const arr = Array.from(tasks);
    const [task] = arr[+source.droppableId][1].splice(source.index, 1);
    arr[+destination!.droppableId][1].splice(destination!.index, 0, task);

    // Updating the DB
    const docRef = doc(db, "tasks", task.id);
    await updateDoc(docRef, {
      status: arr[+destination!.droppableId][0],
    });
  };

  return (
    <div className="w-full h-screen p-4 md:p-8 flex flex-col space-y-8 relative">
      {/* Dashboard Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold">Tasks</h1>
          <p className="opacity-50 text-sm">Have a productive day!</p>
        </div>

        {/* <div className="hidden flex text-xs border border-x-0 border-t-0 border-black/25 outline-none p-2 space-x-2">
          <MagnifyingGlassIcon className="h-5 w-5 text-black" />
          <input type="text" className="outline-none peer" />
        </div> */}

        <button
          className="bg-black text-white text-xs px-4 py-2 shadow-lg hover:bg-orange-400 hover:text-black duration-100 ease-in-out"
          onClick={() => {
            setModalOpen(true);
          }}
        >
          Create task
        </button>
      </div>

      {/* Board */}
      <div className="flex flex-col space-y-8 md:grid md:grid-cols-4 md:grid-rows-1 md:gap-8 md:space-y-0 pb-8">
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

      <CreateTaskModal />
    </div>
  );
}
