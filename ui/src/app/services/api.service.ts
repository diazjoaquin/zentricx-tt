import { FetchConfig } from "../config/fetch/fetch.config";
import { IApiService } from "../interfaces/IApiService";
import { IFetchConfig } from "../interfaces/IFetchConfig";
import { getCookie } from "../utils/cookies/cookies.utils";


class ApiService implements IApiService {
	private config: IFetchConfig;

  constructor(config: IFetchConfig = FetchConfig) {
		this.config = config;
	}

  async get<T = unknown>(endpoint: string): Promise<T> {
		const token = await getCookie('access_token');
		const response = await fetch(`${this.config.baseUrl}/${endpoint}`, {
			method: 'GET',
			headers: {
				...this.config.headers,
				access_token: token ? token : '',
			}
		});
		const responseJSON = await response.json();

		if (!response.ok) {
			throw new Error(responseJSON.message);
		}

		return responseJSON;
	}

	async post<T = unknown, K = unknown>(endpoint: string, body: K): Promise<T> {
		const token = await getCookie('access_token');
		const response = await fetch(`${this.config.baseUrl}/${endpoint}`, {
			method: 'POST',
			headers: {
				...this.config.headers,
				access_token: token ? token : '',
			},
			body: JSON.stringify(body),
		});
		const responseJSON = await response.json();

		if (!response.ok) {
			throw new Error(responseJSON.message);
		}

		return responseJSON;
	}

	async patch<T = unknown, K = unknown>(endpoint: string, body: K): Promise<T> {
		const token = await getCookie('access_token');
		try {
			const response = await fetch(`${this.config.baseUrl}/${endpoint}`, {
				method: 'PATCH',
				headers: {
					...this.config.headers,
					access_token: token ? token : '',
				},
				body: JSON.stringify(body),
			});
			return response.json();
		} catch (error) {
			throw error as Error;
		}
	}

	async put<T = unknown, K = unknown>(endpoint: string, body: K): Promise<T> {
		const token = await getCookie('access_token');
		try {
			const response = await fetch(`${this.config.baseUrl}/${endpoint}`, {
				method: 'PUT',
				headers: {
					...this.config.headers,
					access_token: token ? token : '',
				},
				body: JSON.stringify(body),
			});
			return response.json();
		} catch (error) {
			throw error as Error;
		}
	}

	async delete<T = unknown>(endpoint: string): Promise<T> {
		const token = await getCookie('access_token');
		try {
			const response = await fetch(`${this.config.baseUrl}/${endpoint}`, {
				method: 'DELETE',
				headers: {
					...this.config.headers,
					access_token: token ? token : '',
				},
			});
			return response.json();
		} catch (error) {
			throw error as Error;
		}
	}
}

export default new ApiService();