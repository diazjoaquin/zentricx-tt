import { useContext } from 'react';
import { AuthContext } from '../context/auth.context';

export const useAuthContext = () => {
  const context = useContext(AuthContext);

  if (!context) {
    throw new Error('There is no auth context');
  }

  return context;
};