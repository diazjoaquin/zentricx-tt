'use client';
import { redirect } from "next/navigation";
import { Navbar } from "./components/Navbar";
import TaskList from "./components/TaskList";
import { useAuthContext } from "./hooks/useAuthContext";
import { useTask } from "./hooks/useTasks";
import { UUID } from "crypto";
import { useModal } from "./hooks/useModal";
import { AddTask } from "./components/AddTask";
import { ITask } from "./interfaces/ITask";

export default function Home() {
  const { authState } = useAuthContext();
  const userId = authState?.user?.id?.toString() as UUID;
  const { 
    tasks, 
    loading, 
    handleAddTask, 
    addInitialValues,
    updateInitialValues, 
    handleDeleteTask, 
    handleUpdateTask,
    setCurrentTask } = useTask(userId as UUID);

  const { 
    isOpenCreateTask,
    handleOpenCreateTask,
    handleCloseCreateTask,
    isOpenUpdateTask,
    handleOpenUpdateTask,
    handleCloseUpdateTask,
    isOpenDeleteTask,
    handleOpenDeleteTask,
    handleCloseDeleteTask } = useModal();
  
  return authState.isAuth ? (
    <div className="w-screen h-screen flex items-center">
      <Navbar />
      <AddTask 
        isOpen={isOpenCreateTask} 
        handleCloseModal={handleCloseCreateTask} 
        handleSubmit={(values: ITask) => handleAddTask(values, handleCloseCreateTask)} 
        initialValues={addInitialValues}
      />
      <TaskList 
      tasks={tasks} 
      loading={loading} 
      handleOpenCreateTask={handleOpenCreateTask} 
      handleOpenDeleteTask={handleOpenDeleteTask} 
      handleCloseDeleteTask={handleCloseDeleteTask}
      isOpenDeleteTask={isOpenDeleteTask}
      handleDeleteTask={handleDeleteTask}
      handleOpenUpdateTask={handleOpenUpdateTask}
      handleCloseUpdateTask={handleCloseUpdateTask}
      isOpenUpdateTask={isOpenUpdateTask}
      handleUpdateTask={handleUpdateTask}
      updateInitialValues={updateInitialValues}
      setCurrentTask={setCurrentTask}
      /> 
    </div>
 ) : redirect('/auth/sign-in')
}
