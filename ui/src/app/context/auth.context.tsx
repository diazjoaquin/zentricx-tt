'use client';
import { getIsAuthByCookie, getIsExpiredByCookie, getUserDataByCookie } from '../utils/cookies/cookies.utils';
import React from 'react';
import { useCookies } from 'react-cookie';
import { AuthReducerState, AuthUser } from '../interfaces/IAuth';
import { UserAccessToken } from '../interfaces/IAccessToken';
import authReducer from '../reducer/auth.reducer';
import { COOKIES } from '../utils/cookies/cookies.name';

interface AuthContextValues {
  authState: AuthReducerState;
  handleLogIn: (accessToken: UserAccessToken) => void;
  handleLogOut: () => void;
}

export const AuthContext = React.createContext<AuthContextValues | null>(null);

export const AuthProvider: React.FC<{ children: JSX.Element }> = ({ children }) => {
  const [, setCookie, removeCookie] = useCookies([COOKIES.ACCESS_TOKEN]);

  const initialState: AuthReducerState = {
    user: getUserDataByCookie(COOKIES.ACCESS_TOKEN) || null,
    isAuth: getIsAuthByCookie(COOKIES.ACCESS_TOKEN),
    isExpired: getIsExpiredByCookie(COOKIES.ACCESS_TOKEN),
  };

  const [authState, dispatch] = React.useReducer(authReducer, initialState);

  const handleLogIn = async (accessToken: UserAccessToken) => {
		setCookie(COOKIES.ACCESS_TOKEN, accessToken['access_token'], { path: '/' });
	
		const userData = await getUserDataByCookie(COOKIES.ACCESS_TOKEN) as AuthUser
		const user = userData || { email: '', id: '' };
		dispatch({
			type: 'LOGIN',
			payload: user,
		});
	};

  const handleLogOut = () => {
    removeCookie(COOKIES.ACCESS_TOKEN);
    dispatch({
      type: 'LOGOUT',
    });
  };

  const values = { authState, handleLogIn, handleLogOut };

  return <AuthContext.Provider value={values}>{children}</AuthContext.Provider>;
};