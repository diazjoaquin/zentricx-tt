'use client';
import { Navbar } from "./components/Navbar";
import TaskList from "./components/TaskList";
import { useTask } from "./hooks/useTasks";

export default function Home() {
  const { fetchTasks } = useTask();
  return (
    <div>
      <Navbar />
      <TaskList fetchTasks={fetchTasks}/> 
    </div>
 );
}
