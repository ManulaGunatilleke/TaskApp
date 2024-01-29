// import { signOut, useSession } from "next-auth/react";
import Image from "next/image";

const page = () => {
  // const { data: session, status } = useSession();
  return (
     <div className="bg-gray-800">
       <div className="h-16 px-8 flex items-center">
         <p className="text-white font-bold flex-auto">Task Management System</p>
         {/* {session && (
          <div className="flex items-center sm:space-x-2 justify-end">
            <Image
              onClick={signOut}
              className="rounded-full cursor-pointer"
              src={session.user.image}
              height="30"
              width="30"
              layout="fixed"
              title="Click to Logout" alt={""}></Image>
            <p className="text-white font-bold">{session?.user.name}</p>
          </div>
        {/* )} </div>*/}
      
     </div>
    </div>
  );
};

export default page;