import { Draggable, Droppable } from "react-beautiful-dnd";
import Card from "./Card";
import CardLoading from "./CardLoading";

function Column({
  title,
  Icon,
  color,
  tasks,
  index,
}: {
  title: string;
  Icon: any;
  color: string;
  tasks: Task[];
  index: number;
}) {
  return (
    <div>
      {/* Header */}
      <div className="flex flex-col border-b-2 border-black pb-8">
        <p className="font-semibold text-md flex">
          {title}
          <Icon className={`h-5 w-5 ml-2 ${color}`} />
        </p>
        <p className="text-xs opacity-50">
          {tasks == null
            ? ""
            : tasks.length == 1
            ? "1 Task"
            : `${tasks.length} Tasks`}
        </p>
      </div>

      {/* Tasks */}
      {tasks ? (
        // Actual task card
        <Droppable key={index} droppableId={index.toString()}>
          {(provided, snapShot) => (
            <div
              ref={provided.innerRef}
              {...provided.droppableProps}
              className={`${
                snapShot.isUsingPlaceholder ? "bg-neutral-200" : ""
              } `}
            >
              {tasks.map((task, index) => (
                <Draggable key={task.id} draggableId={task.id} index={index}>
                  {(provided, snapShot) => (
                    <Card provided={provided} snapShot={snapShot} task={task} />
                  )}
                </Draggable>
              ))}
              {provided.placeholder}
            </div>
          )}
        </Droppable>
      ) : (
        // Skeleton if tasks not present
        <div>
          <CardLoading />
          <CardLoading />
        </div>
      )}
    </div>
  );
}

export default Column;
