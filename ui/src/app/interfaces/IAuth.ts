export interface AuthUser {
	id: number;
	email: string;
}

export interface AuthReducerState {
	user: AuthUser | null;
	isAuth: boolean;
	isExpired: boolean;
}