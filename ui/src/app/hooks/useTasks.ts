import { ITask } from "../interfaces/ITask";
import apiService from "../services/api.service";
import { getUserDataByCookie } from "../utils/cookies/cookies.utils";

export const useTask = () => {

  const fetchTasks = async () => {
    try {
      const payload = await getUserDataByCookie('access_token');
      console.log(payload);
      
      const response: ITask[] = await apiService.get(`task/user/${payload?.id}`);
      if (response) {
        console.log(response);
        return response;
      }
    } catch (error) {
     throw new Error("Error fetching tasks, please try again later."); 
    }
    return [];
  }

  return {
    fetchTasks
  }
}