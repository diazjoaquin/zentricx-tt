'use client';
import { SignUpForm } from "@/app/components/Sign-up";
import { useAuth } from "@/app/hooks/useAuth";
import { useAuthContext } from "@/app/hooks/useAuthContext";
import apiService from "@/app/services/api.service";
import { redirect } from "next/navigation";


const SignUp = () => {
	const { authState } = useAuthContext();
  const { handleSignUp, initialValuesSignUp } = useAuth();


	return authState.isAuth ? redirect('/') : (
    <SignUpForm
      apiService={apiService} 
      handleSignUp={handleSignUp} 
      initialValues={initialValuesSignUp}
    />
  )
};

export default SignUp;