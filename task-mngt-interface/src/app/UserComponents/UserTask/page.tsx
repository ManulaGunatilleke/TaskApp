import React from 'react'

interface TaskProps {
  task: {
    taskTitle: string,
    taskDescription: string,
    priority: string;
    user: number;
    tid?: number;
  };
  deleteTask: (e: React.MouseEvent<HTMLButtonElement, MouseEvent>, user: number, tid?: number) => void;
  editTask: (e: React.MouseEvent<HTMLButtonElement, MouseEvent>, user: number, tid?: number) => void;
}

const page: React.FC<TaskProps> = ({ task, deleteTask, editTask }) => {
  console.log('Task_UserTask :',task);
  return (
    <tr key={task.tid}>
      <td className="text-left px-6 py-4 whitespace-nowrap">
        <div className="text-sm text-gray-500">{task.taskTitle}</div>
      </td>
      <td className="text-left px-6 py-4 whitespace-nowrap">
        <div className="text-sm text-gray-500">{task.taskDescription}</div>
      </td>
      <td className="text-left px-6 py-4 whitespace-nowrap">
        <div className="text-sm text-gray-500">{task.priority}</div>
      </td>
      {/* <td className="text-left px-6 py-4 whitespace-nowrap">
        <div className="text-sm text-gray-500">{task.user}</div>
      </td> */}
      {/* <td className="text-left px-6 py-4 whitespace-nowrap">
        <div className="text-sm text-gray-500">{task.tid}</div>
      </td> */}
      <td className="text-right px-6 py-4 whitespace-nowrap">
      <button
        onClick={(e) => editTask(e, task.user, task.tid)}
        className="text-indigo-600 hover:text-indigo-800 hover:cursor-pointer px-4"
      >
        Edit
      </button>

      <button
        onClick={(e) => deleteTask(e, task.user ,task.tid)}
        className="text-indigo-600 hover:text-indigo-800 hover:cursor-pointer"
      >
        Delete
      </button>
      </td>
    </tr>
  );
};

export default page