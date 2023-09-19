// React
import { Fragment, useState } from "react";

// Headless UI
import { Dialog, RadioGroup, Transition } from "@headlessui/react";

// Heroicons
import {
  Bars3BottomLeftIcon,
  CheckIcon,
  XMarkIcon,
  ArrowLongRightIcon,
  ArrowPathRoundedSquareIcon,
  PauseIcon,
} from "@heroicons/react/24/outline";

// Zustand
import useModalStore from "@/store/modalStore";
import useUserStore from "@/store/userStore";
import useTasksStore from "@/store/tasksStore";

// Firebase
import { collection, addDoc } from "firebase/firestore";
import { db } from "@/firebase";
import LoadingButton from "./LoadingButton";

function CreateTaskModal() {
  // Global states
  const [modalOpen, setModalOpen] = useModalStore((state) => [
    state.modalOpen,
    state.setModalOpen,
  ]);
  const [user] = useUserStore((state) => [state.user]);
  const [addTask] = useTasksStore((state) => [state.addTask]);

  // Local states
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [status, setStatus] = useState<Status>("To Do");
  const [loading, setLoading] = useState(false);

  const statuses = [
    {
      status: "To Do",
      icon: <ArrowLongRightIcon className="h-5 w-5" />,
    },
    {
      status: "In Progress",
      icon: <ArrowPathRoundedSquareIcon className="h-5 w-5" />,
    },
    {
      status: "On Hold",
      icon: <PauseIcon className="h-5 w-5" />,
    },
    {
      status: "Done",
      icon: <CheckIcon className="h-5 w-5" />,
    },
  ];

  const createNewTask = async (e: any) => {
    e.preventDefault();

    if (title === "") return;

    setLoading(true);

    const docRef = await addDoc(collection(db, "tasks"), {
      description: description,
      status: status,
      title: title,
      userId: user.uid,
    });

    const task: Task = {
      description: description,
      id: docRef.id,
      status: status,
      title: title,
      userId: user.uid,
    };

    addTask(task);
    setTitle("");
    setDescription("");
    setModalOpen(false);
    setLoading(false);
  };

  return (
    <Transition show={modalOpen} as={Fragment}>
      <Dialog onClose={() => setModalOpen(false)} className="relative z-50">
        {/* The backdrop */}
        <Transition.Child
          as={Fragment}
          enter="ease-out duration-200"
          enterFrom="opacity-0"
          enterTo="opacity-100"
          leave="ease-in duration-200"
          leaveFrom="opacity-100"
          leaveTo="opacity-0"
        >
          <div className="fixed inset-0 bg-black/30" aria-hidden="true" />
        </Transition.Child>

        <Transition.Child
          as={Fragment}
          enter="ease-out duration-200"
          enterFrom="opacity-0 scale-95"
          enterTo="opacity-100 scale-100"
          leave="ease-in duration-200"
          leaveFrom="opacity-100 scale-100"
          leaveTo="opacity-0 scale-95"
        >
          {/* Full-screen container to center the panel */}
          <form
            onSubmit={createNewTask}
            className="fixed inset-0 flex w-screen items-center justify-center p-4"
          >
            {/* The actual dialog panel  */}
            <Dialog.Panel className="flex flex-col w-1/3 justify-center items-center space-y-4 bg-neutral-100 p-8 relative">
              {/* Close button */}
              <button
                onClick={() => {
                  setModalOpen(false);
                }}
                className="absolute top-2 left-2 outline-none"
              >
                <XMarkIcon className="h-5 w-5 text-black/25" />
              </button>

              {/* Title */}
              <Dialog.Title className={"text-xl font-bold"}>
                Create new task
              </Dialog.Title>

              {/* Inputs */}
              <div className="flex w-full text-xs flex-col space-y-4">
                <div className="flex bg-white w-full p-4">
                  <CheckIcon className="h-5 w-5 mr-4 text-black" />
                  <input
                    placeholder="Title"
                    type="text"
                    className="outline-none w-full"
                    value={title}
                    onChange={(e) => {
                      setTitle(e.target.value);
                    }}
                  />
                </div>

                <div className="flex bg-white w-full p-4">
                  <Bars3BottomLeftIcon className="h-5 w-5 mr-4 text-black" />
                  <textarea
                    placeholder="Description"
                    className="outline-none w-full"
                    rows={3}
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                  />
                </div>
              </div>

              {/* Radio buttons */}
              <div className="w-full">
                <RadioGroup
                  className={"flex flex-col space-y-2 text-xs"}
                  value={status}
                  onChange={setStatus}
                >
                  <RadioGroup.Label className={"text-lg font-bold mb-2"}>
                    Status
                  </RadioGroup.Label>
                  {statuses.map((status) => (
                    <RadioGroup.Option
                      className={`modal-radio`}
                      key={status.status}
                      value={status.status}
                    >
                      <p>{status.status}</p>
                      {status.icon}
                    </RadioGroup.Option>
                  ))}
                </RadioGroup>
              </div>

              {/* Create button */}

              <LoadingButton loading={loading}>Create task</LoadingButton>
            </Dialog.Panel>
          </form>
        </Transition.Child>
      </Dialog>
    </Transition>
  );
}

export default CreateTaskModal;
