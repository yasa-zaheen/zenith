import Link from "next/link";

export default function Home() {
  return (
    <div className="flex flex-col relative h-screen w-full">
      {/* Navbar */}
      <nav className="flex p-4 items-center justify-between">
        <p className="text-3xl font-bold">Zenith</p>
        <div className="flex space-x-4">
          <Link
            href={"/auth/signIn"}
            className="bg-black/10 text-black px-4 py-2 text-xs"
          >
            Sign In
          </Link>
          <Link
            href={"/auth/signUp"}
            className="bg-orange-400 text-black px-4 py-2 text-xs"
          >
            Get started for free
          </Link>
        </div>
      </nav>
      {/* Main image */}
      <div className="p-8 flex flex-col flex-1 items-center justify-center space-y-4">
        <p className="text-5xl font-black text-center">
          Streamline your life and increase your productivity!
        </p>
        <p className="opacity-50 text-md font-medium">
          Effortlessly streamline your life by using our powerful kanban tool
        </p>

        <div className="flex items-center space-x-4 justify-center">
          <Link
            href={"/auth/signUp"}
            className="bg-orange-400 text-black px-4 py-2 text-md"
          >
            Start for free
          </Link>
          <div>
            <div>
              <p>No credit card required</p>
              <p className="text-xs opacity-50">
                Although I wouldn't mind some money 😆
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Blurred BG */}
      <div className="h-screen w-full absolute t-0 l-0 -z-10 opacity-25 ">
        <div className="bg-gradient-to-b from-orange-400 to-white h-full w-full"></div>
      </div>
      {/* Footers */}
      <div className="w-full text-orange-400 flex justify-center p-4 text-sm">
        <p className="font-bold">Made by Yasa Zaheen</p>
      </div>
    </div>
  );
}
