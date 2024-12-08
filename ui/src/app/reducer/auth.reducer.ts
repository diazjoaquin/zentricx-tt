import { AuthReducerState, AuthUser } from "../interfaces/IAuth";

type AuthAction = 
  | { type: 'LOGOUT' } 
  | { type: 'LOGIN'; payload: AuthUser };

const authReducer = (state: AuthReducerState, action: AuthAction): AuthReducerState => {
  switch (action.type) {
    case 'LOGIN':
      return {
        ...state,
        isAuth: true,
        isExpired: false,
        user: action.payload,
      };
    case 'LOGOUT':
      return {
        user: null,
        isAuth: false,
        isExpired: false,
      };
    default:
      return state;
  }
};

export default authReducer;