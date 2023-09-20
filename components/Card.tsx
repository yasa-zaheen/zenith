import { useState } from "react";

// Firebase
import { db } from "@/firebase";
import { doc, deleteDoc } from "firebase/firestore";

// Zustand
import useTasksStore from "@/store/tasksStore";

// Heroicon
import { XMarkIcon } from "@heroicons/react/24/outline";

// React Beautiful DnD
import { DraggableProvided, DraggableStateSnapshot } from "react-beautiful-dnd";

function Card({
  provided,
  snapShot,
  task,
}: {
  provided: DraggableProvided;
  snapShot: DraggableStateSnapshot;
  task: Task;
}) {
  // Global states
  const [removeTask] = useTasksStore((state) => [state.removeTask]);

  // Local states
  const [deleting, setDeleting] = useState(false);

  // Functions
  const deleteTask = async () => {
    setDeleting(true);
    await deleteDoc(doc(db, "tasks", task.id));
    removeTask(task);
  };

  return (
    <div
      {...provided.dragHandleProps}
      {...provided.draggableProps}
      ref={provided.innerRef}
      className={`group relative border border-t-0 border-x-0 py-8 cursor-pointer hover:bg-neutral-100 hover:border-orange-400 hover:px-8 hover:scale-105 hover:shadow-lg hover:z-50 duration-100 ease-in-out ${
        snapShot.isDragging
          ? "bg-neutral-100 px-8 border-orange-400 scale-105 shadow-lg z-50"
          : "bg-white"
      } ${deleting ? "opacity-25" : ""}`}
    >
      {/* Title */}
      <p
        className={`text-sm font-bold group-hover:text-orange-400 ${
          snapShot.isDragging ? "text-orange-400" : "text-black"
        }`}
      >
        {task.title}
      </p>

      {/* Description */}
      <p className="text-xs opacity-50">{task.description}</p>

      {/* Delete button */}
      <XMarkIcon
        onClick={deleteTask}
        className={`h-5 w-5 text-black/25 absolute top-2 left-2 group-hover:scale-100 duration-100 ease-in-out cursor-pointer ${
          snapShot.isDragging ? "scale-100" : "scale-0"
        }`}
      />
    </div>
  );
}

export default Card;
