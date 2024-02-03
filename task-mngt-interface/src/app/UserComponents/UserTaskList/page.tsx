"use client";

import React, { useContext } from "react";

import { useState, useEffect } from "react";
import EditTask from "@/app/UserComponents/EditUserTask/page";
import Task from "@/app/UserComponents/UserTask/page";
import UserContext from "@/app/CommonComponents/ContextComponent/page";

interface Task {
  tId?: number;
  taskTitle: string;
  taskDescription: string;
  priority: string;
  uId: number;
}

const page: React.FC<{ task: Task }> = ({ task }) => {
  const TASK_API_BASE_URL = "http://localhost:8080/api/v1/tasks";
  const { user } = useContext(UserContext);
  const [tasks, setTasks] = useState<Task[] | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [tId, setTId] = useState<number | null>(null);
  const [uId, setUId] = useState<number | null>(null);
  const [responseTask, setResponseTask] = useState(null);

  useEffect(() => {
    console.log('Task:', task);
    const fetchData = async () => {
      setLoading(true);
      setError(null); // Reset error state before each fetch
      try {
        if (user.id) {
          const response = await fetch(TASK_API_BASE_URL + "/user/" + task.uId, {
            method: "GET",
            headers: {
              "Content-Type": "application/json",
            },
          });
  
          if (!response.ok) {
            throw new Error("Failed to fetch data");
          }
  
          const tasks = await response.json();
          setTasks(tasks);
        }
      } catch (error) {
        console.error(error);
        setError("Failed to fetch data. Please try again."); // Set error state
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, [task, responseTask]);

  const deleteTask = async (
    e: React.MouseEvent<HTMLButtonElement, MouseEvent>,
    uId: number,
    tId?: number
  ) => {
    e.preventDefault();
    const response = await fetch(TASK_API_BASE_URL + "/" + uId + "/" + tId, {
      method: "DELETE",
    });

    if (!response.ok) {
      // Handle the error, show a message, or perform any necessary action
      console.error("Failed to delete task");
      return;
    }

    if (tasks) {
      setTasks((prevElement) => {
        return (prevElement as Task[]).filter((task) => task.tId !== tId);
      });
    }
  };

  const editTask = (
    e: React.MouseEvent<HTMLButtonElement, MouseEvent>,
    uId: number,
    tId?: number
  ) => {
    e.preventDefault();
    setTId(tId || null);
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
            {!loading && !error && (
              <tbody className="bg-white">
                {tasks?.map((task) => (
                  <Task
                    task={task}
                    key={task.tId}
                    deleteTask={deleteTask}
                    editTask={editTask}
                  />
                ))}
              </tbody>
            )}
          </table>
        </div>
      </div>
      {error && <div>Error: {error}</div>}
      <EditTask uId={uId} tId={tId} setResponseTask={setResponseTask} />
    </>
  );
};

export default page;
