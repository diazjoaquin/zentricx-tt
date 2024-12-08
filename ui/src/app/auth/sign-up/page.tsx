'use client';
import { SignUpForm } from "@/app/components/Sign-up";
import { useAuth } from "@/app/hooks/useAuth";
import apiService from "@/app/services/api.service";


const SignUp = () => {
  const { handleSignUp, initialValuesSignUp } = useAuth();


	return (
    <SignUpForm
      apiService={apiService} 
      handleSignUp={handleSignUp} 
      initialValues={initialValuesSignUp}
    />
  )
};

export default SignUp;