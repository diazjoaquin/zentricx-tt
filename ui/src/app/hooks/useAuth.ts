import { redirect, useRouter } from 'next/navigation';
import { IApiService } from '../interfaces/IApiService';
import { fromUserFormToData } from '../mappers/user.mapper';
import { useAuthContext } from './useAuthContext';
import { UserAccessToken } from '../interfaces/IAccessToken';
import { useNotification } from "./useNotification";

export interface FormValues {
  name?: string;
  email: string;
  password: string;
  ["confirm-password"]?: string;
}

export const useAuth = () => {
  const { handleLogIn } = useAuthContext();
  const { getNotification } = useNotification();
  const router = useRouter();

  const initialValuesSignUp: FormValues = {
    name: '',
    email: '',
    password: '',
    ["confirm-password"]: '',
  }

  const initialValuesSignIn: FormValues = {
    email: '',
    password: '',
  }

  const handleSignUp = async (
    values: FormValues, 
    apiService: IApiService, 
  ) => {
    const mappedValues = fromUserFormToData(values);
    try {
      await apiService.post('auth/register', mappedValues);
      getNotification('success', 'User created successfully, please sign in');
      router.push('/auth/sign-in');
    } catch (error) {
      if (error instanceof Error) {
        getNotification('error', error.message);
      }
    }
  }

  const handleSignIn = async (
    values: FormValues, 
    apiService: IApiService,
  ) => {
    try {
      const response = await apiService.post<UserAccessToken, FormValues>('auth/login', values);
      if (response) {
        handleLogIn(response);
        getNotification('success', 'User logged in successfully');
        redirect('/');
      }
    } catch (error) {
      if (error instanceof Error && error.message !== 'NEXT_REDIRECT') {
        getNotification('error', error.message);
      }
    }
  }

  return {
    initialValuesSignUp,
    initialValuesSignIn,
    handleSignUp,
    handleSignIn,
  }
}