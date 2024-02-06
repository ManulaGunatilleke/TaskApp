"use client";

import React, { useContext } from "react";

import { useState, useEffect } from "react";
import EditTask from "@/app/UserComponents/EditUserTask/page";
import Task from "@/app/UserComponents/UserTask/page";
import UserContext from "@/app/CommonComponents/ContextComponent/page";

interface Task {
  taskTitle: string;
  taskDescription: string;
  priority: string;
  user: number;
  tid?: number;
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
    console.log('Task_TaskList:', task);
    console.log('User_TaskList:',user);
    const fetchData = async () => {
      console.log('Fetching data...');
      setLoading(true);
      setError(null);
    
      try {
        const userId = user.id;
        console.log("UserTaskList : ", userId);
        if (!userId) {
          throw new Error("User ID is missing.");
        }
    
        const response = await fetch(TASK_API_BASE_URL + "/user/" + userId, {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
          },
        });
    
        if (!response.ok) {
          throw new Error(`HTTP error! Status: ${response.status}`);
        }
    
        const tasks = await response.json();
        setTasks(tasks);
        console.log('Tasks_TaskList:', tasks);
        console.log('User2_TaskList:', user);
      } catch (error) {
        console.error("Fetch error:", error);
        setError("Failed to fetch data. Please try again.");
      } finally {
        setLoading(false);
      }
    };
    if (user && user.id) {
      fetchData();
    }
  }, [task, responseTask]);

  const deleteTask = async (
    e: React.MouseEvent<HTMLButtonElement, MouseEvent>,
    user: number,
    tid?: number
  ) => {
    e.preventDefault();
    const userId = user
    const taskId = tid
    const response = await fetch(TASK_API_BASE_URL + "/" + userId + "/" + taskId, {
      method: "DELETE",
    });

    if (!response.ok) {
      
      console.error("Failed to delete task");
      return;
    }

    if (tasks) {
      setTasks((prevElement) => {
        return (prevElement as Task[]).filter((task) => task.tid !== tId);
      });
    }
  };

  const editTask = (
    e: React.MouseEvent<HTMLButtonElement, MouseEvent>,
    user: number,
    tid?: number
  ) => {
    e.preventDefault();
    // const userId = user
    // const taskId = tid
    setTId(tid || null);
    setUId(user);
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
                {/* <th className="text-left font-medium text-gray-500 uppercase tracking-wide py-3 px-6">
                  uId
                </th>
                <th className="text-left font-medium text-gray-500 uppercase tracking-wide py-3 px-6">
                  tId
                </th> */}
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
                    key={task.tid}
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
      <EditTask user={uId} tid={tId} setResponseTask={setResponseTask} />
    </>
  );
};

export default page;
