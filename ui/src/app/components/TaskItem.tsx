'use client';
import { ITask } from "../interfaces/ITask";

interface TaskItemProps {
  task: ITask;
}

const TaskItem = ({ task }: TaskItemProps) => {
  return (
    <div className="p-4 border rounded-lg shadow-md hover:shadow-lg transition-all">
      <div className="flex justify-between items-center mb-2">
        <h3 className="text-lg font-semibold">{task.name}</h3>
      </div>
      <p className="text-gray-700">{task.description}</p>
      <span>
        {task.state}
      </span>
    </div>
  );
};

export default TaskItem;