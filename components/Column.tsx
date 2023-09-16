import Card from "./Card";

function Column({
  title,
  Icon,
  color,
}: {
  title: string;
  Icon: any;
  color: string;
}) {
  return (
    <div>
      <div className="flex flex-col border-b-2 border-black pb-8">
        <p className="font-semibold text-md flex">
          {title}
          <Icon className={`h-5 w-5 ml-2 ${color}`} />
        </p>
        <p className="text-xs opacity-50">3 Tasks</p>
      </div>

      <div>
        <Card />
        <Card />
        <Card />
      </div>
    </div>
  );
}

export default Column;
