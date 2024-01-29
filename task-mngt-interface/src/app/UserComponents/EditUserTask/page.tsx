import React from 'react'

const page = () => {
  return (
    <div>page</div>
  )
}

export default page"use client";
import React, { useState, useEffect, Fragment, ChangeEvent } from "react";
import { Dialog, Transition } from "@headlessui/react";


interface Task {
  id: string;
  taskTitle: string;
  taskDescription: string;
  priority: string;
  uId: string;
}

interface EditTaskProps {
  userId: string | null;
  taskId: string | null;
  setResponseTask: React.Dispatch<React.SetStateAction<any>>;
}

const page: React.FC<EditTaskProps> = ({ userId, taskId, setResponseTask }) => {
  const TASK_API_BASE_URL = "http://localhost:8080/api/v1/tasks";

  const [isOpen, setIsOpen] = useState(false);
  const [task, setTask] = useState<Task>({
    id: "",
    taskTitle: "",
    taskDescription: "",
    priority: "",
    uId:""
  });

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(`${TASK_API_BASE_URL}/${userId}/${taskId}`, {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
          },
        });
        const _task: Task = await response.json();
        setTask(_task);
        setIsOpen(true);
      } catch (error) {
        console.log(error);
      }
    };

    if (taskId) {
      fetchData();
    }
  }, [taskId]);

  function closeModal() {
    setIsOpen(false);
  }

  function openModal() {
    setIsOpen(true);
  }

  const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;
    setTask({ ...task, [name]: value });
  };

  const reset = (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
    e.preventDefault();
    setIsOpen(false);
  };

  const updateTask = async (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
    e.preventDefault();
    const response = await fetch(`${TASK_API_BASE_URL}/${userId}/${taskId}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(task),
    });

    if (!response.ok) {
      throw new Error("Something went wrong");
    }

    const _task: Task = await response.json();
    setResponseTask(_task);
    reset(e);
  };

  return (
    <Transition appear show={isOpen} as={Fragment}>
      <Dialog
        as="div"
        className="fixed inset-0 z-10 overflow-y-auto"
        onClose={closeModal}>
        <div className="min-h-screen px-4 text-center">
          <Transition.Child
            as={Fragment}
            enter="ease-out duration-300"
            enterFrom="opacity-0 scale-95"
            enterTo="opacity-100 scale-100"
            leave="ease-in duration-200"
            leaveFrom="opacity-100 scale-100"
            leaveTo="opacity-0 scale-95">
            <div className="inline-block w-full max-w-md p-6 my-8 overflow-hidden text-left align-middle transition-all transform bg-white shadow-xl rounded-md">
              <Dialog.Title
                as="h3"
                className="text-lg font-medium leading-6 text-gray-900">
                Update Task
              </Dialog.Title>
              <div className="flex max-w-md max-auto">
                <div className="py-2">
                  <div className="h-14 my-4">
                    <label className="block text-gray-600 text-sm font-normal">
                      Title
                    </label>
                    <input
                      type="text"
                      name="taskTitle"
                      value={task.taskTitle}
                      onChange={(e) => handleChange(e)}
                      className="h-10 w-96 border mt-2 px-2 py-2"></input>
                  </div>
                  <div className="h-14 my-4">
                    <label className="block text-gray-600 text-sm font-normal">
                      Discription
                    </label>
                    <input
                      type="text"
                      name="taskDescription"
                      value={task.taskDescription}
                      onChange={(e) => handleChange(e)}
                      className="h-10 w-96 border mt-2 px-2 py-2"></input>
                  </div>
                  <div className="h-14 my-4">
                    <label className="block text-gray-600 text-sm font-normal">
                      Email Id
                    </label>
                    <input
                      type="text"
                      name="priority"
                      value={task.priority}
                      onChange={(e) => handleChange(e)}
                      className="h-10 w-96 border mt-2 px-2 py-2"></input>
                  </div>
                  <div className="h-14 my-4 space-x-4 pt-4">
                    <button
                      onClick={updateTask}
                      className="rounded text-white font-semibold bg-green-400 hover:bg-green-700 py-2 px-6">
                      Update
                    </button>
                    <button
                      onClick={reset}
                      className="rounded text-white font-semibold bg-red-400 hover:bg-red-700 py-2 px-6">
                      Close
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </Transition.Child>
        </div>
      </Dialog>
    </Transition>
  )
}

export default page