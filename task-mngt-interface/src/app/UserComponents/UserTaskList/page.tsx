"use client";
import React from "react";

import { useState, useEffect } from "react";
import EditTask from "@/app/UserComponents/EditUserTask/page";
import Task from "@/app/UserComponents/UserTask/page";


interface Task {
  id: string;
  taskTitle: string;
  taskDescription: string;
  priority: string;
  uId: string; 
}

const page: React.FC<{ task: Task }> = ({ task }) => {

  const TASK_API_BASE_URL = "http://localhost:8080/api/v1/tasks";
  
  const [tasks, setTasks] = useState<Task[] | null>(null);
  const [loading, setLoading] = useState(true);
  const [taskId, setTaskId] = useState<string | null>(null);
  const [uId, setUId] = useState<string | null>(null);
  const [responseTask, setResponseTask] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      try {
        const response = await fetch(TASK_API_BASE_URL, {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
          },
        });
        const tasks = await response.json();
        setTasks(tasks);
      } catch (error) {
        console.log(error);
      }
      setLoading(false);
    };
    fetchData();
  }, [task, responseTask]);
  
  const deleteTask = async (
    e: React.MouseEvent<HTMLButtonElement, MouseEvent>,
    id: string,
    uId:string
  ) => {
    e.preventDefault();
    const response = await fetch(TASK_API_BASE_URL + "/" + uId + "/" + id, {
      method: "DELETE",
    });
  
    if (!response.ok) {
      // Handle the error, show a message, or perform any necessary action
      console.error("Failed to delete task");
      return;
    }
  
    if (tasks) {
      setTasks((prevElement) => {
        return (prevElement as Task[]).filter((task) => task.id !== id);
      });
    }
  };
  
  const editTask = (
    e: React.MouseEvent<HTMLButtonElement, MouseEvent>,
    id: string,
    uId:string
  ) => {
    e.preventDefault();
    setTaskId(id);
    setUId(uId);
  };

  return (
    <>
      <div className="container mx-auto my-8">
        <div className="flex shadow border-b">
          <table className="min-w-full">
            <thead className="bg-gray-50">
              <tr>
                <th className="text-left font-medium text-gray-500 uppercase tracking-wide py-3 px-6">
                  Title
                </th>
                <th className="text-left font-medium text-gray-500 uppercase tracking-wide py-3 px-6">
                  Discription
                </th>
                <th className="text-left font-medium text-gray-500 uppercase tracking-wide py-3 px-6">
                  Priority
                </th>
                <th className="text-right font-medium text-gray-500 uppercase tracking-wide py-3 px-6">
                  Actions
                </th>
              </tr>
            </thead>
            {!loading && (
              <tbody className="bg-white">
                {tasks?.map((task) => (
                  <Task
                    task={task}
                    key={task.id}
                    deleteTask={deleteTask}
                    editTask={editTask}
                  />
                ))}
              </tbody>
            )}
          </table>
        </div>
      </div>
      <EditTask userId = {uId} taskId={taskId} setResponseTask={setResponseTask} />
    </>
  );
};

export default page;