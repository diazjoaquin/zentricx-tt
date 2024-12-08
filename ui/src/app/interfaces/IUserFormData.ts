export interface IUserFormData {
	name?: string;
	email: string;
	password: string;
	['confirm-password']?: string;
}