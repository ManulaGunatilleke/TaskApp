
import Navbar from "@/app/CommonComponents/Navbar/page";
import TaskList from "@/app/AdminComponents/TaskList/page";
import AddTask from "@/app/AdminComponents/AddTask/page";
import Image from "next/image";
import Login from "@/app/CommonComponents/Login/page";

export default function Home() {
  return (
    <div>
      <Navbar />
      <main className="flex flex-col items-center justify-between p-24">
        <Login />
        {/* You can include TaskList here if needed */}
      </main>
    </div>
  );
}
