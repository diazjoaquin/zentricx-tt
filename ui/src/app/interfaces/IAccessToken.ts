import { AuthUser } from "./IAuth";

export interface AuthTokenPayload {
	sub: number;
	exp: number;
	iat: number;
	email: string;
}

export interface UserAccessToken {
	access_token: string;
	user: AuthUser;
}