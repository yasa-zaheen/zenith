"use client";

export default function IconButton({ Icon }: { Icon: any }) {
  return (
    <button className="p-4 rounded-full text-black hover:bg-orange-50 hover:text-orange-400 active:brightness-95 duration-100 ease-in-out">
      <Icon className="h-5 w-5" />
    </button>
  );
}
