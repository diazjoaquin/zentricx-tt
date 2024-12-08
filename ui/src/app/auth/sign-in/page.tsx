'use client';
import { SignInForm } from "@/app/components/Sign-in";
import { useAuth } from "@/app/hooks/useAuth";
import apiService from "@/app/services/api.service";


const SignIn = () => {
	const { handleSignIn, initialValuesSignIn } = useAuth();

	return (
		<SignInForm 
			apiService={apiService} 
			handleSignIn={handleSignIn} 
			initialValues={initialValuesSignIn} 
		/>
	);
};

export default SignIn;