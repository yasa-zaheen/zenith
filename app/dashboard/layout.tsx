"use client";

// React
import { useState, useEffect } from "react";

// Firebase
import { auth } from "@/firebase";
import { onAuthStateChanged } from "firebase/auth";

// Components
import IconButton from "@/components/IconButton";

// Icons
import {
  Squares2X2Icon,
  CalendarDaysIcon,
  DocumentIcon,
} from "@heroicons/react/24/outline";

// State management
import useTasksStore from "@/store/tasksStore";

// Others
import Avatar from "react-avatar";

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  // Global states
  const [setTasks] = useTasksStore((state) => [state.setTasks]);

  // Local states
  const [user, setUser] = useState<any>(null);
  useEffect(() => {
    onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
      setTasks(currentUser);
    });
  }, []);

  return (
    <div className="h-screen w-full flex">
      <nav className="outline outline-1 outline-black/25 p-8 flex flex-col items-center justify-between">
        {/* Title */}
        <h1 className="text-3xl font-bold">Z</h1>

        {/* Icons/Links */}
        <div className="flex flex-col">
          <IconButton Icon={Squares2X2Icon} />
          <IconButton Icon={CalendarDaysIcon} />
          <IconButton Icon={DocumentIcon} />
        </div>

        {/* Authentication part */}
        <Avatar
          name={user?.displayName}
          size="40"
          color="#000000"
          fgColor="#ffffff"
          round={true}
          textMarginRatio={0.25}
        />
      </nav>
      <div className="flex-1">{children}</div>
    </div>
  );
}
