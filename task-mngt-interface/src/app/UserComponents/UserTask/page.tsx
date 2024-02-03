import React from 'react'

interface TaskProps {
  task: {
    tId?: number;
    taskTitle: string,
    taskDescription: string,
    priority: string;
    uId: number;
  };
  deleteTask: (e: React.MouseEvent<HTMLButtonElement, MouseEvent>, uId: number, tId?: number) => void;
  editTask: (e: React.MouseEvent<HTMLButtonElement, MouseEvent>, uId: number, tId?: number) => void;
}

const page: React.FC<TaskProps> = ({ task, deleteTask, editTask }) => {
  return (
    <tr key={task.tId}>
      <td className="text-left px-6 py-4 whitespace-nowrap">
        <div className="text-sm text-gray-500">{task.taskTitle}</div>
      </td>
      <td className="text-left px-6 py-4 whitespace-nowrap">
        <div className="text-sm text-gray-500">{task.taskDescription}</div>
      </td>
      <td className="text-left px-6 py-4 whitespace-nowrap">
        <div className="text-sm text-gray-500">{task.priority}</div>
      </td>
      <td className="text-right px-6 py-4 whitespace-nowrap">
      <button
        onClick={(e) => editTask(e, task.uId, task.tId)}
        className="text-indigo-600 hover:text-indigo-800 hover:cursor-pointer px-4"
      >
        Edit
      </button>

      <button
        onClick={(e) => deleteTask(e, task.uId ,task.tId)}
        className="text-indigo-600 hover:text-indigo-800 hover:cursor-pointer"
      >
        Delete
      </button>
      </td>
    </tr>
  );
};

export default page