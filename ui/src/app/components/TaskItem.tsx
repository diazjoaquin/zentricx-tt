import { ITask } from "../interfaces/ITask";
import { MdEdit } from "react-icons/md";
import { FaRegTrashAlt } from "react-icons/fa";
import { UUID } from "crypto";
import { DeleteTask } from "./DeleteTask";
import { UpdateTask } from "./UpdateTask";
import { useEffect } from "react";

interface TaskItemProps {
  task: ITask;
  handleOpenDeleteTask: (taskId: UUID) => void;
  handleCloseDeleteTask: () => void;
  isOpen: boolean;
  handleDeleteTask: (taskId: UUID, onSuccess: () => void) => void;
  handleOpenUpdateTask: (taskId: UUID) => void;
  handleCloseUpdateTask: () => void;
  isOpenUpdateTask: boolean;
  handleUpdateTask: (taskId: UUID, values: ITask, onSuccess: () => void) => Promise<void>;
  updateInitialValues: ITask;
  setCurrentTask: (task: ITask) => void;
}

const TaskItem = ({ 
  task, 
  handleOpenDeleteTask, 
  handleCloseDeleteTask, 
  isOpen, 
  handleDeleteTask,
  handleOpenUpdateTask, 
  handleCloseUpdateTask, 
  isOpenUpdateTask, 
  handleUpdateTask,
  updateInitialValues,
  setCurrentTask
}: TaskItemProps) => {

  useEffect(() => { 
    setCurrentTask(task);
  },[task, setCurrentTask])

  return (
    <div className="pl-10 py-4 border mt-3 grid grid-cols-3 gap-3 mx-2 items-center  rounded-lg shadow-md hover:shadow-lg transition-all">
      <h3 className="text-md border-r-2 ">{task.name}</h3>
      <p className="text-gray-700 border-r-2 overflow-x-hidden">{task.description}</p>
      <div className="flex flex-row justify-between items-center pr-4">
        <span className={`${task.state === "completed" ? "bg-green-500" : "bg-gray-400"} border-2 text-white font-semibold rounded-full px-4 py-2`}>
          {task.state}
        </span>
        <div className="flex flex-row lg:gap-3 gap-1">
          <MdEdit className="text-xl hover:cursor-pointer" onClick={() => handleOpenUpdateTask(task.id as UUID)}/>
          <FaRegTrashAlt className="text-xl hover:cursor-pointer" onClick={() => handleOpenDeleteTask(task.id as UUID)}/>
        </div>
      </div>
      <DeleteTask taskId={task.id as UUID} handleCloseModal={handleCloseDeleteTask} isOpen={isOpen} handleDeleteTask={(taskId) => handleDeleteTask(taskId, handleCloseDeleteTask)} />
      <UpdateTask id={task.id as UUID} handleCloseModal={handleCloseUpdateTask} isOpen={isOpenUpdateTask} handleSubmit={(id, values, handleCloseModal) => handleUpdateTask(id, values, handleCloseModal)} initialValues={updateInitialValues} />
    </div>
  );
};

export default TaskItem;