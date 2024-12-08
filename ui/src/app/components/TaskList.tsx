'useClient';
import TaskItem from "./TaskItem";
import { ITask } from "../interfaces/ITask";
import { useEffect, useState } from "react";

interface TaskListProps {
  fetchTasks: () => Promise<ITask[]>
}
const TaskList: React.FC<TaskListProps> = ({ fetchTasks }) => {

  const [tasks, setTasks] = useState<ITask[]>([]);
  
  useEffect(() => {
    const fetchTasksAsync = async () => {
      const tasks = await fetchTasks();
      setTasks(tasks);
    };
    fetchTasksAsync();
  }, [fetchTasks]);

  return (
    <div>
      <h1>Task List</h1>
      <ul>
        {tasks.map((task) => (
          <TaskItem
            task={task}
          />
        ))}
      </ul>
    </div>
  )
}

export default TaskList;