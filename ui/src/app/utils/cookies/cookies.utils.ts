'use client';
import { AuthTokenPayload } from "@/app/interfaces/IAccessToken";
import { decodeToken, verifyTokenExpiration } from "../token/decode.token";
import Cookies from 'js-cookie';

export const getCookie = (name: string) => {
  return Cookies.get(name);
};

export const getUserDataByCookie = (name: string) => {
	const cookie = getCookie(name);

	if (cookie) {
		const authTokenPayload = decodeToken<AuthTokenPayload>(cookie);
		return {
			email: authTokenPayload.email,
			id: authTokenPayload.sub,
		};
	}

	return null;
};

export const getIsAuthByCookie = (name: string) => {
	const cookie = getCookie(name);

	if (cookie) {
		const cookieIsExpired = verifyTokenExpiration(cookie);
		return !cookieIsExpired;
	}

	return false;
};

export const getIsExpiredByCookie = (name: string) => {
	const cookie = getCookie(name);

	if (cookie) {
		return verifyTokenExpiration(cookie);
	}

	return false;
};
