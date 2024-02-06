'use client';

 import { useRouter } from 'next/navigation';
import React, { useState, useContext, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import UserContext from '../ContextComponent/page';
// import AddTask from "../../AdminComponents/AddTask/page";
// import AddUserTask from "@/app/UserComponents/AddUserTask/page";
import Link from 'next/link';

const loginLogo = "data:image/svg+xml,<svg xmlns='http://www.w3.org/2000/svg' fill='%2316a085' width='128' height='128' viewBox='0 0 24 24'><path d='M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 18c-1.1 0-2-.9-2-2h4c0 1.1-.9 2-2 2zm0-4c-1.1 0-2-.9-2-2s.9-2 2-2 2 .9 2 2-.9 2-2 2zm0-6H8c-1.1 0-2 .9-2 2s.9 2 2 2h4c1.1 0 2-.9 2-2s-.9-2-2-2z'/></svg>";

interface LoginProps {}

const page: React.FC<LoginProps> = () => {
    const { user, setUser } = useContext(UserContext);
    const [emailId, setEmailId] = useState<string>("");
   
    const [password, setPassword] = useState<string>("");
    const [role, setRole] = useState<string>("");
    const router = useRouter(); // useRouter hook for programmatic navigation
  
    async function submit(e: React.FormEvent) {
      e.preventDefault();
    
      try {
        const resultJson = await (
          await fetch("http://localhost:8080/api/v1/login", {
            method: 'post',
            body: JSON.stringify({ emailId, password, role }),
            headers: {
              'Content-Type': 'application/json'
            }
          })
        ).json();
    
        console.log('resultJson_Login',resultJson);
    
        // Update the user state
        setUser(resultJson);
    
        // Check if resultJson has the necessary properties
        if (resultJson.name && resultJson.role) {
          localStorage.setItem('newUser', JSON.stringify(resultJson));
          console.log('User_Login',user);
          if (resultJson.role === "admin") {
            router.push('/');
          } else if (resultJson.role === "user") {
            router.push('/');
          }
        } else {
          // Notify the user about incorrect details
          toast.warn('Please enter correct details..!', {
            position: "top-center",
            autoClose: 5000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: "light",
          });
        }
      } catch (error) {
        console.error('Error during login:', error);
      }
    }
    

    return (
      <div className="bg-twilight h-screen flex flex-col justify-center items-center">
      <div className="text-white text-4xl mb-8">
          <h1>Task Manager</h1>
      </div>

      <div className="bg-white p-8 rounded-lg shadow-lg flex flex-col items-center">
          <form action="POST" className="w-full">
              <div className="mb-4">
              <label htmlFor="role" className="block text-sm font-medium text-gray-700">role:</label>
                  <select
                    className="form-select-lg w-full mt-1 p-2 border rounded-md"
                    required={true}
                    id="role"
                    name="role"
                    onChange={(e) => {
                        setRole(e.target.value);
                    }}
                      value={role}
                  >
                  <option value="" disabled selected>Select Type</option>
                  <option value="admin">admin</option>
                  <option value="user">user</option>
                  </select>
              </div>

              <div className="mb-4">
                  <label htmlFor="emailId" className="block text-sm font-medium text-gray-700">Email:</label>
                  <input
                      type="email"
                      className="form-input w-full mt-1 p-2 border rounded-md"
                      placeholder="Email"
                      onChange={(e) => {
                          setEmailId(e.target.value);
                      }}
                      value={emailId}
                  />
              </div>

              <div className="mb-4">
                  <label htmlFor="password" className="block text-sm font-medium text-gray-700">Password:</label>
                  <input
                      type="password"
                      className="form-input w-full mt-1 p-2 border rounded-md"
                      placeholder="Password"
                      onChange={(e) => {
                          setPassword(e.target.value);
                      }}
                      value={password}
                  />
              </div>

              <button
                  type="submit"
                  className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-full"
                  onClick={submit}
              >
                  LOGIN
              </button>
          </form>

          <div className="mt-4 text-sm">
              <span>If you don’t have an account?</span>&nbsp;&nbsp;
              <a href="/add" className="text-blue-500">Signup here.</a>
          </div>
      </div>
  </div>
      );
    };

export default page;
