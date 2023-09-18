function CardLoading() {
  return (
    <div
      className={`group flex flex-col space-y-2 relative border border-t-0 border-x-0 py-8 animate-pulse opacity-25`}
    >
      <p
        className={`text-sm font-bold group-hover:text-orange-400 w-1/2 bg-black`}
      >
        X
      </p>
      <p className="text-xs w-full bg-black">X</p>
      <p className="text-xs w-1/4 bg-black">X</p>
    </div>
  );
}

export default CardLoading;
