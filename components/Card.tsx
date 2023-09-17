import { XMarkIcon } from "@heroicons/react/24/outline";
import { DraggableProvided, DraggableStateSnapshot } from "react-beautiful-dnd";

function Card({
  title,
  description,
  provided,
  snapShot,
}: {
  title: string;
  description: string;
  provided: DraggableProvided;
  snapShot: DraggableStateSnapshot;
}) {
  return (
    <div
      {...provided.dragHandleProps}
      {...provided.draggableProps}
      ref={provided.innerRef}
      className={`group relative border border-t-0 border-x-0 py-8 cursor-pointer hover:bg-neutral-100 hover:border-orange-400 hover:px-8 hover:scale-105 hover:shadow-lg hover:z-50 duration-100 ease-in-out ${
        snapShot.isDragging
          ? "bg-neutral-100 px-8 border-orange-400 scale-105 shadow-lg z-50"
          : "bg-white"
      }`}
    >
      <p
        className={`text-sm font-bold group-hover:text-orange-400 ${
          snapShot.isDragging ? "text-orange-400" : "text-black"
        }`}
      >
        {title}
      </p>
      <p className="text-xs opacity-50">{description}</p>

      <XMarkIcon
        className={`h-5 w-5 text-black/25 absolute top-2 left-2 group-hover:scale-100 duration-100 ease-in-out ${
          snapShot.isDragging ? "scale-100" : "scale-0"
        }`}
      />
    </div>
  );
}

export default Card;
