"use client";

import Column from "@/components/Column";
import {
  MagnifyingGlassIcon,
  ArrowLongRightIcon,
  ArrowPathRoundedSquareIcon,
  PauseIcon,
  CheckIcon,
} from "@heroicons/react/24/outline";

function DashboardHeader() {
  return (
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
  );
}

export default function DashboardPage() {
  return (
    <div className="w-full h-screen p-8 flex flex-col space-y-8">
      {/* DashboardHeader */}
      <DashboardHeader />
      {/* Board */}
      <div className="grid grid-cols-4 grid-rows-1 gap-8">
        <Column title="To Do" Icon={ArrowLongRightIcon} color="text-blue-400" />
        <Column
          title="In Progress"
          Icon={ArrowPathRoundedSquareIcon}
          color="text-orange-400"
        />
        <Column title="On Hold" Icon={PauseIcon} color="text-red-500" />
        <Column title="Done" Icon={CheckIcon} color="text-green-500" />
      </div>
    </div>
  );
}
