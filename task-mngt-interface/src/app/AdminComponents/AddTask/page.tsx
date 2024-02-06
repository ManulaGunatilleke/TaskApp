"use client";
import { Dialog, Transition } from "@headlessui/react";
import React, { Fragment, useState, useContext, useEffect } from "react";

import TaskList from "../TaskList/page";
import UserContext from "@/app/CommonComponents/ContextComponent/page";

const Page = () => {
  const TASK_API_BASE_URL = "http://localhost:8080/api/v1/tasks";
  const { user } = useContext(UserContext);
  console.log("AddUserTask_User :", user );
  
  const [isOpen, setIsOpen] = useState(false);
  const [task, setTask] = useState({
    taskTitle: "",
    taskDescription: "",
    priority: "",
    user:0,
    tid: 0
  });
  console.log('Task_Add:',task);
  const [responseTask, setResponseTask] = useState({
    taskTitle: "",
    taskDescription: "",
    priority: "",
    user:0,
    tid: 0
  });

  console.log('responseTask_Add:',responseTask);
  const [isLoading, setIsLoading] = useState(false);

  function closeModal() {
    setIsOpen(false);
  }

  function openModal() {
    setIsOpen(true);
  }

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const value = event.target.value;
    setTask({ ...task, [event.target.name]: value });
  };

  const saveTask = async (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();

    try {
      setIsLoading(true);

      const response = await fetch(TASK_API_BASE_URL + "/" + user.id, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          taskTitle: task.taskTitle,
          taskDescription: task.taskDescription,
          priority: task.priority,
        }),
      });

      if (!response.ok) {
        throw new Error("Something went wrong");
      }

      const _task = await response.json();
      setResponseTask(_task);
      console.log('_task_Add:',task);
      resetForm();
    } catch (error) {
      console.error('Error saving task:', error);
      // Handle error
    } finally {
      setIsLoading(false);
    }
  };

  const resetForm = () => {
    setTask({
      taskTitle: "",
      taskDescription: "",
      priority: "",
      user:0,
      tid: 0
    });
    setIsOpen(false);
  };

  const resetButton = (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
    e.preventDefault();
    resetForm();
  };

  return (
    
    <main className="flex flex-col items-center justify-between p-24">
      <div className="container mx-auto my-8">
        <div className="h-12">
          <button
            onClick={openModal}
            className="rounded bg-slate-600 text-white px-6 py-2 font-semibold"
          >
            Add Task
          </button>
        </div>
      </div>
      <Transition appear show={isOpen} as={Fragment}>
        <Dialog
          as="div"
          className="fixed inset-0 z-10 overflow-y-auto"
          onClose={closeModal}
        >
          <div className="min-h-screen px-4 text-center">
            <Transition.Child
              as={Fragment}
              enter="ease-out duration-300"
              enterFrom="opacity-0 scale-95"
              enterTo="opacity-100 scale-100"
              leave="ease-in duration-200"
              leaveFrom="opacity-100 scale-100"
              leaveTo="opacity-0 scale-95"
            >
              <div className="inline-block w-full max-w-md p-6 my-8 overflow-hidden text-left align-middle transition-all transform bg-white shadow-xl rounded-md">
                <Dialog.Title
                  as="h3"
                  className="text-lg font-medium leading-6 text-gray-900"
                >
                  Add new Task
                </Dialog.Title>
                <div className="flex max-w-md max-auto">
                  <div className="py-2">
                    <div className="h-14 my-4">
                      <label className="block text-gray-600 text-sm font-normal">
                        taskTitle
                      </label>
                      <input
                        type="text"
                        name="taskTitle"
                        value={task.taskTitle}
                        onChange={(e) => handleChange(e)}
                        className="h-10 w-96 border mt-2 px-2 py-2"
                      ></input>
                    </div>
                    <div className="h-14 my-4">
                      <label className="block text-gray-600 text-sm font-normal">
                        taskDescription
                      </label>
                      <input
                        type="text"
                        name="taskDescription"
                        value={task.taskDescription}
                        onChange={(e) => handleChange(e)}
                        className="h-10 w-96 border mt-2 px-2 py-2"
                      ></input>
                    </div>
                    <div className="h-14 my-4">
                      <label className="block text-gray-600 text-sm font-normal">
                        Priority
                      </label>
                      <input
                        type="text"
                        name="priority"
                        value={task.priority}
                        onChange={(e) => handleChange(e)}
                        className="h-10 w-96 border mt-2 px-2 py-2"
                      ></input>
                    </div>
                    <div className="h-14 my-4 space-x-4 pt-4">
                      <button
                        onClick={saveTask}
                        disabled={isLoading}
                        className={`rounded text-white font-semibold bg-green-400 hover:bg-green-700 py-2 px-6 ${isLoading ? 'opacity-50 cursor-not-allowed' : ''}`}
                      >
                        {isLoading ? 'Saving...' : 'Save'}
                      </button>
                      <button
                        onClick={resetButton}
                        className="rounded text-white font-semibold bg-red-400 hover:bg-red-700 py-2 px-6"
                      >
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
      <TaskList task={responseTask} />
      
    </main>
  );
};

export default Page;
