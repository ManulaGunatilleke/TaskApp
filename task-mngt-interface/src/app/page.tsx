'use client';
import React, { useState, useEffect } from 'react';
import Navbar from "@/app/CommonComponents/Navbar/page";
import Login from "@/app/CommonComponents/Login/page";
import UserContext from "./CommonComponents/ContextComponent/page";
import UserTaskList from "@/app/UserComponents/UserTaskList/page";
import AddUserTask from "@/app/UserComponents/AddUserTask/page";
import AddTask from "@/app/AdminComponents/AddTask/page";

export default function HomePage() {
  const [responseTask, setResponseTask] = useState({
    taskTitle: "",
    taskDescription: "",
    priority: "",
    user: 0,
    tid: 0
  });

  const initialUser = {
    id: 0,
    emailId: '',
    name: '',
    password: '',
    role: '',
  };

  const [user, setUser] = useState(initialUser);

  

  // Conditionally render components based on user login status
  const renderComponents = () => {
    if (user.id) {
      // User is logged in
      if (user.role === 'admin') {
        // Render components for admin
        return (
          <>
             <AddTask />
          </>
        );
      } else if (user.role === 'user') {
        // Render components for regular user
        return (
          <>
            <AddUserTask />
          </>
        );
      }
    } else {
      // User is not logged in, render login component
      return <Login />;
    }
  };
  

  return (
    <UserContext.Provider value={{ user, setUser }}>
      <div>
        <Navbar />
        <main className="flex flex-col items-center justify-between ">
          {renderComponents()}
        </main>
      </div>
    </UserContext.Provider>
  );
}
