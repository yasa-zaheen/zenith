import { Draggable, Droppable } from "react-beautiful-dnd";
import Card from "./Card";

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
      <div className="flex flex-col border-b-2 border-black pb-8">
        <p className="font-semibold text-md flex">
          {title}
          <Icon className={`h-5 w-5 ml-2 ${color}`} />
        </p>
        <p className="text-xs opacity-50">{tasks.length} Tasks</p>
      </div>
      <Droppable key={index} droppableId={index.toString()}>
        {(provided, snapShot) => (
          <div ref={provided.innerRef} {...provided.droppableProps}>
            {tasks.map((task, index) => (
              <Draggable key={task.id} draggableId={task.id} index={index}>
                {(provided, snapShot) => (
                  <Card
                    provided={provided}
                    snapShot={snapShot}
                    title={task.title}
                    description={task.description}
                  />
                )}
              </Draggable>
            ))}
            {provided.placeholder}
          </div>
        )}
      </Droppable>
    </div>
  );
}

export default Column;
