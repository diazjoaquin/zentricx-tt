'use client';
import { IFetchConfig } from "@/app/interfaces/IFetchConfig";
import { getCookie } from "@/app/utils/cookies/cookies.utils";

export const FetchConfig: IFetchConfig = {
	headers: {
		'Content-Type': 'application/json',
		Accept: 'application/json',
		'access_token': getCookie('access_token')?.toString() || '',
	},
	baseUrl: 'http://localhost:5000/api/v1',
};