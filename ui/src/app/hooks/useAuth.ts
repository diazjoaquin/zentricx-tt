import { redirect } from 'next/navigation';
import { IApiService } from '../interfaces/IApiService';
import { fromUserFormToData } from '../mappers/user.mapper';
import { useAuthContext } from './useAuthContext';
import { UserAccessToken } from '../interfaces/IAccessToken';

export interface FormValues {
  name?: string;
  email: string;
  password: string;
  ["confirm-password"]?: string;
}

export const useAuth = () => {
  const { handleLogIn } = useAuthContext();
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
      console.log('User created successfully');
      redirect('/sign-in');
    } catch (error) {
      throw new Error("Error creating user, please try again later.");
    }
  }

  const handleSignIn = async (
    values: FormValues, 
    apiService: IApiService,
  ) => {
    try {
      const response = await apiService.post<UserAccessToken, FormValues>('auth/login', values);
      handleLogIn(response)
      console.log('User logged in successfully');
      redirect('/');
    } catch (error) {
      throw new Error("Error logging in, please try again later.");
    }
  }

  return {
    initialValuesSignUp,
    initialValuesSignIn,
    handleSignUp,
    handleSignIn,
  }
}