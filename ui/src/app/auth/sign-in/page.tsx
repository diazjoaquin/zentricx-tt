'use client';
import { SignInForm } from "@/app/components/Sign-in";
import { useAuth } from "@/app/hooks/useAuth";
import { useAuthContext } from "@/app/hooks/useAuthContext";
import apiService from "@/app/services/api.service";
import { redirect } from "next/navigation";


const SignIn = () => {
	const { authState } = useAuthContext();
	const { handleSignIn, initialValuesSignIn } = useAuth();

	return authState.isAuth ? redirect('/') : (
		<SignInForm 
			apiService={apiService} 
			handleSignIn={handleSignIn} 
			initialValues={initialValuesSignIn} 
		/>
	);
};

export default SignIn;