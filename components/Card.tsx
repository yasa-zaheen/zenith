import { XMarkIcon } from "@heroicons/react/24/outline";

function Card() {
  return (
    <div className="group relative border border-t-0 border-x-0 py-8 cursor-pointer hover:bg-neutral-100 hover:border-orange-400 hover:px-8 hover:scale-105 hover:shadow-lg duration-100 ease-in-out">
      <p className="text-sm font-bold group-hover:text-orange-400">
        Complete inspections
      </p>
      <p className="text-xs opacity-50">
        Complete municipality and internal inspections
      </p>

      <XMarkIcon className="h-5 w-5 text-black/25 absolute top-2 left-2 opacity-0 group-hover:opacity-100 duration-100 ease-in-out" />
    </div>
  );
}

export default Card;
