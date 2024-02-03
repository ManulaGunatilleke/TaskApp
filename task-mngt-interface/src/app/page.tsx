"use client";
// Import necessary components and libraries
import { useState, useEffect } from 'react';
import Navbar from "@/app/CommonComponents/Navbar/page";
import Login from "@/app/CommonComponents/Login/page";
import UserContext from "./CommonComponents/ContextComponent/page";
import UserTaskList from "@/app/UserComponents/UserTaskList/page";
import AddUserTask from "@/app/UserComponents/AddUserTask/page";

export default function HomePage() {

  const [responseTask, setResponseTask] = useState({
    tId: undefined,
    taskTitle: "",
    taskDescription: "",
    priority: "",
    uId: 0,
  });
  // Define initial user state
  const initialUser = {
    id: 0,
    emailId: '',
    name: '',
    password: '',
    role: '',
  };

  // Set up state for user and setUser function
  const [user, setUser] = useState(initialUser);

  // useEffect to monitor changes in user
  useEffect(() => {
    // Log whenever user state changes
    console.log('User context updated:', user);
  }, [user]);

  return (
    // Wrap the components in UserContext.Provider
    <UserContext.Provider value={{ user, setUser }}>
      <div>
        {/* Include Navbar component */}
        <Navbar />

        {/* Main content area */}
        <main className="flex flex-col items-center justify-between p-24">
          {/* Include Login component */}
          <Login />

          {/* Include AddUserTask component */}
          <AddUserTask />

          {/* Include UserTaskList component */}
          <UserTaskList task={responseTask} />

          
        </main>
      </div>
    </UserContext.Provider>
  );
}
