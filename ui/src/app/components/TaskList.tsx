'useClient';
import TaskItem from "./TaskItem";
import { ITask } from "../interfaces/ITask";
import { FiPlus } from "react-icons/fi";
import { Loader } from "../common/components/Loader";
import { UUID } from "crypto";

interface TaskListProps {
  tasks: ITask[];
  loading: boolean;
  handleOpenCreateTask: () => void;
  handleOpenDeleteTask: (taskId: UUID) => void;
  handleCloseDeleteTask: () => void;
  handleDeleteTask: (taskId: UUID, onSuccess: () => void) => void;
  isOpenDeleteTask: boolean;
  handleOpenUpdateTask: (taskId: UUID) => void;
  handleCloseUpdateTask: () => void;
  isOpenUpdateTask: boolean;
  handleUpdateTask: (taskId: UUID, values: ITask, onSuccess: () => void) => void;
  updateInitialValues: ITask;
  setCurrentTask: (task: ITask) => void
}
const TaskList: React.FC<TaskListProps> = ({ 
  tasks, 
  loading, 
  handleOpenCreateTask, 
  handleOpenDeleteTask, 
  handleCloseDeleteTask, 
  isOpenDeleteTask, 
  handleDeleteTask,
  handleOpenUpdateTask,
  handleCloseUpdateTask,
  isOpenUpdateTask,
  handleUpdateTask,
  updateInitialValues,
  setCurrentTask
   }) => {

  if (loading) return (
    <div className="w-screen h-screen flex justify-center items-center">
      <Loader />
    </div>
  );

  return (
    <div className="w-full h-full flex flex-col justify-center items-center px-20 pt-10">
      <div className="w-9/12 flex items-center pb-4 gap-6">
        <h1 className="text-xl font-semibold">{tasks.length > 0 ? 'Your tasks:' : 'There is no tasks created.'}</h1>
        <span onClick={handleOpenCreateTask} className="flex font-bold gap-2 pl-5 px-3 py-2 rounded-full bg-green-400 text-white hover:cursor-pointer hover:bg-green-500">Add a new task <FiPlus className="text-2xl" /></span>
      </div>
      <div className="border-2 rounded-xl h-4/6 w-9/12">
      <div className="grid grid-cols-3 gap-3 border-b-2 pl-10 py-2 mx-2">
        <h1 className="text-lg font-semibold border-r-2">Name:</h1>
        <h1 className="text-lg font-semibold border-r-2">Description:</h1>
        <h1 className="text-lg font-semibold">State:</h1>
      </div>
        <div className="h-5/6 overflow-y-scroll">
          {tasks?.map((task) => (
            <TaskItem
              key={task.id}
              task={task}
              handleOpenDeleteTask={(taskId) => handleOpenDeleteTask(taskId)}
              handleCloseDeleteTask={handleCloseDeleteTask}
              isOpen={isOpenDeleteTask}
              handleDeleteTask={(taskId) => handleDeleteTask(taskId, handleCloseDeleteTask)}
              handleOpenUpdateTask={(taskId) => handleOpenUpdateTask(taskId)}
              handleCloseUpdateTask={handleCloseUpdateTask}
              isOpenUpdateTask={isOpenUpdateTask}
              handleUpdateTask={async (taskId, values, onSuccess) => handleUpdateTask(taskId, values, onSuccess)}
              updateInitialValues={updateInitialValues}
              setCurrentTask={setCurrentTask}
            />
          ))}
        </div>
      </div>
    </div>
  )
};

export default TaskList;