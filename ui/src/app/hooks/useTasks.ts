import { UUID } from "crypto";
import { ITask } from "../interfaces/ITask";
import apiService from "../services/api.service";
import { State } from "../utils/state.enum";
import { useEffect, useState } from "react";
import { useNotification } from "./useNotification";

export const useTask = (userId: UUID) => {
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [tasks, setTasks] = useState<ITask[]>([]);
  const [ currentTask, setCurrentTask ] = useState<ITask | null>(null);
  const { getNotification } = useNotification();

  const addInitialValues: ITask = {
    createdBy: userId,
    name: "",
    description: "",
    state: State.PENDING,
  };

  const updateInitialValues: ITask = {
    createdBy: userId,
    name: currentTask?.name || "",
    description: currentTask?.description || "",
    state: currentTask?.state || State.PENDING,
  };
  


  const handleAddTask = async (values: ITask, onSuccess: () => void) => {
    setLoading(true);
    try {
      const reponse: ITask = await apiService.post('task', values);
      if (reponse) {
        setTasks([...tasks, reponse]);
        onSuccess();
        getNotification('success', 'Task created successfully');
        setLoading(false);
      }
    } catch (error) {
      if (error instanceof Error) {
        setError(error.message);
        getNotification('error', error.message);
      }
    } finally {
      setLoading(false);
    }
  };

  const handleUpdateTask = async (id: UUID, values: ITask, onSuccess: () => void) => {
    setLoading(true);
    try {
      const response: ITask = await apiService.put(`task/${id}`, values);
      if (response) {
        setTasks((prevTasks) =>
          prevTasks.map((task) =>
            task.id === id ? response : task
          )
        );
        onSuccess();
        getNotification('success', 'Task updated successfully');
        setLoading(false);
        console.log(response);
      }
    } catch (error) {
      if (error instanceof Error) {
        setError(error.message);
        getNotification('error', error.message);
      }
    } finally {
      setLoading(false);
    }
  }

  const handleDeleteTask = async (taskId: UUID, onSuccess: () => void) => {
    setLoading(true);
    try {
      const response: boolean = await apiService.delete(`task/${taskId}`);
      if (response) {
        setTasks(tasks.filter((task) => task.id !== taskId));
        onSuccess();
        getNotification('success', 'Task deleted successfully');
        setLoading(false);
        console.log(response);
      }
    } catch (error) {
      if (error instanceof Error) {
        setError(error.message);
        getNotification('error', error.message);
      }
    } finally {
      setLoading(false);
    }
  }



  useEffect(() => {
    const fetchTasks = async () => {
      setLoading(true);
      try {
        const response: ITask[] = await apiService.get(`task/user/${userId}`);
        if (response) {
          setTasks(response);
        }
        setLoading(false);
      } catch (error) {
        if (error instanceof Error) {
          setError(error.message);
          getNotification('error', error.message);
        }
      } finally {
        setLoading(false);
      }
    };

    fetchTasks();
  }, []);

  return {
    addInitialValues,
    updateInitialValues,
    loading,
    error,
    tasks,
    handleAddTask,
    handleDeleteTask,
    handleUpdateTask,
    setCurrentTask
  }
}