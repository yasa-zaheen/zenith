import Card from "./Card";

function Column({
  title,
  Icon,
  color,
  tasks,
}: {
  title: string;
  Icon: any;
  color: string;
  tasks: Task[];
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

      <div>
        {tasks.map((task) => (
          <Card title={task.title} description={task.description} />
        ))}
      </div>
    </div>
  );
}

export default Column;
