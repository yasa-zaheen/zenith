function CardLoading() {
  return (
    <div
      className={`group flex flex-col space-y-2 relative border border-t-0 border-x-0 py-8 animate-pulse opacity-25`}
    >
      <p className={`text-sm font-bold w-1/2 bg-black text-black`}>X</p>
      <p className="text-xs w-full bg-black text-black">X</p>
      <p className="text-xs w-1/4 bg-black text-black">X</p>
    </div>
  );
}

export default CardLoading;
