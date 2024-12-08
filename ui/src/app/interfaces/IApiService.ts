export interface IApiService {
	get: <T = unknown>(endpoint: string) => Promise<T>;
	post: <T = unknown, K = unknown>(endpoint: string, body: K) => Promise<T>;
	put: <T = unknown, K = unknown>(endpoint: string, body: K) => Promise<T>;
	delete: <T = unknown>(endpoint: string) => Promise<T>;
}